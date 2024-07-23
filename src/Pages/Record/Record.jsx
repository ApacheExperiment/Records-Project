import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import pb from '../../pocketbase';
import "./record.scss";

function Record() {
    const { albumId } = useParams();
    const [album, setAlbum] = useState(null);
    const [band, setBand] = useState(null);

    useEffect(() => {
        const fetchAlbum = async () => {
            try {
                const response = await pb.collection('Albums').getOne(albumId);
                setAlbum(response);
                if (response.bandId) {
                    const bandResponse = await pb.collection('Band').getOne(response.bandId);
                    setBand(bandResponse);
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
                        – 
                        <h2 className="band-record recordName">{album.NameAlbum}</h2>
                    </div>
                    <p className="détails-record">Genre: {album.Genre}</p>
                    <p className="détails-record">Label: {album.Label}</p>
                    <p className="détails-record">Year: {album.Year}</p>
                    <p className="détails-record">Versions: {album.Versions}</p>
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
        </div>
    );
}

export default Record;
