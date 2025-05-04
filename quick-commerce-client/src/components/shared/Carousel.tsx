import React, { useState } from 'react';

type Size = 'small' | 'medium' | 'large';

interface CarouselProps {
    images: string[];
    props?: React.HTMLAttributes<HTMLDivElement>;
    className?: string;
    size?: Size;
}

const sizeClasses: Record<Size, string> = {
    small: 'p-1 text-xs',
    medium: 'p-2 text-base',
    large: 'p-3 text-xl',
};

const Carousel: React.FC<CarouselProps> = ({
    images,
    props,
    className,
    size = 'medium',
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div
            className={`relative  max-w-lg overflow-hidden w-40 ${className}`}
            {...props}
        >
            <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((src, index) => (
                    <div
                        key={index}
                        className={`w-full flex-shrink-0 shadow-lg bg-[${src}] ${className}`}
                        style={{
                            backgroundImage: `url(${src})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                ))}
            </div>

            {/* Navigation Buttons */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className={`absolute left-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 cursor-pointer ${sizeClasses[size]}`}
                    >
                        ❮
                    </button>
                    <button
                        onClick={nextSlide}
                        className={`absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 cursor-pointer ${sizeClasses[size]}`}
                    >
                        ❯
                    </button>
                </>
            )}

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {images.length > 1 &&
                    images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`cursor-pointer h-2 w-2 rounded-full shadow shadow-gray-800 ${
                                currentIndex === index
                                    ? 'bg-white'
                                    : 'bg-gray-400'
                            }`}
                        />
                    ))}
            </div>
        </div>
    );
};

export default Carousel;
