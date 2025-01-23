import React, { useState, useEffect } from 'react';
import { useTransition, animated } from '@react-spring/web';
import { images, imagesMobile } from '../assets/Schemas';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';


const ImageSlider = ({ interval }) => {
    
    const [index, setIndex] = useState(0);
    const [currentImages, setCurrentImages] = useState(images);

    useEffect(() => {
        const updateImages = () => {
            if (window.matchMedia('(max-width: 720px)').matches) {
                setCurrentImages(imagesMobile);
            } else {
                setCurrentImages(images);
            }
        };
        updateImages();
        window.addEventListener('resize', updateImages);

        return () => window.removeEventListener('resize', updateImages);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % currentImages.length);
        }, interval);
        return () => clearInterval(timer);
    }, [currentImages.length, interval]);

    const transitions = useTransition(index, {
        key: index,
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 1000 },
    });

    const handlePrev = () => setIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
    const handleNext = () => setIndex((prev) => (prev + 1) % currentImages.length);

    return (
        <div className="slider-container">
            {transitions((style, i) => (
                <animated.div className="slide" style={style} key={i}>
                    <img src={currentImages[i]} alt={`Slide ${i}`} className="slide-image" />
                </animated.div>
            ))}
            <div className="arrows">
                <span className="arrow left"><ArrowCircleLeftIcon onClick={handlePrev} /></span>
                <span className="arrow right"><ArrowCircleRightIcon onClick={handleNext} /></span>
            </div>
            <div className="dots">
                {currentImages.map((_, i) => (
                    <span key={i} className={`dot ${i === index ? 'active' : ''}`} onClick={() => setIndex(i)}></span>
                ))}
            </div>
        </div>
    );
};

export default ImageSlider;
