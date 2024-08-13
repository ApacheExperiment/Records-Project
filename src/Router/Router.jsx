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
import Band from '../Pages/Label&Band/Band';
import Artist from '../Pages/Label&Band/Artist';
import Record from '../Pages/Record/Record';
import Label from '../Pages/Label&Band/Label';
import Format from '../Pages/Format/Format'
import Genre from '../Pages/Genre/Genre'
import AddBand from '../Pages/Add/AddBand';
import AddArtist from '../Pages/Add/AddArtist';
import AddReference from '../Pages/Add/AddReference';
import AddLabel from '../Pages/Add/AddLabel';
import Error from '../Pages/Error/Error';
//import PageTest from '../Pages/PageTest'



export default function Router() {
    const { isAuthenticated, /*userType*/ } = useAuth();
    
    return (
        <>
            <Header active="home" />
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/format" element={<Format />} />
                <Route path="/genre" element={<Genre />} />
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
                    path="/add-artist"
                    element={  
                        // Route protégée, ne peut être accédée que si l'utilisateur est authentifié
                        <ProtectedRoute 
                            element={<AddArtist />} 
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
                    path="/add-label"
                    element={  
                        // Route protégée, ne peut être accédée que si l'utilisateur est authentifié
                        <ProtectedRoute 
                            element={<AddLabel />} 
                            isAuthenticated={isAuthenticated} 
                        />
                    }
                />
                <Route 
                    path="/profile" 
                    element={
                        <ProtectedRoute 
                            element={<Profile/>}
                            isAuthenticated={isAuthenticated /*&& userType === 'users'*/} 
                        />
                    }
                />
                <Route 
                    path="/profile-admin" 
                    element={
                        <ProtectedRoute 
                            element={<ProfileAdmin/>}
                            isAuthenticated={isAuthenticated /*&& userType === 'admins'*/} 
                        />
                    }
                />
                <Route path="/band/:bandId" element={<Band/>}/>
                <Route path="/artist/:artistId" element={<Artist/>}/>
                <Route path="/record/:albumId" element={<Record/>}/>
                <Route path="/label/:labelId" element={<Label/>}/>
                <Route path="*" element={<Error />}/>
                {/*<Route path="/pagetest" element={<PageTest/>} />*/}
            </Routes>
            <Footer />
        </>
    );
}