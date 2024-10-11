"use client"

import { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Créer le contexte
const GlobalContext = createContext();

// Hook personnalisé pour utiliser le contexte
export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  // Gérer l'état d'authentification avec un state
  const [userToken, setUserToken] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [userId, setUserId] = useState(false);
  const [userUsername, setUserUsername] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [currentPath, setCurrentPath] = useState(null);
  const pathname = usePathname();

  // Vérifier la présence du token dans le localStorage au chargement du composant
  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      setUserToken(JSON.parse(token).token);
    setUserId(JSON.parse(token).user._id)
    setUserRole(JSON.parse(token).user.role)
    setUserUsername(JSON.parse(token).user.username);
    }
  }, []);

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  useEffect(() => {
    if (userId) {
      const fetchSubscriptionStatus = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_GATEWAY_URI}/auth/${userId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
              },
            }
          );
  
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
  
          const data = await response.json();
          setIsSubscribed(data.user.newsSubscription);
        } catch (error) {
          console.error("Erreur lors de la récupération de l'abonnement :", error);
        }
      };
      fetchSubscriptionStatus();
    }
  }, [userId, userToken]);

  return (
    <GlobalContext.Provider value={{ userToken, isAuthenticated, isSubscribed, userId, userUsername, userRole, currentPath, setIsAuthenticated, setIsSubscribed, setUserId, setUserUsername, setUserRole, setCurrentPath }}>
      {children}
    </GlobalContext.Provider>
  );
};