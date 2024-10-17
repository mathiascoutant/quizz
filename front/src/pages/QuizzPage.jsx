import { useSearchParams } from 'react-router-dom';
import { QuizzQuestion } from '../components/quizz/QuizQuestion';
import { QuizzBottomBar } from '../components/quizz/QuizzBottomBar';
import { renderQuizzBackground } from '../utils/renderQuizzBackground';

function QuizzPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category');

  return (
    <div
      className="max-h-screen w-full text-white relative min-h-screen bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: `url(${renderQuizzBackground(category)})`,
      }}
    >
      <div className="inset-0 bg-black/40 w-full h-full absolute"></div>
      <QuizzQuestion />
      <QuizzBottomBar />
    </div>
  );
}

export default QuizzPage;
