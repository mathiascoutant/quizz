'use client';

import { useSessionStore } from '@/store/session.store';
import { ArcElement, Chart, Legend, Tooltip } from 'chart.js';
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

// Enregistrer les éléments
Chart.register(ArcElement, Tooltip, Legend);

export const StatisticsTab = () => {
  const session = useSessionStore((state) => state.session);
  const [stats, setStats] = useState(null);
  const [answersByCategory, setAnswersByCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); // État pour la catégorie sélectionnée
  const [visibleCategories, setVisibleCategories] = useState(2); // Nombre de camemberts visibles

  useEffect(() => {
    console.log('session', session);
    if (!session) return;

    const userId = session.user.id;
    const token = session.token;

    console.log('tg');

    // Récupérer les statistiques globales
    fetch(`http://localhost:3002/api/useranswers/stats/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setStats(data);
        // Récupérer les statistiques par catégorie
        return fetch(
          `http://localhost:3002/api/useranswers/statsByCategory/${userId}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data.answersByCategory)) {
          setAnswersByCategory(data.answersByCategory);
        } else {
          console.error(
            'Expected an array for answersByCategory, but got:',
            data.answersByCategory
          );
          setAnswersByCategory([]);
        }
      })
      .catch((error) => console.error('Error fetching category stats:', error));
  }, [session]);

  // Convertir les pourcentages en nombres
  const parsePercentage = (percentage: string) => {
    console.log(percentage);
    return parseFloat(percentage.replace('%', '').replace(',', '.'));
  };

  // Préparer les données pour le camembert global
  const globalPieData = {
    labels: ['Réponses Correctes', 'Réponses Incorrectes'],
    datasets: [
      {
        data: [parsePercentage('80'), parsePercentage('20')], // Conversion des pourcentages
        backgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  // Préparer les données pour le camembert par catégorie
  const categoryPieData = (category) => ({
    labels: ['Réponses Correctes', 'Réponses Incorrectes'],
    datasets: [
      {
        data: [
          parsePercentage(category.correctPercentage),
          parsePercentage(category.incorrectPercentage),
        ], // Conversion des pourcentages
        backgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h1 className="text-4xl font-bold mb-4">Statistiques Utilisateur</h1>
      {stats && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold">Statistiques Globales</h2>
          <Pie data={globalPieData} width={1000} height={1000} />{' '}
          {/* Camembert pour les statistiques globales avec taille réduite */}
        </div>
      )}
      <h2 className="text-2xl font-semibold mb-4">
        Statistiques par Catégorie
      </h2>
      <select
        onChange={(e) => setSelectedCategory(e.target.value)}
        value={selectedCategory}
      >
        <option value="">Sélectionnez une catégorie</option>
        {answersByCategory.map((category, index) => (
          <option key={category.categoryId} value={index}>
            {category.categoryName}
          </option>
        ))}
      </select>
      {selectedCategory !== null && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold">
            {answersByCategory[selectedCategory].categoryName}
          </h3>
          <Pie
            data={categoryPieData(answersByCategory[selectedCategory])}
            width={1000}
            height={1000}
          />{' '}
          {/* Camembert pour la catégorie sélectionnée avec taille réduite */}
        </div>
      )}
      {answersByCategory.slice(0, visibleCategories).map((category) => (
        <div key={category.categoryId} className="mb-8">
          <h3 className="text-xl font-semibold">{category.categoryName}</h3>
          <Pie
            data={categoryPieData(category)}
            width={1000}
            height={1000}
          />{' '}
          {/* Camembert pour chaque catégorie avec taille réduite */}
        </div>
      ))}
      {visibleCategories < answersByCategory.length && (
        <button
          onClick={() => setVisibleCategories(visibleCategories + 2)}
          className="mt-4 text-blue-500"
        >
          Afficher plus de catégories
        </button>
      )}
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Catégorie</th>
            <th className="border border-gray-300 p-2">Total Réponses</th>
            <th className="border border-gray-300 p-2">Réponses Correctes</th>
            <th className="border border-gray-300 p-2">Réponses Incorrectes</th>
            <th className="border border-gray-300 p-2">Pourcentage Correct</th>
            <th className="border border-gray-300 p-2">
              Pourcentage Incorrect
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(answersByCategory) &&
            answersByCategory.map((category) => (
              <tr key={category.categoryId}>
                <td className="border border-gray-300 p-2">
                  {category.categoryName}
                </td>
                <td className="border border-gray-300 p-2">
                  {category.totalAnswers}
                </td>
                <td className="border border-gray-300 p-2">
                  {category.correctAnswers}
                </td>
                <td className="border border-gray-300 p-2">
                  {category.incorrectAnswers}
                </td>
                <td className="border border-gray-300 p-2">
                  {category.correctPercentage}
                </td>
                <td className="border border-gray-300 p-2">
                  {category.incorrectPercentage}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
