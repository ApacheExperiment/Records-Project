import React from 'react';
import './error.scss';
import { Link } from 'react-router-dom';
import vinylArm from '../../assets/img/vinyl-arm-run.png';
import vinyl from '../../assets/img/vinyl-run.png'

export default function Error() {
  return (
    <div className="notFound">
        <div className="animationWrapper">
            <img 
            src={vinylArm} 
            alt="Vinyl"
            className="vinylArmRun"
            />
            <img 
            src={vinyl} 
            alt="Vinyl"
            className="vinylRun"
            />
        </div>
      <h1 className="title">404 - Page Not Found</h1>
      <p className="message">La page que vous cherchez n'existe pas.</p>
      <Link to="/" className="homeLink">
        <p>Retourner à la page d'accueil</p>
      </Link>
      
    </div>
  );
};