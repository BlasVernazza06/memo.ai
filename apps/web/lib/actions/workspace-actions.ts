'use server';

import { revalidatePath } from 'next/cache';
import { apiFetch } from '@/lib/api-fetch';

export async function deleteWorkspaceAction(workspaceId: string) {
  try {
    await apiFetch(`/workspaces/${workspaceId}`, {
      method: 'DELETE',
    });

    // Invalida el cache del dashboard para que el workspace desaparezca
    revalidatePath('/dashboard');
    
    return { success: true };
  } catch (error) {
    console.error('[ACTION] Error deleting workspace:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Error al eliminar el workspace' 
    };
  }
}
