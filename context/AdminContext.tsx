import React, { createContext, useContext, useState } from 'react';
import { admins } from '../Data/admins';

interface Admin {
  id: string;
  username: string;
  password: string;
  fullName: string;
  email: string;
  role: string;
  permissions: string[];
  assignedParks: string[];
  lastLogin: string;
  status: string;
  notifications: string[];
  activityLog: {
    action: string;
    details: string;
    timestamp: string;
  }[];
}

interface AdminContextType {
  currentAdmin: Admin | null;
  admins: Admin[];
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  updateAdmin: (adminId: string, updatedData: Partial<Admin>) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentAdmin, setCurrentAdmin] = useState<Admin | null>(null);
  const [adminList, setAdminList] = useState<Admin[]>(admins);

  const login = async (username: string, password: string): Promise<boolean> => {
    const admin = adminList.find(a => a.username === username && a.password === password);
    if (admin) {
      setCurrentAdmin(admin);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentAdmin(null);
  };

  const hasPermission = (permission: string): boolean => {
    return currentAdmin?.permissions.includes(permission) || false;
  };

  const updateAdmin = (adminId: string, updatedData: Partial<Admin>) => {
    setAdminList(prevAdmins => 
      prevAdmins.map(admin => 
        admin.id === adminId ? { ...admin, ...updatedData } : admin
      )
    );
    if (currentAdmin?.id === adminId) {
      setCurrentAdmin(prev => prev ? { ...prev, ...updatedData } : null);
    }
  };

  return (
    <AdminContext.Provider value={{
      currentAdmin,
      admins: adminList,
      login,
      logout,
      hasPermission,
      updateAdmin
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}; 