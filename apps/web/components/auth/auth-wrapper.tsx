import { getDbUser, getSession } from '@/lib/auth-session';
import { AuthProvider } from '@/lib/auth-provider';

export async function AuthWrapper({ children }: { children: React.ReactNode }) {
  const [session, dbUser] = await Promise.all([getSession(), getDbUser()]);

  return (
    <AuthProvider initialSession={session} initialUser={dbUser}>
      {children}
    </AuthProvider>
  );
}
