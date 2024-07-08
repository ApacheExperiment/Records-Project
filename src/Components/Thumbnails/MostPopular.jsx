import React from "react";
import ArrowRight from '../../assets/img/Icon/arrow-right.png'
import './thumbnails.scss';

function MostPopular() {

    return (
        <div className="container-thumbnails">
            <h3 className="title-thumbnails">Les plus populaires</h3>
            <div className="thumbnails">
                <div className="thumbnail"></div>
                <div className="thumbnail"></div>
                <div className="thumbnail"></div>
                <div className="thumbnail"></div>
                <div className="thumbnail"></div>
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

export default MostPopular; 