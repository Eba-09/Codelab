import { notFound } from 'next/navigation';
import ProblemView from '@/components/problems/ProblemView';
import { getAllProblems, getLessonBrief, getProblem } from '@/lib/data';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProblems().map((p) => ({ id: String(p.id) }));
}

export function generateMetadata({ params }) {
  const data = getProblem(params.id);
  if (!data) return {};
  const { problem } = data;
  return { title: `${problem.code}. ${problem.title}`, description: problem.statement.join(' ').replace(/`/g, '') };
}

export default function ProblemPage({ params }) {
  const data = getProblem(params.id);
  if (!data) notFound();

  return (
    <ProblemView
      problem={data.problem}
      prev={data.prev}
      next={data.next}
      lesson={data.problem.lesson ? getLessonBrief(data.problem.lesson) : null}
    />
  );
}
