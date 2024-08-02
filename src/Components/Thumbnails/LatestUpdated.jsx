import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import pb from '../../pocketbase';
import ArrowRight from '../../assets/img/Icon/arrow-right.png';
import './thumbnails.scss';

function LatestUpdated() {
    const [updatedAlbums, setUpdatedAlbums] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUpdatedAlbums = async () => {
            try {
                console.log('Fetching updated albums...');
                const response = await pb.collection('Albums').getList(1, 5, {
                    sort: '-updated', // Trie par date de mise à jour descendante
                    expand: 'bandId', // Récupère les données associées du groupe
                });
                console.log('API response:', response);

                if (response && response.items) {
                    const albumsWithBandData = response.items.map((album) => ({
                        ...album,
                        bandData: album.expand.bandId,
                    }));

                    setUpdatedAlbums(albumsWithBandData);
                    console.log('Fetched updated albums with band data:', albumsWithBandData);
                } else {
                    setError('Aucune donnée disponible.');
                    console.error('No data available in the response.');
                }
            } catch (error) {
                console.error('Error fetching updated albums:', error);
                setError('Une erreur est survenue lors de la récupération des albums mis à jour.');
            }
        };

        fetchUpdatedAlbums();
    }, []);

    return (
        <div className="container-thumbnails">
            <h3 className="title-thumbnails">Les mises à jour</h3>
            {error && <div className="error-message">{error}</div>}
            <div className="thumbnails">
                {updatedAlbums.length > 0 ? (
                    updatedAlbums.map((album) => (
                        <div key={album.id} className="thumbnail">
                            {album.Cover ? (
                                <img
                                    src={pb.getFileUrl(album, album.Cover)}
                                    alt={album.NameAlbum}
                                    className="thumbnail-image"
                                />
                            ) : (
                                <div className="placeholder-thumbnail">No cover</div>
                            )}
                            <div className="thumbnail-details">
                                {album.bandData ? (
                                    <Link to={`/band/${album.bandData.id}`} className="thumbnail-title">
                                        {album.bandData.NameBand}
                                    </Link>
                                ) : (
                                    <p className="thumbnail-title">Unknown Band</p>
                                )}
                                <Link to={`/record/${album.id}`} className="thumbnail-title">
                                    {album.NameAlbum}
                                </Link>
                                <p className="thumbnail-text">{album.Year}</p>
                                <p className="thumbnail-text">{album.Genre}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    !error && <div>Loading...</div>
                )}
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

export default LatestUpdated;






