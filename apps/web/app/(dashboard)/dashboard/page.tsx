import { Suspense } from 'react';

import DashHero from '@/components/dashboard/home/dash-hero';
import WorkspacesList from '@/components/dashboard/workspace/list/workspaces-list';
import WorkspacesSkeleton from '@/components/dashboard/workspace/shared/workspaces-skeleton';
import { apiFetch } from '@/lib/api-fetch';

export default async function DashboardPage() {
  const summary = await apiFetch<{
    workspaces: number;
    currentStreak: number;
    achievements: number;
  }>('/workspaces/summary', { next: { revalidate: 0 } });

  return (
    <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-10 lg:py-16 space-y-12">
      {/* Dashboard Hero - Carga al instante */}
      <DashHero
        summary={summary || { workspaces: 0, currentStreak: 0, achievements: 0 }}
      />

      {/* Workspaces Section - Carga en segundo plano */}
      <Suspense fallback={<WorkspacesSkeleton />}>
        <WorkspacesList />
      </Suspense>
    </div>
  );
}
