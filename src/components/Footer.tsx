"use client";


import Link from "next/link";
import { Facebook, Instagram, MapPin, Mail, Phone, ChevronRight, Clock, Globe } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-[#050505] border-t border-red-500/15 overflow-hidden min-h-[100svh] flex flex-col">
            {/* Animated top red glow bar */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-600 to-transparent animate-pulse shadow-[0_0_10px_rgba(255,23,68,0.5)]"></div>

            {/* Ambient glows */}
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[radial-gradient(circle,rgba(255,23,68,0.05)_0%,transparent_70%)] pointer-events-none"></div>
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-[radial-gradient(circle,rgba(255,23,68,0.04)_0%,transparent_70%)] pointer-events-none"></div>

            <div
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex flex-col flex-grow pt-6 lg:pt-8 pb-3"
            >
                {/* Main Content Centered */}
                <div className="flex-grow flex flex-col justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-0 mt-8 text-center lg:text-left">
                        {/* Brand Info */}
                        <div className="lg:col-span-1 flex flex-col items-center lg:items-start">
                            <Link href="/" className="text-2xl font-orbitron font-bold tracking-widest text-white mb-2 block drop-shadow-[0_0_15px_rgba(255,23,68,0.5)]">
                                Lusto<span className="text-[#ff1744]">Motive</span>
                            </Link>
                            <div className="w-10 h-0.5 bg-gradient-to-r from-red-500 to-transparent mb-5 mx-auto lg:mx-0"></div>
                            <p className="text-gray-400 font-light text-[0.85rem] leading-relaxed mb-6 max-w-sm lg:max-w-none">
                                Premium automotive detailing studio committed to excellence in car care. Serving Panagarh & surrounding West Bengal with world-class services.
                            </p>
                            <div className="flex justify-center lg:justify-start space-x-3">
                                <a href="https://www.instagram.com/lustomotive" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-red-500/15 hover:border-red-500/50 hover:text-red-500 hover:-translate-y-1 transition-all">
                                    <Instagram size={18} />
                                </a>
                                <a href="https://www.facebook.com/lustomotive" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-red-500/15 hover:border-red-500/50 hover:text-red-500 hover:-translate-y-1 transition-all">
                                    <Facebook size={18} />
                                </a>
                                <a href="https://wa.me/919475424545" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-red-500/15 hover:border-red-500/50 hover:text-red-500 hover:-translate-y-1 transition-all">
                                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                </a>
                                <a href="https://maps.app.goo.gl/QEgLTb45cyx8QbW58" target="_blank" rel="noopener noreferrer" aria-label="Google Maps" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-red-500/15 hover:border-red-500/50 hover:text-red-500 hover:-translate-y-1 transition-all">
                                    <MapPin size={18} />
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="flex flex-col items-center lg:items-start">
                            <div className="text-center lg:text-left">
                                <h3 className="font-orbitron text-[0.7rem] font-bold text-[#ff1744] tracking-[0.25em] drop-shadow-[0_0_8px_rgba(255,23,68,0.5)] uppercase mb-4">Quick Links</h3>
                                <ul className="flex flex-col gap-2.5 items-center lg:items-start">
                                    {[
                                        { name: "About Us", href: "#about" },
                                        { name: "Services", href: "#services" },
                                        { name: "Gallery", href: "#gallery" },
                                        { name: "Testimonials", href: "#testimonials" },
                                        { name: "Contact", href: "#contact" }
                                    ].map((link) => (
                                        <li key={link.name}>
                                            <Link href={link.href} className="text-gray-400 hover:text-red-500 hover:pl-2 transition-all duration-300 flex items-center gap-2 text-[0.85rem]">
                                                <ChevronRight className="w-3 h-3 text-red-500 hidden lg:block shrink-0" />
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                    <li>
                                        <a href="https://www.offers.lustomotive.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 hover:pl-2 transition-all duration-300 flex items-center gap-2 text-[0.85rem]">
                                            <ChevronRight className="w-3 h-3 text-red-500 hidden lg:block shrink-0" />
                                            Special Offers
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Services */}
                        <div className="flex flex-col items-center lg:items-start">
                            <div className="text-center lg:text-left">
                                <h3 className="font-orbitron text-[0.7rem] font-bold text-[#ff1744] tracking-[0.25em] drop-shadow-[0_0_8px_rgba(255,23,68,0.5)] uppercase mb-4">Services</h3>
                                <ul className="flex flex-col gap-2.5 items-center lg:items-start">
                                    {[
                                        "Exterior Detailing",
                                        "Interior Detailing",
                                        "Ceramic Coating",
                                        "Paint Correction",
                                        "PPF Installation",
                                        "Maintenance"
                                    ].map((service) => (
                                        <li key={service}>
                                            <Link href="#services" className="text-gray-400 hover:text-red-500 hover:pl-2 transition-all duration-300 flex items-center gap-2 text-[0.85rem]">
                                                <ChevronRight className="w-3 h-3 text-red-500 hidden lg:block shrink-0" />
                                                {service}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Contact */}
                        <div className="flex flex-col items-center lg:items-start">
                            <div className="text-center lg:text-left">
                                <h3 className="font-orbitron text-[0.7rem] font-bold text-[#ff1744] tracking-[0.25em] drop-shadow-[0_0_8px_rgba(255,23,68,0.5)] uppercase mb-4">Contact</h3>
                                <ul className="flex flex-col gap-3.5 items-center lg:items-start">
                                    <li className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 group">
                                        <MapPin className="text-red-500 text-sm sm:mt-0.5 shrink-0 group-hover:scale-110 transition-transform w-[14px] h-[14px]" />
                                        <span className="text-gray-400 text-[0.85rem] leading-relaxed relative sm:top-[-2px]">Panagarh, West Bengal</span>
                                    </li>
                                    <li className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 group">
                                        <Phone className="text-red-500 text-sm shrink-0 group-hover:scale-110 transition-transform w-[14px] h-[14px]" />
                                        <a href="tel:+919475414545" className="text-gray-400 hover:text-red-500 transition-colors text-[0.85rem]">+91 94754 14545</a>
                                    </li>
                                    <li className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 group">
                                        <Mail className="text-red-500 text-sm shrink-0 group-hover:scale-110 transition-transform w-[14px] h-[14px]" />
                                        <a href="mailto:Admin@lustomotive.com" className="text-gray-400 hover:text-red-500 transition-colors text-[0.85rem]">Admin@lustomotive.com</a>
                                    </li>
                                    <li className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 group">
                                        <Globe className="text-red-500 text-sm shrink-0 group-hover:scale-110 transition-transform w-[14px] h-[14px]" />
                                        <a href="https://www.lustomotive.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors text-[0.85rem]">www.lustomotive.com</a>
                                    </li>
                                    <li className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 group">
                                        <Clock className="text-red-500 text-sm shrink-0 group-hover:scale-110 transition-transform w-[14px] h-[14px]" />
                                        <span className="text-gray-400 text-[0.85rem]">Mon–Sat: 9 AM – 7 PM</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section Pinned to Bottom */}
                <div className="mt-auto pt-12 lg:pt-8 w-full">
                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-red-500/25 to-transparent mb-3"></div>

                    {/* Bottom Bar */}
                    <div className="flex flex-col lg:flex-row items-center justify-between flex-wrap gap-2 text-center opacity-80">
                        <p className="text-gray-500 font-light text-[0.7rem] lg:text-[0.75rem]">
                            &copy; {currentYear} <span className="text-white font-semibold">Lustomotive</span>. All rights reserved.
                            <span className="hidden sm:inline mx-2">|</span>
                            <span className="block sm:inline mt-1 sm:mt-0">A sub-brand of <span className="text-white font-semibold">Amar Bharat Company</span></span>
                        </p>
                        <p className="text-gray-500 font-light text-[0.7rem] lg:text-[0.75rem]">
                            Designed by <a href="https://www.instagram.com/sarashsahu/" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-400 transition-colors">@sarashsahu</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
