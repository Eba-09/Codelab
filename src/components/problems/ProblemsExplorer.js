'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  LinearProgress,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from '@mui/material';
import SearchRounded from '@mui/icons-material/SearchRounded';
import CodeRounded from '@mui/icons-material/CodeRounded';
import ShuffleRounded from '@mui/icons-material/ShuffleRounded';
import RestartAltRounded from '@mui/icons-material/RestartAltRounded';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import RadioButtonUncheckedRounded from '@mui/icons-material/RadioButtonUncheckedRounded';
import SearchOffRounded from '@mui/icons-material/SearchOffRounded';
import PageHero from '@/components/common/PageHero';
import { LevelChip, LevelMeter, TopicChip } from '@/components/common/Chips';
import ProblemListItem from './ProblemListItem';
import useLocalSet, { STORAGE_KEYS } from '@/hooks/useLocalSet';
import { LEVELS, TOPICS } from '@/data/topics';
import { FONT_MONO } from '@/theme/theme';

const PAGE_SIZE = 20;

export default function ProblemsExplorer({ problems }) {
  const router = useRouter();
  const params = useSearchParams();
  const solved = useLocalSet(STORAGE_KEYS.solved);

  const listRef = useRef(null);

  // Сэдэв, түвшин: URL нь цорын ганц эх сурвалж (хуваалцах, буцах товч, цэсний холбоос зөв ажиллана)
  const rawTopic = params.get('topic');
  const rawLevel = params.get('level');
  const topic = rawTopic && TOPICS[rawTopic] ? rawTopic : 'all';
  const level = rawLevel && LEVELS[rawLevel] ? rawLevel : 'all';
  const urlQuery = params.get('q') ?? '';

  // Хайлтын талбар: шивэх үед хурдан хариу үзүүлэхийн тулд дотоод төлөвтэй, URL руу хойшлуулж бичнэ
  const [query, setQuery] = useState(urlQuery);
  const lastPushedQuery = useRef(urlQuery);
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);

  const updateUrl = useCallback(
    (patch) => {
      const sp = new URLSearchParams(params.toString());
      Object.entries(patch).forEach(([k, v]) => (v && v !== 'all' ? sp.set(k, v) : sp.delete(k)));
      const qs = sp.toString();
      router.replace(qs ? `/problems?${qs}` : '/problems', { scroll: false });
    },
    [params, router],
  );

  const setTopic = (v) => updateUrl({ topic: v });
  const setLevel = (v) => updateUrl({ level: v });

  // URL гаднаас өөрчлөгдвөл (цэсний холбоос, буцах товч) хайлтын талбарыг синк хийнэ
  useEffect(() => {
    if (urlQuery !== lastPushedQuery.current) {
      lastPushedQuery.current = urlQuery;
      setQuery(urlQuery);
    }
  }, [urlQuery]);

  // Шивж дууссаны дараа 300ms-ийн дотор URL-д бичнэ
  useEffect(() => {
    if (query === lastPushedQuery.current) return undefined;
    const t = setTimeout(() => {
      lastPushedQuery.current = query;
      updateUrl({ q: query });
    }, 300);
    return () => clearTimeout(t);
  }, [query, updateUrl]);

  useEffect(() => setPage(1), [query, level, topic, status]);

  // Ашиглагдаж буй сэдвүүд л жагсаалтад гарна
  const usedTopics = useMemo(() => {
    const s = new Set(problems.flatMap((p) => p.topics));
    return Object.keys(TOPICS).filter((k) => s.has(k));
  }, [problems]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return problems.filter((p) => {
      if (level !== 'all' && p.level !== level) return false;
      if (topic !== 'all' && !p.topics.includes(topic)) return false;
      if (status === 'solved' && !solved.has(p.id)) return false;
      if (status === 'unsolved' && solved.has(p.id)) return false;
      if (q) {
        // Нэр, дугаар болон сэдвийн нэрээр хайна (жишээ: "граф", "p012", "12")
        const haystack = [p.title, p.code, ...p.topics.map((t) => TOPICS[t]?.label ?? t)].join(' ').toLowerCase();
        if (!haystack.includes(q) && String(p.id) !== q) return false;
      }
      return true;
    });
  }, [problems, query, level, topic, status, solved]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const hasFilters = query || level !== 'all' || topic !== 'all' || status !== 'all';

  const reset = () => {
    lastPushedQuery.current = '';
    setQuery('');
    setStatus('all');
    router.replace('/problems', { scroll: false });
  };

  const randomProblem = () => {
    const pool = filtered.length ? filtered : problems;
    const unsolved = pool.filter((p) => !solved.has(p.id));
    const list = unsolved.length ? unsolved : pool;
    const pick = list[Math.floor(Math.random() * list.length)];
    router.push(`/problems/${pick.id}`);
  };

  const counts = useMemo(
    () => ({
      easy: problems.filter((p) => p.level === 'easy').length,
      medium: problems.filter((p) => p.level === 'medium').length,
      hard: problems.filter((p) => p.level === 'hard').length,
    }),
    [problems],
  );

  return (
    <>
      <PageHero
        icon={<CodeRounded />}
        overline="Бодлогын сан"
        title="Бодлого бодож дадлагажъя"
        subtitle="Сэдэв, түвшингээр шүүж хайгаад, өөрийн компьютер дээр бодоод жишээ тестээр шалгаарай."
      >
        <Grid container spacing={1.5} sx={{ mt: 3, maxWidth: 760 }}>
          <StatBox label="Нийт бодлого" value={problems.length} />
          {Object.keys(LEVELS).map((k) => (
            <StatBox key={k} label={LEVELS[k].label} value={counts[k]} level={k} />
          ))}
        </Grid>
      </PageHero>

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        {/* ───── Ахиц ───── */}
        <Paper variant="outlined" sx={{ p: { xs: 2, sm: 2.5 }, mb: 3 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }}>
            <Box sx={{ flex: 1 }}>
              <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography fontWeight={700}>Таны ахиц</Typography>
                <Typography color="primary" fontWeight={700}>
                  {solved.size} / {problems.length} бодсон
                </Typography>
              </Stack>
              <LinearProgress variant="determinate" value={(solved.size / problems.length) * 100} sx={{ height: 8, borderRadius: 8 }} />
            </Box>
            <Button variant="contained" startIcon={<ShuffleRounded />} onClick={randomProblem} sx={{ flexShrink: 0 }}>
              Санамсаргүй бодлого
            </Button>
          </Stack>
        </Paper>

        {/* ───── Шүүлтүүр ───── */}
        <Paper variant="outlined" sx={{ p: { xs: 2, sm: 2.5 }, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                size="small"
                placeholder="Нэр, дугаар, сэдвээр хайх (жишээ: граф, P012)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRounded color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel id="topic-label">Сэдэв</InputLabel>
                <Select labelId="topic-label" label="Сэдэв" value={topic} onChange={(e) => setTopic(e.target.value)}>
                  <MenuItem value="all">Бүх сэдэв</MenuItem>
                  {usedTopics.map((k) => (
                    <MenuItem key={k} value={k}>
                      {TOPICS[k].label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth size="small">
                <InputLabel id="status-label">Төлөв</InputLabel>
                <Select labelId="status-label" label="Төлөв" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <MenuItem value="all">Бүгд</MenuItem>
                  <MenuItem value="solved">Бодсон</MenuItem>
                  <MenuItem value="unsolved">Бодоогүй</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2} sx={{ display: 'flex', justifyContent: { md: 'flex-end' } }}>
              <Button fullWidth startIcon={<RestartAltRounded />} onClick={reset} disabled={!hasFilters} color="inherit" sx={{ color: 'text.secondary' }}>
                Цэвэрлэх
              </Button>
            </Grid>
            <Grid item xs={12}>
              <ToggleButtonGroup
                exclusive
                size="small"
                value={level}
                onChange={(_, v) => v && setLevel(v)}
                sx={{
                  flexWrap: 'wrap',
                  gap: 1,
                  '& .MuiToggleButton-root': {
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: '10px !important',
                    px: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                  },
                  '& .Mui-selected': { bgcolor: 'rgba(30,99,233,0.1) !important', color: 'primary.main', borderColor: 'primary.light !important' },
                }}
              >
                <ToggleButton value="all">Бүх түвшин</ToggleButton>
                {Object.entries(LEVELS).map(([k, v]) => (
                  <ToggleButton key={k} value={k} sx={{ gap: 1 }}>
                    <LevelMeter level={k} size={12} />
                    {v.label}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Grid>
          </Grid>
        </Paper>

        <Typography ref={listRef} variant="body2" color="text.secondary" sx={{ mb: 1.5, scrollMarginTop: 96 }}>
          {filtered.length} бодлого олдлоо
        </Typography>

        {filtered.length === 0 ? (
          <Paper variant="outlined" sx={{ p: 6, textAlign: 'center' }}>
            <SearchOffRounded sx={{ fontSize: 48, color: '#C3CEE6' }} />
            <Typography variant="h6" sx={{ mt: 1 }}>
              Илэрц олдсонгүй
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              Шүүлтүүрээ өөрчилж үзээрэй.
            </Typography>
            <Button onClick={reset} variant="outlined">
              Шүүлтүүр цэвэрлэх
            </Button>
          </Paper>
        ) : (
          <>
            {/* Desktop: хүснэгт */}
            <TableContainer component={Paper} variant="outlined" sx={{ display: { xs: 'none', md: 'block' } }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell width={64} align="center">
                      Төлөв
                    </TableCell>
                    <TableCell width={90}>Дугаар</TableCell>
                    <TableCell>Бодлогын нэр</TableCell>
                    <TableCell>Сэдэв</TableCell>
                    <TableCell width={110}>Түвшин</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <AnimatePresence initial={false}>
                    {visible.map((p) => {
                      const done = solved.has(p.id);
                      return (
                        <TableRow
                          key={p.id}
                          component={motion.tr}
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          hover
                          onClick={() => router.push(`/problems/${p.id}`)}
                          sx={{ cursor: 'pointer', '&:last-child td': { border: 0 } }}
                        >
                          <TableCell align="center" onClick={(e) => e.stopPropagation()}>
                            <Tooltip title={done ? 'Бодсон — дарж буцаах' : 'Бодсон гэж тэмдэглэх'}>
                              <Box
                                component="button"
                                type="button"
                                onClick={() => solved.toggle(p.id)}
                                aria-label="Бодсон төлөв солих"
                                sx={{ border: 0, bgcolor: 'transparent', cursor: 'pointer', p: 0.5, display: 'grid', placeItems: 'center', mx: 'auto' }}
                              >
                                {done ? <CheckCircleRounded sx={{ color: 'success.main' }} /> : <RadioButtonUncheckedRounded sx={{ color: '#C3CEE6' }} />}
                              </Box>
                            </Tooltip>
                          </TableCell>
                          <TableCell sx={{ fontFamily: FONT_MONO, color: 'text.secondary', fontSize: 13.5 }}>{p.code}</TableCell>
                          <TableCell>
                            <Box
                              component={Link}
                              href={`/problems/${p.id}`}
                              onClick={(e) => e.stopPropagation()}
                              sx={{ fontWeight: 600, color: 'text.primary', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}
                            >
                              {p.title}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Stack direction="row" spacing={0.75} useFlexGap flexWrap="wrap">
                              {p.topics.map((t) => (
                                <TopicChip key={t} topic={t} />
                              ))}
                            </Stack>
                          </TableCell>
                          <TableCell>
                            <LevelChip level={p.level} />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </TableContainer>

            {/* Mobile: картууд */}
            <Stack spacing={1.25} sx={{ display: { xs: 'flex', md: 'none' } }}>
              {visible.map((p) => (
                <ProblemListItem key={p.id} problem={p} solved={solved.has(p.id)} />
              ))}
            </Stack>

            {pageCount > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                  count={pageCount}
                  page={page}
                  onChange={(_, v) => {
                    setPage(v);
                    listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  color="primary"
                  shape="rounded"
                  siblingCount={0}
                />
              </Box>
            )}
          </>
        )}
      </Container>
    </>
  );
}

function StatBox({ label, value, level }) {
  return (
    <Grid item xs={6} sm={3}>
      <Paper variant="outlined" sx={{ p: 1.75, bgcolor: 'rgba(255,255,255,0.85)' }}>
        <Typography sx={{ fontSize: 26, fontWeight: 800, color: level ? 'text.primary' : 'primary.main', lineHeight: 1.1 }}>{value}</Typography>
        <Stack direction="row" spacing={0.75} alignItems="center">
          {level && <LevelMeter level={level} size={12} />}
          <Typography variant="body2" color="text.secondary">
            {label}
          </Typography>
        </Stack>
      </Paper>
    </Grid>
  );
}
