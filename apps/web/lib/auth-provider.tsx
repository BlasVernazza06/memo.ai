'use client';

import { ReactNode, createContext, useContext } from 'react';

import { authClient } from './auth-client';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  image?: string | null;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
  initialSession,
}: {
  children: ReactNode;
  initialSession?: any;
}) {
  const { data: session, isPending } = authClient.useSession();
  // Si el cliente está cargando (isPending), usamos la data del servidor (initialSession)
  // Si el cliente ya cargó, usamos la data fresca (session)
  const currentSession = session || initialSession;
  const user = currentSession?.user ?? null;

  return (
    <AuthContext.Provider
      value={{ user, isLoading: isPending && !initialSession }}
    >
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
