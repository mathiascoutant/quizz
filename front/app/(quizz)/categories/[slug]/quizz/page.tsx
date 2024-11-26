import { QuizzContainer } from '@/containers/quizz/QuizzContainer';
import { HowlerProvider } from '@/providers/HowlerProvider';

export default function QuizzPage({ params }: { params: { slug: string } }) {
  const decodedCategory = decodeURIComponent(params.slug);

  return (
    <HowlerProvider>
      <QuizzContainer category={decodedCategory} />
    </HowlerProvider>
  );
}
