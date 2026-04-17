import { Suspense } from 'react';

import DashHero from '@/components/dashboard/dash-hero';
import WorkspacesList from '@/components/dashboard/workspace/workspaces-list';
import WorkspacesSkeleton from '@/components/dashboard/workspace/workspaces-skeleton';
import { apiFetch } from '@/lib/api-fetch';

export default async function DashboardPage() {
  const summary = await apiFetch<{
    workspaces: number;
    docs: number;
    flashcards: number;
  }>('/workspaces/summary', { next: { revalidate: 0 } });

  return (
    <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-10 lg:py-16 space-y-12">
      {/* Dashboard Hero - Carga al instante */}
      <DashHero
        summary={summary || { workspaces: 0, docs: 0, flashcards: 0 }}
      />

      {/* Workspaces Section - Carga en segundo plano */}
      <Suspense fallback={<WorkspacesSkeleton />}>
        <WorkspacesList />
      </Suspense>
    </div>
  );
}
