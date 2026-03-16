import { Suspense } from 'react';

import DashHero from '@/components/dashboard/dash-hero';
import WorkspacesList from '@/components/dashboard/workspaces-list';
import WorkspacesSkeleton from '@/components/dashboard/workspaces-skeleton';

export default function DashboardPage() {
  return (
    <div className="space-y-12 py-6">
      {/* Dashboard Hero - Carga al instante */}
      <DashHero />

      {/* Workspaces Section - Carga en segundo plano */}
      <Suspense fallback={<WorkspacesSkeleton />}>
        <WorkspacesList />
      </Suspense>
    </div>
  );
}
