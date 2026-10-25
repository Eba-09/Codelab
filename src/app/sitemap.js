import { siteConfig } from '@/config/site';
import { getAllLessons, getAllProblems } from '@/lib/data';

export default function sitemap() {
  const base = siteConfig.url.replace(/\/$/, '');
  const now = new Date();
  const staticPages = ['', '/lessons', '/problems', '/roadmap'].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.8,
  }));
  const lessons = getAllLessons().map((l) => ({ url: `${base}/lessons/${l.id}`, lastModified: now, priority: 0.7 }));
  const problems = getAllProblems().map((p) => ({ url: `${base}/problems/${p.id}`, lastModified: now, priority: 0.6 }));
  return [...staticPages, ...lessons, ...problems];
}
