import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Disconnected from '../../assets/img/Icon/Initial/icon-user.webp';
import Connected from '../../assets/img/Icon/Reverse/icon-user-Reverse.webp';
import LogoutIcon from '../../assets/img/Icon/Reverse/icon-login.webp';
import iconSearch from '../../assets/img/Icon/icon-search.png';
import iconbasket from '../../assets/img/Icon/Initial/icon-caddy.webp';
import { useAuth } from '../../Services/AuthContext';
import pb from '../../pocketbase';
import './NavBar.scss';

function NavBar() {
    const { isAuthenticated, userType, logout } = useAuth();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const handleLogin = () => {
        navigate('/login');
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleProfileClick = () => {
        if (userType === 'admins') {
            navigate('/profile-admin');
        } else if (userType === 'users') {
            navigate('/profile');
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        try {
            const bandResponse = await pb.collection('Band').getFullList({
                filter: `NameBand ~ "${searchTerm}"`,
            });
            const labelResponse = await pb.collection('Label').getFullList({
                filter: `NameLabel ~ "${searchTerm}"`, // Case-insensitive search
            });

            const albumResponse = await pb.collection('Albums').getFullList({
                filter: `NameAlbum ~ "${searchTerm}"`, // Case-insensitive search
            });

            if (bandResponse.length > 0) {
                const band = bandResponse[0];
                navigate(`/band/${band.id}`);
            } else if (labelResponse.length > 0) {
                const label = labelResponse[0];
                navigate(`/label/${label.id}`);
            } else if (albumResponse.length > 0) {
                const album = albumResponse[0];
                navigate(`/record/${album.id}`);
            } else {
                alert('No results found.');
            }
        } catch (error) {
            console.error('Error searching:', error);
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
                />
                <button type="submit" className="searchButton">
                    <img src={iconSearch} alt="loupe" className="iconSearch"/>
                </button>
            </form>
            <div className="buttonsWrap">
                {isAuthenticated ? (
                    <>
                        <img
                            src={Connected}
                            alt="Connected icon"
                            width={25}
                            height={25}
                            className="iconLog"
                            onClick={handleProfileClick}
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
    );
}

export default NavBar;
