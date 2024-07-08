import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../../assets/img/Icon/vinyl-run.png";
import NavBar from "../../Components/NavBar/NavBar";
import ButtonBurger from '../../Components/Buttons/BurgerMenu/ButtonBurger';
import "./header.scss";

function Header() {
    return (
      <header>  
        <ButtonBurger />
        <Link to="/" id="header">
          <img src={Logo} alt="logo records" className='logo' />
        </Link>
        <NavBar />
      </header>
      
    )
  }
  
  export default Header