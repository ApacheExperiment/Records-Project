import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import './label&band.scss';
import pb from '../../pocketbase';
import ArrowRight from '../../assets/img/Icon/arrow-right.png';
import Discography from '../../Components/Discography/Discography';

export default function Band() {
    const { bandId } = useParams();
    const [bandData, setBandData] = useState(null);
    const [labelData, setLabelData] = useState(null);
    const [genre, setGenre] = useState(null);
    const [subGenre, setSubGenre] = useState(null);

    useEffect(() => {
        const fetchBandData = async () => {
            try {
                const response = await pb.collection('Band').getOne(bandId, { expand: 'labelId, genreId, subGenreId' });
                setBandData(response);
                
                if (response.expand && response.expand.labelId) {
                    setLabelData(response.expand.labelId);
                }

                if (response.expand.genreId) {
                    const genreResponse = await pb.collection('Genre').getOne(response.expand.genreId.id);
                    setGenre(genreResponse);
                }
                
                if (response.expand.subGenreId) {
                    const subGenreResponse = await pb.collection('SubGenre').getOne(response.expand.subGenreId.id);
                    setSubGenre(subGenreResponse);
                }
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
        <div className="band-container">
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
                        {labelData ? (
                            <Link to={`/label/${labelData.id}`} className="details">
                                {labelData.NameLabel}
                            </Link>
                        ) : (
                            <p className="details">Label non disponible</p>
                        )}
                    </div>
                    <div className="band__description">
                        <h3>Genre:</h3>
                        <p className="details">{genre ? genre.NameGenre : 'Genre non disponible'}</p>
                    </div>
                    <div className="band__description">
                        <h3>Sous-Genre:</h3>
                        <p className="details">{subGenre ? subGenre.NameSubGenre : 'Sous-genre non disponible'}</p>
                    </div>
                    <div className="band__description">
                        <h3>Liens:</h3>
                        <Link to={bandData.Links} className="details" target="_blank" rel="noopener noreferrer">Sites</Link>
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
            <Discography bandId={bandId} />
        </div>
    );
}