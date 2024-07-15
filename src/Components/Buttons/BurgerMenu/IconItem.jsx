import React from 'react';

const IconItem = ({ initialIcon, activeIcon, alt, isActive, onClick, className }) => {

    return (
        <img
            src={isActive  ? activeIcon : initialIcon}
            alt={alt}
            onClick={onClick}
            className={className}
            style={{ transition: 'opacity 1s linear' }}
        />
    );
};

export default IconItem;