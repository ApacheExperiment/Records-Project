import React, { createContext, useState, useContext, useEffect } from 'react';
import pb from '../pocketbase';

// Création d'un contexte d'authentification
const AuthContext = createContext();

// Définition du fournisseur de contexte d'authentification
export const AuthProvider = ({ children }) => {
  // État pour suivre si l'utilisateur est authentifié et son type
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null); // 'admin' ou 'user'

  // Utilisation de useEffect pour vérifier l'authentification lors du montage du composant
  useEffect(() => {
    const checkAuth = async () => {
      pb.authStore.loadFromCookie();
      const admin = pb.authStore.model;
      if (admin) {
        setIsAuthenticated(true);
        setUserType('admins');
      } else {
        try {
          const user = await pb.collection('users').authRefresh();
          if (user) {
            setIsAuthenticated(true);
            setUserType('users');
          } else {
            setIsAuthenticated(false);
            setUserType(null);
          }
        } catch {
          setIsAuthenticated(false);
          setUserType(null);
        }
      }
    };

    checkAuth();
  }, []);

  // Fonction de connexion
  const login = async (email, password) => {
    try {
      await pb.admins.authWithPassword(email, password);
      document.cookie = pb.authStore.exportToCookie({ httpOnly: false }); // Stockez le token dans le cookie
      setIsAuthenticated(true);
      setUserType('admins');
    } catch /*(adminError)*/ {
      //setIsAuthenticated(false);
      try {
        await pb.collection('users').authWithPassword(email, password);
        document.cookie = pb.authStore.exportToCookie({ httpOnly: false }); // Stockez le token dans le cookie
        setIsAuthenticated(true);
        setUserType('users');
      } catch (userError) {
        setIsAuthenticated(false);
        setUserType(null);
        throw userError;
      }
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    pb.authStore.clear();
    document.cookie = pb.authStore.exportToCookie({ httpOnly: false }); // Supprimez le token du cookie
    setIsAuthenticated(false);
    setUserType(null);
  };

  return (
    // Fournit le contexte d'authentification aux composants enfants
    <AuthContext.Provider value={{ isAuthenticated, userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);