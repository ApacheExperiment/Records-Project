import React from 'react';
import { Navigate } from 'react-router-dom';

// Composant pour protéger l'accès à /add
const ProtectedRoute = ({ element, isAuthenticated }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;