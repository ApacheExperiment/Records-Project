import React from 'react';
import { Link } from "react-router-dom";
/*import {NavLink} from 'react-router-dom';*/
//import ButtonLog from '../Buttons/ButtonLog';
//import ButtonSignIn from '../Buttons/ButtonSignIn';
import Login from '../../assets/img/Icon/Initial/icon-user.png'
import iconSearch from '../../assets/img/Icon/icon-search.png'
import iconbasket from '../../assets/img/Icon/icon-caddy.png'
import './NavBar.scss'

function NavBar () {
    return (
        <nav className="nav">
                
                <div className="searchContainer">
                    <input className="searchBar" type="text" placeholder="Album, titre, groupe, musicien, label..."></input>
                    <img src={iconSearch} alt="loupe" className="iconSearch"/>
                </div>
                <div className="buttonsWrap" >
                <Link to="/login">
                    <img
                    src={Login}
                    alt="Login icon"
                    width={25}
                    height={25}
                    //className="iconLog"
                    //onClick={logout}
                    />
                </Link>
                    <img
                    src={iconbasket}
                    alt="panier"
                    width={30}
                    height={25}
                    //className="iconLog"
                    //onClick={logout}
                    />
                    {/*<ButtonLog />
                    <ButtonSignIn />*/}
                </div>
                {/*<NavLink to="/">
                    <li>Accueil</li>
                </NavLink>
                <NavLink to="/about">
                    <li>A propos</li>
                </NavLink>*/}
        </nav>
    )
}

export default NavBar