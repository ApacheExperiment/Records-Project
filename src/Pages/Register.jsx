import React, { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import './register.scss'
import arrow from "../assets/img/Icon/icon-arrow-left.webp";
import Logo from "../assets/img/Icon/vinyl-run.png";
import pb from '../pocketbase';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    //Rendue visible du mot de passe pour le champs de saisie
    const togglePassWordVisibility = () => {
        setShowPassword(!showPassword);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newUser = {
                username,
                email,
                password,
                passwordConfirm: password,  // Assuming you want to confirm password as well
            };

            await pb.collection('users').create(newUser);
            navigate('/login');
        } catch (error) {
            console.error('Failed to register:', error);
            setErrorMessage("Une erreur est survenue lors de l'inscription");
        }
    };

    return (
        <div className="borderRegister">
            <form className="formLog" onSubmit={handleSubmit}>
                <Link to="/">
                    <img 
                        src={arrow} 
                        alt="return icon" 
                        width={20} 
                        height={20} 
                        className="arrow" 
                    />
                </Link>
                <div className="welcome">
                    <img 
                        src={Logo} 
                        alt="logo records"
                        className='logo' 
                    />
                    <h3 className="welcome__subtitle">Bienvenue</h3>
                </div>
                <div className="inputWrapper">
                    <label htmlFor="nom" className="labelLog">Nom d'utilisateur</label>
                        <input 
                            type="text" 
                            name="username" 
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="inputLog" 
                        />
                    <label htmlFor="email" className="labelLog">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="inputLog" 
                    />
                    <div className="Wrap-pswd">
                        <label htmlFor="password" className="labelPswd">Mot de passe</label>
                        <input 
                            type={showPassword ? "text" : "password"} 
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="inputPswd" 
                        />
                        <span
                            className={`password-toggle-icon ${
                                showPassword
                                ? "reveal-icon fa fa-eye-slash"
                                : "fa fa-eye"
                            }`}
                            onClick={togglePassWordVisibility}>
                        </span>
                    </div>
                    <p className="alreadyRegistered">Déjà inscrit.e ? <a href="/login" className="connection">Connexion</a></p>
                    <button 
                    type="submit"
                    className="buttonRegister"
                    >
                    Créer
                    </button>
                    {errorMessage && <p className="error">{errorMessage}</p>}
                </div>
            </form>
        </div>
    );
}