import { useCallback, useEffect, useState } from 'react';

export const useFetchQuestion = (category) => {
  const [questionData, setQuestionData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchQuestion = useCallback(async () => {
    const questionsFixture = [
      {
        question: 'Question',
        answer: 'Option 1',
        options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
        category: category,
      },
      {
        question: 'Question 2',
        answer: 'Option A',
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        category: category,
      },
    ];

    const random = Math.floor(Math.random() * questionsFixture.length);
    setQuestionData(questionsFixture[random]);
    setIsLoading(false);
  }, [category]);

  useEffect(() => {
    fetchQuestion();
  }, [fetchQuestion]);

  return {
    questionData,
    isLoading,
    fetchQuestion,
  };
};
