import React from "react";
import './band.scss'
import band from '../assets/img/Groupe/Blut_Aus_Nord.gif'
import ArrowRight from '../assets/img/Icon/arrow-right.png'

export default function Band() {

    return (
        <div className="artist">
            <div className="band">
                <div className="band__profile">
                    <img
                    src={band}
                    alt="groupe"
                    width={250}
                    height={250}
                    className="band__picture"
                    />
                </div>
                <div className="band__text">
                    <h2 className="band__name">Blut Aus Nord</h2>
                    <div className="band__description">
                        <h3>Status:</h3>
                        <p className="details">Actif</p>
                    </div>
                    <div className="band__description">
                        <h3>Formé en:</h3>
                        <p className="details">1994</p>
                    </div>
                    <div className="band__description">
                        <h3>Années d'activités:</h3>
                        <p className="details">1993-1994 (Anciennement Vlad), 1994-maintenant</p>
                    </div>
                    <div className="band__description">
                        <h3>Localisation:</h3>
                        <p className="details">France, Normandie, Mondeville</p>
                    </div>
                    <div className="band__description">
                        <h3>Label actuel:</h3>
                        <p className="details">Debemur Morti</p>
                    </div>
                    <div className="band__description">
                        <h3>Genre:</h3>
                        <p className="details">Atmospheric Black Metal, Avant-garde/Black/Industrial Metal/Dark Ambient</p>
                    </div>
                    <div className="band__description">
                        <h3>Liens:</h3>
                        <p className="details">Bandcamp, Spotify, Deezer, Facebook, Instagram, Debemur</p>
                    </div>
                    <div className="band__biographie">
                        <h3>Biographie:</h3>
                        <div className="textAndMore">
                            <p className="details">En 1993, Vindsval lance un projet solo appelé Vlad, nom inspiré de Vlad III l'Empaleur. Après deux démos — In the Mist en 1993 et Yggdrasil en 1994 —, Vlad change de nom pour Blut aus Nord. Alors que les labels commencent à s'intéresser à son travail, Vindsval décide de recruter d'autres musiciens1. Il endosse le rôle de chanteur et guitariste pendant que GhÖst s'occupe de la basse et W.D. Feld de la batterie et du clavier.</p>
                            <img
                            src={ArrowRight}
                            alt="Plus d'informations"
                            width={20}
                            height={15}
                            className="ArrowNext"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="realese">
                    <div className="filters-left">
                        <div className="filter">Sorties</div>
                        <p>Albums</p>
                        <p>EPs</p>
                        <p>Singles</p>
                        <p>Compilations</p>
                        <div className="filter">Apapritions</div>
                        <p>Albums</p>
                        <p>Compilations</p>
                        <div className="filter">Non Officiel</div>
                        <p>Albums</p>
                        <p>Compilations</p>
                        <div className="filter">Crédits</div>
                        <p>Albums</p>
                        <p>Compilations</p>
                    </div>
                    <div className="discographie">
                        <div className="filters-right">
                            <div className="filter">
                                <p>Albums</p>
                                <p>Label</p>
                                <p>Année</p>
                            </div>
                        </div>
                        <div className="records">
                            <div className="cover"></div>
                            <div className="name-years-space">
                                <p className="records__name">Ultima Thulée</p>
                                <p>Impure Creations Records</p>
                                <p className="years-realese">1995</p>
                            </div>
                        </div>
                        <div className="records">
                            <div className="cover"></div>
                            <div className="name-years-space">
                                <p className="records__name">Memoria Vetusta I «Fathers Of The Icy Age»</p>
                                <p>Impure Creations Records</p>
                                <p className="years-realese">1996</p>
                            </div>
                        </div>
                        <div className="records">
                            <div className="cover"></div>
                            <div className="name-years-space">
                                <p className="records__name">The Mystical Beast Of Rebellion</p>
                                <p>Oaken Shield</p>
                                <p className="years-realese">2001</p>
                            </div>
                        </div>
                        <div className="records">
                            <div className="cover"></div>
                            <div className="name-years-space">
                                <p className="records__name">The Work Which Transforms God</p>
                                <p>Appease Me...</p>
                                <p className="years-realese">2003</p>
                            </div>
                        </div>
                        <div className="records">
                            <div className="cover"></div>
                            <div className="name-years-space">
                                <p className="records__name">Thematic Emanation Of Archetypal Multiplicity</p>
                                <p>Candlelight Records</p>
                                <p className="years-realese">2005</p>
                            </div>
                        </div>
                        <div className="records">
                            <div className="cover"></div>
                            <div className="name-years-space">
                                <p className="records__name">MoRT</p>
                                <p>Candlelight Records</p>
                                <p className="years-realese">2006</p>
                            </div>
                        </div>
                        <div className="records">
                            <div className="cover"></div>
                            <div className="name-years-space">
                                <p className="records__name">Odinist - The Destruction Of Reason By Illumination</p>
                                <p>Candlelight Records</p>
                                <p className="years-realese">2007</p>
                            </div>
                        </div>
                        <div className="records">
                            <div className="cover"></div>
                            <div className="name-years-space">
                                <p className="records__name">Bloodoline / Reverence / Blut Aus Nord / Karras – Dissociated Human Junction</p>
                                <p>Panik Terror Musik</p>
                                <p className="years-realese">2007</p>
                            </div>
                        </div>
                        <div className="records">
                            <div className="cover"></div>
                            <div className="name-years-space">
                                <p className="records__name">Memoria Vetusta II - Dialogue With The Stars</p>
                                <p>Candlelight Records</p>
                                <p className="years-realese">2009</p>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    );
}