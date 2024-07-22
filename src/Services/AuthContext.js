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
        const token = localStorage.getItem('authToken');
        if (token) {
            pb.authStore.loadFromCookie(token); // Charge le jeton depuis localStorage
            const user = pb.authStore.model;
            if (user) {
                setIsAuthenticated(true);
                setUserType(user.admin ? 'admins' : 'users'); // Ajuste en fonction de la réponse
            } else {
                setIsAuthenticated(false);
                setUserType(null);
            }
        } else {
            setIsAuthenticated(false);
            setUserType(null);
        }
    };

    checkAuth();
}, []);

  // Fonction de connexion
  const login = async (email, password) => {
    try {
        await pb.admins.authWithPassword(email, password);
        const token = pb.authStore.exportToCookie({ httpOnly: false });
        localStorage.setItem('authToken', token); // Stocke le jeton dans localStorage
        setIsAuthenticated(true);
        setUserType('admins');
    } catch {
        try {
            await pb.collection('users').authWithPassword(email, password);
            const token = pb.authStore.exportToCookie({ httpOnly: false });
            localStorage.setItem('authToken', token); // Stocke le jeton dans localStorage
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
    localStorage.removeItem('authToken'); // Supprime le jeton de localStorage
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