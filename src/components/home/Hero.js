'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Box, Button, Chip, Container, Grid, Stack, Typography } from '@mui/material';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import CodeRounded from '@mui/icons-material/CodeRounded';
import LockOpenRounded from '@mui/icons-material/LockOpenRounded';
import BoltRounded from '@mui/icons-material/BoltRounded';
import EmojiEventsRounded from '@mui/icons-material/EmojiEventsRounded';
import CodeBlock from '@/components/common/CodeBlock';

const HERO_CODE = `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;               // гараас n тоо орно
    vector<int> a(n);
    for (int &x : a) cin >> x;

    sort(a.begin(), a.end());
    cout << a.back() << "\\n"; // хамгийн их
    return 0;
}`;

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero({ stats }) {
  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: 6, md: 10 },
        pb: { xs: 8, md: 12 },
        background: 'linear-gradient(180deg, #EAF1FF 0%, #F5F8FF 70%)',
      }}
    >
      <Blob sx={{ top: -140, right: -120, bgcolor: 'rgba(14,165,233,0.28)' }} />
      <Blob sx={{ bottom: -180, left: -160, bgcolor: 'rgba(30,99,233,0.22)' }} delay={2} />
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(30,99,233,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(30,99,233,0.07) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          maskImage: 'radial-gradient(ellipse at 50% 30%, #000 10%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 30%, #000 10%, transparent 70%)',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Grid container spacing={{ xs: 6, md: 6 }} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div variants={container} initial="hidden" animate="show">
              <motion.div variants={item}>
                <Chip
                  icon={<LockOpenRounded sx={{ fontSize: 18 }} />}
                  label="100% үнэгүй · Бүртгэл шаардлагагүй"
                  sx={{ bgcolor: '#fff', color: 'primary.main', border: '1px solid #D5E2FB', mb: 3, px: 0.5, '& .MuiChip-icon': { color: 'primary.main' } }}
                />
              </motion.div>
              <motion.div variants={item}>
                <Typography variant="h1" sx={{ fontSize: { xs: '2.4rem', sm: '3.1rem', md: '3.6rem' } }}>
                  C++ хэлийг{' '}
                  <Box component="span" className="text-gradient">
                    тэгээс
                  </Box>{' '}
                  олимпиад хүртэл сур
                </Typography>
              </motion.div>
              <motion.div variants={item}>
                <Typography color="text.secondary" sx={{ mt: 2.5, fontSize: { xs: '1.05rem', md: '1.2rem' }, lineHeight: 1.7, maxWidth: 540 }}>
                  Сурагчдад зориулсан видео хичээл ба бодлогын сан. Анхны <code>cout</code>-оос эхлээд динамик программчлал, граф хүртэл алхам алхмаар.
                </Typography>
              </motion.div>
              <motion.div variants={item}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 4 }}>
                  <Button component={Link} href="/lessons/1" size="large" variant="contained" startIcon={<PlayArrowRounded />}>
                    Хичээл үзэж эхлэх
                  </Button>
                  <Button
                    component={Link}
                    href="/problems"
                    size="large"
                    variant="outlined"
                    startIcon={<CodeRounded />}
                    sx={{ bgcolor: '#fff', borderColor: '#D5E2FB', '&:hover': { bgcolor: '#fff' } }}
                  >
                    Бодлогын сан
                  </Button>
                </Stack>
              </motion.div>
              <motion.div variants={item}>
                <Stack direction="row" spacing={{ xs: 3, sm: 5 }} sx={{ mt: 5 }}>
                  {[
                    { value: stats.lessons, label: 'Видео хичээл' },
                    { value: `${stats.problems}+`, label: 'Бодлого' },
                    { value: '0₮', label: 'Төлбөр' },
                  ].map((s) => (
                    <Box key={s.label}>
                      <Typography sx={{ fontSize: { xs: 26, md: 32 }, fontWeight: 800, color: 'text.primary', lineHeight: 1 }}>{s.value}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        {s.label}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </motion.div>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ position: 'relative', maxWidth: 540, mx: 'auto' }}>
              <motion.div
                initial={{ opacity: 0, y: 30, rotate: -1.5 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
                  <CodeBlock code={HERO_CODE} title="main.cpp" />
                </motion.div>
              </motion.div>

              <FloatBadge
                icon={<BoltRounded />}
                title="O(n log n)"
                text="Хурдан алгоритм"
                color="#1E63E9"
                sx={{ top: { xs: -18, md: -26 }, right: { xs: -4, md: -28 } }}
                delay={0.7}
              />
              <FloatBadge
                icon={<EmojiEventsRounded />}
                title="Олимпиад"
                text="Бэлтгэлд зориулсан"
                color="#1E63E9"
                sx={{ bottom: { xs: -22, md: -30 }, left: { xs: -4, md: -32 } }}
                delay={0.9}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function Blob({ sx, delay = 0 }) {
  return (
    <Box
      component={motion.div}
      aria-hidden
      animate={{ scale: [1, 1.12, 1], opacity: [0.8, 1, 0.8] }}
      transition={{ duration: 10, repeat: Infinity, delay }}
      sx={{ position: 'absolute', width: 460, height: 460, borderRadius: '50%', filter: 'blur(80px)', ...sx }}
    />
  );
}

function FloatBadge({ icon, title, text, color, sx, delay }) {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 260, damping: 18 }}
      sx={{
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        gap: 1.25,
        px: 1.75,
        py: 1.25,
        borderRadius: 3,
        bgcolor: '#fff',
        border: '1px solid #E3EAF7',
        boxShadow: '0 14px 34px rgba(15,27,61,0.12)',
        ...sx,
      }}
    >
      <Box sx={{ width: 36, height: 36, borderRadius: 2, display: 'grid', placeItems: 'center', bgcolor: `${color}1A`, color }}>{icon}</Box>
      <Box>
        <Typography fontWeight={800} fontSize={14.5} lineHeight={1.2}>
          {title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {text}
        </Typography>
      </Box>
    </Box>
  );
}
