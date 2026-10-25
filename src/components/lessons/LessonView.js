'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Grid,
  LinearProgress,
  List,
  ListItemButton,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import RadioButtonUncheckedRounded from '@mui/icons-material/RadioButtonUncheckedRounded';
import ArrowBackRounded from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import AccessTimeRounded from '@mui/icons-material/AccessTimeRounded';
import TaskAltRounded from '@mui/icons-material/TaskAltRounded';
import PlayCircleRounded from '@mui/icons-material/PlayCircleRounded';
import VideoPlayer from './VideoPlayer';
import CodeBlock from '@/components/common/CodeBlock';
import RichText from '@/components/common/RichText';
import { LevelChip, TopicChip } from '@/components/common/Chips';
import ProblemListItem from '@/components/problems/ProblemListItem';
import useLocalSet, { STORAGE_KEYS } from '@/hooks/useLocalSet';
import { FONT_MONO } from '@/theme/theme';

export default function LessonView({ lesson, prev, next, allLessons, practice }) {
  const [tab, setTab] = useState(0);
  const watched = useLocalSet(STORAGE_KEYS.watched);
  const solved = useLocalSet(STORAGE_KEYS.solved);
  const isWatched = watched.has(lesson.id);
  const num = String(lesson.id).padStart(2, '0');

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      <Breadcrumbs sx={{ mb: 2.5, fontSize: 14 }}>
        <Box component={Link} href="/lessons" sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
          Видео хичээл
        </Box>
        <Typography fontSize={14} color="text.primary" noWrap sx={{ maxWidth: { xs: 180, sm: 'none' } }}>
          Хичээл {num}
        </Typography>
      </Breadcrumbs>

      <Grid container spacing={{ xs: 3, md: 4 }}>
        {/* ───────── Үндсэн хэсэг ───────── */}
        <Grid item xs={12} md={8}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <VideoPlayer url={lesson.youtubeUrl} title={lesson.title} />
          </motion.div>

          <Box sx={{ mt: 3 }}>
            <Stack direction="row" spacing={1} alignItems="center" useFlexGap flexWrap="wrap" sx={{ mb: 1.5 }}>
              <Typography variant="overline" color="primary">
                Хичээл {num}
              </Typography>
              <LevelChip level={lesson.level} />
              <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: 'text.secondary' }}>
                <AccessTimeRounded sx={{ fontSize: 18 }} />
                <Typography variant="body2">{lesson.duration}</Typography>
              </Stack>
            </Stack>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between" alignItems={{ sm: 'flex-start' }}>
              <Typography variant="h4" component="h1">
                {lesson.title}
              </Typography>
              <Button
                onClick={() => watched.toggle(lesson.id)}
                variant={isWatched ? 'contained' : 'outlined'}
                color={isWatched ? 'success' : 'primary'}
                startIcon={isWatched ? <CheckCircleRounded /> : <TaskAltRounded />}
                sx={{ flexShrink: 0, ...(isWatched && { backgroundImage: 'none' }) }}
              >
                {isWatched ? 'Үзсэн' : 'Үзсэн гэж тэмдэглэх'}
              </Button>
            </Stack>
          </Box>

          <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 3 }}>
            <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="scrollable" allowScrollButtonsMobile>
              <Tab label="Тойм" />
              <Tab label="Код жишээ" />
              <Tab label={`Дасгал бодлого (${practice.length})`} />
            </Tabs>
          </Box>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <Box sx={{ pt: 3 }}>
                {tab === 0 && (
                  <>
                    <Typography color="text.secondary" sx={{ fontSize: '1.05rem', lineHeight: 1.75 }}>
                      {lesson.summary}
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 3, mb: 1.5 }}>
                      Энэ хичээлээр сурах зүйлс
                    </Typography>
                    <Grid container spacing={1.5}>
                      {lesson.points.map((p) => (
                        <Grid item xs={12} sm={6} key={p}>
                          <Paper variant="outlined" sx={{ p: 1.75, display: 'flex', gap: 1.25, alignItems: 'flex-start', height: '100%' }}>
                            <CheckCircleRounded sx={{ color: 'primary.main', fontSize: 20, mt: 0.25 }} />
                            <RichText text={p} variant="body2" sx={{ lineHeight: 1.6 }} />
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                    <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mt: 3 }}>
                      {lesson.topics.map((t) => (
                        <TopicChip key={t} topic={t} link />
                      ))}
                    </Stack>
                  </>
                )}

                {tab === 1 && <CodeBlock code={lesson.code} title={`lesson-${num}.cpp`} />}

                {tab === 2 && (
                  <Stack spacing={1.25}>
                    {practice.length === 0 && <Typography color="text.secondary">Энэ хичээлд дасгал бодлого хараахан нэмэгдээгүй байна.</Typography>}
                    {practice.map((p) => (
                      <ProblemListItem key={p.id} problem={p} solved={solved.has(p.id)} />
                    ))}
                  </Stack>
                )}
              </Box>
            </motion.div>
          </AnimatePresence>

          {/* Өмнөх / Дараах */}
          <Grid container spacing={2} sx={{ mt: 5 }}>
            <Grid item xs={12} sm={6}>
              {prev && <NavCard href={`/lessons/${prev.id}`} label="Өмнөх хичээл" title={prev.title} dir="prev" />}
            </Grid>
            <Grid item xs={12} sm={6}>
              {next && <NavCard href={`/lessons/${next.id}`} label="Дараагийн хичээл" title={next.title} dir="next" />}
            </Grid>
          </Grid>
        </Grid>

        {/* ───────── Хичээлийн жагсаалт ───────── */}
        <Grid item xs={12} md={4}>
          <Paper variant="outlined" sx={{ position: { md: 'sticky' }, top: { md: 96 }, overflow: 'hidden' }}>
            <Box sx={{ p: 2.5, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                <Typography fontWeight={700}>Бүх хичээл</Typography>
                <Typography variant="body2" color="primary" fontWeight={700}>
                  {watched.size} / {allLessons.length}
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={(watched.size / allLessons.length) * 100}
                sx={{ height: 6, borderRadius: 6 }}
              />
            </Box>
            <List sx={{ p: 1, maxHeight: { md: 'calc(100vh - 230px)' }, overflow: 'auto' }}>
              {allLessons.map((l) => {
                const active = l.id === lesson.id;
                const done = watched.has(l.id);
                return (
                  <ListItemButton
                    key={l.id}
                    component={Link}
                    href={`/lessons/${l.id}`}
                    selected={active}
                    sx={{
                      borderRadius: 2.5,
                      mb: 0.5,
                      gap: 1.5,
                      alignItems: 'flex-start',
                      '&.Mui-selected': { bgcolor: 'rgba(30,99,233,0.08)' },
                    }}
                  >
                    <Box sx={{ mt: 0.25, color: done ? 'success.main' : active ? 'primary.main' : '#C3CEE6' }}>
                      {active ? <PlayCircleRounded /> : done ? <CheckCircleRounded /> : <RadioButtonUncheckedRounded />}
                    </Box>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography sx={{ fontFamily: FONT_MONO, fontSize: 11.5, color: 'text.secondary' }}>
                        {String(l.id).padStart(2, '0')} · {l.duration}
                      </Typography>
                      <Typography
                        variant="body2"
                        fontWeight={active ? 700 : 500}
                        color={active ? 'primary.main' : 'text.primary'}
                        sx={{ lineHeight: 1.4 }}
                      >
                        {l.title}
                      </Typography>
                    </Box>
                  </ListItemButton>
                );
              })}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

function NavCard({ href, label, title, dir }) {
  const isNext = dir === 'next';
  return (
    <Box
      component={Link}
      href={href}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        flexDirection: isNext ? 'row-reverse' : 'row',
        textAlign: isNext ? 'right' : 'left',
        p: 2,
        height: '100%',
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        textDecoration: 'none',
        color: 'text.primary',
        transition: 'all .2s',
        '&:hover': { borderColor: 'primary.light', boxShadow: '0 8px 22px rgba(30,99,233,0.1)' },
      }}
    >
      {isNext ? <ArrowForwardRounded color="primary" /> : <ArrowBackRounded color="primary" />}
      <Box sx={{ minWidth: 0 }}>
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
        <Typography fontWeight={600} sx={{ lineHeight: 1.35 }}>
          {title}
        </Typography>
      </Box>
    </Box>
  );
}
