import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGetTimer } from '../../hooks/useGetTimer';
import { usePostAnswer } from '../../hooks/usePostAnswer';
import { useSessionStore } from '../../store/session.store';

export const QuizzLayout = ({ children }) => {
  return (
    <section className="flex flex-col container mx-auto justify-between h-screen">
      {children}
    </section>
  );
};

const Interactive = ({ options, fetchQuestion, isEntracte, setIsEntracte }) => {
  const { time, resetTimer, setTime, startTimer } = useGetTimer();
  const { postAnswer, isGoodAnswer } = usePostAnswer();

  const handleSelectResponse = async (option) => {
    await postAnswer(option);
    setIsEntracte(true);
    setTime(0);
  };

  const handleGenerateQuestion = async () => {
    setIsEntracte(false);
    await fetchQuestion();
    resetTimer();
    startTimer();
  };

  useEffect(() => {
    if (time === 0) {
      postAnswer(null);
      setIsEntracte(true);
    }
  }, [time]);

  return (
    <div className="flex flex-col gap-12 z-50">
      <div className="grid grid-cols-2 place-items-center gap-12">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelectResponse(option)}
            disabled={isEntracte}
            className="flex flex-col gap-4 ring select-none ring-indigo-800 bg-indigo-500 py-6 px-12 cursor-pointer transition ease-in-out duration-300 hover:scale-105 active:translate-y-1 rounded-lg"
          >
            <span className="text-white text-2xl">{option}</span>
          </button>
        ))}
      </div>

      <span className="text-5xl text-white font-bold mx-auto">{time}'S</span>

      {isEntracte && (
        <div className="flex items-center w-full justify-center gap-12">
          <Link
            to={'/'}
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

const Question = ({ question }) => {
  return (
    <div className="flex flex-col gap-24 z-50 relative">
      <div className="bg-white p-4 w-full mt-8 shadow-xl rounded-md text-center">
        <span className="text-black text-3xl">{question}</span>
      </div>
    </div>
  );
};

const BottomBar = () => {
  const session = useSessionStore((state) => state.session);

  return (
    <div className=" bottom-0 left-0 z-50 flex p-4 justify-between w-full">
      <div className="flex items-center gap-3">
        <div className="size-5 bg-purple-500"></div>
        <span>{session.user?.username ?? 'Anonymous'}</span>
      </div>

      <div className="flex flex-col gap-1">
        <span className="flex items-center">
          +1 <img src="/assets/icons/coin.png" alt="" className="size-6" /> par
          bonne réponse
        </span>

        <span className="flex items-center">
          -1 <img src="/assets/icons/coin.png" alt="" className="size-6" /> par
          mauvaise réponse
        </span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <img src="/assets/icons/coin.png" alt="" className="size-12" />
        <motion.span
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0, 1, 1],
            transition: { duration: 0.3 },
          }}
        >
          {session.user?.coins ?? 0}
        </motion.span>
      </div>
    </div>
  );
};

QuizzLayout.Question = Question;
QuizzLayout.BottomBar = BottomBar;
QuizzLayout.Interactive = Interactive;
