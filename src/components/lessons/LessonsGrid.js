'use client';

import { Box, Container, Grid, LinearProgress, Paper, Stack, Typography } from '@mui/material';
import OndemandVideoRounded from '@mui/icons-material/OndemandVideoRounded';
import LessonCard from './LessonCard';
import Reveal from '@/components/common/Reveal';
import PageHero from '@/components/common/PageHero';
import useLocalSet, { STORAGE_KEYS } from '@/hooks/useLocalSet';

export default function LessonsGrid({ lessons }) {
  const watched = useLocalSet(STORAGE_KEYS.watched);
  const pct = Math.round((watched.size / lessons.length) * 100);

  return (
    <>
      <PageHero
        icon={<OndemandVideoRounded />}
        overline="Видео хичээл"
        title="C++ видео хичээлүүд"
        subtitle="Анхан шатнаас өрсөлдөөнт программчлал хүртэл дэс дараатай 10 хичээл. Бүртгэлгүйгээр шууд үзээрэй."
      >
        <Paper variant="outlined" sx={{ p: 2, mt: 3, maxWidth: 420, bgcolor: 'rgba(255,255,255,0.8)' }}>
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
            <Typography variant="body2" fontWeight={600}>
              Таны ахиц
            </Typography>
            <Typography variant="body2" color="primary" fontWeight={700}>
              {watched.ready ? `${watched.size} / ${lessons.length}` : '—'}
            </Typography>
          </Stack>
          <LinearProgress variant="determinate" value={watched.ready ? pct : 0} sx={{ height: 8, borderRadius: 8 }} />
        </Paper>
      </PageHero>

      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 7 } }}>
        <Grid container spacing={{ xs: 2.5, md: 3 }}>
          {lessons.map((lesson, i) => (
            <Grid item xs={12} sm={6} md={4} key={lesson.id}>
              <Reveal delay={(i % 3) * 0.08} style={{ height: '100%' }}>
                <LessonCard lesson={lesson} watched={watched.has(lesson.id)} />
              </Reveal>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ textAlign: 'center', mt: 5 }}>
          <Typography variant="body2" color="text.secondary">
            Ахиц таны төхөөрөмж дээр хадгалагдана — бүртгэл шаардлагагүй.
          </Typography>
        </Box>
      </Container>
    </>
  );
}
