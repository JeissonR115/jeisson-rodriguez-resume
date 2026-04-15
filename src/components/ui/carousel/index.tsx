import { useState } from 'react';
import './carousel.scss';

type CarouselProps = {
    images: string[];
    alt: string;
};

function Carousel({ images, alt }: CarouselProps) {
    const [current, setCurrent] = useState(0);

    const prev = () =>
        setCurrent((i) => (i - 1 + images.length) % images.length);
    const next = () => setCurrent((i) => (i + 1) % images.length);

    return (
        <div className="carousel">
            <div className="carousel__track">
                <img
                    src={`/projects/${images[current]}`}
                    alt={`${alt} ${current + 1}`}
                    className="carousel__img"
                />
            </div>

            {images.length > 1 && (
                <>
                    <button
                        className="carousel__btn carousel__btn--prev"
                        onClick={prev}
                    >
                        ‹
                    </button>
                    <button
                        className="carousel__btn carousel__btn--next"
                        onClick={next}
                    >
                        ›
                    </button>
                    <div className="carousel__dots">
                        {images.map((_, i) => (
                            <button
                                key={i}
                                className={`carousel__dot ${i === current ? 'carousel__dot--active' : ''}`}
                                onClick={() => setCurrent(i)}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Carousel;
