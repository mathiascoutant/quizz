'use client';

import { useState } from 'react';
import ReactHowler from 'react-howler';

export const HowlerProvider = ({ children }: { children: React.ReactNode }) => {
  const [isQuestionDone, setIsQuestionDone] = useState(false);
  return (
    <>
      <ReactHowler
        src="/assets/music/quizz.mp3"
        playing={!isQuestionDone}
        loop={true}
        format={'mp3'}
      />

      {children}
    </>
  );
};
