import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import pb from '../../pocketbase';

function BandList() {
    const [bands, setBands] = useState([]);

    useEffect(() => {
        const fetchBands = async () => {
            try {
                const response = await pb.collection('Band').getAll();
                setBands(response);
            } catch (error) {
                console.error("Error fetching bands:", error);
            }
        };

        fetchBands();
    }, []);

    return (
        <div>
            {bands.map(band => (
                <Link key={band.id} to={`/band/${encodeURIComponent(band.NameBand.replace(/ /g, '-'))}`}>
                    {band.NameBand}
                </Link>
            ))}
        </div>
    );
}

export default BandList;
