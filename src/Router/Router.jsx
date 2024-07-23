import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../Services/AuthContext';
import ProtectedRoute from '../Services/ProtectedRoute';

import Header from '../Containers/Header/Header';
import Footer from '../Containers/Footer/Footer';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import Profile from '../Pages/User/Profile'
import ProfileAdmin from '../Pages/Admin/ProfileAdmin';
import Band from '../Pages/Band/Band';
import Record from '../Pages/Record/Record';
import AddBand from '../Pages/AddBand/AddBand';
import AddReference from '../Pages/AddReference/AddReference';
import Error from '../Pages/Error/Error';




export default function Router() {
    const { isAuthenticated, userType } = useAuth();
    
    return (
        <>
            <Header active="home" />
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="login" element={<Login />}/>
                <Route path="register" element={<Register />}/>
                <Route
                    path="/add-band"
                    element={  
                        // Route protégée, ne peut être accédée que si l'utilisateur est authentifié
                        <ProtectedRoute 
                            element={<AddBand />} 
                            isAuthenticated={isAuthenticated} 
                        />
                    }
                />
                <Route
                    path="/add-reference"
                    element={  
                        // Route protégée, ne peut être accédée que si l'utilisateur est authentifié
                        <ProtectedRoute 
                            element={<AddReference />} 
                            isAuthenticated={isAuthenticated} 
                        />
                    }
                />
                <Route 
                    path="/profile" 
                    element={
                        <ProtectedRoute 
                            element={<Profile/>}
                            isAuthenticated={isAuthenticated && userType === 'users'} 
                        />
                    }
                />
                <Route 
                    path="/profile-admin" 
                    element={
                        <ProtectedRoute 
                            element={<ProfileAdmin/>}
                            isAuthenticated={isAuthenticated && userType === 'admins'} 
                        />
                    }
                />
                <Route path="/band/:bandId" element={<Band/>}/>
                <Route path="/record/:albumId" element={<Record/>}/>
                <Route path="*" element={<Error />}/>
            </Routes>
            <Footer />
        </>
    );
}