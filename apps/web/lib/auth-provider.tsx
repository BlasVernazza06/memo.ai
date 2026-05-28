'use client';

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';

import { UserDTO } from '@repo/validators';
import { apiFetchClient } from './api-client';
import { authClient } from './auth-client';

export type AuthUser = UserDTO;

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
  initialSession,
  initialUser,
}: {
  children: ReactNode;
  initialSession?: any;
  initialUser?: AuthUser | null;
}) {
  const { data: session, isPending } = authClient.useSession();
  const [dbUser, setDbUser] = useState<AuthUser | null>(initialUser || null);
  const [isFetchingDb, setIsFetchingDb] = useState(false);

  const fetchDbUser = useCallback(async (force = false) => {
    const currentSession = session || initialSession;
    if (currentSession?.user?.id) {
      // Evitar recarga constante si los datos ya existen en caché de sesión y no es forzado
      if (!force && dbUser && dbUser.id === currentSession.user.id) {
        const lastFetch = sessionStorage.getItem('auth_last_fetch');
        const now = Date.now();
        // Si se cargó hace menos de 5 minutos, evitar consulta HTTP redundante
        if (lastFetch && now - parseInt(lastFetch, 10) < 5 * 60 * 1000) {
          return;
        }
      }

      setIsFetchingDb(true);
      try {
        const userFromDb = await apiFetchClient<AuthUser>('/users/me');
        setDbUser(userFromDb);
        sessionStorage.setItem('auth_last_fetch', Date.now().toString());
      } catch (error) {
        console.error('Error fetching user data from DB:', error);
        setDbUser(null);
      } finally {
        setIsFetchingDb(false);
      }
    } else {
      setDbUser(null);
      sessionStorage.removeItem('auth_last_fetch');
    }
  }, [session, initialSession, dbUser]);

  useEffect(() => {
    fetchDbUser();
  }, [session?.user?.id]); // Solo disparar de nuevo si el ID de usuario cambia o se inicia sesión

  const isLoading = (isPending && !initialSession) || isFetchingDb;

  const refreshUser = useCallback(() => fetchDbUser(true), [fetchDbUser]);

  return (
    <AuthContext.Provider value={{ user: dbUser, isLoading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
