import { WorkspaceCardDTO } from '@repo/validators';

import DashWorkspacesSec from '@/components/dashboard/home/dash-workspaces-sec';
import { apiFetch } from '@/lib/api-fetch';

export default async function WorkspacesList() {
  // El fetch ocurre aquí, permitiendo que el resto de la página cargue primero (SSR)
  const workspaces =
    (await apiFetch<WorkspaceCardDTO[]>('/workspaces', {
      next: { revalidate: 0 },
    })) || [];

  console.log(workspaces);

  return <DashWorkspacesSec workspaces={workspaces} />;
}
