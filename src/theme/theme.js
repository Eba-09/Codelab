import { createTheme, responsiveFontSizes, alpha } from '@mui/material/styles';

const BRAND = {
  blue: '#1E63E9',
  blueLight: '#5B8DF6',
  blueDark: '#1446B0',
  sky: '#0EA5E9',
  ink: '#0F1B3D',
  muted: '#55627F',
  line: '#E3EAF7',
  bg: '#F5F8FF',
};

export const FONT_MONO = '"JetBrains Mono", "Fira Code", Consolas, Menlo, monospace';

let theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: BRAND.blue, light: BRAND.blueLight, dark: BRAND.blueDark, contrastText: '#fff' },
    secondary: { main: BRAND.sky, contrastText: '#fff' },
    success: { main: '#16A34A' },
    warning: { main: '#F59E0B' },
    error: { main: '#E11D48' },
    background: { default: BRAND.bg, paper: '#FFFFFF' },
    text: { primary: BRAND.ink, secondary: BRAND.muted },
    divider: BRAND.line,
  },
  // sx дотор borderRadius: 3 → 12px гэж тооцогдоно (4px алхамтай)
  shape: { borderRadius: 4 },
  typography: {
    fontFamily: 'Inter, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1 },
    h2: { fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.15 },
    h3: { fontWeight: 800, letterSpacing: '-0.02em' },
    h4: { fontWeight: 700, letterSpacing: '-0.015em' },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    subtitle1: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
    overline: { fontWeight: 700, letterSpacing: '0.12em' },
  },
  shadows: [
    'none',
    '0 1px 2px rgba(15,27,61,0.04)',
    '0 2px 6px rgba(15,27,61,0.05)',
    '0 4px 12px rgba(15,27,61,0.06)',
    '0 8px 20px rgba(15,27,61,0.07)',
    '0 12px 28px rgba(15,27,61,0.08)',
    ...Array(19).fill('0 16px 40px rgba(15,27,61,0.10)'),
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        'html, body': { scrollBehavior: 'smooth' },
        body: { WebkitFontSmoothing: 'antialiased' },
        '::selection': { background: alpha(BRAND.blue, 0.18) },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 10, paddingInline: 18 },
        sizeLarge: { paddingBlock: 12, paddingInline: 24, fontSize: '1rem' },
        containedPrimary: {
          backgroundImage: `linear-gradient(135deg, ${BRAND.blue} 0%, ${BRAND.blueLight} 100%)`,
          boxShadow: `0 6px 16px ${alpha(BRAND.blue, 0.28)}`,
          '&:hover': { boxShadow: `0 8px 22px ${alpha(BRAND.blue, 0.38)}` },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: { borderRadius: 16 },
        outlined: { borderColor: BRAND.line },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          borderRadius: 18,
          border: `1px solid ${BRAND.line}`,
          boxShadow: '0 1px 2px rgba(15,27,61,0.04)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600, borderRadius: 8 },
        sizeSmall: { height: 24, fontSize: '0.75rem' },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700,
          color: BRAND.muted,
          fontSize: '0.78rem',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          backgroundColor: '#F8FAFF',
        },
        root: { borderColor: BRAND.line },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: '#fff',
          '& .MuiOutlinedInput-notchedOutline': { borderColor: BRAND.line },
        },
      },
    },
    MuiTab: { styleOverrides: { root: { textTransform: 'none', fontWeight: 600, minHeight: 48 } } },
    MuiTooltip: {
      styleOverrides: { tooltip: { backgroundColor: BRAND.ink, fontSize: '0.75rem', borderRadius: 8 } },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          border: `1px solid ${BRAND.line}`,
          '&:before': { display: 'none' },
          '&.Mui-expanded': { margin: 0 },
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme, { factor: 2.4 });

export { BRAND };
export default theme;
