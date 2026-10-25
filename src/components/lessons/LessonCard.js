'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Box, Card, CardActionArea, Chip, Stack, Typography } from '@mui/material';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import AccessTimeRounded from '@mui/icons-material/AccessTimeRounded';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import { getYoutubeId, youtubeThumb } from '@/lib/youtube';
import { LevelChip } from '@/components/common/Chips';
import { FONT_MONO } from '@/theme/theme';

export default function LessonCard({ lesson, watched = false }) {
  const id = getYoutubeId(lesson.youtubeUrl);
  const num = String(lesson.id).padStart(2, '0');

  return (
    <Card
      component={motion.div}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      sx={{ height: '100%', '&:hover': { boxShadow: '0 18px 40px rgba(30,99,233,0.14)', borderColor: '#C9D8F8' } }}
    >
      <CardActionArea component={Link} href={`/lessons/${lesson.id}`} sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
        <Box sx={{ position: 'relative', aspectRatio: '16 / 9', overflow: 'hidden' }}>
          {id ? (
            <Box component="img" src={youtubeThumb(id)} alt="" loading="lazy" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <Box
              sx={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, #1446B0 0%, #1E63E9 55%, #0EA5E9 100%)',
                display: 'grid',
                placeItems: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Typography sx={{ fontFamily: FONT_MONO, fontWeight: 700, fontSize: 64, color: 'rgba(255,255,255,0.18)', position: 'absolute', right: 16, bottom: -10 }}>
                {num}
              </Typography>
              <Typography sx={{ fontFamily: FONT_MONO, color: 'rgba(255,255,255,0.85)', fontSize: 15, px: 3, textAlign: 'center' }}>
                {'#include <C++>'}
              </Typography>
            </Box>
          )}
          <Box
            sx={{
              position: 'absolute',
              left: 12,
              bottom: 12,
              width: 42,
              height: 42,
              borderRadius: '50%',
              bgcolor: 'rgba(255,255,255,0.95)',
              color: 'primary.main',
              display: 'grid',
              placeItems: 'center',
              boxShadow: '0 6px 18px rgba(0,0,0,0.2)',
            }}
          >
            <PlayArrowRounded />
          </Box>
          <Chip
            size="small"
            icon={<AccessTimeRounded sx={{ fontSize: 16 }} />}
            label={lesson.duration}
            sx={{ position: 'absolute', right: 12, top: 12, bgcolor: 'rgba(11,21,48,0.75)', color: '#fff', '& .MuiChip-icon': { color: '#fff' } }}
          />
          {watched && (
            <Chip
              size="small"
              icon={<CheckCircleRounded sx={{ fontSize: 16 }} />}
              label="Үзсэн"
              color="success"
              sx={{ position: 'absolute', left: 12, top: 12 }}
            />
          )}
        </Box>

        <Box sx={{ p: 2.5, display: 'flex', flexDirection: 'column', gap: 1, flexGrow: 1 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="overline" color="primary" sx={{ lineHeight: 1 }}>
              Хичээл {num}
            </Typography>
            <LevelChip level={lesson.level} />
          </Stack>
          <Typography variant="h6" sx={{ fontSize: '1.08rem', lineHeight: 1.35 }}>
            {lesson.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
          >
            {lesson.summary}
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
}
