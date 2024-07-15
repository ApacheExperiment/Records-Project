import React, { useState, useEffect, useRef } from 'react';
import IconGroup from "./IconGroup";
import  "./buttonBurger.scss";

export default function ButtonBurger() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(null);
    const [activeSubItem, setActiveSubItem] = useState(null);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        setActiveItem(null);
        setActiveSubItem(null);
    };
    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
            setActiveItem(null);
            setActiveSubItem(null);
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
            setActiveItem(null);
            setActiveSubItem(null);
        } else {
            setActiveItem(item);
            setActiveSubItem(null);
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
                    <IconGroup 
                    handleItemClick={handleItemClick} 
                    activeItem={activeItem} 
                    activeSubItem={activeSubItem} 
                    setActiveSubItem={setActiveSubItem}
                    />
                </div>
            )}
        </div>
    );
}