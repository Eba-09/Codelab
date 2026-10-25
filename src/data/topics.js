/**
 * Бодлогын сэдвүүд. `key` нь бодлогын `topics` массивт ашиглагдана.
 */
export const TOPICS = {
  io: { label: 'Оролт/Гаралт', color: '#1E63E9' },
  condition: { label: 'Нөхцөл', color: '#0EA5E9' },
  loop: { label: 'Давталт', color: '#0891B2' },
  math: { label: 'Математик', color: '#7C3AED' },
  array: { label: 'Массив', color: '#2563EB' },
  string: { label: 'Мөр (string)', color: '#DB2777' },
  function: { label: 'Функц', color: '#059669' },
  recursion: { label: 'Рекурс', color: '#16A34A' },
  sort: { label: 'Эрэмбэлэлт', color: '#EA580C' },
  stl: { label: 'STL', color: '#0D9488' },
  'binary-search': { label: 'Хоёртын хайлт', color: '#4F46E5' },
  'prefix-sum': { label: 'Prefix sum', color: '#9333EA' },
  'two-pointers': { label: 'Хоёр заагч', color: '#C026D3' },
  greedy: { label: 'Шунахай (Greedy)', color: '#D97706' },
  stack: { label: 'Стек', color: '#65A30D' },
  dp: { label: 'Динамик программчлал', color: '#E11D48' },
  graph: { label: 'Граф', color: '#0369A1' },
  'number-theory': { label: 'Тооны онол', color: '#6D28D9' },
};

export const LEVELS = {
  easy: { label: 'Анхан', color: '#16A34A', bg: '#E8F7EE' },
  medium: { label: 'Дунд', color: '#D97706', bg: '#FEF3E2' },
  hard: { label: 'Ахисан', color: '#E11D48', bg: '#FDE8EE' },
};

export const getTopic = (key) => TOPICS[key] ?? { label: key, color: '#64748B' };
export const getLevel = (key) => LEVELS[key] ?? LEVELS.easy;
