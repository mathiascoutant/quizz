import { motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';
import { getCategoryIcon } from '../../utils/categoryIcons';
import coin from '../../assets/coin.png';

export const Modal = ({ title, children, path, setSelectedCategory }) => {
  const [difficulties, setDifficulties] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  const handleDetectEscapeKey = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        setSelectedCategory(null);
      }
    },
    [setSelectedCategory]
  );

  useEffect(() => {
    const eventKeyDown = window.addEventListener(
      'keydown',
      handleDetectEscapeKey
    );
    return () => {
      window.removeEventListener('keydown', eventKeyDown);
    };
  }, [handleDetectEscapeKey]);

  useEffect(() => {
    const fetchDifficulties = async () => {
      try {
        const response = await axios.get('http://localhost:3002/list/levels');
        setDifficulties(response.data);
      } catch (error) {
        console.error('Error fetching difficulties:', error);
      }
    };
    fetchDifficulties();
  }, []);

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[60] backdrop-blur-sm flex items-center justify-center"
      animate={{
        opacity: [0, 1],
      }}
    >
      <ModalContent
        title={title}
        children={children}
        path={path}
        setSelectedCategory={setSelectedCategory}
        difficulties={difficulties}
        selectedDifficulty={selectedDifficulty}
        setSelectedDifficulty={setSelectedDifficulty}
      />
    </motion.div>,
    document.body
  );
};

const ModalContent = ({ title, children, path, setSelectedCategory, difficulties, selectedDifficulty, setSelectedDifficulty }) => {
  const [answerChoiceCount, setAnswerChoiceCount] = useState('');
  const [coinsWon, setCoinsWon] = useState(0);
  const [coinsLost, setCoinsLost] = useState(0);

  useEffect(() => {
    const calculateCoins = () => {
      const difficulty = difficulties.find(d => d.id === selectedDifficulty);
      const difficultyLevel = difficulty ? difficulty.Difficulty : '';
      
      let newCoinsWon = 3;
      let newCoinsLost = 2;

      if (difficultyLevel === 'débutant') {
        newCoinsWon = answerChoiceCount === '2' ? 2 : 3;
        newCoinsLost = 1;
      } else if (difficultyLevel === 'confirmé') {
        newCoinsWon = answerChoiceCount === '2' ? 3 : 4;
        newCoinsLost = 2;
      } else if (difficultyLevel === 'expert') {
        newCoinsWon = answerChoiceCount === '2' ? 4 : 5;
        newCoinsLost = 3;
      }

      setCoinsWon(newCoinsWon);
      setCoinsLost(newCoinsLost);
    };

    calculateCoins();
  }, [selectedDifficulty, answerChoiceCount, difficulties]);

  return (
    <motion.div
      animate={{
        opacity: [0, 1],
        scale: [0.7, 1],
      }}
      className="bg-white rounded-lg shadow-xl w-3/4 max-w-2xl overflow-hidden flex relative"
    >
      {/* Partie gauche avec l'icône */}
      <div className="w-1/3 bg-gray-100 p-6 flex items-center justify-center">
        {getCategoryIcon(title)}
      </div>
      
      {/* Partie droite avec les informations et le bouton */}
      <div className="w-2/3 p-6 space-y-4">
        <h2 className="text-3xl font-bold">{title}</h2>
        <div className="text-gray-600">{children}</div>
        
        <select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Sélectionnez une difficulté</option>
          {difficulties.map((difficulty) => (
            <option key={difficulty.id} value={difficulty.id}>
              {difficulty.Difficulty}
            </option>
          ))}
        </select>
        
        <select
          value={answerChoiceCount}
          onChange={(e) => setAnswerChoiceCount(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Nombre de choix de réponses</option>
          <option value="2">2 choix</option>
          <option value="4">4 choix</option>
        </select>
        
        <p className="text-xs text-gray-500 mt-1">
          Gagnez {coinsWon} <img src={coin} alt="coin" className="inline w-4 h-4" /> par bonne réponse et perdez {coinsLost} <img src={coin} alt="coin" className="inline w-4 h-4" /> pour chaque erreur !
        </p>
        
        <a
          className="bg-purple-600 text-white py-2 px-4 rounded-full block w-full text-center hover:bg-purple-700 transition duration-200 font-semibold"
          href={`${path}?difficulty=${selectedDifficulty}&answerChoiceCount=${answerChoiceCount}`}
        >
          Lancer le quizz !
        </a>

        <button
          onClick={() => setSelectedCategory(null)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 bg-white rounded-full p-1 shadow-md transition duration-200 hover:bg-gray-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};
