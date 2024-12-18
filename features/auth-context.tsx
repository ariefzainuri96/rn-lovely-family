import AppInit from '@/components/AppInit';
import { useStorageState } from '@/hooks/use-storage-state';
import { useRouter, useSegments } from 'expo-router';
import { createContext, useContext, useEffect, type PropsWithChildren } from 'react';

type TAuthContext = {
  token: string | null;
  signIn: (nis: string) => void;
  signOut: () => void;
};

const AuthContext = createContext<TAuthContext | null>(null);

export function useAuth() {
  const value = useContext(AuthContext);

  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useAuth must be used inside an <AuthProvider />');
    }
  }

  return value;
}

export function AuthProvider({ children }: PropsWithChildren) {
  const segments = useSegments();
  const router = useRouter();

  const [[loading, token], setToken] = useStorageState('token');

  useEffect(() => {
    if (loading) return;

    if (!token && segments[0] !== '(auth)') {
      router.replace('/(auth)/login');
    } else if (token && segments[0] !== '(app)') {
      router.replace('/(app)');
    }
  }, [loading, token, segments]);

  if (loading) return <AppInit />;

  return (
    <AuthContext.Provider
      value={{
        token: token,
        signIn: (value: string) => {
          setToken(value);
        },
        signOut: () => {
          setToken(null);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
