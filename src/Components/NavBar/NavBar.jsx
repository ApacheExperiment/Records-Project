import React, { useEffect }  from 'react';
import { /*Link,*/ useNavigate } from "react-router-dom";
/*import {NavLink} from 'react-router-dom';*/
import Disconnected from '../../assets/img/Icon/Initial/icon-user.png'
import Connected from '../../assets/img/Icon/Reverse/icon-user-Reverse.png'
import LogoutIcon from '../../assets/img/Icon/Reverse/icon-login.png'
import iconSearch from '../../assets/img/Icon/icon-search.png'
import iconbasket from '../../assets/img/Icon/icon-caddy.png'
import { useAuth } from '../../Services/AuthContext';
import './NavBar.scss'

function NavBar () {
    const { isAuthenticated, userType, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    const handleLogout = () => {
        logout();
        //navigate('/login');
    };
    useEffect(() => {
        if (isAuthenticated) {
            if (userType === 'admin') {
                navigate('/profile-admin');
            } else if (userType === 'user') {
                navigate('/profile');
            }
        }
    }, [isAuthenticated, userType, navigate]);

    return (
        <nav className="nav">
                <div className="searchContainer">
                    <input className="searchBar" type="text" /*placeholder="Album, titre, groupe, musicien, label..."*/></input>
                    <img src={iconSearch} alt="loupe" className="iconSearch"/>
                </div>
                <div className="buttonsWrap" >
                {isAuthenticated ? (
                    <>
                        <img
                            src={Connected}
                            alt="Connected icon"
                            width={25}
                            height={25}
                            className="iconLog"
                        />
                        <img
                            src={LogoutIcon}
                            alt="Logout icon"
                            width={25}
                            height={25}
                            onClick={handleLogout}
                            className="iconLog"
                        />
                    </>
                ) : (
                    <img
                        src={Disconnected}
                        alt="Disconnected icon"
                        width={25}
                        height={25}
                        onClick={handleLogin}
                        className="iconLog"
                    />
                )}
                    <img
                    src={iconbasket}
                    alt="panier"
                    width={30}
                    height={25}
                    className="iconBasket"
                    />
                </div>
        </nav>
    )
}

export default NavBar