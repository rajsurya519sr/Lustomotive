"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { Zap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────
//  CONFIGURATION — adjust these for your video
// ─────────────────────────────────────────────
const VIDEO_SRC = "/car_animation.mp4"; // place your video in public/car_animation.mp4
const SCROLL_DURATION = 6; // viewport heights to pin (≈ scroll tunnel length)

// ─────────────────────────────────────────────
//  FRAME SEQUENCE MODE (alternative)
//  Set USE_FRAMES=true, place frames in public/frames/frame_0001.jpg … frame_XXXX.jpg
//  Update TOTAL_FRAMES to match your extracted frame count (e.g. 150 for 5s @ 30fps)
// ─────────────────────────────────────────────
const USE_FRAMES = true;
const TOTAL_FRAMES = 410;
const FRAME_PATH = (n: number) =>
    `/frames/frame_${String(n).padStart(4, "0")}.jpg`;

export default function Hero() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const frameRef = useRef<HTMLCanvasElement>(null);

    // Framer scroll progress for text animations
    const { scrollYProgress } = useScroll({
        target: wrapperRef,
        offset: ["start start", "end end"],
    });

    // Smooth spring for subtle parallax
    const springProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    // ── 3D parallax bindings ──────────────────────
    const bgY = useTransform(springProgress, [0, 1], ["0%", "15%"]);
    const bgScale = useTransform(springProgress, [0, 1], [1.05, 1.18]);
    const glowOpacity = useTransform(springProgress, [0, 0.3, 0.7, 1], [0.15, 0.45, 0.55, 0.2]);
    const glowScale = useTransform(springProgress, [0, 0.5, 1], [1, 1.4, 1.1]);

    // ── video depth parallax ─────────────────────
    const videoY = useTransform(springProgress, [0, 1], ["0%", "-8%"]);
    const videoScale = useTransform(springProgress, [0, 0.5, 1], [1, 1.06, 1.12]);

    // ── NEW: Outline-to-fill + scanner bar scroll animations ────────

    // Scanner bar: x moves across tagline
    const scanX = useTransform(scrollYProgress, [0, 0.10], ["-100%", "110%"]);
    const taglineOp = useTransform(scrollYProgress, [0, 0.04, 0.25, 0.34], [0, 1, 1, 0]);

    // "Lustomotive" — outline always visible, fill clips LEFT→RIGHT
    const lsOp = useTransform(scrollYProgress, [0.10, 0.17, 0.56, 0.64], [0, 1, 1, 0]);
    const lsFill = useTransform(scrollYProgress, [0.10, 0.32], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]);
    const lsY = useTransform(scrollYProgress, [0.10, 0.24], [60, 0]);

    // "Automotive Studio" — outline always visible, fill clips RIGHT→LEFT
    const asOp = useTransform(scrollYProgress, [0.22, 0.32, 0.56, 0.64], [0, 1, 1, 0]);
    const asFill = useTransform(scrollYProgress, [0.22, 0.44], ["inset(0 0 0 100%)", "inset(0 0 0 0%)"]);
    const asY = useTransform(scrollYProgress, [0.22, 0.36], [60, 0]);

    // Description: per-word scroll stagger (6 words, each 0.04 apart)
    const dw = (start: number) => ({
        opacity: useTransform(scrollYProgress, [start, start + 0.06, 0.68, 0.76], [0, 1, 1, 0]),
        y: useTransform(scrollYProgress, [start, start + 0.08], [28, 0]),
    });
    const d0 = dw(0.38); const d1 = dw(0.41); const d2 = dw(0.44);
    const d3 = dw(0.47); const d4 = dw(0.50); const d5 = dw(0.53);

    // CTAs: rise earlier so they are clearly visible 
    const ctaOp = useTransform(scrollYProgress, [0.45, 0.55, 0.88, 0.96], [0, 1, 1, 0]);
    const cta1Y = useTransform(scrollYProgress, [0.45, 0.55], [40, 0]);
    const cta2Y = useTransform(scrollYProgress, [0.50, 0.60], [40, 0]);

    // Red accent line
    const lineWidth = useTransform(scrollYProgress, [0.02, 0.14], ["0%", "100%"]);

    // ── GSAP: video scrubbing ─────────────────────
    useEffect(() => {
        if (USE_FRAMES || !wrapperRef.current || !videoRef.current) return;
        const video = videoRef.current;
        video.pause();
        video.currentTime = 0;

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: wrapperRef.current,
                start: "top top",
                end: () => `+=${SCROLL_DURATION * window.innerHeight}`,
                scrub: 1.2,
                onUpdate: (self) => {
                    if (video.duration) {
                        video.currentTime = self.progress * video.duration;
                    }
                },
            });
        });
        return () => ctx.revert();
    }, []);

    // ── GSAP: frame sequence scrubbing ───────────
    useEffect(() => {
        if (!USE_FRAMES || !wrapperRef.current || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx2d = canvas.getContext("2d");
        if (!ctx2d) return;

        const images: HTMLImageElement[] = [];
        const currentFrame = { n: 0 };

        const drawFrame = (n: number) => {
            const img = images[n];
            if (img?.complete) ctx2d.drawImage(img, 0, 0, canvas.width, canvas.height);
        };

        // Preload all frames
        for (let i = 1; i <= TOTAL_FRAMES; i++) {
            const img = new Image();
            img.src = FRAME_PATH(i);
            images.push(img);
        }
        images[0]?.addEventListener("load", () => drawFrame(0));

        const ctx = gsap.context(() => {
            gsap.to(currentFrame, {
                n: TOTAL_FRAMES - 1,
                snap: "n",
                ease: "none",
                scrollTrigger: {
                    trigger: wrapperRef.current,
                    start: "top top",
                    end: () => `+=${SCROLL_DURATION * window.innerHeight}`,
                    scrub: 1,
                },
                onUpdate: () => drawFrame(Math.round(currentFrame.n)),
            });
        });
        return () => ctx.revert();
    }, []);

    // ── Canvas size sync ─────────────────────────
    useEffect(() => {
        if (!USE_FRAMES || !canvasRef.current) return;
        const el = canvasRef.current;
        const resize = () => {
            el.width = window.innerWidth;
            el.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, []);

    return (
        /*
         * Scroll wrapper: tall enough for the full animation tunnel.
         * The sticky inner sits at top:0 and stays pinned while the
         * outer div's scroll drives all animations.
         */
        <div
            id="hero-section"
            ref={wrapperRef}
            style={{ height: `${SCROLL_DURATION * 100}vh` }}
            className="relative"
        >
            {/* ── Sticky viewport ─────────────────── */}
            <div
                ref={stickyRef}
                className="sticky top-0 h-screen w-full overflow-hidden"
                style={{ perspective: "1200px" }}
            >
                {/* ── LAYER 0: Background image (deepest) ── */}
                {/* <motion.div
                    className="absolute inset-0 bg-cover bg-center z-0 will-change-transform"
                    style={{
                        backgroundImage: "url('/hero_bg.png')",
                        y: bgY,
                        scale: bgScale,
                    }}
                /> */}

                {/* ── LAYER 1: Cinematic overlay gradient ── */}
                <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black via-black/50 to-black/30 pointer-events-none" />
                <div className="absolute inset-0 z-[2] bg-gradient-to-r from-black/30 via-transparent to-black/30 pointer-events-none" />

                {/* ── LAYER 2: Ambient glow orb ─────────── */}
                <motion.div
                    className="absolute inset-0 z-[3] pointer-events-none flex items-center justify-center"
                    style={{ opacity: glowOpacity }}
                >
                    <motion.div
                        className="w-[700px] h-[700px] rounded-full"
                        style={{
                            scale: glowScale,
                            background:
                                "radial-gradient(circle, rgba(255,23,68,0.28) 0%, rgba(255,23,68,0.08) 40%, transparent 70%)",
                            filter: "blur(30px)",
                        }}
                    />
                </motion.div>

                {/* ── LAYER 3: Car animation (video or canvas) ── */}
                <motion.div
                    className="absolute inset-0 z-[4] will-change-transform flex items-center justify-center"
                    style={{ y: videoY, scale: videoScale }}
                >
                    {USE_FRAMES ? (
                        /* Frame sequence canvas */
                        <canvas
                            ref={canvasRef}
                            className="w-full h-full object-cover"
                            style={{ display: "block" }}
                        />
                    ) : (
                        /* Video scrubbing */
                        <video
                            ref={videoRef}
                            className="w-full h-full object-cover"
                            src={VIDEO_SRC}
                            muted
                            playsInline
                            preload="auto"
                        />
                    )}
                </motion.div>

                {/* ── LAYER 4: Foreground vignette ──────── */}
                <div className="absolute inset-0 z-[5] pointer-events-none"
                    style={{
                        background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)"
                    }}
                />



                {/* ── LAYER 6: TEXT CONTENT ─────────────── */}
                <div
                    className="absolute inset-0 z-[10] flex flex-col items-center justify-center px-4 text-center"
                    style={{ perspective: "1000px" }}
                >
                    {/* ── TAGLINE: fade in + bottom line only ── */}
                    <motion.div
                        className="mb-6"
                        style={{ opacity: taglineOp }}
                    >
                        <p className="text-yellow-500 text-[0.5rem] sm:text-[0.68rem] md:text-[0.75rem] tracking-[0.2em] sm:tracking-[0.55em] uppercase font-orbitron font-bold whitespace-nowrap overflow-hidden text-ellipsis">
                            Panagarh&apos;s Trusted Automotive Studio
                        </p>
                        {/* Divider line below only */}
                        <div className="flex justify-center mt-3">
                            <motion.div
                                className="h-[1.5px] bg-gradient-to-r from-transparent via-red-600 to-transparent"
                                style={{ width: lineWidth }}
                            />
                        </div>
                    </motion.div>

                    {/* ── "LUSTOMOTIVE" — glass + fill wipe LEFT→RIGHT ── */}
                    <motion.div
                        className="relative will-change-transform"
                        style={{ opacity: lsOp, y: lsY, filter: "drop-shadow(0 0 15px rgba(255,255,255,0.2))" }}
                    >
                        {/* Glass outline layer — frosted backdrop */}
                        <h1
                            aria-hidden="true"
                            className="font-orbitron font-black tracking-[.06em] leading-none select-none"
                            style={{
                                fontSize: "clamp(2rem, 6.5vw, 5.5rem)",
                                color: "transparent",
                                WebkitTextStroke: "1px rgba(255,255,255,0.18)",
                            }}
                        >
                            Lustomotive
                        </h1>
                        {/* Glass fill — transparent gradient, clips L→R */}
                        <motion.h1
                            className="absolute inset-0 font-orbitron font-black tracking-[.06em] leading-none will-change-transform"
                            style={{
                                fontSize: "clamp(2rem, 6.5vw, 5.5rem)",
                                clipPath: lsFill,
                                color: "transparent",
                                backgroundImage: "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.2) 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextStroke: "1px rgba(255,255,255,0.4)",
                            }}
                        >
                            Lustomotive
                        </motion.h1>
                    </motion.div>

                    {/* ── "AUTOMOTIVE STUDIO" — glass + fill wipe RIGHT→LEFT ── */}
                    <motion.div
                        className="relative will-change-transform mt-1"
                        style={{ opacity: asOp, y: asY, filter: "drop-shadow(0 0 20px rgba(255,23,68,0.4))" }}
                    >
                        {/* Glass outline — ghost red stroke */}
                        <h2
                            aria-hidden="true"
                            className="font-orbitron font-black tracking-[.06em] leading-none select-none"
                            style={{
                                fontSize: "clamp(1.4rem, 4.5vw, 4rem)",
                                color: "transparent",
                                WebkitTextStroke: "1px rgba(255,23,68,0.2)",
                            }}
                        >
                            Automotive Studio
                        </h2>
                        {/* Glass fill — transparent red gradient, clips R→L */}
                        <motion.h2
                            className="absolute inset-0 font-orbitron font-black tracking-[.06em] leading-none will-change-transform"
                            style={{
                                fontSize: "clamp(1.4rem, 4.5vw, 4rem)",
                                clipPath: asFill,
                                color: "transparent",
                                backgroundImage: "linear-gradient(180deg, rgba(255,23,68,1) 0%, rgba(200,0,0,0.3) 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextStroke: "1px rgba(255,23,68,0.5)",
                            }}
                        >
                            Automotive Studio
                        </motion.h2>
                    </motion.div>

                    {/* ── DESCRIPTION: per-word scroll stagger ── */}
                    <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed mt-8 max-w-xl mx-auto">
                        {[
                            { text: "Premium", d: d0 },
                            { text: "detailing,", d: d1 },
                            { text: "restoration", d: d2 },
                            { text: "&amp; ceramic", d: d3 },
                            { text: "coating —", d: d4 },
                            { text: "perfection.", d: d5 },
                        ].map(({ text, d }, i) => (
                            <motion.span
                                key={i}
                                className="inline-block mr-[0.35em]"
                                style={{ opacity: d.opacity, y: d.y }}
                                dangerouslySetInnerHTML={{ __html: text }}
                            />
                        ))}
                    </p>

                    {/* ── CTA BUTTONS: bright fade + rise ── */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-10">
                        <motion.div style={{ opacity: ctaOp, y: cta1Y }}>
                            <Link
                                href="#services"
                                className="relative flex items-center justify-center px-9 py-4 bg-[#ff1744] hover:bg-red-500 text-white font-bold uppercase tracking-widest transition-all hover:-translate-y-1 active:scale-95 shadow-[0_0_15px_rgba(255,23,68,0.35)] hover:shadow-[0_0_25px_rgba(255,23,68,0.55)] rounded-full overflow-hidden group"
                            >
                                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                                <Zap className="w-5 h-5 mr-2 relative z-10" />
                                <span className="relative z-10">Our Services</span>
                            </Link>
                        </motion.div>
                        <motion.div style={{ opacity: ctaOp, y: cta2Y }}>
                            <Link
                                href="#about"
                                className="px-9 py-4 bg-white/10 border border-white/60 hover:border-red-500 text-white hover:text-red-400 font-bold uppercase tracking-widest transition-all hover:bg-white/15 hover:-translate-y-1 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,23,68,0.4)]"
                            >
                                Learn More
                            </Link>
                        </motion.div>
                    </div>
                </div>
                {/* ── Floor fade to seamlessly blend into next component (#050505) ── */}
                <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#050505] via-black/80 to-transparent z-[15] pointer-events-none" />


                {/* ── Scroll progress bar (bottom edge) ─── */}
                <motion.div
                    className="absolute bottom-0 left-0 h-[3px] bg-red-600 z-[20] origin-left"
                    style={{
                        scaleX: scrollYProgress,
                        boxShadow: "0 0 12px rgba(255,23,68,0.8)",
                    }}
                />
            </div>
        </div>
    );
}
