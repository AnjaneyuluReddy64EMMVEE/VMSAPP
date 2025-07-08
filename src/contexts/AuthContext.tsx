import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null); // 'visitor' | 'admin' | 'superadmin'
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  return (
    <AuthContext.Provider value={{ userRole, setUserRole, userName, setUserName, userEmail, setUserEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
