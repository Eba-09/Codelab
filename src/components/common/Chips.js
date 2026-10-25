'use client';

import Link from 'next/link';
import { Chip } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { getLevel, getTopic } from '@/data/topics';

export function LevelChip({ level, size = 'small', sx }) {
  const l = getLevel(level);
  return (
    <Chip
      size={size}
      label={l.label}
      sx={{ bgcolor: l.bg, color: l.color, border: `1px solid ${alpha(l.color, 0.25)}`, ...sx }}
    />
  );
}

export function TopicChip({ topic, size = 'small', link = false, sx }) {
  const t = getTopic(topic);
  const linkProps = link ? { component: Link, href: `/problems?topic=${topic}`, clickable: true } : {};
  return (
    <Chip
      size={size}
      label={t.label}
      {...linkProps}
      sx={{
        bgcolor: alpha(t.color, 0.08),
        color: t.color,
        border: `1px solid ${alpha(t.color, 0.2)}`,
        '&:hover': link ? { bgcolor: alpha(t.color, 0.16) } : undefined,
        ...sx,
      }}
    />
  );
}
