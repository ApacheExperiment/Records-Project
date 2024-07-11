import React, { useEffect, useState } from "react";
import pb from '../../pocketbase';
import './discography.scss';

function Discography({ bandId }) {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                const response = await pb.collection('Albums').getFullList({
                    filter: `bandId='${bandId}'` // Filtre par l'ID du groupe
                });
                setAlbums(response);
            } catch (error) {
                console.error("Error fetching albums data:", error);
            }
        };

        fetchAlbums();
    }, [bandId]);

    if (!albums.length) {
        return <div>No albums found for this band.</div>;
    }

    return (
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
                {albums.map((album) => (
                    <div key={album.id} className="records">
                        <div className="cover">
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
                        </div>
                        <div className="name-years-space">
                            <p className="records__name">{album.NameAlbum}</p>
                            <p>{album.Label}</p>
                            <p className="years-realese">{album.Year}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Discography;