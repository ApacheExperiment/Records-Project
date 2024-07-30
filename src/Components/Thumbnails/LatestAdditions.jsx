import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import pb from '../../pocketbase';
import ArrowRight from '../../assets/img/Icon/arrow-right.png';
import './thumbnails.scss';

function LastAdditions() {
    const [latestAlbums, setLatestAlbums] = useState([]);

    useEffect(() => {
        const fetchLatestAlbums = async () => {
            try {
                const response = await pb.collection('Albums').getList(1, 5, {
                    sort: '-created' // Trie par date de création descendante
                });

                const albumsWithBandData = await Promise.all(response.items.map(async (album) => {
                    const bandResponse = await pb.collection('Band').getOne(album.bandId);
                    return { ...album, bandData: bandResponse };
                }));

                setLatestAlbums(albumsWithBandData);
            } catch (error) {
                console.error('Error fetching latest albums:', error);
            }
        };

        fetchLatestAlbums();
    }, []);

    return (
        <div className="container-thumbnails">
            <h3 className="title-thumbnails">Les derniers ajouts</h3>
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
                            <br/>
                            {album.bandData && (
                                    <Link to={`/band/${album.bandData.id}`} className="thumbnail-title">
                                        {album.bandData.NameBand}
                                    </Link>
                                )}<br></br> 
                                <br/>
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