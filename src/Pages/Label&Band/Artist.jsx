import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import './label&band.scss';
import pb from '../../pocketbase';
import ArrowRight from '../../assets/img/Icon/arrow-right.png';
import Discography from '../../Components/Discography/Discography';

export default function Artist() {
    const { artistId } = useParams();
    const [artistData, setArtistData] = useState(null);
    const [labelData, setLabelData] = useState(null);

    useEffect(() => {
        const fetchArtistData = async () => {
            try {
                const response = await pb.collection('Artist').getOne(artistId, { expand: 'labelId' });
                setArtistData(response);
                if (response.expand && response.expand.labelId) {
                    setLabelData(response.expand.labelId);
                }
            } catch (error) {
                console.error("Error fetching artist data:", error);
            }
        };

        fetchArtistData();
    }, [artistId]);

    if (!artistData) {
        return <div>Loading...</div>;
    }
    const logoUrl = artistData.LogoArtist ? pb.getFileUrl(artistData, artistData.LogoArtist) : null;

    return (
        <div className="band-container">
            <div className="band">
                <div className="band__profile">
                    {logoUrl ? (
                        <img
                            src={logoUrl}
                            alt="artiste"
                            width={250}
                            height={250}
                            className="band__picture"
                        />
                    ) : (
                        <div className="placeholder-image">No image available</div>
                    )}
                </div>
                <div className="band__text">
                    <h2 className="band__name">{artistData.NameArtist}</h2>
                    <div className="band__description">
                        <h3>Status:</h3>
                        <p className="details">{artistData.StatusArtist}</p>
                    </div>
                    <div className="band__description">
                        <h3>Années d'activités:</h3>
                        <p className="details">{artistData.YearOfCareer}</p>
                    </div>
                    <div className="band__description">
                        <h3>Localisation:</h3>
                        <p className="details">{artistData.LocationArtist}</p>
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
                        <p className="details">{artistData.Genre}</p>
                    </div>
                    <div className="band__description">
                        <h3>Liens:</h3>
                        <Link to={artistData.Links} className="details" target="_blank" rel="noopener noreferrer">Sites</Link>
                    </div>
                    <div className="band__biographie">
                        <h3>Biographie:</h3>
                        <div className="textAndMore">
                            <p className="details">{artistData.Biography}</p>
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
            <Discography artistId={artistId} />
        </div>
    );
}