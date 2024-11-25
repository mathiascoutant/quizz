import { Category } from '@/containers/home/Categories';
import { useGetDifficulties } from '@/hooks/useGetDifficulties';
import { Difficulty } from '@/services/difficulties.service';
import { getCategoryIcon } from '@/utils/getCategoryIcon';
import { cn } from '@/utils/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  title: string;
  children: React.ReactNode;
  path: string;
  setSelectedCategory: (category: Category | null) => void;
  selectedCategory: Category | null;
};

export const Modal = ({
  title,
  children,
  path,
  setSelectedCategory,
  selectedCategory,
}: Props) => {
  const { data: difficulties, isLoading } = useGetDifficulties();
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  useEffect(() => {
    if (!difficulties || isLoading) return;

    const handleDetectEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCategory(null);
      }
    };

    window.addEventListener('keydown', handleDetectEscapeKey);

    return () => {
      window.removeEventListener('keydown', handleDetectEscapeKey);
    };
  }, [difficulties, isLoading, setSelectedCategory]);

  if (!difficulties || isLoading) return null;

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[60] backdrop-blur-sm flex items-center justify-center"
      animate={{
        opacity: [0, 1],
      }}
    >
      <AnimatePresence>
        <ModalContent
          title={title}
          path={path}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          difficulties={difficulties}
          selectedDifficulty={selectedDifficulty}
          setSelectedDifficulty={setSelectedDifficulty}
        >
          {children}
        </ModalContent>
      </AnimatePresence>
    </motion.div>,
    document.body
  );
};

type ModalContentProps = {
  title: string;
  children: React.ReactNode;
  path: string;
  selectedCategory: Category | null;
  setSelectedCategory: (category: Category | null) => void;
  difficulties: Difficulty[];
  selectedDifficulty: string;
  setSelectedDifficulty: (difficulty: string) => void;
};

const ModalContent = ({
  title,
  children,
  path,
  selectedCategory,
  setSelectedCategory,
  difficulties,
  selectedDifficulty,
  setSelectedDifficulty,
}: ModalContentProps) => {
  const [answerChoiceCount, setAnswerChoiceCount] = useState('');
  const [coinsWon, setCoinsWon] = useState(0);
  const [coinsLost, setCoinsLost] = useState(0);

  useEffect(() => {
    const calculateCoins = () => {
      const diff = difficulties.find(
        (d) => String(d.id) === selectedDifficulty
      );

      if (!diff) return;

      let newCoinsWon;
      let newCoinsLost;

      if (diff.difficulty === 'Débutant') {
        newCoinsWon = answerChoiceCount === '2' ? 10 : 10;
        newCoinsLost = 10;
      } else if (diff.difficulty === 'Confirmé') {
        newCoinsWon = answerChoiceCount === '2' ? 20 : 20;
        newCoinsLost = 20;
      } else if (diff.difficulty === 'Expert') {
        newCoinsWon = answerChoiceCount === '2' ? 30 : 30;
        newCoinsLost = 30;
      }

      if (newCoinsWon && newCoinsWon > 0) {
        setCoinsWon(newCoinsWon);
      }
      if (newCoinsLost && newCoinsLost > 0) {
        setCoinsLost(newCoinsLost);
      }
    };

    if (selectedDifficulty) {
      calculateCoins();
    }
  }, [selectedDifficulty, answerChoiceCount, difficulties]);

  return (
    <motion.div
      key={title}
      variants={{
        initial: { opacity: 0, scale: 0.7 },
        animate: { opacity: 1, scale: 1 },
      }}
      animate="animate"
      initial="initial"
      className="bg-white rounded-lg shadow-xl w-3/4 max-w-2xl overflow-hidden flex relative"
    >
      {/* Partie gauche avec l'icône */}
      <div
        className={`w-1/3 ${
          getCategoryIcon(title).color
        } p-6 flex items-center justify-center`}
      >
        {getCategoryIcon(title).icon}
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
              {difficulty.difficulty}
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
          Gagnez {coinsWon}{' '}
          <img src={'/assets/coin.png'} alt="coin" className="inline w-4 h-4" />{' '}
          par bonne réponse et perdez {coinsLost}{' '}
          <img src={'/assets/coin.png'} alt="coin" className="inline w-4 h-4" />{' '}
          pour chaque erreur !
        </p>

        <button
          disabled={!selectedDifficulty || !answerChoiceCount}
          className={cn('w-full', {
            'pointer-events-none opacity-50':
              !selectedDifficulty || !answerChoiceCount,
          })}
        >
          <a
            className="bg-purple-600 text-white py-2 px-4 rounded-full block w-full text-center hover:bg-purple-700 transition duration-200 font-semibold"
            href={`${path}?categoryId=${selectedCategory?.id}&difficultyId=${selectedDifficulty}&answerChoiceCount=${answerChoiceCount}`}
          >
            Lancer le quizz !
          </a>
        </button>

        <button
          onClick={() => setSelectedCategory(null)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 bg-white rounded-full p-1 shadow-md transition duration-200 hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};
