// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import pb from '../pocketbase';

// Création d'un contexte d'authentification
const AuthContext = createContext();

// Définition du fournisseur de contexte d'authentification
export const AuthProvider = ({ children }) => {
  // État pour suivre si l'utilisateur est authentifié
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Utilisation de useEffect pour vérifier l'authentification lors du montage du composant
  useEffect(() => {
    const checkAuth = async () => {
      const admin = pb.authStore.model;
      if (admin) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    // Vérifiez si le token est présent dans le local storage
    const token = pb.authStore.token;
    if (token) {
      pb.authStore.loadFromCookie(); // Chargez le token depuis le cookie
      checkAuth();
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  // Fonction de connexion
  const login = async (email, password) => {
    try {
      await pb.admins.authWithPassword(email, password);
      document.cookie = pb.authStore.exportToCookie({ httpOnly: false }); // Stockez le token dans le cookie
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      throw error;
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    pb.authStore.clear();
    document.cookie = pb.authStore.exportToCookie({ httpOnly: false }); // Supprimez le token du cookie
    setIsAuthenticated(false);
  };

  return (
    // Fournit le contexte d'authentification aux composants enfants
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);