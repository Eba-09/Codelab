import { problems } from '@/data/problems';
import { lessons } from '@/data/lessons';

const DEFAULT_LIMITS = { timeLimit: '1 сек', memoryLimit: '256 MB' };

export const problemCode = (id) => `P${String(id).padStart(3, '0')}`;

const normalize = (p) => ({
  ...DEFAULT_LIMITS,
  constraints: [],
  examples: [],
  hint: '',
  ...p,
  code: problemCode(p.id),
  statement: Array.isArray(p.statement) ? p.statement : [p.statement],
});

const sortedProblems = [...problems].sort((a, b) => a.id - b.id).map(normalize);

export function getAllProblems() {
  return sortedProblems;
}

/** Жагсаалтад хэрэгтэй хөнгөн өгөгдөл (client руу бага дамжуулна) */
export function getProblemList() {
  return sortedProblems.map(({ id, code, title, level, topics }) => ({ id, code, title, level, topics }));
}

export function getProblem(id) {
  const index = sortedProblems.findIndex((p) => String(p.id) === String(id));
  if (index === -1) return null;
  const problem = sortedProblems[index];
  const prev = sortedProblems[index - 1];
  const next = sortedProblems[index + 1];
  return {
    problem,
    prev: prev ? { id: prev.id, title: prev.title, code: prev.code } : null,
    next: next ? { id: next.id, title: next.title, code: next.code } : null,
  };
}

export function getAllLessons() {
  return lessons;
}

export function getLesson(id) {
  const index = lessons.findIndex((l) => String(l.id) === String(id));
  if (index === -1) return null;
  return {
    lesson: lessons[index],
    prev: lessons[index - 1] ?? null,
    next: lessons[index + 1] ?? null,
  };
}

export function getProblemsForLesson(lessonId) {
  return getProblemList().filter((p) => {
    const full = sortedProblems.find((x) => x.id === p.id);
    return full.lesson === lessonId;
  });
}

export function getLessonBrief(id) {
  const l = lessons.find((x) => x.id === id);
  return l ? { id: l.id, title: l.title } : null;
}

export function getStats() {
  const byLevel = sortedProblems.reduce((acc, p) => {
    acc[p.level] = (acc[p.level] || 0) + 1;
    return acc;
  }, {});
  return { lessons: lessons.length, problems: sortedProblems.length, byLevel };
}
