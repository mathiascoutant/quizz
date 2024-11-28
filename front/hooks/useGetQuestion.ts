import questionsService, {
  GetQuestionBody,
  Question,
} from '@/services/questions.service';
import { useCallback, useEffect, useState } from 'react';
import { useSessionStore } from '../store/session.store';

type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

export const useGetQuestion = ({
  difficultyId,
  categoryId,
  numberOfAnswers,
}: Nullable<Omit<GetQuestionBody, 'userId'>>) => {
  const [questionData, setQuestionData] = useState<Question | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isQuestionAvailable, setIsQuestionAvailable] = useState<boolean>(true);
  const userId = useSessionStore((s) => s.session?.user.id);

  const fetchQuestion = useCallback(async () => {
    if (!userId || !difficultyId || !categoryId || !numberOfAnswers) {
      return;
    }

    try {
      const question = await questionsService.GET({
        userId,
        difficultyId,
        categoryId,
        numberOfAnswers,
      });

      setQuestionData(question);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsQuestionAvailable(false);
      throw error;
    }
  }, [categoryId, difficultyId, userId, numberOfAnswers]);

  useEffect(() => {
    fetchQuestion();
  }, [fetchQuestion]);

  return {
    questionData,
    isLoading,
    fetchQuestion,
    isQuestionAvailable,
  };
};
