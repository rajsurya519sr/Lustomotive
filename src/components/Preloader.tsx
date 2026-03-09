"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fallback: in case the video is very long or fails, we give it much more time to finish organically.
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 20000); // Increased from 5 to 20 seconds so the full video can play

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="preloader"
                    className="fixed inset-0 z-[99999] flex items-center justify-center bg-black overflow-hidden"
                    initial={{ opacity: 1, scale: 1 }}
                    exit={{
                        opacity: 0,
                        scale: 1.5,
                        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
                    }}
                >
                    {/* The Video Element directly covering the full screen */}
                    <video
                        className="absolute inset-0 w-full h-full object-cover"
                        autoPlay
                        muted
                        playsInline
                        onEnded={() => setIsLoading(false)}
                        onError={() => setIsLoading(false)}
                    >
                        <source src="/videos/loader3.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    <motion.div
                        className="absolute bottom-10 z-10 text-white/50 text-sm tracking-[0.2em] uppercase font-orbitron drop-shadow-md"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    >
                        Loading Experience...
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
