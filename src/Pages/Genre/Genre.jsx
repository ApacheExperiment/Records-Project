import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import pb from '../../pocketbase';
//import ArrowRight from '../../assets/img/Icon/arrow-right.png';
import './genre.scss';

export default function Genre() {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await pb.collection('Genre').getFullList({
                    sort: '-created', // Trie par date de création descendante
                });

                setGenres(response);
                console.log('Fetched genres:', response);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };

        fetchGenres();
    }, []);

    return (
        <div className="container-genres">
            <h3 className="title-genres">Genre</h3>
            <div className="genres">
                {genres.map((genre) => (
                    <div key={genre.id} className="genre">
                        <Link to={`/subgenre/${genre.id}`} className="thumbnail-link">
                            {genre.CoverGenre ? (
                                <img
                                    src={pb.getFileUrl(genre, genre.CoverGenre)}
                                    alt={genre.NameGenre}
                                    className="genre-image"
                                />
                            ) : (
                                <div className="placeholder-thumbnail">No cover</div>
                            )}

                            <div className="genre-details">
                                <p className="genre-text">{genre.NameGenre}</p>
                                {genre.IconGenre ? (
                                    <img
                                        src={pb.getFileUrl(genre, genre.IconGenre)}
                                        alt={genre.NameGenre}
                                        className="genre-icon"
                                    />
                                ) : (
                                    <div className="placeholder-genre">No Icon</div>
                                )}
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            {/*<img
                src={ArrowRight}
                alt="Plus d'informations"
                width={20}
                height={15}
                className="ArrowNext"
            />*/}
        </div>
    );
}
