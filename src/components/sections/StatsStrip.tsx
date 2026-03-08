"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

function AnimatedStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: false, margin: "-50px" });

    useEffect(() => {
        if (inView) {
            let start = 0;
            const duration = 2500;
            const animateUpdate = (timestamp: number) => {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                const percentage = Math.min(progress / duration, 1);
                setCount(Math.floor(percentage * value));
                if (progress < duration) window.requestAnimationFrame(animateUpdate);
            };
            window.requestAnimationFrame(animateUpdate);
        } else {
            setCount(0);
        }
    }, [inView, value]);

    return (
        <div className="text-center flex flex-col items-center justify-start w-1/4" ref={ref}>
            <div
                className="text-lg sm:text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold text-[#ff1744] mb-1 sm:mb-3 tracking-widest drop-shadow-[0_0_15px_rgba(255,23,68,0.5)] whitespace-nowrap"
                style={{ fontVariantNumeric: "tabular-nums" }}
            >
                {count}{suffix}
            </div>
            <div className="text-[0.45rem] mt-1 sm:text-xs md:text-[0.7rem] text-gray-400 uppercase tracking-widest max-w-[120px] leading-relaxed mx-auto font-sans">
                {label}
            </div>
        </div>
    );
}

export default function StatsStrip() {
    return (
        <div className="w-full border-y border-neutral-900 py-10 sm:py-16 bg-black/40">
            <motion.div
                className="flex flex-row justify-between items-start sm:items-center max-w-[100rem] mx-auto px-2 sm:px-12 lg:px-24 w-full gap-2 sm:gap-4 md:gap-8"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.8 }}
            >
                <AnimatedStat value={1000} suffix="+" label="Vehicles Detailed" />
                <AnimatedStat value={2} suffix="+" label="Years Of Excellence" />
                <AnimatedStat value={92} suffix="%" label="Customer Satisfaction" />
                <AnimatedStat value={100} suffix="+" label="Cashless Claims" />
            </motion.div>
        </div>
    );
}
