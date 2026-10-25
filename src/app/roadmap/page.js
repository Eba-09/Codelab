import RoadmapView from '@/components/RoadmapView';
import { getAllLessons, getProblemList } from '@/lib/data';
import { roadmap } from '@/data/roadmap';

export const metadata = {
  title: 'Сургалтын зам',
  description: 'C++ хэлийг тэгээс олимпиад хүртэл сурах 4 шаттай замнал.',
};

export default function RoadmapPage() {
  const problemsByTopic = getProblemList().reduce((acc, p) => {
    p.topics.forEach((t) => (acc[t] = (acc[t] || 0) + 1));
    return acc;
  }, {});
  const lessons = getAllLessons().map(({ id, title }) => ({ id, title }));

  return <RoadmapView roadmap={roadmap} lessons={lessons} problemsByTopic={problemsByTopic} />;
}
