import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import pb from '../../pocketbase';
import ArrowRight from '../../assets/img/Icon/arrow-right.png';
import './thumbnails.scss';

function LastAdditions() {
    const [latestAlbums, setLatestAlbums] = useState([]);
    //const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLatestAlbums = async () => {
            try {
                const response = await pb.collection('Albums').getList(1, 10, {
                    sort: '-created', // Trie par date de création descendante
                    expand: 'bandId, artistId', // Récupère les données associées du groupe
                });

                const albumsWithBandData = response.items.map((album) => ({
                    ...album,
                    bandData: album.expand.bandId,
                    artistData: album.expand.artistId,
                }));

                console.log('Fetched albums:', albumsWithBandData);
                setLatestAlbums(albumsWithBandData);
            } catch (error) {
                //console.error('Error fetching latest albums:', error);
                //setError('Une erreur est survenue lors de la récupération des derniers albums.');
            }
        };

        fetchLatestAlbums();
    }, []);

    return (
        <div className="container-thumbnails">
            <h3 className="title-thumbnails">Les derniers ajouts</h3>
            {/*error && <div className="error-message">{error}</div>*/}
            <div className="thumbnails">
                {latestAlbums.map((album) => (
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
                                ) : album.artistData ? (
                                    <Link to={`/artist/${album.artistData.id}`} className="thumbnail-title">
                                        {album.artistData.NameArtist}
                                    </Link>
                                ) : (
                                    <p className="thumbnail-title">Unknown Artist/Band</p>
                                )}
                                <Link to={`/record/${album.id}`} className="thumbnail-title">
                                    {album.NameAlbum}
                                </Link>
                            <p className="thumbnail-text">{album.Year}</p>
                            <p className="thumbnail-text">{album.Genre}</p>
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

export default LastAdditions;

