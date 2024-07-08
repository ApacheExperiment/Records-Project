import React from 'react';
import playIcon from '../../assets/img/Icon/play-white.png';
import pauseIcon from '../../assets/img/Icon/pause-white.png';
import './buttonPlayPause.scss'

function PlayPauseButton({ togglePlay, togglePause }) {
    return (
        <div className="button-play-pause">
            <button onClick={togglePlay} className="button-play">
                <img src={playIcon} alt="Play" className="play-icon"/>
            </button>
            <button onClick={togglePause} className="button-pause">
                <img src={pauseIcon} alt="Pause" className="pause-icon"/>
            </button>
        </div>
    );
}

export default PlayPauseButton;