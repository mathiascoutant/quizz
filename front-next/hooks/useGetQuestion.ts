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
  const session = useSessionStore((s) => s.session);

  const fetchQuestion = useCallback(async () => {
    if (!session || !difficultyId || !categoryId || !numberOfAnswers) {
      return;
    }

    const question = await questionsService.GET({
      userId: session.user.id,
      difficultyId,
      categoryId,
      numberOfAnswers,
    });

    setQuestionData(question);
    setIsLoading(false);
  }, [categoryId, difficultyId, session, numberOfAnswers]);

  useEffect(() => {
    fetchQuestion();
  }, [fetchQuestion]);

  return {
    questionData,
    isLoading,
    fetchQuestion,
  };
};
