'use client';

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';

import { apiFetchClient } from './api-client';
import { authClient } from './auth-client';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  plan: 'free' | 'pro';
  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;
  stripeSubscriptionStatus?: string | null;
  stripePriceId?: string | null;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
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
  const [dbUser, setDbUser] = useState<AuthUser | null>(null);
  const [isFetchingDb, setIsFetchingDb] = useState(false);

  const fetchDbUser = useCallback(async () => {
    const currentSession = session || initialSession;
    if (currentSession?.user?.id) {
      setIsFetchingDb(true);
      try {
        const userFromDb = await apiFetchClient<AuthUser>('/users/me');
        setDbUser(userFromDb);
      } catch (error) {
        console.error('Error fetching user data from DB:', error);
        setDbUser(null);
      } finally {
        setIsFetchingDb(false);
      }
    } else {
      setDbUser(null);
    }
  }, [session, initialSession]);

  useEffect(() => {
    fetchDbUser();
  }, [fetchDbUser]);

  const isLoading = (isPending && !initialSession) || isFetchingDb;

  return (
    <AuthContext.Provider value={{ user: dbUser, isLoading, refreshUser: fetchDbUser }}>
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
