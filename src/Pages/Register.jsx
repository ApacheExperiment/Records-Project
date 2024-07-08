import React from "react";
import { Link } from "react-router-dom";
import './register.scss'
import arrow from "../assets/img/Icon/icon-arrow-left.webp";
import Logo from "../assets/img/Icon/vinyl-run.png";

export default function Login() {

    return (
        <div className="borderRegister">
            <form className="formLog">
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
                            type="nom" 
                            name="nom" 
                            id="nom"
                            required
                            className="inputLog" 
                        />
                    <label htmlFor="email" className="labelLog">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email"
                        required
                        className="inputLog" 
                    />
                    <label htmlFor="password" className="labelLog">Mot de passe</label>
                    <input 
                        type="password" 
                        name="password"
                        id="password"
                        required
                        className="inputLog" 
                    />
                    <p className="alreadyRegistered">Déjà inscrit.e ? <a href="/login" className="connection">Connexion</a></p>
                    <button 
                    type="submit" 
                    value="Envoyer" 
                    className="buttonRegister"
                    >
                    Créer
                    </button>
                </div>
            </form>
        </div>
    );
}