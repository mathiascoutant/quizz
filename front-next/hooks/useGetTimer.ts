import { useCallback, useEffect, useRef, useState } from 'react';

export const useGetTimer = () => {
  const [time, setTime] = useState<number>(10);
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
    setTime(10);
  };

  const freezeTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  return { time, startTimer, resetTimer, freezeTimer };
};
