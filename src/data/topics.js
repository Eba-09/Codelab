/**
 * Бодлогын сэдвүүд. `key` нь бодлогын `topics` массивт ашиглагдана.
 * Сэдвүүд бүгд нэг ижил, тайван загвартай харагдана (өнгө ялгахгүй) —
 * ингэснээр хуудас эрээн болохгүй, анхаарал бодлого дээрээ төвлөрнө.
 */
export const TOPICS = {
  io: { label: 'Оролт/Гаралт' },
  condition: { label: 'Нөхцөл' },
  loop: { label: 'Давталт' },
  math: { label: 'Математик' },
  array: { label: 'Массив' },
  string: { label: 'Мөр (string)' },
  function: { label: 'Функц' },
  recursion: { label: 'Рекурс' },
  sort: { label: 'Эрэмбэлэлт' },
  stl: { label: 'STL' },
  'binary-search': { label: 'Хоёртын хайлт' },
  'prefix-sum': { label: 'Prefix sum' },
  'two-pointers': { label: 'Хоёр заагч' },
  greedy: { label: 'Шунахай (Greedy)' },
  stack: { label: 'Стек' },
  dp: { label: 'Динамик программчлал' },
  graph: { label: 'Граф' },
  'number-theory': { label: 'Тооны онол' },
};

/**
 * Түвшин — өнгөөр биш, 1–3 зураасан дүрс + текстээр ялгагдана.
 * `bars`: дүрсэн дээр хэдэн зураас идэвхтэй байх.
 */
export const LEVELS = {
  easy: { label: 'Анхан', bars: 1 },
  medium: { label: 'Дунд', bars: 2 },
  hard: { label: 'Ахисан', bars: 3 },
};

export const getTopic = (key) => TOPICS[key] ?? { label: key };
export const getLevel = (key) => LEVELS[key] ?? LEVELS.easy;
