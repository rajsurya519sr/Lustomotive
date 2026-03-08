"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function RealTimeClock() {
    const [time, setTime] = useState({ h: "00", m: "00", s: "00", ampm: "AM" });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
        const updateTime = () => {
            const now = new Date();
            let hours = now.getHours();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;

            setTime({
                h: hours.toString().padStart(2, '0'),
                m: now.getMinutes().toString().padStart(2, '0'),
                s: now.getSeconds().toString().padStart(2, '0'),
                ampm: ampm
            });
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    if (!mounted) return null;

    return (
        <div className="flex flex-col items-center justify-center pb-16 pt-8 md:pb-24 md:pt-12 bg-[#050505] relative z-20 border-b border-neutral-900 border-t-0 overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse,rgba(255,23,68,0.06)_0%,transparent_70%)] pointer-events-none z-0"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                viewport={{ once: false }}
                transition={{ duration: 0.8 }}
                className="text-center relative z-10 w-full max-w-6xl mx-auto px-4"
            >
                {/* Clean, Sporty Chronograph Style Text Clock */}
                <div className="flex flex-row items-center justify-center gap-1 sm:gap-2 mb-2 sm:mb-4 mt-2 select-none w-full whitespace-nowrap overflow-hidden">
                    {/* Time Digits */}
                    <div className="font-orbitron italic font-black text-[2.5rem] min-[400px]:text-[3rem] sm:text-7xl md:text-8xl lg:text-[9rem] tracking-tighter text-white tabular-nums leading-none flex items-center justify-center">
                        <span className="w-auto">{time.h}</span>
                        <span className="text-[#ff1744] drop-shadow-[0_0_15px_rgba(255,23,68,0.5)] mx-0.5 sm:mx-1 md:mx-4">:</span>
                        <span className="w-auto">{time.m}</span>
                        <span className="text-[#ff1744] drop-shadow-[0_0_15px_rgba(255,23,68,0.5)] mx-0.5 sm:mx-1 md:mx-4">:</span>
                        <span className="w-auto">{time.s}</span>
                    </div>

                    {/* AM/PM Indicator */}
                    <div className="font-orbitron italic font-black text-[2.5rem] min-[400px]:text-[3rem] sm:text-7xl md:text-8xl lg:text-[9rem] tracking-tighter text-[#ff1744] ml-1 sm:ml-2">
                        {time.ampm}
                    </div>
                </div>

                {/* The Tagline */}
                <div className="relative inline-flex items-center justify-center mt-2 group cursor-default max-w-full">
                    {/* Glowing lines beside tagline */}
                    <div className="absolute top-1/2 -left-6 min-[400px]:-left-10 sm:-left-32 w-4 min-[400px]:w-8 sm:w-24 h-[1.5px] sm:h-[2px] bg-gradient-to-r from-transparent to-[#ff1744]/70 group-hover:to-[#ff1744] transition-colors duration-500"></div>
                    <div className="absolute top-1/2 -right-6 min-[400px]:-right-10 sm:-right-32 w-4 min-[400px]:w-8 sm:w-24 h-[1.5px] sm:h-[2px] bg-gradient-to-l from-transparent to-[#ff1744]/70 group-hover:to-[#ff1744] transition-colors duration-500"></div>

                    <p className="font-orbitron italic text-[0.6rem] min-[400px]:text-[0.75rem] sm:text-2xl md:text-3xl lg:text-4xl text-white font-black tracking-widest sm:tracking-[0.15em] lg:tracking-[0.25em] select-none uppercase transition-opacity duration-500 whitespace-nowrap flex items-center justify-center gap-1 sm:gap-2 lg:gap-3">
                        <span className="text-gray-600 font-light group-hover:text-gray-400 transition-colors duration-500">Lust for </span>
                        <span className="text-[#ff1744] drop-shadow-[0_0_10px_rgba(255,23,68,0.4)] group-hover:drop-shadow-[0_0_20px_rgba(255,23,68,0.8)] transition-all duration-500">your automotive</span>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
