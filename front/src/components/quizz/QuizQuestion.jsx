import { useFetch } from '../../hooks/useFetch';

export const QuizzQuestion = () => {
  const { data, error, loading } = useFetch(
    'https://opentdb.com/api.php?amount=1'
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-24 z-50 relative">
      <Question question={data[0].question} />
    </div>
  );
};

const Question = ({ question }) => {
  return (
    <div className="bg-white p-4 w-full mt-8 max-w-[80%] mx-auto shadow-xl rounded-md text-center">
      <span className="text-black text-3xl">{question}</span>
    </div>
  );
};
