'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Box, Button, Container, Typography } from '@mui/material';
import HomeRounded from '@mui/icons-material/HomeRounded';
import { FONT_MONO } from '@/theme/theme';

export default function NotFound() {
  return (
    <Container maxWidth="sm" sx={{ py: { xs: 10, md: 16 }, textAlign: 'center' }}>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
        <Typography sx={{ fontFamily: FONT_MONO, fontSize: { xs: 72, md: 110 }, fontWeight: 700, lineHeight: 1 }} className="text-gradient">
          404
        </Typography>
        <Box
          component="pre"
          sx={{ fontFamily: FONT_MONO, color: 'text.secondary', bgcolor: '#fff', border: '1px solid', borderColor: 'divider', borderRadius: 3, p: 2, my: 3, textAlign: 'left', overflowX: 'auto' }}
        >
          {'Runtime Error:\n  page not found at this address'}
        </Box>
        <Typography variant="h5" sx={{ mb: 1 }}>
          Хуудас олдсонгүй
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          Таны хайсан хуудас байхгүй эсвэл зөөгдсөн байна.
        </Typography>
        <Button component={Link} href="/" variant="contained" size="large" startIcon={<HomeRounded />}>
          Нүүр хуудас руу
        </Button>
      </motion.div>
    </Container>
  );
}
