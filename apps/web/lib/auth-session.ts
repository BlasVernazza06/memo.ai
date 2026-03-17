import { apiFetch } from './api-fetch';
import type { AuthUser } from './auth-provider';

export { getSession } from '@repo/auth/session';

export async function getDbUser(): Promise<AuthUser | null> {
  try {
    return await apiFetch<AuthUser>('/users/me');
  } catch (error) {
    return null;
  }
}
