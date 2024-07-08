import React from 'react'
import Router from './Router/Router'
import { AuthProvider } from './Services/AuthContext'

function App() {
    return (
    <AuthProvider>
        <Router />
    </AuthProvider>
    )
}
export default App;
