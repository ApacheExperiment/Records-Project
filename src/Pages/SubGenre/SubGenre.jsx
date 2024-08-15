import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import pb from '../../pocketbase';
import ArrowRight from '../../assets/img/Icon/arrow-right.png';
import './subGenre.scss';

export default function SubGenre() {
    const { genreId } = useParams(); // Récupère l'ID du genre depuis l'URL
    const [subGenres, setSubGenres] = useState([]);

    useEffect(() => {
        const fetchSubGenres = async () => {
            try {
                const response = await pb.collection('SubGenre').getFullList({
                    filter: `genreId='${genreId}'`, // Filtre pour récupérer les sous-genres du genre sélectionné
                });

                setSubGenres(response);
            } catch (error) {
                console.error('Error fetching subgenres:', error);
            }
        };

        fetchSubGenres();
    }, [genreId]);

    return (
        <div className="container-genres">
            <h3 className="title-genres">Sous Genres</h3>
            <div className="genres">
                {subGenres.map((subGenre) => (
                    <div key={subGenre.id} className="genre">
                        {subGenre.CoverSubGenre ? (
                            <img
                                src={pb.getFileUrl(subGenre, subGenre.CoverSubGenre)}
                                alt={subGenre.NameSubGenre}
                                className="genre-image"
                            />
                        ) : (
                            <div className="placeholder-genre">No cover</div>
                        )}
                        <div className="genre-details">
                            <p className="genre-text">{subGenre.NameSubGenre}</p>
                            {subGenre.IconSubGenre ? (
                                <img
                                    src={pb.getFileUrl(subGenre, subGenre.IconSubGenre)}
                                    alt={subGenre.NameSubGenre}
                                    className="genre-icon"
                                />
                            ) : (
                                <div className="placeholder-genere">No Icon</div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <img
                src={ArrowRight}
                alt="Plus d'informations"
                width={20}
                height={15}
                className="ArrowNext"
            />
        </div>
    );
}
