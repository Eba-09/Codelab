import Hero from '@/components/home/Hero';
import { CallToAction, Features, LessonsPreview, PathPreview, ProblemsPreview } from '@/components/home/HomeSections';
import { getAllLessons, getProblemList, getStats } from '@/lib/data';
import { roadmap } from '@/data/roadmap';

export default function HomePage() {
  const stats = getStats();
  const lessons = getAllLessons().slice(0, 3);
  const all = getProblemList();
  // Түвшин бүрээс жишээ бодлогууд
  const featured = [
    ...all.filter((p) => p.level === 'easy').slice(1, 3),
    ...all.filter((p) => p.level === 'medium').slice(0, 2),
    ...all.filter((p) => p.level === 'hard').slice(0, 2),
  ];
  const topics = ['loop', 'array', 'string', 'sort', 'binary-search', 'greedy', 'dp', 'graph'];

  return (
    <>
      <Hero stats={stats} />
      <Features stats={stats} />
      <PathPreview roadmap={roadmap} />
      <LessonsPreview lessons={lessons} />
      <ProblemsPreview problems={featured} topics={topics} />
      <CallToAction />
    </>
  );
}
