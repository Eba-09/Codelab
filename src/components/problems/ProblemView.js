'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';
import LightbulbRounded from '@mui/icons-material/LightbulbRounded';
import TimerOutlined from '@mui/icons-material/TimerOutlined';
import MemoryRounded from '@mui/icons-material/MemoryRounded';
import ContentCopyRounded from '@mui/icons-material/ContentCopyRounded';
import CheckRounded from '@mui/icons-material/CheckRounded';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import TaskAltRounded from '@mui/icons-material/TaskAltRounded';
import ArrowBackRounded from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import OndemandVideoRounded from '@mui/icons-material/OndemandVideoRounded';
import ListAltRounded from '@mui/icons-material/ListAltRounded';
import RichText from '@/components/common/RichText';
import { useCopy } from '@/components/common/CodeBlock';
import { LevelChip, TopicChip } from '@/components/common/Chips';
import useLocalSet, { STORAGE_KEYS } from '@/hooks/useLocalSet';
import { FONT_MONO } from '@/theme/theme';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay },
});

export default function ProblemView({ problem, prev, next, lesson }) {
  const solved = useLocalSet(STORAGE_KEYS.solved);
  const isSolved = solved.has(problem.id);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
      <Breadcrumbs sx={{ mb: 2.5, fontSize: 14 }}>
        <Box component={Link} href="/problems" sx={{ color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>
          Бодлогын сан
        </Box>
        <Typography fontSize={14} color="text.primary">
          {problem.code}
        </Typography>
      </Breadcrumbs>

      <Grid container spacing={{ xs: 3, md: 4 }}>
        <Grid item xs={12} md={8}>
          {/* ───── Гарчиг ───── */}
          <motion.div {...fadeUp()}>
            <Typography sx={{ fontFamily: FONT_MONO, color: 'primary.main', fontWeight: 600, mb: 0.5 }}>{problem.code}</Typography>
            <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
              {problem.title}
            </Typography>
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" alignItems="center">
              <LevelChip level={problem.level} size="medium" />
              {problem.topics.map((t) => (
                <TopicChip key={t} topic={t} size="medium" link />
              ))}
            </Stack>
            <Stack direction="row" spacing={3} sx={{ mt: 2, color: 'text.secondary' }}>
              <Stack direction="row" spacing={0.75} alignItems="center">
                <TimerOutlined fontSize="small" />
                <Typography variant="body2">{problem.timeLimit}</Typography>
              </Stack>
              <Stack direction="row" spacing={0.75} alignItems="center">
                <MemoryRounded fontSize="small" />
                <Typography variant="body2">{problem.memoryLimit}</Typography>
              </Stack>
            </Stack>
          </motion.div>

          {/* ───── Өгүүлбэр ───── */}
          <motion.div {...fadeUp(0.05)}>
            <Paper variant="outlined" sx={{ p: { xs: 2.5, md: 4 }, mt: 3 }}>
              <SectionTitle>Бодлого</SectionTitle>
              <Stack spacing={1.5}>
                {problem.statement.map((s, i) => (
                  <RichText key={i} text={s} sx={{ fontSize: '1.05rem', lineHeight: 1.8 }} />
                ))}
              </Stack>

              <SectionTitle sx={{ mt: 4 }}>Оролт</SectionTitle>
              <RichText text={problem.input} sx={{ lineHeight: 1.8 }} />

              <SectionTitle sx={{ mt: 4 }}>Гаралт</SectionTitle>
              <RichText text={problem.output} sx={{ lineHeight: 1.8 }} />

              {problem.constraints.length > 0 && (
                <>
                  <SectionTitle sx={{ mt: 4 }}>Хязгаарлалт</SectionTitle>
                  <Stack component="ul" spacing={0.75} sx={{ pl: 2.5, m: 0 }}>
                    {problem.constraints.map((c) => (
                      <Typography component="li" key={c} sx={{ fontFamily: FONT_MONO, fontSize: 14.5 }}>
                        {c}
                      </Typography>
                    ))}
                  </Stack>
                </>
              )}

              <SectionTitle sx={{ mt: 4 }}>Жишээ</SectionTitle>
              <Stack spacing={2.5}>
                {problem.examples.map((ex, i) => (
                  <Box key={i}>
                    <Grid container spacing={1.5}>
                      <Grid item xs={12} sm={6}>
                        <SampleBox label={`Оролт ${problem.examples.length > 1 ? i + 1 : ''}`} value={ex.input} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <SampleBox label={`Гаралт ${problem.examples.length > 1 ? i + 1 : ''}`} value={ex.output} />
                      </Grid>
                    </Grid>
                    {ex.note && <RichText text={`Тайлбар: ${ex.note}`} variant="body2" color="text.secondary" sx={{ mt: 1 }} />}
                  </Box>
                ))}
              </Stack>
            </Paper>
          </motion.div>

          {problem.hint && (
            <motion.div {...fadeUp(0.1)}>
              <Accordion disableGutters elevation={0} sx={{ mt: 2.5 }}>
                <AccordionSummary expandIcon={<ExpandMoreRounded />}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <LightbulbRounded color="primary" />
                    <Typography fontWeight={700}>Зөвлөгөө харах</Typography>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails>
                  <RichText text={problem.hint} color="text.secondary" sx={{ lineHeight: 1.8 }} />
                </AccordionDetails>
              </Accordion>
            </motion.div>
          )}

          {/* ───── Өмнөх / Дараах ───── */}
          <Stack direction="row" justifyContent="space-between" spacing={2} sx={{ mt: 4 }}>
            {prev ? (
              <Button component={Link} href={`/problems/${prev.id}`} startIcon={<ArrowBackRounded />} variant="outlined" sx={{ minWidth: 0 }}>
                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                  {prev.code}. {prev.title}
                </Box>
                <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
                  Өмнөх
                </Box>
              </Button>
            ) : (
              <span />
            )}
            {next && (
              <Button component={Link} href={`/problems/${next.id}`} endIcon={<ArrowForwardRounded />} variant="outlined" sx={{ minWidth: 0 }}>
                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                  {next.code}. {next.title}
                </Box>
                <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
                  Дараах
                </Box>
              </Button>
            )}
          </Stack>
        </Grid>

        {/* ───── Хажуу самбар ───── */}
        <Grid item xs={12} md={4}>
          <Stack spacing={2.5} sx={{ position: { md: 'sticky' }, top: { md: 96 } }}>
            <Paper variant="outlined" sx={{ p: 2.5 }}>
              <Typography fontWeight={700} sx={{ mb: 1.5 }}>
                Таны төлөв
              </Typography>
              <Button
                fullWidth
                size="large"
                variant={isSolved ? 'contained' : 'outlined'}
                color={isSolved ? 'success' : 'primary'}
                startIcon={isSolved ? <CheckCircleRounded /> : <TaskAltRounded />}
                onClick={() => solved.toggle(problem.id)}
                sx={isSolved ? { backgroundImage: 'none' } : undefined}
              >
                {isSolved ? 'Бодсон' : 'Бодсон гэж тэмдэглэх'}
              </Button>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1.25 }}>
                Төлөв таны төхөөрөмж дээр хадгалагдана.
              </Typography>
            </Paper>

            <Alert severity="info" variant="outlined" sx={{ borderRadius: 4, bgcolor: '#F3F8FF' }}>
              Энэ сайт кодыг шалгадаггүй. Бодлогоо өөрийн компьютер дээр бичээд, жишээ тестүүдээр шалгаж үзээрэй.
            </Alert>

            {lesson && (
              <Paper variant="outlined" sx={{ p: 2.5 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Холбогдох хичээл
                </Typography>
                <Box
                  component={Link}
                  href={`/lessons/${lesson.id}`}
                  sx={{ display: 'flex', gap: 1.5, alignItems: 'center', textDecoration: 'none', color: 'text.primary', '&:hover': { color: 'primary.main' } }}
                >
                  <Box sx={{ width: 44, height: 44, borderRadius: 2.5, bgcolor: 'rgba(30,99,233,0.1)', color: 'primary.main', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                    <OndemandVideoRounded />
                  </Box>
                  <Typography fontWeight={600} sx={{ lineHeight: 1.35 }}>
                    {lesson.title}
                  </Typography>
                </Box>
              </Paper>
            )}

            <Button component={Link} href="/problems" startIcon={<ListAltRounded />} color="inherit" sx={{ color: 'text.secondary' }}>
              Бүх бодлого руу буцах
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

function SectionTitle({ children, sx }) {
  return (
    <Typography
      variant="h6"
      component="h2"
      sx={{
        mb: 1.5,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        '&::before': { content: '""', width: 4, height: 18, borderRadius: 2, bgcolor: 'primary.main' },
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
}

function SampleBox({ label, value }) {
  const { copied, copy } = useCopy();
  return (
    <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, overflow: 'hidden', height: '100%' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1.75, py: 0.5, bgcolor: '#F3F7FF', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography variant="body2" fontWeight={700} color="text.secondary">
          {label.trim()}
        </Typography>
        <Tooltip title={copied ? 'Хуулагдлаа!' : 'Хуулах'}>
          <IconButton size="small" onClick={() => copy(value)} aria-label={`${label} хуулах`}>
            {copied ? <CheckRounded fontSize="small" color="success" /> : <ContentCopyRounded fontSize="small" />}
          </IconButton>
        </Tooltip>
      </Stack>
      <Box
        component="pre"
        sx={{ m: 0, p: 1.75, fontFamily: FONT_MONO, fontSize: 14, lineHeight: 1.65, overflowX: 'auto', bgcolor: '#fff', minHeight: 52, whiteSpace: 'pre' }}
      >
        {value === '' ? <Box component="span" sx={{ color: 'text.disabled' }}>(хоосон)</Box> : value}
      </Box>
    </Box>
  );
}
