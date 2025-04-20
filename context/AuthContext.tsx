import React, { createContext, useContext, useState, ReactNode } from 'react';
import { router } from 'expo-router';

type User = {
  username: string;
  role: 'guide' | 'admin';
  certifications?: string[];
};

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  updateCertifications: (certs: string[]) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setUser(userData);
    router.replace('/(tabs)/home');
  };

  const logout = () => {
    setUser(null);
    router.replace('/');
  };

  const updateCertifications = (certs: string[]) => {
    if (user) {
      setUser({ ...user, certifications: certs });
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, logout, updateCertifications }}>
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