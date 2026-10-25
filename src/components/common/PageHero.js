'use client';

import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';

/** Дотор хуудсуудын толгой хэсэг (цэнхэр-цагаан градиент) */
export default function PageHero({ icon, overline, title, subtitle, children }) {
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: 5, md: 8 },
        pb: { xs: 5, md: 7 },
        background:
          'radial-gradient(800px 300px at 85% -10%, rgba(14,165,233,0.18), transparent 70%), radial-gradient(700px 320px at 0% 0%, rgba(30,99,233,0.14), transparent 70%), linear-gradient(180deg, #EEF4FF 0%, #F5F8FF 100%)',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <GridPattern />
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {overline && (
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, color: 'primary.main', mb: 1.5 }}>
              {icon}
              <Typography variant="overline">{overline}</Typography>
            </Box>
          )}
          <Typography variant="h2" component="h1" sx={{ maxWidth: 760 }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography color="text.secondary" sx={{ mt: 1.5, maxWidth: 640, fontSize: { xs: '1rem', md: '1.1rem' } }}>
              {subtitle}
            </Typography>
          )}
          {children}
        </motion.div>
      </Container>
    </Box>
  );
}

function GridPattern() {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        inset: 0,
        backgroundImage:
          'linear-gradient(rgba(30,99,233,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(30,99,233,0.06) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        maskImage: 'radial-gradient(ellipse at 70% 0%, #000 0%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse at 70% 0%, #000 0%, transparent 70%)',
      }}
    />
  );
}
