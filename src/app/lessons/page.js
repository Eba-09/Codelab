import LessonsGrid from '@/components/lessons/LessonsGrid';
import { getAllLessons } from '@/lib/data';

export const metadata = {
  title: 'Видео хичээл',
  description: 'C++ хэлийг анхан шатнаас өрсөлдөөнт программчлал хүртэл сурах 10 видео хичээл.',
};

export default function LessonsPage() {
  return <LessonsGrid lessons={getAllLessons()} />;
}
