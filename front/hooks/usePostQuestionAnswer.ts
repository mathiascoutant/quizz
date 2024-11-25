import questionsService from '@/services/questions.service';
import { useState } from 'react';
import { useSessionStore } from '../store/session.store';

export const usePostAnswer = () => {
  const { session, updateUser } = useSessionStore();
  const [answerQuestionResponse, setAnswerQuestionResponse] = useState<{
    isCorrect: boolean | null;
    userAnswer: string | null;
  }>({
    isCorrect: null,
    userAnswer: null,
  });

  const postAnswer = async ({
    userAnswer,
    formId,
  }: {
    userAnswer: string | null;
    formId?: number;
  }) => {
    if (!session) {
      return;
    }

    if (!formId) {
      // time is up
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return;
    }

    const response = await questionsService.POST({
      formId,
      userId: session.user.id,
      userAnswer,
    });

    updateUser({
      ...session.user,
      coins: response.newCoinBalance,
    });

    setAnswerQuestionResponse({
      isCorrect: response.isCorrect,
      userAnswer,
    });
  };

  return { postAnswer, answerQuestionResponse };
};
