import { QuizzContainer } from '@/containers/quizz/QuizzContainer';

export default function QuizzPage({ params }: { params: { slug: string } }) {
  const decodedCategory = decodeURIComponent(params.slug);
  return <QuizzContainer category={decodedCategory} />;
}
