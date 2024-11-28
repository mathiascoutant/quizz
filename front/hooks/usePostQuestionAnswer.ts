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
  }): Promise<{
    badgeCreated: null | {
      name: string;
      description: string;
      urlImage: string;
      conditionValue: number;
    };
  }> => {
    if (!session || !formId) {
      throw new Error('No session or formId');
    }

    const response = await questionsService.POST({
      formId,
      userId: session.user.id,
      userAnswer,
    });

    updateUser({
      ...session.user,
      coins: response.newUserAnswer.newCoinBalance,
    });

    setAnswerQuestionResponse({
      isCorrect: response.newUserAnswer.userAnswerData.isCorrect,
      userAnswer,
    });

    console.log('RESPONSE ICI FROM HOOK', response.badgeCreated);

    if (!response.badgeCreated) {
      return { badgeCreated: null };
    }

    return { badgeCreated: response.badgeCreated };
  };

  return { postAnswer, answerQuestionResponse };
};
