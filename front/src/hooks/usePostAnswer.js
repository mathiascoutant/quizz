import { useState } from 'react';

export const usePostAnswer = () => {
  const [isGoodAnswer, setIsGoodAnswer] = useState(false);

  const postAnswer = async (option) => {
    if (!option) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('No option selected');
      return;
    }

    // POST OPTION TO BACKEND ICI JE FAKE QU'IL A LA BONNE REPONSE
    const response = await new Promise((resolve) =>
      setTimeout(resolve(true), 1000)
    );

    if (response) {
      setIsGoodAnswer(true);
    } else setIsGoodAnswer(false);
  };

  return { postAnswer, isGoodAnswer };
};
