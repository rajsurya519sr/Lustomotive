"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Mail, Tag } from "lucide-react";
import { FaInstagram, FaWhatsapp, FaLocationDot } from "react-icons/fa6";

import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const hero = document.getElementById("hero-section");
            if (hero) {
                // The next section starts coming into view exactly when we've scrolled past the hero's height minus one viewport
                // We add a tiny buffer (10px) to ensure it flips right as the next element bumps in
                setScrolled(window.scrollY > hero.offsetHeight - window.innerHeight + 10);
            } else {
                setScrolled(window.scrollY > 10);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "About Us", href: "#about" },
        { name: "Why Choose Us", href: "#why-choose-us" },
        { name: "Our Vision", href: "#vision" },
        { name: "Collabs", href: "#collabs" },
        { name: "Testimonials", href: "#testimonials" },
    ];

    return (
        <header className="fixed top-0 w-full z-50 transition-all duration-300">
            {/* Top Contact Bar */}
            <div className={`hidden lg:block transition-all duration-300 overflow-hidden ${scrolled ? 'h-0 opacity-0' : 'h-10 opacity-100 bg-transparent border-b border-white/10'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                    <div className="flex justify-center items-center h-full gap-12 text-[0.85rem] font-medium font-sans">
                        <div className="flex items-center gap-3 text-gray-300">
                            <Phone className="w-4 h-4 text-red-600" />
                            <span className="flex items-center">
                                <a href="tel:+919475414545" className="hover:text-red-500 transition-colors">+91 9475414545</a>
                                <span className="text-gray-600 mx-2">/</span>
                                <a href="tel:+919475424545" className="hover:text-red-500 transition-colors">+91 9475424545</a>
                            </span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-300">
                            <Mail className="w-4 h-4 text-red-600" />
                            <span className="flex items-center">
                                <a href="mailto:Admin@lustomotive.com" className="hover:text-red-500 transition-colors">Admin@lustomotive.com</a>
                                <span className="text-gray-600 mx-2">/</span>
                                <a href="mailto:Lustomotive@gmail.com" className="flex items-center hover:text-red-500 transition-colors group">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" alt="Gmail" className="w-3.5 h-3.5 mr-1.5 group-hover:scale-110 transition-transform" />
                                    Lustomotive@gmail.com
                                </a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <nav className={`w-full transition-all duration-300 ${scrolled ? "bg-black/95 backdrop-blur-md shadow-lg shadow-black/50 py-3 border-b border-red-900/30" : "bg-transparent py-4 border-b border-transparent"}`}>
                <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="block">
                                {/* Use an image fallback to matching stylized text if the image fails. Using normal img because we want native rendering directly */}
                                <img
                                    src="/images/lustomotive_small_logo.png"
                                    alt="LUSTOMOTIVE"
                                    className="h-[45px] w-auto object-contain hidden md:block"
                                    onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling!.classList.remove('hidden') }}
                                />
                                <span className="hidden font-roboto text-2xl font-black tracking-widest text-white uppercase">
                                    Lusto<span className="text-red-600">Motive</span>
                                </span>

                                <img
                                    src="/images/lustomotive_small_logo.png"
                                    alt="LUSTOMOTIVE"
                                    className="h-[35px] w-auto object-contain md:hidden"
                                    onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling!.classList.remove('hidden') }}
                                />
                                <span className="hidden font-roboto text-xl font-black tracking-widest text-white uppercase">
                                    Lusto<span className="text-red-600">Motive</span>
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Links */}
                        <div className="hidden xl:flex items-center gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-white hover:text-red-500 transition-colors uppercase text-[0.8rem] tracking-wider font-bold"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* Desktop Right Side */}
                        <div className="hidden xl:flex items-center gap-6">
                            <a
                                href="https://www.offers.lustomotive.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 border border-red-600/80 bg-red-950/20 text-red-500 hover:bg-red-600 hover:text-white px-5 py-2 rounded-full uppercase text-xs font-bold tracking-widest transition-all shadow-[0_0_15px_rgba(255,23,68,0.1)] group"
                            >
                                <Tag className="w-4 h-4 group-hover:text-white transition-colors rotate-90" />
                                OFFERS
                            </a>

                            <div className="w-[1px] h-6 bg-neutral-800 border-l border-white/5 mx-2 rounded-full"></div>

                            <div className="flex items-center gap-4">
                                {/* Instagram Brand Logo */}
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                                    className="text-white hover:text-[#E1306C] transition-colors relative group"
                                    title="Instagram">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] opacity-0 group-hover:opacity-20 blur-md transition-opacity rounded-full"></div>
                                    <FaInstagram className="w-5 h-5 relative z-10" />
                                </a>

                                {/* WhatsApp Brand Logo */}
                                <a href="https://wa.me/919475424545?text=Hi%20Lustomotive%20team%2C%20I'm%20contacting%20you%20via%20your%20website."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white hover:text-[#25D366] transition-colors relative group"
                                    title="WhatsApp">
                                    <div className="absolute inset-0 bg-[#25D366] opacity-0 group-hover:opacity-20 blur-md transition-opacity rounded-full"></div>
                                    <FaWhatsapp className="w-5 h-5 relative z-10" />
                                </a>

                                {/* Google Maps Style Pin Logo */}
                                <a href="https://maps.app.goo.gl/QEgLTb45cyx8QbW58" target="_blank" rel="noopener noreferrer"
                                    className="text-white hover:text-red-600 transition-colors relative group"
                                    title="Location">
                                    <div className="absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-20 blur-md transition-opacity rounded-full"></div>
                                    <FaLocationDot className="w-[1.15rem] h-[1.15rem] relative z-10 text-red-600 group-hover:drop-shadow-[0_0_8px_rgba(255,23,68,0.8)]" />
                                </a>
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="flex xl:hidden items-center gap-4">
                            <a
                                href="https://www.offers.lustomotive.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 border border-red-600/80 bg-red-950/20 text-red-500 px-3 py-1.5 rounded-full uppercase text-[0.65rem] font-bold tracking-widest"
                            >
                                <Tag className="w-3 h-3 rotate-90" /> OFFERS
                            </a>
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="relative flex flex-col justify-center items-center gap-[5px] w-10 h-10 rounded-full border border-red-600/30 text-red-500 bg-red-950/20 hover:text-white hover:bg-red-600 focus:outline-none transition-all duration-500 z-[70] group"
                            >
                                <span className="sr-only">Open main menu</span>
                                <span className={`block h-[2px] bg-current rounded-full transition-all duration-300 origin-center ${isOpen ? 'w-5 rotate-45 translate-y-[7px]' : 'w-5 group-hover:w-6'}`}></span>
                                <span className={`block h-[2px] bg-current rounded-full transition-all duration-300 origin-center ${isOpen ? 'w-0 opacity-0 translate-x-4' : 'w-4 group-hover:w-6'}`}></span>
                                <span className={`block h-[2px] bg-current rounded-full transition-all duration-300 origin-center ${isOpen ? 'w-5 -rotate-45 -translate-y-[7px]' : 'w-5 group-hover:w-6'}`}></span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Ultra-modern Mobile Drawer Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <>
                            {/* Backdrop overlay */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                onClick={() => setIsOpen(false)}
                                className="xl:hidden fixed inset-0 bg-black/80 backdrop-blur-md z-[55]"
                            />

                            {/* Drawer */}
                            <motion.div
                                initial={{ x: "100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "100%" }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                className="xl:hidden fixed top-0 right-0 h-screen w-[85%] sm:w-[400px] bg-gradient-to-b from-[#0a0a0a] to-black border-l border-red-900/30 shadow-[-20px_0_50px_rgba(0,0,0,0.8)] z-[60] flex flex-col px-8 py-16 overflow-y-auto"
                            >
                                {/* Decorative red edge line */}
                                <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-red-600 via-red-600/20 to-transparent opacity-30"></div>

                                {/* Menu Links */}
                                <div className="flex flex-col gap-8 flex-1 mt-10 justify-center">
                                    {navLinks.map((link, i) => (
                                        <motion.div
                                            key={link.name}
                                            initial={{ opacity: 0, x: 50 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 50 }}
                                            transition={{ duration: 0.4, delay: i * 0.1 + 0.1, ease: [0.22, 1, 0.36, 1] }}
                                            className="group relative"
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={() => setIsOpen(false)}
                                                className="flex items-center gap-4 text-2xl sm:text-3xl font-orbitron font-bold text-gray-400 hover:text-white transition-all duration-300 py-3"
                                            >
                                                <span className="text-red-600 opacity-0 -translate-x-6 group-hover:opacity-100 group-hover:-translate-x-2 transition-all duration-300 absolute left-0 text-3xl">▹</span>
                                                <span className="group-hover:translate-x-6 transition-transform duration-300 ease-out">{link.name}</span>
                                            </Link>
                                            {/* Hover underline fx */}
                                            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-gradient-to-r from-red-600 to-transparent transition-all duration-500 group-hover:w-full opacity-50"></span>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Socials at bottom */}
                                <motion.div
                                    className="flex items-center gap-6 justify-start pt-10 mt-auto relative z-10"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ duration: 0.4, delay: 0.5 }}
                                >
                                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/10 to-transparent top-0"></div>
                                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#E1306C] transition-all hover:scale-110 p-3 bg-white/5 rounded-full hover:bg-white/10 border border-white/5">
                                        <FaInstagram className="w-5 h-5" />
                                    </a>
                                    <a href="https://wa.me/919475424545" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#25D366] transition-all hover:scale-110 p-3 bg-white/5 rounded-full hover:bg-white/10 border border-white/5">
                                        <FaWhatsapp className="w-5 h-5" />
                                    </a>
                                    <a href="https://maps.app.goo.gl/QEgLTb45cyx8QbW58" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-[#ff1744] transition-all hover:scale-110 p-3 bg-white/5 rounded-full hover:bg-white/10 border border-white/5 hover:drop-shadow-[0_0_8px_rgba(255,23,68,0.8)]">
                                        <FaLocationDot className="w-5 h-5" />
                                    </a>

                                    <div className="ml-auto w-12 h-1 bg-red-600 rounded-full"></div>
                                </motion.div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    );
}
