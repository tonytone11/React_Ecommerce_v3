import React, { useState, useEffect } from 'react';
import '../styling/Slider.css';
import Xbox from '../images/xboxController.png';
import Playstation from '../images/ps5Controller.png';
import Switch from '../images/switchController.png';

const Slider = ({
    images = [
        { url: Xbox, alt: 'Xbox Controller' },
        { url: Playstation, alt: 'PS5 Controller' },
        { url: Switch, alt: 'Switch Controller' }
    ],
    autoPlayInterval = 5000,  // Default time between slides (5 seconds)
    showDots = true,          // Control visibility of navigation dots
    showArrows = true         // Control visibility of navigation arrows
}) => {
    // State for tracking current slide index
    const [currentIndex, setCurrentIndex] = useState(0);
    // State for controlling autoplay functionality
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Effect hook to handle automatic slideshow
    useEffect(() => {
        let intervalId;
        if (isAutoPlaying) {
            // Set up interval to advance slides automatically
            intervalId = setInterval(() => {
                setCurrentIndex((prevIndex) =>
                    // Loop back to first slide after last slide
                    prevIndex === images.length - 1 ? 0 : prevIndex + 1
                );
            }, autoPlayInterval);
        }
        // Cleanup function to clear interval when component unmounts or dependencies change
        return () => clearInterval(intervalId);
    }, [isAutoPlaying, images.length, autoPlayInterval]);

    // Function to go to next slide
    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    // Function to go to previous slide
    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    // Function to go to specific slide by index
    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        // Main container with mouse event handlers to pause/resume autoplay
        <div
            className="slider-container"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
        >
            <div className="slider-wrapper">
                {/* Map through images array to create slides */}
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`slide ${index === currentIndex ? 'active' : ''}`}
                    >
                        <img
                            src={image.url}
                            alt={image.alt}
                        />
                    </div>
                ))}
            </div>

            {/* Render navigation arrows if showArrows is true */}
            {showArrows && (
                <>
                    {/* Previous slide button with SVG arrow icon */}
                    <button
                        onClick={goToPrevious}
                        className="nav-button prev-button"
                        aria-label="Previous slide"
                    >
                        <svg>...</svg>
                    </button>
                    {/* Next slide button with SVG arrow icon */}
                    <button
                        onClick={goToNext}
                        className="nav-button next-button"
                        aria-label="Next slide"
                    >
                        <svg>...</svg>
                    </button>
                </>
            )}

            {/* Render navigation dots if showDots is true */}
            {showDots && (
                <div className="dots-container">
                    {/* Map through images to create navigation dots */}
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`dot ${index === currentIndex ? 'active' : ''}`}
                            aria-label={`Go to slide ${index + 1}`}
                        >
                            {/* Screen reader text */}
                            <span className="sr-only">Go to slide {index + 1}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

// Export the Slider component
export default Slider;