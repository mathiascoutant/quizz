import { Category } from '@/containers/home/Categories';
import { constructUrl } from './api.service';
import { Difficulty } from './difficulties.service';

export interface Question {
  id: number;
  languageId: number;
  categoryId: number;
  theme: string;
  difficultyId: number;
  content: string;
  possibleAnswers: string[];
  correctAnswer: string;
  numberOfAnswers: number;
  difficulty: Pick<Difficulty, 'id' | 'difficulty'> & { coinValue: number };
  category: Omit<Category, 'icon'>;
  language: {
    id: number;
    name: string;
    code: string;
  };
}

export interface GetQuestionBody {
  userId: string;
  difficultyId: string;
  categoryId: string;
  numberOfAnswers: string;
}

interface PostResponse {
  message: string;
  newUserAnswer: {
    newCoinBalance: number;
    userAnswerData: {
      coinValue: number;
      isCorrect: boolean;
      formId: number;
      id: number;
      userAnswer: string;
      userId: string;
    };
  };
  badgeCreated: {
    id: number;
    name: string;
    description: string;
    urlImage: string;
    conditionValue: number;
  } | null;
}

export interface PostQuestionAnswerBody {
  formId: number;
  userId: string;
  userAnswer: string | null;
}

const GET = async ({
  userId,
  difficultyId,
  categoryId,
  numberOfAnswers,
}: GetQuestionBody) => {
  const response = await fetch(
    constructUrl(
      `/quizz/${userId}/${difficultyId}/${categoryId}/${numberOfAnswers}`
    )
  );

  if (!response.ok) {
    throw new Error('Error fetching questions');
  }

  return (await response.json()) as Question;
};

const POST = async ({
  formId,
  userId,
  userAnswer,
}: PostQuestionAnswerBody): Promise<PostResponse> => {
  const response = await fetch(constructUrl(`/useranswers`), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      formId,
      userId,
      userAnswer,
    }),
  });

  if (!response.ok) {
    throw new Error('Error posting answer');
  }

  const data = await response.json();

  console.log('LAAAA', data);

  return {
    newUserAnswer: data.newUserAnswer,
    badgeCreated: data.badgeCreated,
    message: data.message,
  };
};

const questionsService = {
  GET,
  POST,
};

export default questionsService;
