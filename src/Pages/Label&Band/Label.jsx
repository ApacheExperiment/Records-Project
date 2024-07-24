import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import './label&band.scss';
import pb from '../../pocketbase';
import ArrowRight from '../../assets/img/Icon/arrow-right.png';
import Discography from '../../Components/Discography/Discography';

export default function Label() {
    const { labelId } = useParams();
    const [labelData, setLabelData] = useState(null);

    useEffect(() => {
        const fetchLabelData = async () => {
            try {
                const response = await pb.collection('Label').getOne(labelId);
                setLabelData(response);
            } catch (error) {
                console.error("Error fetching band data:", error);
            }
        };

        fetchLabelData();
    }, [labelId]);

    if (!labelData) {
        return <div>Loading...</div>;
    }
    const logoUrl = labelData.LogoLabel ? pb.getFileUrl(labelData, labelData.LogoLabel) : null;

    return (
        <div className="label-container">
            <div className="label">
                <div className="label__profile">
                    {logoUrl ? (
                        <img
                            src={logoUrl}
                            alt="label"
                            width={250}
                            height={250}
                            className="label__picture"
                        />
                    ) : (
                        <div className="placeholder-image">No image available</div>
                    )}
                </div>
                <div className="label__text">
                    <h2 className="label__name">{labelData.NameLabel}</h2>
                    <div className="label__description">
                        <h3>Status:</h3>
                        <p className="details">{labelData.StatusLabel}</p>
                    </div>
                    <div className="label__description">
                        <h3>Création:</h3>
                        <p className="details">{labelData.Creation}</p>
                    </div>
                    <div className="label__description">
                        <h3>Années d'activités:</h3>
                        <p className="details">{labelData.YearOfActivity}</p>
                    </div>
                    <div className="label__description">
                        <h3>Localisation:</h3>
                        <p className="details">{labelData.LocationLabel}</p>
                    </div>
                    <div className="label__description">
                        <h3>Genre:</h3>
                        <p className="details">{labelData.Genre}</p>
                    </div>
                    <div className="label__description">
                        <h3>Liens:</h3>
                        <Link to={labelData.Links} className="details" target="_blank" rel="noopener noreferrer">Sites</Link>
                    </div>
                    <div className="label__biographie">
                        <h3>Biographie:</h3>
                        <div className="textAndMore">
                            <p className="details">{labelData.Biography}</p>
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
            <Discography bandId={labelId} />
        </div>
    );

};