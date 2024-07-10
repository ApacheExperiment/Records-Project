import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import './band.scss'
//import band from '../assets/img/Groupe/Blut_Aus_Nord.gif'
import pb from '../pocketbase';
import ArrowRight from '../assets/img/Icon/arrow-right.png'

export default function Band() {
    const { bandId } = useParams();
    const [bandData, setBandData] = useState(null);

    useEffect(() => {
        const fetchBandData = async () => {
            try {
                const response = await pb.collection('Band').getOne(bandId);
                setBandData(response);
            } catch (error) {
                console.error("Error fetching band data:", error);
            }
        };

        fetchBandData();
    }, [bandId]);

    if (!bandData) {
        return <div>Loading...</div>;
    }
    const logoUrl = bandData.LogoBand ? pb.getFileUrl(bandData, bandData.LogoBand) : null;

    return (
        <div className="artist">
            <div className="band">
                <div className="band__profile">
                    {logoUrl ? (
                        <img
                            src={logoUrl}
                            alt="groupe"
                            width={250}
                            height={250}
                            className="band__picture"
                        />
                    ) : (
                        <div className="placeholder-image">No image available</div>
                    )}
                </div>
                <div className="band__text">
                    <h2 className="band__name">{bandData.NameBand}</h2>
                    <div className="band__description">
                        <h3>Status:</h3>
                        <p className="details">{bandData.StatusBand}</p>
                    </div>
                    <div className="band__description">
                        <h3>Formé en:</h3>
                        <p className="details">{bandData.FormedIn}</p>
                    </div>
                    <div className="band__description">
                        <h3>Années d'activités:</h3>
                        <p className="details">{bandData.YearOfActivity}</p>
                    </div>
                    <div className="band__description">
                        <h3>Localisation:</h3>
                        <p className="details">{bandData.LocationBand}</p>
                    </div>
                    <div className="band__description">
                        <h3>Label actuel:</h3>
                        <p className="details">{bandData.CurrentLabel}</p>
                    </div>
                    <div className="band__description">
                        <h3>Genre:</h3>
                        <p className="details">{bandData.Genre}</p>
                    </div>
                    <div className="band__description">
                        <h3>Liens:</h3>
                        <Link to={bandData.Links} className="details" target="_blank" rel="noopener noreferrer">Bandcamp</Link>
                    </div>
                    <div className="band__biographie">
                        <h3>Biographie:</h3>
                        <div className="textAndMore">
                            <p className="details">{bandData.Biography}</p>
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