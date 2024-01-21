// AuthContext.js
"use client"
import { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router=useRouter();
  const login = (userData) => {
    // Perform login logic
    console.log(userData)
    setUser(userData);
  };

  const logout = () => {
    // Perform logout logic
    setUser(null);
    localStorage.removeItem('user')
    router.push('/')
  };

  return (
    <AuthContext.Provider value={{ user, login,logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
