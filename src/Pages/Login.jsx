import React from "react";
import { Link } from "react-router-dom";
import './login.scss'
import arrow from "../assets/img/Icon/icon-arrow-left.webp";

export default function Login() {

    return (
        <div className="borderLog">
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
                <div className="inputWrapper">
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
                    <p className="forgotPswd">Mot de passe oublié ?</p>
                    <button 
                    type="submit" 
                    value="Envoyer" 
                    className="buttonLog"
                    >
                    Connexion
                    </button>
                    <Link to="/register" className="newAccount">
                        <p className="newAccount__space">Créer un compte</p>
                    </Link>
                </div>
            </form>
        </div>
    );
}