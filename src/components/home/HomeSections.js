'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Box, Button, Card, Container, Grid, Stack, Typography } from '@mui/material';
import LockOpenRounded from '@mui/icons-material/LockOpenRounded';
import OndemandVideoRounded from '@mui/icons-material/OndemandVideoRounded';
import CodeRounded from '@mui/icons-material/CodeRounded';
import TrendingUpRounded from '@mui/icons-material/TrendingUpRounded';
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import SectionHeader from '@/components/common/SectionHeader';
import Reveal from '@/components/common/Reveal';
import { TopicChip } from '@/components/common/Chips';
import LessonCard from '@/components/lessons/LessonCard';
import ProblemListItem from '@/components/problems/ProblemListItem';
import useLocalSet, { STORAGE_KEYS } from '@/hooks/useLocalSet';

/* ───────────────────────── Онцлогууд ───────────────────────── */
export function Features({ stats }) {
  const features = [
    { icon: <LockOpenRounded />, title: 'Бүртгэлгүй', text: 'Нэвтрэх, бүртгүүлэх шаардлагагүй. Сайтад орсон даруйдаа сурч эхэлнэ.', color: '#1E63E9' },
    { icon: <OndemandVideoRounded />, title: `${stats.lessons} видео хичээл`, text: 'Дэс дараатай, ойлгомжтой тайлбартай, код жишээтэй хичээлүүд.', color: '#1E63E9' },
    { icon: <CodeRounded />, title: `${stats.problems}+ бодлого`, text: 'Сэдэв, түвшингээр ангилсан, жишээ тест болон зөвлөгөөтэй.', color: '#1E63E9' },
    { icon: <TrendingUpRounded />, title: 'Анхнаас ахисан', text: 'Оролт гаралтаас эхлээд DP, граф хүртэл тодорхой замналтай.', color: '#1E63E9' },
  ];

  return (
    <Container maxWidth="lg" component="section" sx={{ py: { xs: 8, md: 12 } }}>
      <SectionHeader overline="Яагаад бид гэж?" title="Сурахад хэрэгтэй бүхэн нэг дор" subtitle="Энгийн, хурдан, ойлгомжтой. Сурагч бүрт зориулав." />
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {features.map((f, i) => (
          <Grid item xs={12} sm={6} md={3} key={f.title}>
            <Reveal delay={i * 0.08} style={{ height: '100%' }}>
              <Card
                component={motion.div}
                whileHover={{ y: -6 }}
                sx={{ p: 3, height: '100%', '&:hover': { boxShadow: '0 18px 40px rgba(30,99,233,0.12)' } }}
              >
                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    borderRadius: 3,
                    display: 'grid',
                    placeItems: 'center',
                    bgcolor: `${f.color}14`,
                    color: f.color,
                    mb: 2.5,
                    '& svg': { fontSize: 28 },
                  }}
                >
                  {f.icon}
                </Box>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {f.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {f.text}
                </Typography>
              </Card>
            </Reveal>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

/* ───────────────────────── Сургалтын зам ───────────────────────── */
export function PathPreview({ roadmap }) {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#fff', borderBlock: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <SectionHeader
          overline="Сургалтын зам"
          title="4 шаттай тодорхой замнал"
          subtitle="Хаанаас эхлэх, дараа нь юу сурахаа мэдэхгүй байна уу? Энэ замаар яв."
        />
        <Grid container spacing={{ xs: 2, md: 3 }} sx={{ position: 'relative' }}>
          <Box
            aria-hidden
            sx={{
              display: { xs: 'none', md: 'block' },
              position: 'absolute',
              top: 52,
              left: '12%',
              right: '12%',
              height: 2,
              background: 'repeating-linear-gradient(90deg, #C9D8F8 0 8px, transparent 8px 16px)',
            }}
          />
          {roadmap.map((s, i) => (
            <Grid item xs={12} sm={6} md={3} key={s.step}>
              <Reveal delay={i * 0.1} style={{ height: '100%' }}>
                <Box
                  component={Link}
                  href={`/roadmap#step-${s.step}`}
                  sx={{
                    display: 'block',
                    height: '100%',
                    textDecoration: 'none',
                    color: 'text.primary',
                    textAlign: { md: 'center' },
                    p: 3,
                    borderRadius: 4,
                    transition: 'background .2s',
                    '&:hover': { bgcolor: '#F5F8FF' },
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      width: 56,
                      height: 56,
                      mx: { md: 'auto' },
                      borderRadius: '50%',
                      display: 'grid',
                      placeItems: 'center',
                      color: '#fff',
                      fontWeight: 800,
                      fontSize: 22,
                      bgcolor: s.color,
                      boxShadow: `0 0 0 6px #fff, 0 0 0 7px ${s.color}33, 0 10px 24px ${s.color}55`,
                      mb: 2.5,
                    }}
                  >
                    {s.step}
                  </Box>
                  <Typography variant="h6">{s.title}</Typography>
                  <Typography variant="body2" sx={{ color: s.color, fontWeight: 600, mb: 1 }}>
                    {s.subtitle}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {s.description}
                  </Typography>
                </Box>
              </Reveal>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

/* ───────────────────────── Видео хичээлүүд ───────────────────────── */
export function LessonsPreview({ lessons }) {
  const watched = useLocalSet(STORAGE_KEYS.watched);
  return (
    <Container maxWidth="lg" component="section" sx={{ py: { xs: 8, md: 12 } }}>
      <SectionHeader
        align="left"
        overline="Видео хичээл"
        title="Эхний хичээлүүдээс эхэл"
        subtitle="Хичээл бүр код жишээ, дасгал бодлоготой."
        action={
          <Button component={Link} href="/lessons" endIcon={<ArrowForwardRounded />}>
            Бүх хичээл
          </Button>
        }
      />
      <Grid container spacing={{ xs: 2.5, md: 3 }}>
        {lessons.map((l, i) => (
          <Grid item xs={12} sm={6} md={4} key={l.id}>
            <Reveal delay={i * 0.08} style={{ height: '100%' }}>
              <LessonCard lesson={l} watched={watched.has(l.id)} />
            </Reveal>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

/* ───────────────────────── Бодлогууд ───────────────────────── */
export function ProblemsPreview({ problems, topics }) {
  const solved = useLocalSet(STORAGE_KEYS.solved);
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#fff', borderBlock: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
          <Grid item xs={12} md={5}>
            <Reveal>
              <Typography variant="overline" color="primary">
                Бодлогын сан
              </Typography>
              <Typography variant="h3" component="h2" sx={{ mt: 1, mb: 2 }}>
                Бодож байж л сурна
              </Typography>
              <Typography color="text.secondary" sx={{ lineHeight: 1.75, mb: 3 }}>
                Бодлого бүр жишээ оролт гаралт, хязгаарлалт, зөвлөгөөтэй. Сэдвээ сонгоод дадлагажаарай.
              </Typography>
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mb: 3.5 }}>
                {topics.map((t) => (
                  <TopicChip key={t} topic={t} link />
                ))}
              </Stack>
              <Button component={Link} href="/problems" variant="contained" size="large" endIcon={<ArrowForwardRounded />}>
                Бүх бодлогыг харах
              </Button>
            </Reveal>
          </Grid>
          <Grid item xs={12} md={7}>
            <Stack spacing={1.25}>
              {problems.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.05} y={14}>
                  <ProblemListItem problem={p} solved={solved.has(p.id)} />
                </Reveal>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

/* ───────────────────────── CTA ───────────────────────── */
export function CallToAction() {
  return (
    <Container maxWidth="lg" component="section" sx={{ pt: { xs: 8, md: 12 } }}>
      <Reveal>
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: { xs: 5, md: 7 },
            px: { xs: 3, sm: 6, md: 10 },
            py: { xs: 6, md: 9 },
            textAlign: 'center',
            color: '#fff',
            background: 'linear-gradient(135deg, #1446B0 0%, #1E63E9 50%, #0EA5E9 100%)',
            boxShadow: '0 30px 60px rgba(30,99,233,0.3)',
          }}
        >
          <Box
            aria-hidden
            sx={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)',
              backgroundSize: '22px 22px',
              maskImage: 'linear-gradient(180deg, #000, transparent)',
              WebkitMaskImage: 'linear-gradient(180deg, #000, transparent)',
            }}
          />
          <Box sx={{ position: 'relative' }}>
            <Typography variant="h3" component="h2" sx={{ mb: 2 }}>
              Өнөөдөр анхны программаа бич
            </Typography>
            <Typography sx={{ opacity: 0.9, maxWidth: 560, mx: 'auto', mb: 4, fontSize: { xs: '1rem', md: '1.1rem' } }}>
              Бүртгэл хэрэггүй, төлбөр хэрэггүй. Ганцхан товч дараад эхлэхэд л хангалттай.
            </Typography>
            <Button
              component={Link}
              href="/lessons/1"
              size="large"
              startIcon={<PlayArrowRounded />}
              sx={{ bgcolor: '#fff', color: 'primary.main', px: 4, '&:hover': { bgcolor: '#F0F5FF' } }}
            >
              1-р хичээлийг үзэх
            </Button>
          </Box>
        </Box>
      </Reveal>
    </Container>
  );
}
