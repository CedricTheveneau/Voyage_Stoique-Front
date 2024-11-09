"use client"

import { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import DOMPurify from "dompurify";

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
  const [navbarToggle, setNavbarToggle] = useState(false);
  const [query, setQuery] = useState("");
  const [commentOrdering, setCommentOrdering] = useState("date");
  const [postOrdering, setPostOrdering] = useState("date");
  const categories = ["méditation", "portrait", "présentation d’œuvre", "concept", "analyse"];
  const pathname = usePathname();
  const apiGateway = process.env.NEXT_PUBLIC_API_GATEWAY_URI;

  const createMarkup = (html) => {
    return { __html: DOMPurify.sanitize(html) };
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  
  // useEffect(() => {
  //   const token = localStorage.getItem("user");
  //   if (token) {
  //     setIsAuthenticated(true)
  //     setUserToken(JSON.parse(token).token);
  //   setUserId(JSON.parse(token).user._id)
  //   setUserRole(JSON.parse(token).user.role)
  //   setUserUsername(JSON.parse(token).user.username);
  //   }
  // }, []);

  useEffect(() => {
    const tokenData = JSON.parse(localStorage.getItem("user"));
    if (tokenData) {
      const { token, user } = tokenData;
  
      const payloadBase64 = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(payloadBase64));
      const isTokenExpired = decodedPayload.exp * 1000 < Date.now();
  
      if (!isTokenExpired) {
        setIsAuthenticated(true);
        setUserToken(token);
        setUserId(user._id);
        setUserRole(user.role);
        setUserUsername(user.username);
        if (userRole === 'admin') {
            fetch(
              `${process.env.NEXT_PUBLIC_API_GATEWAY_URI}/docs`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
        }
      } else {
        localStorage.removeItem("user");
        setIsAuthenticated(false);
      }
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!pathname.includes('/login') && !pathname.includes('/signup')) {
      setCurrentPath(pathname);
    }
    {!pathname.includes('/search') && setNavbarToggle(false);}
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
    <GlobalContext.Provider value={{createMarkup, formatDate, categories, userToken, isAuthenticated, isSubscribed, userId, userUsername, userRole, query, currentPath, apiGateway, commentOrdering, setCommentOrdering, setIsAuthenticated, setIsSubscribed, setUserId, setUserUsername, setUserRole, setQuery, setCurrentPath, navbarToggle, setNavbarToggle, postOrdering, setPostOrdering }}>
      {children}
    </GlobalContext.Provider>
  );
};