import React, { useEffect, useState }  from 'react';
import { /*Link,*/ useNavigate } from "react-router-dom";
/*import {NavLink} from 'react-router-dom';*/
import Disconnected from '../../assets/img/Icon/Initial/icon-user.webp'
import Connected from '../../assets/img/Icon/Reverse/icon-user-Reverse.webp'
import LogoutIcon from '../../assets/img/Icon/Reverse/icon-login.webp'
import iconSearch from '../../assets/img/Icon/icon-search.png'
import iconbasket from '../../assets/img/Icon/Initial/icon-caddy.webp'
import { useAuth } from '../../Services/AuthContext';
import pb from '../../pocketbase';
import './NavBar.scss'

function NavBar () {
    const { isAuthenticated, userType, logout } = useAuth();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

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

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await pb.collection('Band').getFullList({
                filter: `NameBand="${searchTerm}"`,
            });

            if (response.length > 0) {
                const band = response[0];
                navigate(`/band/${band.id}`);
            } else {
                alert('No band found with this name.');
            }
        } catch (error) {
            console.error('Error searching band:', error);
        }
    };

    return (
        <nav className="nav">
                <form className="searchContainer" onSubmit={handleSearchSubmit}>
                    <input 
                    className="searchBar" 
                    type="text" 
                    value={searchTerm}
                    onChange={handleSearchChange}
                    /*placeholder="Album, titre, groupe, musicien, label..."*/
                    />
                    <button type="submit" className="searchButton">
                        <img src={iconSearch} alt="loupe" className="iconSearch"/>
                    </button>
                </form>
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