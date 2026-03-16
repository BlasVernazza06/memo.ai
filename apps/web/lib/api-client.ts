const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  'http://localhost:3000';

/**
 * Client-side authenticated fetch to the API.
 * Automatically includes credentials (cookies) for authentication.
 *
 * Usage (only in Client Components):
 *   const workspaces = await apiFetchClient<Workspace[]>('/workspaces');
 */
export async function apiFetchClient<T = unknown>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${API_URL}/api${path}`, {
    ...options,
    credentials: 'include',
    headers: {
      ...(options?.body instanceof FormData
        ? {}
        : { 'Content-Type': 'application/json' }),
      ...options?.headers,
    },
    cache: options?.cache ?? 'no-store',
  });

  if (!res.ok) {
    const errorMsg = await res.text();
    throw new Error(`API error ${res.status}: ${errorMsg || res.statusText}`);
  }

  return res.json() as Promise<T>;
}
