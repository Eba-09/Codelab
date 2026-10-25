'use client';

import { Fragment } from 'react';
import { Box, Typography } from '@mui/material';
import { FONT_MONO } from '@/theme/theme';

/** `backtick` доторх текстийг inline код болгож харуулна */
export default function RichText({ text = '', component = 'p', ...props }) {
  const parts = String(text).split(/(`[^`]+`)/g);
  return (
    <Typography component={component} {...props}>
      {parts.map((part, i) =>
        part.length > 1 && part.startsWith('`') && part.endsWith('`') ? (
          <Box
            key={i}
            component="code"
            sx={{
              fontFamily: FONT_MONO,
              fontSize: '0.88em',
              px: 0.75,
              py: 0.15,
              mx: 0.15,
              borderRadius: 1,
              bgcolor: '#EEF3FF',
              color: 'primary.dark',
              border: '1px solid #DCE6FB',
              whiteSpace: 'pre-wrap',
            }}
          >
            {part.slice(1, -1)}
          </Box>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </Typography>
  );
}
