import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User } from '../types';
import { authApi } from '../services/authApi';

export interface AuthContextType {
  user: User | null;
  checkingSession: boolean;
  loginUser: (user: User) => void;
  logoutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [checkingSession, setCheckingSession] = useState<boolean>(true);

  const restoreSession = useCallback(async () => {
    try {
      const currentUser = await authApi.me();
      setUser(currentUser);
    } catch {
    } finally {
      setCheckingSession(false);
    }
  }, []);

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  const loginUser = useCallback((loggedInUser: User) => {
    setUser(loggedInUser);
  }, []);

  const logoutUser = useCallback(async () => {
    await authApi.logout();
    setUser(null);
  }, []);

  const value = React.useMemo(() => ({
    user,
    checkingSession,
    loginUser,
    logoutUser,
  }), [user, checkingSession, loginUser, logoutUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
