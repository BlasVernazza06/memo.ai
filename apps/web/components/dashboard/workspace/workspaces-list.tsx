import DashWorkspacesSec from '@/components/dashboard/dash-workspaces-sec';
import { apiFetch } from '@/lib/api-fetch';
import type { Workspace } from '@/types/workspaces';

export default async function WorkspacesList() {
  // El fetch ocurre aquí, permitiendo que el resto de la página cargue primero (SSR)
  const workspaces =
    (await apiFetch<Workspace[]>('/workspaces', {
      next: { revalidate: 0 },
    })) || [];

  return <DashWorkspacesSec workspaces={workspaces} />;
}
