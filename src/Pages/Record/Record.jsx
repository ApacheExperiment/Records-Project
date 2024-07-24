import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import pb from '../../pocketbase';
import "./record.scss";

function Record() {
    const { albumId } = useParams();
    const [album, setAlbum] = useState(null);
    const [band, setBand] = useState(null);
    const [label, setLabel] = useState(null);

    useEffect(() => {
        const fetchAlbum = async () => {
            try {
                const response = await pb.collection('Albums').getOne(albumId, { expand: 'bandId,labelId' });
                setAlbum(response);
                if (response.expand.bandId) {
                    const bandResponse = await pb.collection('Band').getOne(response.expand.bandId.id);
                    setBand(bandResponse);
                }
                if (response.expand.labelId) {
                    const labelResponse = await pb.collection('Label').getOne(response.expand.labelId.id);
                    setLabel(labelResponse);
                }
            } catch (error) {
                console.error("Error fetching album data:", error);
            }
        };

        fetchAlbum();
    }, [albumId]);

    if (!album) {
        return <div>Loading...</div>;
    }

    return (
        <div className="album-container">
            <div className="record-container">
                <div className="row-cover-description">
                    <img src={pb.getFileUrl(album, album.Cover)} alt={album.NameAlbum} 
                        width={150}
                        height={150} 
                    />
                    <div className="col-description">
                        <div className="row-band-record">
                            {band && (
                                <h2 className="band-record bandName">
                                    <Link to={`/band/${band.id}`}>{band.NameBand}</Link>
                                </h2>
                            )} 
                            <b>–</b>
                            <h2 className="band-record recordName">{album.NameAlbum}</h2>
                        </div>
                        <p className="détails-record">Genre: {album.Genre}</p>
                        {label ? (
                            <Link to={`/label/${label.id}`} className="details-record">
                                {label.NameLabel}
                            </Link>
                        ) : (
                            <p className="details">Label non disponible</p>
                        )}
                        <p className="détails-record">Year: {album.Year}</p>
                    </div>
                </div>
                <h3>Tracklist</h3>
                <ul>
                    {album.Tracklist && album.Tracklist.map((track, index) => (
                        <li key={index}>
                            {track.trackNumber}. {track.trackName} - {track.trackDuration}
                        </li>
                    ))}
                </ul>
                <div>
                    <h3>Crédits</h3>
                </div>
                <p className="détails-record">Versions: {album.Versions}</p>
            </div>
                <div className="annexes-container">
                    <div className="col-links-annexes">
                        <div className="rectangle1"></div>
                        <div className="rectangle2"></div>
                    </div>
                </div>
        </div>
    );
}

export default Record;
