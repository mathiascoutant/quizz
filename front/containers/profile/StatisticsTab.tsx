'use client';

import { useGetUserStats } from '@/hooks/useGetUserStats';
import { Stats } from '@/services/stats.service';
import { ArcElement, Chart, Legend, Tooltip } from 'chart.js';
import { useState } from 'react';
import { Pie } from 'react-chartjs-2';

Chart.register(ArcElement, Tooltip, Legend);

export const StatisticsTab = () => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(0);

  const { data: stats, isLoading } = useGetUserStats();

  if (isLoading || !stats) return 'Chargement...';

  const parsePercentage = (percentage: string) => {
    return parseFloat(percentage.replace('%', '').replace(',', '.'));
  };

  console.log(
    'TOTO',
    stats.byCategories.answersByCategory[selectedCategoryIndex]
  );

  const globalPieData = {
    labels: ['Réponses Correctes', 'Réponses Incorrectes'],
    datasets: [
      {
        data: [
          parsePercentage(String(stats.global.correctPercentage)),
          parsePercentage(String(stats.global.incorrectPercentage)),
        ],
        backgroundColor: ['#8b5cf6', '#c4b5fd'],
      },
    ],
  };

  const categoryPieData = (
    category: Stats['categoryStats']['answersByCategory'][0]
  ) => ({
    labels: ['Réponses Correctes', 'Réponses Incorrectes'],
    datasets: [
      {
        data: [
          parsePercentage(category.correctPercentage),
          parsePercentage(category.incorrectPercentage),
        ],
        backgroundColor: ['#8b5cf6', '#c4b5fd'],
      },
    ],
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h1 className="text-4xl font-bold mb-4">Statistiques Utilisateur</h1>

      {stats.global && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold">Statistiques Globales</h2>
          <div className="max-w-sm mx-auto">
            <Pie data={globalPieData} />
          </div>
        </div>
      )}
      <h2 className="text-2xl font-semibold mb-4">
        Statistiques par Catégorie
      </h2>
      <select
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setSelectedCategoryIndex(Number(e.target.value))
        }
        value={selectedCategoryIndex}
      >
        <option value="" disabled>
          Sélectionnez une catégorie
        </option>
        {stats.byCategories.answersByCategory.map((category, index) => (
          <option key={index} value={index}>
            {category.categoryName}
          </option>
        ))}
      </select>

      <div className="mb-8">
        <h3 className="text-xl font-semibold">
          {
            stats.byCategories.answersByCategory[selectedCategoryIndex]
              .categoryName
          }
        </h3>
        <div className="max-w-sm mx-auto">
          <Pie
            data={categoryPieData(
              stats.byCategories.answersByCategory[selectedCategoryIndex]
            )}
          />
        </div>
        {/* Camembert pour la catégorie sélectionnée avec taille réduite */}
      </div>

      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Catégorie</th>
            <th className="border border-gray-300 p-2">Total Réponses</th>
            <th className="border border-gray-300 p-2">Réponses Correctes</th>
            <th className="border border-gray-300 p-2">Réponses Incorrectes</th>
            <th className="border border-gray-300 p-2">Pourcentage Correcte</th>
            <th className="border border-gray-300 p-2">
              Pourcentage Incorrecte
            </th>
          </tr>
        </thead>
        <tbody>
          {stats.byCategories.answersByCategory.map((category) => (
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
