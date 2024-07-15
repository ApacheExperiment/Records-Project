import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../Containers/Header/Header';
import Footer from '../Containers/Footer/Footer';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import Profile from '../Pages/Profile'
import ProfileAdmin from '../Pages/ProfileAdmin';
import Band from '../Pages/Band/Band';
import Add from '../Pages/Add';
import { useAuth } from '../Services/AuthContext';
import ProtectedRoute from '../Services/ProtectedRoute';


export default function Router() {
    const { isAuthenticated } = useAuth();
    
    return (
        <BrowserRouter>
            <Header active="home" />
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="login" element={<Login/>}></Route>
                <Route path="register" element={<Register/>}></Route>
                <Route
                    path="/add"
                    element={  
                        // Route protégée, ne peut être accédée que si l'utilisateur est authentifié
                        <ProtectedRoute 
                            element={<Add />} 
                            isAuthenticated={isAuthenticated} 
                        />
                    }
                />
                <Route 
                    path="/profile" 
                    element={
                        <ProtectedRoute 
                            element={<Profile/>}
                            isAuthenticated={isAuthenticated} 
                        />
                    }
                />
                <Route 
                    path="/profile-admin" 
                    element={
                        <ProtectedRoute 
                            element={<ProfileAdmin/>}
                            isAuthenticated={isAuthenticated} 
                        />
                    }
                />
                <Route path="/band/:bandId" element={<Band/>}></Route>
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}