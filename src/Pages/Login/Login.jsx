import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './login.scss'
import arrow from "../../assets/img/Icon/icon-arrow-left.webp";
import { useAuth } from '../../Services/AuthContext';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    //Rendue visible du mot de passe pour le champs de saisie
    const togglePassWordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/profile');
        } catch (error) {
            console.error('La connexion a échoué:', error);
            setErrorMessage("Adresse e-mail ou mot de passe incorrect");
        }
    };

    return (
        <div className="borderLog">
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
                <div className="inputWrapper">
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
                    {errorMessage && <p className="error">{errorMessage}</p>}
                </div>
            </form>
        </div>
    );
}