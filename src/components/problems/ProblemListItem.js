'use client';

import Link from 'next/link';
import { Box, Stack, Typography } from '@mui/material';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import RadioButtonUncheckedRounded from '@mui/icons-material/RadioButtonUncheckedRounded';
import ChevronRightRounded from '@mui/icons-material/ChevronRightRounded';
import { LevelChip, TopicChip } from '@/components/common/Chips';
import { FONT_MONO } from '@/theme/theme';

/** Бодлогын нэг мөр (карт хэлбэр) — mobile жагсаалт, хичээлийн дасгал, нүүр хуудсанд */
export default function ProblemListItem({ problem, solved = false, showTopics = true }) {
  return (
    <Box
      component={Link}
      href={`/problems/${problem.id}`}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        p: { xs: 1.5, sm: 2 },
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        textDecoration: 'none',
        color: 'text.primary',
        transition: 'all .2s',
        '&:hover': { borderColor: '#BFD2F8', boxShadow: '0 8px 22px rgba(30,99,233,0.10)', transform: 'translateY(-2px)' },
        '&:hover .chev': { transform: 'translateX(3px)', color: 'primary.main' },
      }}
    >
      {solved ? (
        <CheckCircleRounded sx={{ color: 'success.main' }} />
      ) : (
        <RadioButtonUncheckedRounded sx={{ color: '#C3CEE6' }} />
      )}
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: showTopics ? 0.75 : 0 }}>
          <Typography sx={{ fontFamily: FONT_MONO, fontSize: 12.5, color: 'text.secondary' }}>{problem.code}</Typography>
          <Typography fontWeight={600} noWrap>
            {problem.title}
          </Typography>
        </Stack>
        {showTopics && (
          <Stack direction="row" spacing={0.75} useFlexGap flexWrap="wrap">
            <LevelChip level={problem.level} />
            {problem.topics.slice(0, 2).map((t) => (
              <TopicChip key={t} topic={t} />
            ))}
          </Stack>
        )}
      </Box>
      <ChevronRightRounded className="chev" sx={{ color: 'text.secondary', transition: 'all .2s' }} />
    </Box>
  );
}
