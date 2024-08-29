import React from 'react';
import { useNavigate } from "react-router-dom";
import IconItem from './IconItem';
import imagePaths from './imagePaths';

const IconGroup = ({ handleItemClick, activeItem, activeSubItem, setActiveSubItem }) => {
    const navigate = useNavigate();

    const goToFormat = () => {
        navigate('/format');
    };
    const goToGenre = () => {
        navigate('/genre');
    };
    const goToArtists = () => {
        navigate('/artists');
    };
    const goToYears = () => {
        navigate('/years');
    };
    const goToAddBand = () => {
        navigate('/add-band');
    };
    const goToAddArtist = () => {
        navigate('/add-artist');
    };
    const goToAddReference = () => {
        navigate('/add-reference');
    };
    const goToAddLabel = () => {
        navigate('/add-label');
    };

     // Vérification des types de fonctions
     console.log('Type de handleItemClick:', typeof handleItemClick);
     console.log('Type de setActiveSubItem:', typeof setActiveSubItem);
     
    return (
        <div className="wrap-menu">
            <button onClick={() => handleItemClick('explorer')} className="button-menu">
                <IconItem
                    initialIcon={imagePaths.explore.initial}
                    activeIcon={imagePaths.explore.active}
                    alt="icon explore"
                    className="icon icon-menu"
                    isActive={activeItem === 'explorer'}
                />
                Explorer
            </button>
            {activeItem === 'explorer' && (
                <div className="submenu">
                    <div className="wrap-submenu">
                        <button className="button-submenu" onClick={() => { setActiveSubItem('format'); goToFormat(); }}>
                            <IconItem
                                initialIcon={imagePaths.format.initial}
                                activeIcon={imagePaths.format.active}
                                alt="icon format"
                                className="icon icon-format"
                                isActive={activeSubItem === 'format'}
                            />
                            Format
                        </button>
                        <button className="button-submenu" onClick={() => { setActiveSubItem('genre'); goToGenre(); }}>
                            <IconItem
                                initialIcon={imagePaths.genre.initial}
                                activeIcon={imagePaths.genre.active}
                                alt="icon genre"
                                className="icon icon-micro"
                                isActive={activeSubItem === 'genre'}
                            />
                            Genre
                        </button>
                        <button className="button-submenu" onClick={() => { setActiveSubItem('artists'); goToArtists(); }}>
                            <IconItem
                                initialIcon={imagePaths.bandArtist.initial}
                                activeIcon={imagePaths.bandArtist.active}
                                alt="icon genre"
                                className="icon icon-band"
                                isActive={activeSubItem === 'artists'}
                            />
                            Artistes
                        </button>
                        <button className="button-submenu" onClick={() => { setActiveSubItem('years'); goToYears(); }}>
                            <IconItem
                                initialIcon={imagePaths.years.initial}
                                activeIcon={imagePaths.years.active}
                                alt="icon genre"
                                className="icon icon-calendar"
                                isActive={activeSubItem === 'years'}
                            />
                            Années
                        </button>
                    </div>
                </div>
            )}
            <button onClick={() => handleItemClick('marche')} className="button-menu">
                <IconItem
                    initialIcon={imagePaths.market.initial}
                    activeIcon={imagePaths.market.active}
                    alt="icon market"
                    className="icon icon-sleeve"
                    isActive={activeItem === 'marche'}
                />
                Marché
            </button>
            {activeItem === 'marche' && (
                <div className="submenu">
                    <div className="wrap-submenu">
                        <button className="button-submenu" onClick={() => setActiveSubItem('buy')}>
                            <IconItem
                                initialIcon={imagePaths.buy.initial}
                                activeIcon={imagePaths.buy.active}
                                alt="icon buy"
                                className="icon icon-buy"
                                isActive={activeSubItem === 'buy'}
                            />
                            Acheter
                        </button>
                        <button className="button-submenu" onClick={() => setActiveSubItem('sell')}>
                            <IconItem
                                initialIcon={imagePaths.sell.initial}
                                activeIcon={imagePaths.sell.active}
                                alt="icon sell"
                                className="icon icon-sell"
                                isActive={activeSubItem === 'sell'}
                            />
                            Vendre
                        </button>
                    </div>
                </div>
            )}
            <button onClick={() => handleItemClick('add')} className="button-menu" >
                <IconItem
                    initialIcon={imagePaths.add.initial}
                    activeIcon={imagePaths.add.active}
                    alt="icon add"
                    className="icon icon-add"
                    isActive={activeItem === 'add'}
                    //onClick={addReference}
                />
                Ajouter
            </button>
            {activeItem === 'add' && (
                <div className="submenu">
                    <div className="wrap-submenu">
                        <button className="button-submenu" onClick={() => { setActiveSubItem('reference'); goToAddReference(); }}>
                            <IconItem
                                initialIcon={imagePaths.reference.initial}
                                activeIcon={imagePaths.reference.active}
                                alt="icon reference"
                                className="icon icon-reference"
                                isActive={activeSubItem === 'reference'}
                            />
                            Référence
                        </button>
                        <button className="button-submenu" onClick={() => { setActiveSubItem('band'); goToAddBand(); }}>
                            <IconItem
                                initialIcon={imagePaths.band.initial}
                                activeIcon={imagePaths.band.active}
                                alt="icon band"
                                className="icon icon-band"
                                isActive={activeSubItem === 'band'}
                            />
                            Groupe
                        </button>
                        <button className="button-submenu" onClick={() => { setActiveSubItem('artist'); goToAddArtist(); }}>
                            <IconItem
                                initialIcon={imagePaths.artist.initial}
                                activeIcon={imagePaths.artist.active}
                                alt="icon band"
                                className="icon icon-band"
                                isActive={activeSubItem === 'artist'}
                            />
                            Artiste
                        </button>
                        <button className="button-submenu" onClick={() => { setActiveSubItem('label'); goToAddLabel(); }}>
                            <IconItem
                                initialIcon={imagePaths.label.initial}
                                activeIcon={imagePaths.label.active}
                                alt="icon sell"
                                className="icon icon-label"
                                isActive={activeSubItem === 'label'}
                            />
                            Label
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default IconGroup;