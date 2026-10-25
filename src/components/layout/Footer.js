'use client';

import Link from 'next/link';
import { Box, Container, Grid, IconButton, Stack, Typography } from '@mui/material';
import FacebookRounded from '@mui/icons-material/FacebookRounded';
import YouTube from '@mui/icons-material/YouTube';
import MailOutlineRounded from '@mui/icons-material/MailOutlineRounded';
import Logo from './Logo';
import { NAV_ITEMS } from './navItems';
import { siteConfig } from '@/config/site';
import { roadmap } from '@/data/roadmap';

const linkSx = {
  color: '#A9B8DA',
  textDecoration: 'none',
  fontSize: 14.5,
  '&:hover': { color: '#fff' },
};

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: '#0B1530', color: '#fff', pt: { xs: 7, md: 9 }, pb: 4, mt: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 6 }}>
          <Grid item xs={12} md={5}>
            <Logo light />
            <Typography sx={{ color: '#A9B8DA', mt: 2, maxWidth: 380, lineHeight: 1.7 }}>{siteConfig.description}</Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 2.5 }}>
              {[
                { href: siteConfig.socials.facebook, icon: <FacebookRounded />, label: 'Facebook' },
                { href: siteConfig.socials.youtube, icon: <YouTube />, label: 'YouTube' },
                { href: `mailto:${siteConfig.email}`, icon: <MailOutlineRounded />, label: 'И-мэйл' },
              ].map((s) => (
                <IconButton
                  key={s.label}
                  component="a"
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  sx={{ color: '#A9B8DA', bgcolor: 'rgba(255,255,255,0.06)', '&:hover': { bgcolor: 'rgba(255,255,255,0.12)', color: '#fff' } }}
                >
                  {s.icon}
                </IconButton>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={6} md={3}>
            <Typography fontWeight={700} sx={{ mb: 2 }}>
              Цэс
            </Typography>
            <Stack spacing={1.25}>
              {NAV_ITEMS.map((n) => (
                <Box key={n.href} component={Link} href={n.href} sx={linkSx}>
                  {n.label}
                </Box>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={6} md={4}>
            <Typography fontWeight={700} sx={{ mb: 2 }}>
              Сургалтын шатууд
            </Typography>
            <Stack spacing={1.25}>
              {roadmap.map((r) => (
                <Box key={r.step} component={Link} href={`/roadmap#step-${r.step}`} sx={linkSx}>
                  {r.step}. {r.title}
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: { xs: 5, md: 7 },
            pt: 3,
            borderTop: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            gap: 1,
          }}
        >
          <Typography variant="body2" sx={{ color: '#7C8DB5' }}>
            © {new Date().getFullYear()} {siteConfig.name}. Бүх эрх хуулиар хамгаалагдсан.
          </Typography>
          <Typography variant="body2" sx={{ color: '#7C8DB5' }}>
            Бүртгэлгүй · Үнэгүй · Сурагчдад зориулав
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
