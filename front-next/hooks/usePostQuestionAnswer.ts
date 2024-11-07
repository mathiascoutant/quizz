import questionsService from '@/services/questions.service';
import { useState } from 'react';
import { useSessionStore } from '../store/session.store';

export const usePostAnswer = () => {
  const { session, sessionLogIn } = useSessionStore();
  const [answerQuestionResponse, setAnswerQuestionResponse] = useState<{
    isCorrect: boolean | null;
    userAnswer: string;
  }>({
    isCorrect: null,
    userAnswer: '',
  });

  const postAnswer = async ({
    userAnswer,
    formId,
  }: {
    userAnswer?: string;
    formId?: number;
  }) => {
    if (!session) {
      return;
    }

    if (!userAnswer || !formId) {
      // time is up
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return;
    }

    const response = await questionsService.POST({
      formId,
      userId: session.user.id,
      userAnswer,
    });

    setAnswerQuestionResponse({
      isCorrect: response.isCorrect,
      userAnswer,
    });
  };

  return { postAnswer, answerQuestionResponse };
};
