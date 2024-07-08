import React, { useState } from 'react'
import arrowLeft from '../../assets/img/Icon/icon-arrow-left-white.png'
import arrowRight from '../../assets/img/Icon/icon-arrow-right-white.png'
import './ButtonSlide.scss'

function SlideButton({ direction, showSlide }) {
    // Utilisation du hook useState pour gérer l'état du bouton (activé ou désactivé)
    const [isDisabled, setIsDisabled] = useState(false)

    // Fonction appelée lors du clic sur le bouton
    const handleShowSlide = () => {
        // Appel de la fonction showSlide passée en tant que prop
        showSlide()
        // Désactivation du bouton pour éviter les clics répétés
        setIsDisabled(true)
        // Réactivation du bouton après un délai de 500 millisecondes
        setTimeout(() => setIsDisabled(false), 500)
    }
    return (
        // Bouton pour activer le défilement vers la gauche ou la droite
        <button
        disabled={isDisabled}               // Désactive le bouton si isDisabled est true
        onClick={handleShowSlide}           // Appelle handleShowSlide lors du clic sur le bouton
        className={
            direction === 'after'
                ? 'button-slide button-slide__before'      // Classe pour le bouton de défilement vers la gauche
                : 'button-slide button-slide__after'       // Classe pour le bouton de défilement vers la droite
        }
        >
            <img 
            src={direction === 'after' ? arrowLeft : arrowRight}    // Utilise la flèche gauche ou droite en fonction de la direction
            alt="flêche de défilement"
            />
        </button>
    )
}

export default SlideButton