import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../../assets/img/Icon/vinyl-run.png";
import NavBar from "../../Components/NavBar/NavBar";
import ButtonBurger from '../../Components/Buttons/BurgerMenu/ButtonBurger';
import "./header.scss";

function Header() {
    return (
      <header> 
        <div className="row">
          <ButtonBurger />
          <Link to="/" id="header">
            <img src={Logo} alt="logo records" className='logo' />
          </Link>
        </div> 
        <NavBar />
      </header>
      
    )
  }
  
  export default Header