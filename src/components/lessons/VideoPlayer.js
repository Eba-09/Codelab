'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Box, Typography } from '@mui/material';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import VideoLibraryRounded from '@mui/icons-material/VideoLibraryRounded';
import { getYoutubeId, youtubeEmbed, youtubeThumb } from '@/lib/youtube';

/**
 * YouTube тоглуулагч.
 * - Эхлээд зөвхөн thumbnail ачаална (хурдан), дарахад iframe нээгдэнэ.
 * - youtube-nocookie домэйн, татах товчгүй embed.
 */
export default function VideoPlayer({ url, title }) {
  const id = getYoutubeId(url);
  const [playing, setPlaying] = useState(false);

  const frameSx = {
    position: 'relative',
    width: '100%',
    aspectRatio: '16 / 9',
    borderRadius: { xs: 3, md: 4 },
    overflow: 'hidden',
    bgcolor: '#0B1530',
    boxShadow: '0 20px 48px rgba(15,27,61,0.18)',
  };

  if (!id) {
    return (
      <Box
        sx={{
          ...frameSx,
          display: 'grid',
          placeItems: 'center',
          background: 'linear-gradient(135deg, #1446B0 0%, #1E63E9 50%, #0EA5E9 100%)',
          color: '#fff',
          textAlign: 'center',
          p: 3,
        }}
      >
        <Box>
          <VideoLibraryRounded sx={{ fontSize: { xs: 44, md: 64 }, opacity: 0.9 }} />
          <Typography variant="h6" sx={{ mt: 1 }}>
            Видео удахгүй нэмэгдэнэ
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8, mt: 0.5 }}>
            Энэ хичээлийн бичлэг хараахан байршаагүй байна.
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={frameSx} onContextMenu={(e) => e.preventDefault()}>
      <AnimatePresence mode="wait">
        {playing ? (
          <motion.iframe
            key="frame"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            src={youtubeEmbed(id)}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
          />
        ) : (
          <Box
            key="poster"
            component={motion.button}
            type="button"
            exit={{ opacity: 0 }}
            onClick={() => setPlaying(true)}
            aria-label={`${title} — видеог тоглуулах`}
            sx={{
              position: 'absolute',
              inset: 0,
              p: 0,
              border: 0,
              cursor: 'pointer',
              bgcolor: 'transparent',
              '&:hover .play': { transform: 'translate(-50%, -50%) scale(1.08)' },
              '&:focus-visible': { outline: '3px solid #93C5FD', outlineOffset: -3 },
            }}
          >
            <Box
              component="img"
              src={youtubeThumb(id)}
              alt=""
              loading="lazy"
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(11,21,48,0) 40%, rgba(11,21,48,0.55) 100%)' }} />
            <Box
              className="play"
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: { xs: 64, md: 84 },
                height: { xs: 64, md: 84 },
                borderRadius: '50%',
                display: 'grid',
                placeItems: 'center',
                bgcolor: 'rgba(255,255,255,0.95)',
                color: 'primary.main',
                boxShadow: '0 12px 30px rgba(0,0,0,0.3)',
                transition: 'transform .25s ease',
              }}
            >
              <PlayArrowRounded sx={{ fontSize: { xs: 38, md: 50 } }} />
            </Box>
          </Box>
        )}
      </AnimatePresence>
    </Box>
  );
}
