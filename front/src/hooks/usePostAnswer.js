import { useState } from 'react';
import { useSessionStore } from '../store/session.store';

export const usePostAnswer = ({ formId, userId, userAnswer }) => {
  const [goodAnswer, setGoodAnswer] = useState(null);
  const session = useSessionStore((state) => state.session);

  const postAnswer = async (option) => {
    if (!option) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('No option selected');
      return;
    }

    // const response = await api.post('/useranswers/create', {
    //   formId,
    //   userId: session.user.id,
    //   userAnswer,
    // });

    const response = await new Promise((resolve) =>
      setTimeout(resolve(true), 1000)
    );

    if (response) {
      setGoodAnswer({
        isGoodAnswer: true,
        option,
      });
    } else
      setGoodAnswer({
        isGoodAnswer: false,
        option,
      });
  };

  return { postAnswer, goodAnswer };
};
