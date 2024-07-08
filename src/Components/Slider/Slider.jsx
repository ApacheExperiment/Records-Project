import React, { useState, useEffect, useCallback } from 'react';
import ButtonSlide from '../../Components/Buttons/ButtonSlide';
import PlayPauseButton from '../../Components/Buttons/ButtonPlayPause';
import './Slider.scss'


function Slider() {
    const [news, setNews] = useState([]);
    const [slideScroll, setSlideScroll] = useState({ index: 1 });
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        fetch('/datas/news.json')
            .then((response) => response.json())
            .then((data) => setNews(data.news));
    }, []);

    const beforeSlide = useCallback(() => {
        if (slideScroll.index !== news.length) {
            setSlideScroll({ index: slideScroll.index + 1 });
        } else {
            setSlideScroll({ index: 1 });
        }
        setProgress(0);
    }, [slideScroll.index, news.length]);

    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                setProgress((prev) => (prev < 100 ? prev + 1 : 0));
            }, 200);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    useEffect(() => {
        if (progress === 100) {
            beforeSlide();
        }
    }, [progress, beforeSlide]);

    const afterSlide = () => {
        if (slideScroll.index !== 1) {
            setSlideScroll({ index: slideScroll.index - 1 });
        } else {
            setSlideScroll({ index: news.length });
        }
        setProgress(0);
    };

    const togglePlay = () => {
        setIsPlaying(true);
    };

    const togglePause = () => {
        setIsPlaying(false);
    };


    return (
        <div className="slider">
            {news.map((item, index) => (
                <div
                    className={
                        slideScroll.index === index + 1
                            ? 'slider__slide slider__slide-active'
                            : 'slider__slide'
                    }
                    key={index}
                >
                    <img
                        src={item.image}
                        alt={item.title}
                        className="slider__image"
                    />
                    
                </div>
            ))}
            {news.length > 1 && (
                <div className="slider__banner">
                    <ButtonSlide showSlide={beforeSlide} direction="before" />
                    <ButtonSlide showSlide={afterSlide} direction="after" />
                    <PlayPauseButton togglePlay={togglePlay} togglePause={togglePause} />
                    <div className="slider__progress">
                        <div className="slider__progressBar" style={{ width: `${progress}%` }}></div>
                    </div>
                    
                </div>
            )}
            {news.length > 0 && (
            <div className="slider__bannerTitle">
                <div className="slider__title">
                    {news[slideScroll.index - 1].title}
                </div>
            </div>
            )}
        </div>
    );
}

export default Slider;
