import HomeRounded from '@mui/icons-material/HomeRounded';
import OndemandVideoRounded from '@mui/icons-material/OndemandVideoRounded';
import CodeRounded from '@mui/icons-material/CodeRounded';
import RouteRounded from '@mui/icons-material/RouteRounded';

export const NAV_ITEMS = [
  { href: '/', label: 'Нүүр', icon: HomeRounded },
  { href: '/lessons', label: 'Видео хичээл', icon: OndemandVideoRounded },
  { href: '/problems', label: 'Бодлогын сан', icon: CodeRounded },
  { href: '/roadmap', label: 'Сургалтын зам', icon: RouteRounded },
];

export const isActivePath = (pathname, href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));
