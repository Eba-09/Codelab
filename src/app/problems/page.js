import { Suspense } from 'react';
import ProblemsExplorer from '@/components/problems/ProblemsExplorer';
import { getProblemList } from '@/lib/data';

export const metadata = {
  title: 'Бодлогын сан',
  description: 'C++ хэлээр бодох, сэдэв ба түвшингээр ангилсан бодлогын сан.',
};

export default function ProblemsPage() {
  return (
    <Suspense fallback={null}>
      <ProblemsExplorer problems={getProblemList()} />
    </Suspense>
  );
}
