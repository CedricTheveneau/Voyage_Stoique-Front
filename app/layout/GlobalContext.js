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
  const [currentPath, setCurrentPath] = useState(null);
  const pathname = usePathname();

  // Vérifier la présence du token dans le localStorage au chargement du composant
  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
    setUserId(JSON.parse(token).user._id)
    }
  }, []);

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  return (
    <GlobalContext.Provider value={{ isAuthenticated, userId, setIsAuthenticated, setUserId, currentPath, setCurrentPath }}>
      {children}
    </GlobalContext.Provider>
  );
};