'use client';

import { Box, Typography } from '@mui/material';
import Reveal from './Reveal';

export default function SectionHeader({ overline, title, subtitle, align = 'center', action }) {
  const centered = align === 'center';
  return (
    <Reveal>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: centered ? 'column' : 'row' },
          alignItems: { xs: centered ? 'center' : 'flex-start', md: centered ? 'center' : 'flex-end' },
          justifyContent: 'space-between',
          textAlign: centered ? 'center' : 'left',
          gap: 2,
          mb: { xs: 4, md: 6 },
        }}
      >
        <Box sx={{ maxWidth: 680 }}>
          {overline && (
            <Typography variant="overline" color="primary" sx={{ display: 'block', mb: 1 }}>
              {overline}
            </Typography>
          )}
          <Typography variant="h3" component="h2" sx={{ mb: subtitle ? 1.5 : 0 }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography color="text.secondary" sx={{ fontSize: { xs: '1rem', md: '1.075rem' } }}>
              {subtitle}
            </Typography>
          )}
        </Box>
        {action}
      </Box>
    </Reveal>
  );
}
