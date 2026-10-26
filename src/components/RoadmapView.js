'use client';

import Link from 'next/link';
import { Box, Button, Container, Grid, LinearProgress, Paper, Stack, Typography } from '@mui/material';
import RouteRounded from '@mui/icons-material/RouteRounded';
import PlayCircleRounded from '@mui/icons-material/PlayCircleRounded';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import PageHero from '@/components/common/PageHero';
import Reveal from '@/components/common/Reveal';
import { TopicChip } from '@/components/common/Chips';
import useLocalSet, { STORAGE_KEYS } from '@/hooks/useLocalSet';

export default function RoadmapView({ roadmap, lessons, problemsByTopic }) {
  const watched = useLocalSet(STORAGE_KEYS.watched);
  const lessonMap = Object.fromEntries(lessons.map((l) => [l.id, l]));

  return (
    <>
      <PageHero
        icon={<RouteRounded />}
        overline="Сургалтын зам"
        title="Тэгээс олимпиад хүртэлх замнал"
        subtitle="Шат бүрийн хичээлийг үзээд, холбогдох сэдвийн бодлогуудыг бодож дараагийн шат руу шилжээрэй."
      />

      <Container maxWidth="md" sx={{ py: { xs: 5, md: 8 } }}>
        <Box sx={{ position: 'relative' }}>
          {/* Босоо шугам */}
          <Box
            aria-hidden
            sx={{
              position: 'absolute',
              top: 28,
              bottom: 28,
              left: { xs: 23, sm: 27 },
              width: 2,
              background: 'linear-gradient(180deg, #3B82F6, #2563EB, #1D4ED8, #1E3A8A)',
              opacity: 0.35,
            }}
          />
          <Stack spacing={{ xs: 4, md: 5 }}>
            {roadmap.map((stage, i) => {
              const stageLessons = stage.lessons.map((id) => lessonMap[id]).filter(Boolean);
              const done = stageLessons.filter((l) => watched.has(l.id)).length;
              return (
                <Reveal key={stage.step} delay={i * 0.05}>
                  <Box id={`step-${stage.step}`} sx={{ display: 'flex', gap: { xs: 2, sm: 3 }, scrollMarginTop: 100 }}>
                    <Box
                      sx={{
                        flexShrink: 0,
                        width: { xs: 48, sm: 56 },
                        height: { xs: 48, sm: 56 },
                        borderRadius: '50%',
                        bgcolor: stage.color,
                        color: '#fff',
                        fontWeight: 800,
                        fontSize: { xs: 20, sm: 22 },
                        display: 'grid',
                        placeItems: 'center',
                        position: 'relative',
                        zIndex: 1,
                        boxShadow: `0 0 0 6px #F5F8FF, 0 10px 24px ${stage.color}55`,
                      }}
                    >
                      {stage.step}
                    </Box>

                    <Paper variant="outlined" sx={{ flex: 1, p: { xs: 2.5, md: 3.5 }, minWidth: 0 }}>
                      <Typography variant="overline" sx={{ color: stage.color }}>
                        {stage.subtitle}
                      </Typography>
                      <Typography variant="h5" component="h2" sx={{ mb: 1 }}>
                        {stage.title}
                      </Typography>
                      <Typography color="text.secondary" sx={{ lineHeight: 1.75, mb: 2.5 }}>
                        {stage.description}
                      </Typography>

                      <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.75 }}>
                        <Typography variant="body2" fontWeight={600}>
                          Хичээлүүд
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {done} / {stageLessons.length} үзсэн
                        </Typography>
                      </Stack>
                      <LinearProgress
                        variant="determinate"
                        value={(done / stageLessons.length) * 100}
                        sx={{ height: 6, borderRadius: 6, mb: 2, bgcolor: `${stage.color}22`, '& .MuiLinearProgress-bar': { bgcolor: stage.color } }}
                      />

                      <Grid container spacing={1.25} sx={{ mb: 2.5 }}>
                        {stageLessons.map((l) => (
                          <Grid item xs={12} sm={6} key={l.id}>
                            <Box
                              component={Link}
                              href={`/lessons/${l.id}`}
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.25,
                                p: 1.5,
                                height: '100%',
                                borderRadius: 2.5,
                                border: '1px solid',
                                borderColor: 'divider',
                                textDecoration: 'none',
                                color: 'text.primary',
                                transition: 'all .2s',
                                '&:hover': { borderColor: stage.color, bgcolor: `${stage.color}0A` },
                              }}
                            >
                              {watched.has(l.id) ? (
                                <CheckCircleRounded sx={{ color: 'success.main' }} />
                              ) : (
                                <PlayCircleRounded sx={{ color: stage.color }} />
                              )}
                              <Typography variant="body2" fontWeight={600} sx={{ lineHeight: 1.35 }}>
                                {l.id}. {l.title}
                              </Typography>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>

                      <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>
                        Дадлага хийх сэдвүүд
                      </Typography>
                      <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mb: 2.5 }}>
                        {stage.topics.map((t) => (
                          <TopicChip key={t} topic={t} link sx={{ '& .MuiChip-label': { px: 1.25 } }} />
                        ))}
                      </Stack>

                      <Button
                        component={Link}
                        href={`/problems?topic=${stage.topics[0]}`}
                        endIcon={<ArrowForwardRounded />}
                        sx={{ color: stage.color }}
                      >
                        {stage.topics.reduce((s, t) => s + (problemsByTopic[t] || 0), 0)} бодлого бодох
                      </Button>
                    </Paper>
                  </Box>
                </Reveal>
              );
            })}
          </Stack>
        </Box>
      </Container>
    </>
  );
}
