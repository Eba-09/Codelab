'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import MenuRounded from '@mui/icons-material/MenuRounded';
import CloseRounded from '@mui/icons-material/CloseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import Logo from './Logo';
import { NAV_ITEMS, isActivePath } from './navItems';

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 8 });

  // Хуудас солигдоход mobile цэсийг хаана
  useEffect(() => setOpen(false), [pathname]);

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{
        bgcolor: (t) => alpha(t.palette.background.paper, 0.82),
        backdropFilter: 'saturate(180%) blur(14px)',
        borderBottom: '1px solid',
        borderColor: scrolled ? 'divider' : 'transparent',
        boxShadow: scrolled ? '0 6px 24px rgba(15,27,61,0.06)' : 'none',
        transition: 'box-shadow .25s, border-color .25s',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 72 }, gap: 2 }}>
          <Logo />

          <Box component="nav" aria-label="Үндсэн цэс" sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, ml: 4 }}>
            {NAV_ITEMS.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <Button
                  key={item.href}
                  component={Link}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  sx={{
                    position: 'relative',
                    color: active ? 'primary.main' : 'text.secondary',
                    px: 2,
                    py: 1,
                    '&:hover': { color: 'primary.main', bgcolor: 'transparent' },
                  }}
                >
                  {item.label}
                  {active && (
                    <Box
                      component={motion.span}
                      layoutId="nav-underline"
                      transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                      sx={{
                        position: 'absolute',
                        left: 14,
                        right: 14,
                        bottom: 2,
                        height: 3,
                        borderRadius: 3,
                        bgcolor: 'primary.main',
                      }}
                    />
                  )}
                </Button>
              );
            })}
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Button
            component={Link}
            href="/lessons/1"
            variant="contained"
            endIcon={<PlayArrowRounded />}
            sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
          >
            Сурч эхлэх
          </Button>

          <IconButton
            onClick={() => setOpen(true)}
            aria-label="Цэс нээх"
            sx={{ display: { md: 'none' }, border: '1px solid', borderColor: 'divider', borderRadius: 2.5 }}
          >
            <MenuRounded />
          </IconButton>
        </Toolbar>
      </Container>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ sx: { width: 'min(320px, 86vw)', borderRadius: '20px 0 0 20px' } }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
          <Logo onClick={() => setOpen(false)} />
          <IconButton onClick={() => setOpen(false)} aria-label="Цэс хаах">
            <CloseRounded />
          </IconButton>
        </Box>
        <Divider />
        <List sx={{ p: 1.5 }}>
          {NAV_ITEMS.map((item, i) => {
            const active = isActivePath(pathname, item.href);
            const Icon = item.icon;
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * i }}
              >
                <ListItemButton
                  component={Link}
                  href={item.href}
                  selected={active}
                  sx={{
                    borderRadius: 3,
                    mb: 0.5,
                    '&.Mui-selected': { bgcolor: 'rgba(30,99,233,0.08)', color: 'primary.main' },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: active ? 'primary.main' : 'text.secondary' }}>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600 }} />
                </ListItemButton>
              </motion.div>
            );
          })}
        </List>
        <Box sx={{ mt: 'auto', p: 2 }}>
          <Button component={Link} href="/lessons/1" fullWidth size="large" variant="contained" endIcon={<PlayArrowRounded />}>
            Сурч эхлэх
          </Button>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 1.5 }}>
            Бүртгэл шаардлагагүй · 100% үнэгүй
          </Typography>
        </Box>
      </Drawer>
    </AppBar>
  );
}
