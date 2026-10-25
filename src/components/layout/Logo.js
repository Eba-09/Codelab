'use client';

import Link from 'next/link';
import { Box, Typography } from '@mui/material';
import { siteConfig } from '@/config/site';
import { FONT_MONO } from '@/theme/theme';

export default function Logo({ light = false, onClick }) {
  return (
    <Box
      component={Link}
      href="/"
      onClick={onClick}
      aria-label={`${siteConfig.name} нүүр хуудас`}
      sx={{ display: 'flex', alignItems: 'center', gap: 1.25, textDecoration: 'none', flexShrink: 0 }}
    >
      <Box
        sx={{
          width: 38,
          height: 38,
          borderRadius: '11px',
          background: 'linear-gradient(135deg, #1E63E9 0%, #0EA5E9 100%)',
          display: 'grid',
          placeItems: 'center',
          color: '#fff',
          fontFamily: FONT_MONO,
          fontWeight: 700,
          fontSize: 14,
          boxShadow: '0 6px 16px rgba(30,99,233,.35)',
        }}
      >
        {'</>'}
      </Box>
      <Typography
        component="span"
        sx={{ fontWeight: 800, fontSize: 20, letterSpacing: '-0.02em', color: light ? '#fff' : 'text.primary' }}
      >
        {siteConfig.logo.first}
        <Box component="span" sx={{ color: light ? '#93C5FD' : 'primary.main' }}>
          {siteConfig.logo.second}
        </Box>
      </Typography>
    </Box>
  );
}
