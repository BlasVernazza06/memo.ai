'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { UpdateWorkspaceSchema } from '@repo/validators';

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

export async function updateWorkspaceAction(
  workspaceId: string,
  data: z.infer<typeof UpdateWorkspaceSchema>
) {
  try {
    const validatedData = UpdateWorkspaceSchema.safeParse(data);

    if (!validatedData.success) {
      return {
        success: false,
        error: 'Datos de actualización inválidos',
      };
    }

    await apiFetch(`/workspaces/${workspaceId}`, {
      method: 'PATCH',
      body: JSON.stringify(validatedData.data),
    });

    // Invalida el cache del dashboard y del workspace específico
    revalidatePath('/dashboard');
    revalidatePath(`/dashboard/workspaces/${workspaceId}`);

    return { success: true };
  } catch (error) {
    console.error('[ACTION] Error updating workspace:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error al actualizar el workspace',
    };
  }
}
