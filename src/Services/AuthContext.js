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
      const admin = pb.authStore.model;
      if (admin) {
        setIsAuthenticated(true);
        setUserType('admin');
      } else {
        const user = await pb.collection('users').authRefresh();
        if (user) {
          setIsAuthenticated(true);
          setUserType('user');
        } else {
          setIsAuthenticated(false);
          setUserType(null);
        }
      }
    };

    // Vérifiez si le token est présent dans le local storage
    const token = pb.authStore.token;
    if (token) {
      pb.authStore.loadFromCookie(); // Chargez le token depuis le cookie
      checkAuth();
    } else {
      setIsAuthenticated(false);
      setUserType(null);
    }
  }, []);

  // Fonction de connexion
  const login = async (email, password) => {
    try {
      await pb.admins.authWithPassword(email, password);
      document.cookie = pb.authStore.exportToCookie({ httpOnly: false }); // Stockez le token dans le cookie
      setIsAuthenticated(true);
      setUserType('admin');
    } catch (adminError) {
      setIsAuthenticated(false);
      try {
        await pb.collection('users').authWithPassword(email, password);
        document.cookie = pb.authStore.exportToCookie({ httpOnly: false }); // Stockez le token dans le cookie
        setIsAuthenticated(true);
        setUserType('user');
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