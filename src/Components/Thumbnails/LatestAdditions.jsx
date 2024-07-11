import React, { useEffect, useState } from "react";
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
                setLatestAlbums(response.items);
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
                        {/*<p className="thumbnail-title">{album.NameAlbum}</p>*/}
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