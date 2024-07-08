import React, { useState, useEffect, useRef } from 'react';
import  "./buttonBurger.scss";

export default function ButtonBurger() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(null);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        setActiveItem(null);
    };
    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
            setActiveItem(null);
        }
    };
    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleItemClick = (item) => {
        if (activeItem === item) {
            setActiveItem(null); // Close the submenu if the same item is clicked
        } else {
            setActiveItem(item); // Open the submenu for the clicked item
        }
    };
    
    return (
        <div className="burgerMenu" ref={menuRef}>
            <button className={`${"burgerButton"} ${isOpen ? "open" : ''}`} onClick={toggleMenu}>
                <span className="burgerLine"></span>
                <span className="burgerLine"></span>
                <span className="burgerLine"></span>
            </button>
            {isOpen && (
                <div className="dropdownMenu">
                    <div className="wrap-menu">
                        <p onClick={() => handleItemClick('explorer')} className="pointer">Explorer</p>
                        {activeItem === 'explorer' && (
                            <div className="submenu">
                                <div className="wrap-submenu">
                                    <p className="pointer">Format</p>
                                    <p className="pointer">Genre</p>
                                </div>
                            </div>
                        )}
                        <p onClick={() => handleItemClick('marche')} className="pointer">Marché</p>
                        {activeItem === 'marche' && (
                            <div className="submenu">
                                <div className="wrap-submenu">
                                    <p className="pointer">Acheter</p>
                                    <p className="pointer">Vendre</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}