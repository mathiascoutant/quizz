import { useCallback, useEffect, useState } from 'react';
import api from '../services/api.service';
import { useSessionStore } from '../store/session.store';

export const useFetchQuestion = ({
  difficultyId,
  categoryId,
  numberOfAnswers,
}) => {
  const [questionData, setQuestionData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const session = useSessionStore((s) => s.session);

  const fetchQuestion = useCallback(async () => {
    const response = await api.get(
      `/quizz/${session.user.id}/${difficultyId}/${categoryId}/${numberOfAnswers}`
    );
    setQuestionData(response.data);
    setIsLoading(false);
  }, [categoryId, difficultyId, session.user, numberOfAnswers]);

  useEffect(() => {
    fetchQuestion();
  }, [fetchQuestion]);

  return {
    questionData,
    isLoading,
    fetchQuestion,
  };
};
