'use client';

import { useState } from 'react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import ContentCopyRounded from '@mui/icons-material/ContentCopyRounded';
import CheckRounded from '@mui/icons-material/CheckRounded';
import { FONT_MONO } from '@/theme/theme';

/* ───────── Энгийн C++ syntax highlighter (гадны сан шаардахгүй) ───────── */
const KEYWORDS =
  'auto|break|case|class|const|continue|default|do|else|for|if|namespace|return|static|struct|switch|using|while|true|false|nullptr|template|typename|new|delete|sizeof';
const TYPES =
  'int|long|double|float|char|bool|void|unsigned|short|string|vector|pair|map|set|queue|stack|deque|priority_queue|unordered_map|unordered_set|size_t';
const BUILTINS = 'std|cin|cout|endl|main|sort|max|min|swap|reverse|getline|printf|scanf';

const TOKEN_RE = new RegExp(
  [
    '(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)', // 1 comment
    '("(?:\\\\.|[^"\\\\])*"|\'(?:\\\\.|[^\'\\\\])*\')', // 2 string / char
    '(#\\s*\\w+[^\\n]*)', // 3 preprocessor
    '\\b(\\d+(?:\\.\\d+)?(?:LL|ll|ULL|u|U|f)?)\\b', // 4 number
    `\\b(${KEYWORDS})\\b`, // 5 keyword
    `\\b(${TYPES})\\b`, // 6 type
    `\\b(${BUILTINS})\\b`, // 7 builtin
  ].join('|'),
  'g',
);

const COLORS = ['', '#6B7A99', '#22C55E', '#C084FC', '#F59E0B', '#60A5FA', '#38BDF8', '#F472B6'];

function highlight(code) {
  const out = [];
  let last = 0;
  for (const m of code.matchAll(TOKEN_RE)) {
    if (m.index > last) out.push(code.slice(last, m.index));
    const group = m.findIndex((g, i) => i > 0 && g !== undefined);
    out.push(
      <span
        key={m.index}
        style={{ color: COLORS[group], fontStyle: group === 1 ? 'italic' : 'normal', fontWeight: group === 5 ? 600 : 400 }}
      >
        {m[0]}
      </span>,
    );
    last = m.index + m[0].length;
  }
  if (last < code.length) out.push(code.slice(last));
  return out;
}

export function useCopy(timeout = 1600) {
  const [copied, setCopied] = useState(false);
  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), timeout);
  };
  return { copied, copy };
}

export default function CodeBlock({ code, title = 'main.cpp', language = 'cpp', maxHeight, sx }) {
  const { copied, copy } = useCopy();
  return (
    <Box
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        bgcolor: '#0B1530',
        border: '1px solid #1C2A52',
        boxShadow: '0 12px 32px rgba(11,21,48,0.18)',
        ...sx,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 2,
          py: 1,
          bgcolor: '#0F1C3F',
          borderBottom: '1px solid #1C2A52',
        }}
      >
        <Box sx={{ display: 'flex', gap: 0.75 }}>
          {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
            <Box key={c} sx={{ width: 11, height: 11, borderRadius: '50%', bgcolor: c }} />
          ))}
        </Box>
        <Typography sx={{ ml: 1, color: '#8EA0C9', fontFamily: FONT_MONO, fontSize: 12.5, flex: 1 }}>
          {title}
        </Typography>
        <Tooltip title={copied ? 'Хуулагдлаа!' : 'Хуулах'}>
          <IconButton size="small" onClick={() => copy(code)} sx={{ color: '#8EA0C9', '&:hover': { color: '#fff' } }}>
            {copied ? <CheckRounded fontSize="small" /> : <ContentCopyRounded fontSize="small" />}
          </IconButton>
        </Tooltip>
      </Box>
      <Box
        component="pre"
        sx={{
          m: 0,
          p: { xs: 2, sm: 2.5 },
          overflow: 'auto',
          maxHeight,
          fontFamily: FONT_MONO,
          fontSize: { xs: 12.5, sm: 13.5 },
          lineHeight: 1.7,
          color: '#E2E8F7',
          tabSize: 4,
        }}
      >
        <code>{language === 'cpp' ? highlight(code) : code}</code>
      </Box>
    </Box>
  );
}
