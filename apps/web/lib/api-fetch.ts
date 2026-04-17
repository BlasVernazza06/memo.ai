import { cookies } from 'next/headers';

const API_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  'http://127.0.0.1:3000';

/**
 * Server-side authenticated fetch to the API.
 * Automatically forwards the user's cookies for authentication (unless skipCookies is true).
 *
 * Usage (only in Server Components):
 *   const workspaces = await apiFetch<Workspace[]>('/workspaces');
 */
export async function apiFetch<T = unknown>(
  path: string,
  options?: RequestInit & { skipCookies?: boolean },
): Promise<T> {
  const headers: Record<string, string> = {
    ...(options?.headers as Record<string, string>),
  };

  if (!options?.skipCookies) {
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();
    if (allCookies.length > 0) {
      headers.cookie = allCookies
        .map((c) => `${c.name}=${c.value}`)
        .join('; ');
    }
  }

  if (options?.body) {
    headers['Content-Type'] = 'application/json';
  }

  const { skipCookies: _, ...restOptions } = options || {};

  const res = await fetch(`${API_URL}/api${path}`, {
    next: { revalidate: 60 },
    ...restOptions,
    headers,
    ...(restOptions?.next ? { next: { revalidate: 60, ...restOptions.next } } : {}),
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}
