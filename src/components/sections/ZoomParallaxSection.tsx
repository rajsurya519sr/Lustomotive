'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { ZoomParallax } from "@/components/ui/zoom-parallax";

export default function ZoomParallaxSection() {

    const images = [
        {
            src: '/images/footerX.jpg',
            alt: 'Lustomotive Detailing Studio',
        },
        {
            src: '/images/bike1.jpg',
            alt: 'Premium Bike Detailing',
        },
        {
            src: '/images/mp1.jpg',
            alt: 'Luxury Car Finish',
        },
        {
            src: '/images/mp2.jpg',
            alt: 'Car detail action',
        },
        {
            src: '/images/mp3.jpg',
            alt: 'Our Craftsmanship',
        },
        {
            src: '/images/mp4.jpg',
            alt: 'Sports Car shine',
        },
        {
            src: '/images/mp5.jpg',
            alt: 'Car cleaning',
        },
        {
            src: '/images/mp6.jpg',
            alt: 'The Showroom Finish',
        },
        {
            src: '/images/mp7.jpg',
            alt: 'Ceramic Coating',
        },
        {
            src: '/images/mp8.jpg',
            alt: 'Ultimate Protection',
        },
        {
            src: '/images/mp9.jpg',
            alt: 'Detailing Masterpiece',
        },
    ];

    return (
        <section className="bg-black text-white w-full border-t border-black relative z-0 mb-[-100vh]">
            <div className="relative flex h-[35vh] items-center justify-center pt-20">
                {/* Radial spotlight */}
                <div
                    aria-hidden="true"
                    className={cn(
                        'pointer-events-none absolute top-0 left-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 rounded-full',
                        'bg-[radial-gradient(ellipse_at_center,rgba(255,23,68,0.1),transparent_50%)]',
                        'blur-[30px]',
                    )}
                />
                <div className="text-center z-10 px-4">
                    <p className="text-[#ff1744] text-[0.72rem] tracking-[0.4em] uppercase font-bold mb-3">Immersive Experience</p>
                    <h2 className="text-4xl md:text-5xl font-orbitron font-bold tracking-widest text-white mb-4 drop-shadow-[0_0_15px_rgba(255,23,68,0.5)]">
                        Our <span className="text-[#ff1744]">Gallery</span>
                    </h2>
                    <div className="w-[60px] h-[2px] bg-gradient-to-r from-transparent via-[#ff1744] to-transparent mx-auto mt-3 mb-4"></div>
                    <p className="text-gray-400 font-light text-sm max-w-sm mx-auto">Scroll down to explore our detailing masterpieces in immersive parallax</p>
                </div>
            </div>
            <ZoomParallax images={images} />
        </section>
    );
}
