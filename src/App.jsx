import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router/Router';
import { AuthProvider } from './Services/AuthContext';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Router />
            </AuthProvider>
        </BrowserRouter>
    );
}
export default App;
