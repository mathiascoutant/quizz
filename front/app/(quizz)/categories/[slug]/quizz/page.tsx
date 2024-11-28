import { QuizzContainer } from '@/containers/quizz/QuizzContainer';
import { HowlerProvider } from '@/providers/HowlerProvider';

type Params = Promise<{ slug: string }>;

export default async function QuizzPage({ params }: { params: Params }) {
  const { slug } = await params;
  const decodedCategory = decodeURIComponent(slug);
  console.log(decodedCategory);
  return (
    <HowlerProvider>
      <QuizzContainer category={decodedCategory} />
    </HowlerProvider>
  );
}
