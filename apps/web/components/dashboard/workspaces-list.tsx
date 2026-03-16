import DashWorkspacesSec from '@/components/dashboard/dash-workspaces-sec';
import { apiFetch } from '@/lib/api-fetch';
import type { DbWorkspace } from '@repo/db';

export default async function WorkspacesList() {
  // El fetch ocurre aquí, permitiendo que el resto de la página cargue primero
  const workspaces = await apiFetch<DbWorkspace[]>('/workspaces') || [];

  return <DashWorkspacesSec workspaces={workspaces} />;
}
