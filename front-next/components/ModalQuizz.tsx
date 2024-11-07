'use client';

import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Button, ButtonLink } from './common/Button';

type Props = {
  title: string;
  description: string;
  coinValue: number;
  isCorrect: boolean | null;
  handleGenerateQuestion: () => void;
};

export const ModalQuizz = ({
  handleGenerateQuestion,
  title,
  coinValue,
  isCorrect,
  description,
}: Props) => {
  useEffect(() => {
    if (isCorrect) {
      confetti({
        particleCount: isCorrect ? 100 : 0,
        spread: 70,
        origin: { y: 0.6 },
        disableForReducedMotion: true,
      });
    }
  }, [isCorrect]);
  return createPortal(
    <>
      <motion.div
        className="fixed inset-0 z-[60] backdrop-blur-sm flex items-center justify-center"
        animate={{
          opacity: [0, 1],
        }}
      >
        <ModalContent
          isCorrect={isCorrect}
          title={title}
          coinValue={coinValue}
          description={description}
          handleGenerateQuestion={handleGenerateQuestion}
        />
      </motion.div>
    </>,

    document.body
  );
};

const ModalContent = ({
  title,
  description,
  handleGenerateQuestion,
  isCorrect,
  coinValue,
}: Props) => {
  return (
    <motion.div
      animate={{
        opacity: [0, 1],
        scale: [0.7, 1],
      }}
      className="bg-white rounded-lg  flex-col items-center shadow-xl w-3/4 max-w-2xl overflow-hidden flex relative"
    >
      {/* Partie droite avec les informations et le bouton */}
      <div className="p-6 space-y-4 mx-auto">
        <h2 className="text-3xl text-center font-bold">{title}</h2>

        <p
          className="text-center"
          dangerouslySetInnerHTML={{ __html: description }}
        />

        <p className="flex justify-center items-center gap-1 text-gray-800">
          {isCorrect
            ? 'Tu as gagné' + ' ' + coinValue
            : 'Tu as perdu' + ' ' + coinValue}{' '}
          <img src="/assets/coin.png" alt="coin" className="size-4" />
        </p>

        <div className="flex items-center justify-center gap-4">
          <ButtonLink href="/" variant={'outline'}>
            Arrêter la partie
          </ButtonLink>

          <Button onClick={handleGenerateQuestion}>
            Relancer une question !
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
