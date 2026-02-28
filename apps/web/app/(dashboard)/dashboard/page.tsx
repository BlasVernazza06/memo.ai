import DashHero from '@/components/dashboard/dash-hero';
import DashWorkspacesSec from '@/components/dashboard/dash-workspaces-sec';
import { Workspace } from '@/components/dashboard/workspace-card';
import { apiFetch } from '@/lib/api-fetch';

export default async function DashboardPage() {
  const workspaces = await apiFetch<Workspace[]>('/workspaces');

  return (
    <div className="space-y-12 py-6">
      {/* Dashboard Hero */}
      <DashHero />

      {/* Workspaces Section */}
      <DashWorkspacesSec initialWorkspaces={workspaces} />
    </div>
  );
}
