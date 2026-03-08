"use client";

import { useEffect, useRef, useState, memo } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import { BlurText } from "@/components/ui/blur-text";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 274;
const SCROLL_DURATION = 6;
const FRAME_PATH = (n: number) =>
    `/about_frames/frame_${String(n).padStart(4, "0")}.jpg`;

const SIDE_WORDS = ["PANAGARH'S", "TRUSTED", "DETAILING", "STUDIO"];
const WORD_COLORS = [
    "rgba(255,23,68,1)",      // RED
    "rgba(255,255,255,0.92)", // WHITE
    "rgba(255,23,68,1)",      // RED
    "rgba(255,255,255,0.92)", // WHITE
];
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#@!%&";

// ── Single scrambling letter ──────────────────────────────────────────
// memo prevents re-render from sibling state changes
const ScrambleLetter = memo(function ScrambleLetter({
    char,
    triggered,
    delay,
    scrambleKey,
    color,
}: {
    char: string;
    triggered: boolean;
    delay: number;
    scrambleKey: number;
    color: string;
}) {
    const [display, setDisplay] = useState(char);

    useEffect(() => {
        if (!triggered || char === " " || char === "'") {
            setDisplay(char);
            return;
        }
        let frame = 0;
        const maxFrames = 12;
        const timeout = setTimeout(() => {
            const interval = setInterval(() => {
                if (frame >= maxFrames) {
                    setDisplay(char);
                    clearInterval(interval);
                } else {
                    setDisplay(SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]);
                    frame++;
                }
            }, 40);
            return () => clearInterval(interval);
        }, delay);
        return () => clearTimeout(timeout);
        // scrambleKey re-runs effect to re-trigger on hover
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [triggered, char, delay, scrambleKey]);

    return (
        <span
            style={{
                display: "block",
                lineHeight: 1.5,
                width: "1.1ch",          // ← fixed width: no layout shift ever
                textAlign: "center",
                color,
                fontSize: "0.9rem",
                fontFamily: "inherit",
                fontWeight: "bold",
                letterSpacing: "0.05em",
                userSelect: "none",
            }}
        >
            {display}
        </span>
    );
});

// ── Word column — each word independently handles its own hover ───────
const ScrambleWord = memo(function ScrambleWord({
    word,
    opacityValue,
    yValue,
    color,
}: {
    word: string;
    opacityValue: ReturnType<typeof useTransform>;
    yValue: ReturnType<typeof useTransform>;
    color: string;
}) {
    const [triggered, setTriggered] = useState(false);
    const [scrambleKey, setScrambleKey] = useState(0);
    const isVisible = useRef(false);
    const cooldown = useRef(false);

    // Track visibility via scroll progress
    useMotionValueEvent(opacityValue, "change", (latest) => {
        const val = latest as number;
        isVisible.current = val > 0.4;
        if (val > 0.4 && !triggered) setTriggered(true);
        if (val < 0.05) setTriggered(false);
    });

    // Hover on THIS word column → only this word scrambles
    const handleHover = () => {
        if (!isVisible.current || cooldown.current) return;
        cooldown.current = true;
        setScrambleKey((k) => k + 1);
        // Cooldown prevents rapid repeated scrambles
        setTimeout(() => { cooldown.current = false; }, 700);
    };

    return (
        <motion.div
            style={{ opacity: opacityValue, y: yValue }}
            className="flex flex-col items-center cursor-default"
            onMouseEnter={handleHover}  // ← fires only for THIS word
        >
            {word.split("").map((char, li) => (
                <ScrambleLetter
                    key={li}
                    char={char}
                    triggered={triggered}
                    delay={li * 30}
                    scrambleKey={scrambleKey}
                    color={color}
                />
            ))}
        </motion.div>
    );
});

export default function AboutAnimation() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const { scrollYProgress } = useScroll({
        target: wrapperRef,
        offset: ["start start", "end end"],
    });

    const springProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    const canvasY = useTransform(springProgress, [0, 1], ["0%", "-4%"]);
    const canvasScale = useTransform(springProgress, [0, 1], [1, 1.06]);

    // Left text phases
    const titleOpacity = useTransform(scrollYProgress, [0.05, 0.14, 0.26, 0.85, 0.91], [0, 1, 1, 1, 0]);
    const titleY = useTransform(scrollYProgress, [0.05, 0.16], [40, 0]);
    const lineWidth = useTransform(scrollYProgress, [0.12, 0.22], ["0%", "100%"]);
    const lineOpacity = useTransform(scrollYProgress, [0.10, 0.18, 0.87, 0.93], [0, 1, 1, 0]);
    const desc1Opacity = useTransform(scrollYProgress, [0.22, 0.32, 0.42, 0.88, 0.94], [0, 1, 1, 1, 0]);
    const desc1Y = useTransform(scrollYProgress, [0.22, 0.34], [35, 0]);
    const desc2Opacity = useTransform(scrollYProgress, [0.38, 0.48, 0.58, 0.91, 0.97], [0, 1, 1, 1, 0]);
    const desc2Y = useTransform(scrollYProgress, [0.38, 0.50], [35, 0]);
    const overlayOpacity = useTransform(scrollYProgress, [0, 0.04, 0.94, 1.0], [1, 0, 0, 1]);

    const [playDesc1, setPlayDesc1] = useState(false);
    useMotionValueEvent(desc1Opacity, "change", (latest) => {
        if ((latest as number) > 0.1) setPlayDesc1(true);
        else setPlayDesc1(false);
    });

    const [playDesc2, setPlayDesc2] = useState(false);
    useMotionValueEvent(desc2Opacity, "change", (latest) => {
        if ((latest as number) > 0.1) setPlayDesc2(true);
        else setPlayDesc2(false);
    });

    // Right-side word animations
    const w0opacity = useTransform(scrollYProgress, [0.08, 0.16, 0.80, 0.87], [0, 1, 1, 0]);
    const w0y = useTransform(scrollYProgress, [0.08, 0.16], [50, 0]);
    const w1opacity = useTransform(scrollYProgress, [0.18, 0.26, 0.83, 0.90], [0, 1, 1, 0]);
    const w1y = useTransform(scrollYProgress, [0.18, 0.26], [50, 0]);
    const w2opacity = useTransform(scrollYProgress, [0.28, 0.36, 0.86, 0.93], [0, 1, 1, 0]);
    const w2y = useTransform(scrollYProgress, [0.28, 0.36], [50, 0]);
    const w3opacity = useTransform(scrollYProgress, [0.38, 0.46, 0.89, 0.96], [0, 1, 1, 0]);
    const w3y = useTransform(scrollYProgress, [0.38, 0.46], [50, 0]);

    const wordOpacities = [w0opacity, w1opacity, w2opacity, w3opacity];
    const wordYs = [w0y, w1y, w2y, w3y];

    // GSAP frame scrubbing
    useEffect(() => {
        if (!wrapperRef.current || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx2d = canvas.getContext("2d");
        if (!ctx2d) return;

        const setSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setSize();
        window.addEventListener("resize", setSize);

        const images: HTMLImageElement[] = [];
        const currentFrame = { n: 0 };

        const drawFrame = (n: number) => {
            const img = images[n];
            if (!img?.complete) return;
            ctx2d.clearRect(0, 0, canvas.width, canvas.height);
            const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
            const w = img.naturalWidth * scale;
            const h = img.naturalHeight * scale;
            ctx2d.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
        };

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
                ease: "power1.inOut",
                scrollTrigger: {
                    trigger: wrapperRef.current,
                    start: "top top",
                    end: () => `+=${SCROLL_DURATION * window.innerHeight}`,
                    scrub: 0.8,
                },
                onUpdate: () => drawFrame(Math.round(currentFrame.n)),
            });
        });

        return () => {
            ctx.revert();
            window.removeEventListener("resize", setSize);
        };
    }, []);

    return (
        <div
            id="about"
            ref={wrapperRef}
            style={{ height: `${SCROLL_DURATION * 100}vh` }}
            className="relative"
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">

                {/* Frame canvas */}
                <motion.div className="absolute inset-0" style={{ y: canvasY, scale: canvasScale }}>
                    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
                </motion.div>

                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/10 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40 pointer-events-none" />

                {/* Seamless crossfade */}
                <motion.div className="absolute inset-0 bg-black pointer-events-none z-20" style={{ opacity: overlayOpacity }} />

                {/* Left text column — full width on mobile, constrained to left half on desktop */}
                <div className="absolute inset-y-0 left-0 w-full lg:w-[55%] flex flex-col justify-center px-6 sm:px-14 lg:px-20 z-10">

                    {/* Title */}
                    <motion.h2
                        style={{ opacity: titleOpacity, y: titleY, fontSize: "clamp(1.8rem, 4.5vw, 4.5rem)" }}
                        className="font-orbitron font-bold tracking-widest text-white leading-tight drop-shadow-[0_0_20px_rgba(255,23,68,0.5)] mb-3"
                    >
                        About <span className="text-[#ff1744]">Lustomotive</span>
                    </motion.h2>

                    {/* Red accent line */}
                    <motion.div style={{ opacity: lineOpacity }} className="overflow-hidden h-[2px] mb-6 w-40">
                        <motion.div style={{ width: lineWidth }} className="h-full bg-gradient-to-r from-[#ff1744] to-transparent" />
                    </motion.div>

                    {/* Description */}
                    <motion.div
                        style={{ opacity: desc1Opacity, y: desc1Y, fontSize: "clamp(0.8rem, 1.4vw, 1.05rem)" }}
                        className="text-gray-200 font-light leading-relaxed mb-6"
                    >
                        <BlurText
                            text="Lustomotive Automotive Studio is Panagarh's premium automotive care hub, proudly powered by Amar Bharat Company and home to The Detailing Mafia Panagarh. We combine craftsmanship with cutting-edge technology to deliver unmatched detailing services."
                            delay={15}
                            stepDuration={0.15}
                            animateBy="words"
                            direction="bottom"
                            play={playDesc1}
                        />
                    </motion.div>

                    {/* Mission */}
                    <motion.div style={{ opacity: desc2Opacity, y: desc2Y }}>
                        <p className="text-[#ff1744] font-orbitron uppercase tracking-widest font-bold mb-2" style={{ fontSize: "0.75rem" }}>Our Mission</p>
                        <div className="text-gray-300 font-light leading-relaxed" style={{ fontSize: "clamp(0.8rem, 1.4vw, 1.05rem)" }}>
                            <BlurText
                                text="To protect, enhance, and preserve every vehicle with the finest products, techniques, and attention to detail. Quality, integrity, and customer satisfaction drive everything we do — ensuring every car leaves looking absolutely its best."
                                delay={15}
                                stepDuration={0.15}
                                animateBy="words"
                                direction="bottom"
                                play={playDesc2}
                            />
                        </div>
                    </motion.div>
                </div>


                {/* ── Right-side: each word scrambles on its own hover ── */}
                <div
                    className="hidden lg:flex absolute right-[6vw] top-0 h-full flex-row items-center justify-center gap-5 z-10"
                    aria-hidden="true"
                >
                    {SIDE_WORDS.map((word, i) => (
                        <ScrambleWord
                            key={word}
                            word={word}
                            opacityValue={wordOpacities[i]}
                            yValue={wordYs[i]}
                            color={WORD_COLORS[i]}
                        />
                    ))}
                </div>


            </div>
        </div>
    );
}
