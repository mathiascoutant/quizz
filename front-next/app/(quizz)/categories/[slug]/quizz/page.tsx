import { QuizzContainer } from '@/containers/quizz/QuizzContainer';

export default function QuizzPage({ params }: { params: { slug: string } }) {
  return <QuizzContainer category={params.slug} />;
}
