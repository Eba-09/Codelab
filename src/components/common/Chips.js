'use client';

import Link from 'next/link';
import { Box, Chip } from '@mui/material';
import { getLevel, getTopic } from '@/data/topics';

/**
 * Түвшний дүрс: өсөх 3 зураас (сүлжээний дохионы дүрс шиг).
 * Идэвхтэй зураас нь сайтын үндсэн цэнхэр, бусад нь бүдэг.
 */
export function LevelMeter({ level, size = 14 }) {
  const { bars, label } = getLevel(level);
  const w = Math.round(size * 0.22);
  const gap = Math.round(size * 0.14);
  return (
    <Box
      component="span"
      role="img"
      aria-label={`Түвшин: ${label}`}
      sx={{ display: 'inline-flex', alignItems: 'flex-end', gap: `${gap}px`, height: size, flexShrink: 0 }}
    >
      {[1, 2, 3].map((i) => (
        <Box
          key={i}
          component="span"
          sx={{
            width: w,
            height: `${(i / 3) * 100}%`,
            borderRadius: 1,
            bgcolor: i <= bars ? 'primary.main' : '#D3DEF3',
          }}
        />
      ))}
    </Box>
  );
}

/** Түвшин: дүрс + текст. Арын өнгөгүй, хөнгөн. */
export function LevelChip({ level, size = 'small', sx }) {
  const l = getLevel(level);
  const big = size === 'medium';
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.75,
        height: big ? 32 : 24,
        fontSize: big ? '0.85rem' : '0.75rem',
        fontWeight: 600,
        color: 'text.secondary',
        whiteSpace: 'nowrap',
        ...sx,
      }}
    >
      <LevelMeter level={level} size={big ? 14 : 12} />
      {l.label}
    </Box>
  );
}

/** Сэдэв: бүгд нэг ижил саарал-цэнхэр загвартай. */
export function TopicChip({ topic, size = 'small', link = false, sx }) {
  const t = getTopic(topic);
  const linkProps = link ? { component: Link, href: `/problems?topic=${topic}`, clickable: true } : {};
  return (
    <Chip
      size={size}
      label={t.label}
      {...linkProps}
      sx={{
        bgcolor: '#F1F5FC',
        color: '#3D4B6B',
        border: '1px solid #E1E8F5',
        fontWeight: 500,
        ...(link && {
          '&:hover': { bgcolor: '#E6EEFD', color: 'primary.main', borderColor: '#C9D8F8' },
        }),
        ...sx,
      }}
    />
  );
}
