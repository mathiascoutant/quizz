import { useGetTimer } from '@/hooks/useGetTimer';
import { usePostAnswer } from '@/hooks/usePostQuestionAnswer';
import { Question as IQuestion } from '@/services/questions.service';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect } from 'react';
import { useSessionStore } from '../../store/session.store';
import { cn } from '../../utils/utils';

export const QuizzLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex flex-col container mx-auto justify-between h-screen">
      {children}
    </section>
  );
};

const Interactive = ({
  question,
  correctAnswer,
  fetchQuestion,
  isEntracte,
  setIsEntracte,
}: {
  question: IQuestion;
  correctAnswer: string;
  fetchQuestion: () => void;
  isEntracte: boolean;
  setIsEntracte: (isEntracte: boolean) => void;
}) => {
  const { time, resetTimer, setTime, startTimer } = useGetTimer();
  const { postAnswer, answerQuestionResponse } = usePostAnswer();

  const handleSelectResponse = async (option: string) => {
    await postAnswer({ formId: question.id, userAnswer: option });
    setIsEntracte(true);
    setTime(0);
  };

  const handleGenerateQuestion = async () => {
    setIsEntracte(false);
    fetchQuestion();
    resetTimer();
    startTimer();
  };

  useEffect(() => {
    if (time === 0) {
      postAnswer({ formId: undefined, userAnswer: undefined });
      setIsEntracte(true);
    }
  }, [time]);

  return (
    <div className="flex flex-col gap-12 z-50">
      <div className="grid grid-cols-2 place-items-center gap-12">
        {/* random possible answers sort by alphabet */}
        {question.possibleAnswers
          .sort((a, b) => a.localeCompare(b))
          .map((option, index) => (
            <AnimatePresence mode="wait" key={`${question.id}-${option}`}>
              <motion.button
                layout
                variants={{
                  initial: {
                    scale: 0,
                    transition: { delay: 0.05 * index },
                  },
                  animate: {
                    scale: 1,
                    transition: { delay: 0.05 * index },
                  },
                  exit: {
                    scale: 0,
                    transition: { delay: 0.05 * index },
                  },
                }}
                animate="animate"
                exit="exit"
                initial="initial"
                whileHover="whileHover"
                key={index}
                onClick={() => handleSelectResponse(option)}
                disabled={isEntracte}
                className={cn(
                  'flex flex-col gap-4 min-w-[450px] items-center ring select-none py-6 px-12 cursor-pointer transition ease-in-out duration-300 active:translate-y-1 rounded-lg',
                  {
                    'opacity-20': isEntracte && correctAnswer !== option,
                    'bg-red-600 ring-red-700': index === 0,
                    'bg-blue-600 ring-blue-700': index === 1,
                    'bg-yellow-600 ring-yellow-700': index === 2,
                    'bg-green-600 ring-green-700': index === 3,
                  }
                )}
              >
                <span className="text-white text-2xl">{option}</span>
              </motion.button>
            </AnimatePresence>
          ))}
      </div>

      <span className="text-5xl text-white font-bold mx-auto">
        {time}&apos;S
      </span>

      {isEntracte && (
        <div className="flex items-center w-full justify-center gap-12">
          <Link
            href={'/'}
            className="flex flex-col gap-4 ring select-none ring-indigo-800 bg-indigo-500 py-2 px-6 cursor-pointer transition ease-in-out duration-300 hover:scale-105 active:translate-y-1 rounded-lg"
          >
            <span className="text-white text-2xl">Quitter</span>
          </Link>
          <button
            onClick={() => handleGenerateQuestion()}
            className="flex flex-col gap-4 ring select-none ring-indigo-800 bg-indigo-500 py-2 px-6 cursor-pointer transition ease-in-out duration-300 hover:scale-105 active:translate-y-1 rounded-lg"
          >
            <span className="text-white text-2xl">Continuer</span>
          </button>
        </div>
      )}
    </div>
  );
};

const Question = ({ question }: { question: string }) => {
  return (
    <div className="flex flex-col gap-24 mt-8 z-50 relative">
      <span className="text-black font-black text-center uppercase text-3xl">
        {question}
      </span>
    </div>
  );
};

const BottomBar = () => {
  const session = useSessionStore((state) => state.session);

  if (!session) return null;

  return (
    <div className=" bottom-0 left-0 z-50 flex p-4 justify-between w-full">
      <div className="flex items-center gap-3">
        <div className="size-5 bg-purple-500"></div>
        <span>{session.user.pseudo ?? 'Anonymous'}</span>
      </div>

      <div className="flex flex-col gap-1">
        <span className="flex items-center">
          +1 <img src="/assets/coin.png" alt="" className="size-6" /> par bonne
          réponse
        </span>

        <span className="flex items-center">
          -1 <img src="/assets/coin.png" alt="" className="size-6" /> par
          mauvaise réponse
        </span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <img src="/assets/coin.png" alt="" className="size-12" />
        <motion.span
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0, 1, 1],
            transition: { duration: 0.3 },
          }}
        >
          {session.user.coins ?? 0}
        </motion.span>
      </div>
    </div>
  );
};

QuizzLayout.Question = Question;
QuizzLayout.BottomBar = BottomBar;
QuizzLayout.Interactive = Interactive;
