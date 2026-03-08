'use client';

import { useScroll, useTransform, motion, useSpring } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

interface Image {
    src: string;
    alt?: string;
}

interface ZoomParallaxProps {
    /** Array of images to be displayed in the parallax effect max 11 images */
    images: Image[];
}

export function ZoomParallax({ images }: ZoomParallaxProps) {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end'],
    });

    // Apply a physics-based spring smoothing to the scroll value
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const scale4 = useTransform(smoothProgress, [0, 0.65], [1, 4]);
    const scale5 = useTransform(smoothProgress, [0, 0.65], [1, 5]);
    const scale6 = useTransform(smoothProgress, [0, 0.65], [1, 6]);
    const scale7 = useTransform(smoothProgress, [0, 0.65], [1, 7]);
    const scale8 = useTransform(smoothProgress, [0, 0.65], [1, 8]);
    const scale9 = useTransform(smoothProgress, [0, 0.65], [1, 9]);

    const scales = [
        scale4, // 0
        scale5, // 1
        scale6, // 2
        scale5, // 3
        scale6, // 4
        scale8, // 5
        scale9, // 6
        scale5, // 7
        scale7, // 8
        scale8, // 9
        scale6, // 10
    ];

    return (
        <div ref={container} className="relative h-[400vh]">
            <div className="sticky top-0 h-screen overflow-hidden">
                {images.map(({ src, alt }, index) => {
                    const scale = scales[index % scales.length];

                    // Specific positional classes for each index to scatter them beautifully
                    const getPositionClasses = (i: number) => {
                        switch (i) {
                            case 1: return '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]';
                            case 2: return '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]';
                            case 3: return '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]';
                            case 4: return '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]';
                            case 5: return '[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]';
                            case 6: return '[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]';
                            // New positions for images 7 to 10
                            case 7: return '[&>div]:!-top-[32vh] [&>div]:!-left-[28vw] [&>div]:!h-[20vh] [&>div]:!w-[20vw]';
                            case 8: return '[&>div]:!-top-[25vh] [&>div]:!left-[32vw] [&>div]:!h-[22vh] [&>div]:!w-[18vw]';
                            case 9: return '[&>div]:!top-[10vh] [&>div]:!-left-[38vw] [&>div]:!h-[30vh] [&>div]:!w-[20vw]';
                            case 10: return '[&>div]:!top-[35vh] [&>div]:!left-[35vw] [&>div]:!h-[20vh] [&>div]:!w-[25vw]';
                            default: return ''; // 0 is exactly center
                        }
                    };

                    return (
                        <motion.div
                            key={index}
                            style={{ scale }}
                            className={`absolute top-0 flex h-full w-full items-center justify-center ${getPositionClasses(index)}`}
                        >
                            <div className="relative h-[25vh] w-[25vw]">
                                <Image
                                    src={src || '/placeholder.svg'}
                                    alt={alt || `Parallax image ${index + 1}`}
                                    fill
                                    sizes="(max-width: 768px) 50vw, 33vw"
                                    className="object-cover"
                                    quality={95}
                                    priority={index < 4}
                                    unoptimized={src?.includes('footerX')}
                                />
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
