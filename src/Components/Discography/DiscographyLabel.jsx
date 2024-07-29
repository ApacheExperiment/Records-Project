import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import pb from '../../pocketbase';
import './discography.scss';

function DiscographyLabel({ labelId }) {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await pb.collection('Albums').getFullList({
                    filter: `labelId='${labelId}'`,
                    expand: 'labelId'
                });
                setAlbums(response);
            } catch (error) {
                console.error("Error fetching albums data:", error);
            }
        };

        fetchAlbums();
    }, [labelId]);

    if (!albums.length) {
        return <div>No albums found for this label.</div>;
    }

    return (
        <div className="realese">
            <div className="filters-left">
                <div className="filter">Sorties</div>
                <p>Albums</p>
                <p>EPs</p>
                <p>Singles</p>
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
                {albums.map((album) => (
                    <div key={album.id} className="records">
                        <div className="cover">
                            <Link to={`/record/${album.id}`}>
                                {album.Cover ? (
                                    <img
                                        src={pb.getFileUrl(album, album.Cover)}
                                        alt={album.NameAlbum}
                                        width={100}
                                        height={100}
                                    />
                                ) : (
                                    <div className="placeholder-cover">No cover available</div>
                                )}
                            </Link>
                        </div>
                        <div className="name-years-space">
                            <Link to={`/record/${album.id}`} className="records__name">{album.NameAlbum}</Link>
                            {album.expand.labelId ? (
                                <Link to={`/label/${album.expand.labelId.id}`} className="details-record">
                                    {album.expand.labelId.NameLabel}
                                </Link>
                            ) : (
                                <p className="details">Label non disponible</p>
                            )}
                            <p className="years-realese">{album.Year}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DiscographyLabel;
