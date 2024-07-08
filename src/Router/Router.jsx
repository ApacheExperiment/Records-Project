import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../Containers/Header/Header';
import Footer from '../Containers/Footer/Footer';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Band from '../Pages/Band';


export default function Router() {
    return (
        <BrowserRouter>
            <Header active="home" />
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="login" element={<Login/>}></Route>
                <Route path="register" element={<Register/>}></Route>
                <Route path="band" element={<Band/>}></Route>
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}