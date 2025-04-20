import React, { createContext, useContext, useState, useEffect } from 'react';
import { users } from '../Data/users';

interface User {
  id: string;
  username: string;
  password: string;
  fullName: string;
  email: string;
  role: string;
  certifications: string[];
  certificationStatus: string;
  trainingCompleted: boolean;
  notifications: string[];
}

interface UserContextType {
  currentUser: User | null;
  users: User[];
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  addUser: (user: User) => Promise<void>;
  updateUser: (userId: string, updatedData: Partial<User>) => void;
  updateUserRole: (userId: string, newRole: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userList, setUserList] = useState<User[]>(users);

  const login = async (username: string, password: string): Promise<boolean> => {
    const user = userList.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const addUser = async (user: User): Promise<void> => {
    setUserList(prevUsers => [...prevUsers, user]);
  };

  const updateUser = (userId: string, updatedData: Partial<User>) => {
    setUserList(prevUsers => 
      prevUsers.map(user => 
        user.id === userId ? { ...user, ...updatedData } : user
      )
    );
    if (currentUser?.id === userId) {
      setCurrentUser(prev => prev ? { ...prev, ...updatedData } : null);
    }
  };

  const updateUserRole = (userId: string, newRole: string) => {
    setUserList(prevUsers => 
      prevUsers.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
    if (currentUser?.id === userId) {
      setCurrentUser(prev => prev ? { ...prev, role: newRole } : null);
    }
  };

  return (
    <UserContext.Provider value={{
      currentUser,
      users: userList,
      login,
      logout,
      addUser,
      updateUser,
      updateUserRole
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 