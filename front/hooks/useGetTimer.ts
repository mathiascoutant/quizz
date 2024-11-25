import { useCallback, useEffect, useRef, useState } from 'react';

const TIMER_RESET_VALUE = 30;

export const useGetTimer = () => {
  const [time, setTime] = useState<number>(TIMER_RESET_VALUE);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return 0;
        }
      });
    }, 1000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startTimer]);

  const resetTimer = () => {
    setTime(TIMER_RESET_VALUE);
  };

  const freezeTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  return { time, startTimer, resetTimer, freezeTimer };
};
