"use client"

import { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Créer le contexte
const GlobalContext = createContext();

// Hook personnalisé pour utiliser le contexte
export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  // Gérer l'état d'authentification avec un state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [currentPath, setCurrentPath] = useState(null);
  const pathname = usePathname();

  // Vérifier la présence du token dans le localStorage au chargement du composant
  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
    setUserId(JSON.parse(token).user._id)
    setUserRole(JSON.parse(token).user.role)
    }
  }, []);

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  return (
    <GlobalContext.Provider value={{ isAuthenticated, userId, userRole, currentPath, setIsAuthenticated, setUserId, setUserRole, setCurrentPath }}>
      {children}
    </GlobalContext.Provider>
  );
};