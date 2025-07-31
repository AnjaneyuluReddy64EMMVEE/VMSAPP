import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserRole = 'visitor' | 'admin' | 'superadmin' | null;

interface AuthContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  userName: string | null;
  setUserName: (name: string | null) => void;
  userEmail: string | null;
  setUserEmail: (email: string | null) => void;
  userBranch: string[]; // List of branches user has access to
  setUserBranch: (branch: string[]) => void;

  selectedBranch: string; // 🔑 Add this
  setSelectedBranch: (branch: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userBranch, setUserBranch] = useState<string[]>([]);
  // multiple branches
  const [selectedBranch, setSelectedBranch] = useState<string>('All'); // ✅ new global selected branch

  return (
    <AuthContext.Provider
      value={{
        userRole,
        setUserRole,
        userName,
        setUserName,
        userEmail,
        setUserEmail,
        userBranch,
        setUserBranch,
        selectedBranch,
        setSelectedBranch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
