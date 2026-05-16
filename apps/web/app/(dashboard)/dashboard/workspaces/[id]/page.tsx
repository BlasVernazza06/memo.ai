import { WorkspaceDetailDTO } from '@repo/validators';

import WorkspaceDetailClient from '@/components/dashboard/workspace/layout/workspace-detail-client';
import WorkspaceNotFound from '@/components/dashboard/workspace/shared/workspace-not-found';
import { apiFetch } from '@/lib/api-fetch';

export default async function WorkspaceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: rawId } = await params;
  const id = rawId.includes('-') ? rawId.split('-').pop() : rawId;

  let workspace: WorkspaceDetailDTO | null = null;
  try {
    workspace = await apiFetch<WorkspaceDetailDTO>(`/workspaces/${id}`, {
      next: { revalidate: 0 },
    });
  } catch (error) {
    console.error('Error fetching workspace on server:', error);
  }

  if (!workspace) {
    return <WorkspaceNotFound />;
  }

  return (
    <WorkspaceDetailClient
      initialWorkspace={workspace}
      workspaceId={id as string}
    />
  );
}
