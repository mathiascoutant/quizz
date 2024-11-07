import { useCallback, useEffect, useState } from "react";

export const useGetTimer = () => {
  const [time, setTime] = useState(20);

  const startTimer = useCallback(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(interval);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    startTimer();
  }, [startTimer]);

  const resetTimer = () => {
    setTime(20);
  };

  return { time, startTimer, resetTimer, setTime };
};
