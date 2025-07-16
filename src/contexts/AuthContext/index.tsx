// import React, { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [userRole, setUserRole] = useState(null); // 'visitor' | 'admin' | 'superadmin'
//   const [userName, setUserName] = useState(null);
//   const [userEmail, setUserEmail] = useState(null);

//   return (
//     <AuthContext.Provider value={{ userRole, setUserRole, userName, setUserName, userEmail, setUserEmail }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
// src/contexts/AuthContext.tsx

// import React, { createContext, useContext, useState, ReactNode } from 'react';

// type UserRole = 'visitor' | 'admin' | 'superadmin' | null;

// interface AuthContextType {
//   userRole: UserRole;
//   setUserRole: (role: UserRole) => void;
//   userName: string | null;
//   setUserName: (name: string | null) => void;
//   userEmail: string | null;
//   setUserEmail: (email: string | null) => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [userRole, setUserRole] = useState<UserRole>(null);
//   const [userName, setUserName] = useState<string | null>(null);
//   const [userEmail, setUserEmail] = useState<string | null>(null);

//   return (
//     <AuthContext.Provider
//       value={{
//         userRole,
//         setUserRole,
//         userName,
//         setUserName,
//         userEmail,
//         setUserEmail,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };


import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserRole = 'visitor' | 'admin' | 'superadmin' | null;

interface AuthContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  userName: string | null;
  setUserName: (name: string | null) => void;
  userEmail: string | null;
  setUserEmail: (email: string | null) => void;
  userBranch: string | null;
  setUserBranch: (branch: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userBranch, setUserBranch] = useState<string | null>(null); 

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
