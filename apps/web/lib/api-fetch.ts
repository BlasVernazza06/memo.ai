import { cookies } from 'next/headers';

const API_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  'http://127.0.0.1:3000';

/**
 * Server-side authenticated fetch to the API.
 * Automatically forwards the user's cookies for authentication.
 *
 * Usage (only in Server Components):
 *   const workspaces = await apiFetch<Workspace[]>('/workspaces');
 */
export async function apiFetch<T = unknown>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  const cookieHeader = allCookies.map((c) => `${c.name}=${c.value}`).join('; ');

  const res = await fetch(`${API_URL}/api${path}`, {
    ...options,
    headers: {
      ...options?.headers,
      cookie: cookieHeader,
    },
    cache: options?.cache ?? 'no-store',
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}
