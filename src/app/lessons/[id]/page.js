import { notFound } from 'next/navigation';
import LessonView from '@/components/lessons/LessonView';
import { getAllLessons, getLesson, getProblemsForLesson } from '@/lib/data';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllLessons().map((l) => ({ id: String(l.id) }));
}

export function generateMetadata({ params }) {
  const data = getLesson(params.id);
  if (!data) return {};
  return { title: data.lesson.title, description: data.lesson.summary };
}

export default function LessonPage({ params }) {
  const data = getLesson(params.id);
  if (!data) notFound();

  const allLessons = getAllLessons().map(({ id, title, duration }) => ({ id, title, duration }));

  return (
    <LessonView
      lesson={data.lesson}
      prev={data.prev ? { id: data.prev.id, title: data.prev.title } : null}
      next={data.next ? { id: data.next.id, title: data.next.title } : null}
      allLessons={allLessons}
      practice={getProblemsForLesson(data.lesson.id)}
    />
  );
}
