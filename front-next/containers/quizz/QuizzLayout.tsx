import { ModalQuizz } from '@/components/ModalQuizz';
import { NumberTicker } from '@/components/NumberTicker';
import { useGetTimer } from '@/hooks/useGetTimer';
import { usePostAnswer } from '@/hooks/usePostQuestionAnswer';
import { Question as IQuestion } from '@/services/questions.service';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
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
  fetchQuestion,
  isEntracte,
  setIsEntracte,
}: {
  question: IQuestion;
  fetchQuestion: () => void;
  isEntracte: boolean;
  setIsEntracte: (isEntracte: boolean) => void;
}) => {
  const { time, resetTimer, freezeTimer, startTimer } = useGetTimer();
  const { postAnswer, answerQuestionResponse } = usePostAnswer();
  const { session } = useSessionStore();

  useEffect(() => {
    if (time === 0) {
      handleTimeUp();
    }
  }, [time]);

  if (!session) return null;

  const handleTimeUp = async () => {
    postAnswer({ formId: question.id, userAnswer: '' });
    setIsEntracte(true);
  };

  const handleSelectResponse = async (option: string) => {
    await postAnswer({ formId: question.id, userAnswer: option });
    setIsEntracte(true);
    freezeTimer();
  };

  const handleGenerateQuestion = async () => {
    setIsEntracte(false);
    fetchQuestion();
    resetTimer();
    startTimer();
  };

  return (
    <div className="flex flex-col gap-12 z-50">
      <div className="grid grid-cols-[repeat(3_min-content)] grid-rows-3 place-items-center gap-4 w-full">
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
                key={index}
                onClick={() => handleSelectResponse(option)}
                disabled={isEntracte}
                className={cn(
                  'flex flex-col gap-4 min-w-[450px] items-center ring select-none py-6 px-12 cursor-pointer transition ease-in-out duration-300 active:translate-y-1 rounded-lg',
                  {
                    'opacity-20':
                      isEntracte && question.correctAnswer !== option,
                    'bg-red-600 ring-red-700 col-start-1 row-start-1':
                      index === 0,
                    'bg-blue-600 ring-blue-700 col-start-3 row-start-1':
                      index === 1,
                    'bg-yellow-600 ring-yellow-700 col-start-1 row-start-3':
                      index === 2,
                    'bg-green-600 ring-green-700 col-start-3 row-start-3':
                      index === 3,
                    'row-start-2':
                      (question.possibleAnswers.length === 2 && index === 0) ||
                      (question.possibleAnswers.length === 2 && index === 1),
                  }
                )}
              >
                <span className="text-white text-2xl">{option}</span>
              </motion.button>
            </AnimatePresence>
          ))}

        <AnimatePresence mode="wait">
          <div
            className={cn(
              'text-5xl col-start-2 row-start-2 p-2 size-28 text-white rounded-full flex items-center justify-center bg-indigo-500 font-bold mx-auto',
              {
                'animate-scale-up': time > 0,
              }
            )}
          >
            <motion.span
              key={time}
              variants={{
                initial: { opacity: 0, scale: 0.5 },
                animate: { opacity: 1, scale: 1 },
                exit: { opacity: 0, scale: 0.5 },
              }}
              initial="initial"
              animate="animate"
            >
              {time}
            </motion.span>
          </div>
        </AnimatePresence>
      </div>

      {isEntracte && (
        <ModalQuizz
          isCorrect={answerQuestionResponse.isCorrect}
          coinValue={question.difficulty.coinValue}
          title={
            answerQuestionResponse.isCorrect
              ? 'Bonne réponse !'
              : 'Mauvaise réponse !'
          }
          description={
            answerQuestionResponse.isCorrect
              ? `<strong>${answerQuestionResponse.userAnswer}</strong> était la bonne réponse !`
              : `La bonne réponse était <strong>${question.correctAnswer}</strong>`
          }
          handleGenerateQuestion={handleGenerateQuestion}
        />
      )}
    </div>
  );
};

const Question = ({ question }: { question: string }) => {
  return (
    <div className="flex flex-col max-w-[80%] mx-auto gap-24 mt-8 z-50 relative">
      <span className="text-black font-black text-center uppercase text-3xl">
        {question}
      </span>
    </div>
  );
};

const BottomBar = ({ gainValue }: { gainValue: number }) => {
  const session = useSessionStore((state) => state.session);

  if (!session) return null;

  return (
    <div className=" bottom-0 left-0 z-50 flex p-4 justify-between w-full">
      <div className="flex items-center gap-3">
        <Image width={24} height={24} alt="" src="/assets/userBlack.png" />
        <span className="font-black">{session.user.pseudo}</span>
      </div>

      <div className="flex flex-col gap-1">
        <span className="flex items-center">
          +{gainValue} <img src="/assets/coin.png" alt="" className="size-6" />{' '}
          par bonne réponse
        </span>

        <span className="flex items-center">
          -{gainValue} <img src="/assets/coin.png" alt="" className="size-6" />{' '}
          par mauvaise réponse
        </span>
      </div>

      <div className="flex flex-col items-center gap-2">
        <img src="/assets/coin.png" alt="" className="size-12" />
        <NumberTicker value={session.user.coins ?? 0} />
      </div>
    </div>
  );
};

QuizzLayout.Question = Question;
QuizzLayout.BottomBar = BottomBar;
QuizzLayout.Interactive = Interactive;
