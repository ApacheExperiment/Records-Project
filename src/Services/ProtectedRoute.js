import React from 'react';
import { Navigate } from 'react-router-dom';
//import { useAuth } from './AuthContext';

// Composant pour protéger l'accès à /add
/*const ProtectedRoute = ({ element, isAuthenticated, requiredRole }) => {
    const { user } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/unauthorized" />; // Page ou composant pour les accès non autorisés
    }

    return element;
};

export default ProtectedRoute;*/

const ProtectedRoute = ({ element, isAuthenticated }) => {
    //return isAuthenticated ? element : <Navigate to="/login" />;
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return element;
};

export default ProtectedRoute;