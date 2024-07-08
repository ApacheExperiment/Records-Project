import React from "react";
import ArrowRight from '../../assets/img/Icon/arrow-right.png'
import './thumbnails.scss';

function MostSearched() {

    return (
        <div className="container-thumbnails">
            <h3 className="title-thumbnails">Les derniers ajouts</h3>
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

export default MostSearched; 