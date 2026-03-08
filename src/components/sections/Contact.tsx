"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

export default function Contact() {
    const [isWaHovered, setIsWaHovered] = useState(false);

    return (
        <section id="contact" className="py-12 md:py-16 bg-black relative border-t border-black overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="text-red-600 text-[0.72rem] tracking-[0.4em] uppercase font-bold mb-3">Find Us</p>
                    <h2 className="text-4xl md:text-5xl font-orbitron font-bold tracking-widest text-white mb-4 drop-shadow-[0_0_15px_rgba(255,23,68,0.5)]">
                        Contact <span className="text-[#ff1744]">&amp; Location</span>
                    </h2>
                    <div className="w-[60px] h-[2px] bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto mt-3 mb-4"></div>
                    <p className="text-gray-400 font-light text-sm text-center">Get in touch with us and visit our premium automotive detailing studio</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Details */}
                    <motion.div
                        className="flex flex-col gap-4"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-50px" }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Unified 4-Box Bento Layout with WhatsApp Cutout */}
                        <div className="relative w-full aspect-[5/6] sm:aspect-[4/3] bg-black p-2 sm:p-2.5 rounded-[2.5rem] sm:rounded-[4rem] shadow-[0_0_40px_rgba(255,23,68,0.05)] overflow-hidden">
                            {/* The 4 Quadrants Container */}
                            <div className="grid grid-cols-2 grid-rows-2 gap-1 sm:gap-2 h-full relative z-0">
                                {/* Box 1: Location */}
                                <div className={`bg-[#0f0f0f] rounded-[2rem] sm:rounded-[3.5rem] p-4 sm:p-8 flex flex-col items-start justify-start transition-all duration-500 overflow-hidden relative group/box hover:bg-[#111111]`}>
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#25D366]/5 rounded-full blur-[40px] opacity-0 group-has-[:hover]:opacity-100 transition-opacity"></div>
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mb-2 sm:mb-4 bg-black flex items-center justify-center relative z-10 transition-colors">
                                        <MapPin className="text-gray-400 group-hover/box:text-[#ff1744] w-4 h-4 sm:w-5 sm:h-5 transition-colors" />
                                    </div>
                                    <h3 className="font-orbitron font-bold text-white text-[0.85rem] sm:text-base mb-1 relative z-10">Location</h3>
                                    <p className="text-gray-400 font-light text-[0.65rem] sm:text-xs relative z-10 hidden sm:block">Panagarh, West Bengal</p>
                                    <p className="text-gray-400 font-light text-[0.65rem] sm:text-xs relative z-10 sm:hidden max-w-[80px]">Panagarh</p>
                                </div>

                                {/* Box 2: Call Us */}
                                <a href="tel:+919475414545" className={`bg-[#0f0f0f] rounded-[2rem] sm:rounded-[3.5rem] p-4 sm:p-8 flex flex-col items-end justify-start text-right transition-all duration-500 overflow-hidden relative group/box hover:bg-[#111111]`}>
                                    <div className="absolute top-0 left-0 w-32 h-32 bg-[#25D366]/5 rounded-full blur-[40px] opacity-0 group-has-[:hover]:opacity-100 transition-opacity"></div>
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mb-2 sm:mb-4 bg-black flex items-center justify-center relative z-10 transition-colors">
                                        <Phone className="text-gray-400 group-hover/box:text-[#ff1744] w-4 h-4 sm:w-5 sm:h-5 transition-colors" />
                                    </div>
                                    <h3 className="font-orbitron font-bold text-white text-[0.85rem] sm:text-base mb-1 relative z-10">Call Us</h3>
                                    <p className="text-gray-400 font-light text-[0.65rem] sm:text-xs relative z-10 hidden sm:block">+91 94754 14545</p>
                                    <p className="text-gray-400 font-light text-[0.65rem] sm:text-xs relative z-10 sm:hidden">+91 94754...</p>
                                </a>

                                {/* Box 3: Email */}
                                <a href="mailto:Lustomotive@gmail.com" className={`bg-[#0f0f0f] rounded-[2rem] sm:rounded-[3.5rem] p-4 sm:p-8 flex flex-col items-start justify-end transition-all duration-500 overflow-hidden relative group/box hover:bg-[#111111]`}>
                                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#25D366]/5 rounded-full blur-[40px] opacity-0 group-has-[:hover]:opacity-100 transition-opacity"></div>
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mt-auto mb-2 sm:mb-4 bg-black flex items-center justify-center relative z-10 transition-colors">
                                        <Mail className="text-gray-400 group-hover/box:text-[#ff1744] w-4 h-4 sm:w-5 sm:h-5 transition-colors" />
                                    </div>
                                    <h3 className="font-orbitron font-bold text-white text-[0.85rem] sm:text-base mb-1 relative z-10">Email</h3>
                                    <p className="text-gray-400 font-light text-[0.65rem] sm:text-xs relative z-10 max-w-[100%] truncate hidden sm:block">Lustomotive@gmail.com</p>
                                    <p className="text-gray-400 font-light text-[0.65rem] sm:text-xs relative z-10 max-w-[80px] truncate sm:hidden">Lustom...</p>
                                </a>

                                {/* Box 4: Hours */}
                                <div className={`bg-[#0f0f0f] rounded-[2rem] sm:rounded-[3.5rem] p-4 sm:p-8 flex flex-col items-end justify-end text-right transition-all duration-500 overflow-hidden relative group/box hover:bg-[#111111]`}>
                                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#25D366]/5 rounded-full blur-[40px] opacity-0 group-has-[:hover]:opacity-100 transition-opacity"></div>
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mt-auto mb-2 sm:mb-4 bg-black flex items-center justify-center relative z-10 transition-colors">
                                        <Clock className="text-gray-400 group-hover/box:text-[#ff1744] w-4 h-4 sm:w-5 sm:h-5 transition-colors" />
                                    </div>
                                    <h3 className="font-orbitron font-bold text-white text-[0.85rem] sm:text-base mb-1 relative z-10">Hours</h3>
                                    <p className="text-gray-400 font-light text-[0.65rem] sm:text-xs relative z-10 hidden sm:block">Mon-Sat: 9AM – 7PM</p>
                                    <p className="text-gray-400 font-light text-[0.65rem] sm:text-xs relative z-10 sm:hidden">9AM – 7PM</p>
                                </div>
                            </div>

                            {/* CENTER WHATSAPP CUTOUT */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                                {/* The outer wrapper applies the exact background color to blend perfectly as a spherical cutout into the 4 boxes */}
                                <div className="bg-black rounded-full flex items-center justify-center p-2 sm:p-2.5 transition-all duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)]">
                                    <a
                                        href="https://wa.me/919475414545?text=Hi%20Lustomotive%20team%2C%20I'm%20contacting%20you%20via%20your%20website."
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative flex items-center justify-center bg-[#25D366] text-black font-orbitron font-bold rounded-full shadow-[0_0_30px_rgba(37,211,102,0.4)] hover:shadow-[0_0_50px_rgba(37,211,102,0.6)] transition-all duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)] h-12 w-12 sm:h-16 sm:w-16 hover:w-[280px] sm:hover:w-[320px] hover:px-6 origin-center overflow-hidden"
                                        onMouseEnter={() => setIsWaHovered(true)}
                                        onMouseLeave={() => setIsWaHovered(false)}
                                    >
                                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full"></div>

                                        {/* Icon */}
                                        <div className="shrink-0 flex items-center justify-center group-hover:scale-110 group-hover:-rotate-[-5deg] transition-transform duration-300">
                                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 sm:w-7 sm:h-7">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                                            </svg>
                                        </div>

                                        {/* Text Animation */}
                                        <div className="flex items-center text-[0.65rem] sm:text-sm tracking-[0.1em] sm:tracking-[0.15em] whitespace-nowrap overflow-hidden transition-all duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)] max-w-0 opacity-0 group-hover:max-w-[280px] group-hover:opacity-100 group-hover:ml-2 sm:group-hover:ml-3">
                                            <span className="pt-[2px]">CHAT ON WHATSAPP</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Map */}
                    <motion.div
                        className="relative rounded-[2.5rem] overflow-hidden border border-white/5 bg-[#0a0a0a] p-2 hover:border-white/10 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-all duration-500 h-[400px] lg:h-auto group"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {/* Pulsing label */}
                        <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent z-20 flex items-center gap-2 pointer-events-none">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></div>
                            <span className="text-white font-orbitron text-xs tracking-[0.1em] drop-shadow-md">LUSTOMOTIVE — PANAGARH, WB</span>
                        </div>

                        {/* Click overlay */}
                        <a
                            href="https://maps.app.goo.gl/QEgLTb45cyx8QbW58"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute inset-0 z-30 flex items-center justify-center text-transparent transition-colors"
                            title="Open in Google Maps"
                        >
                            <span className="bg-black/80 text-white font-orbitron text-xs tracking-widest px-5 py-2.5 rounded-full border border-red-500/50 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm shadow-xl">
                                🗺 Open in Maps
                            </span>
                        </a>

                        <div className="rounded-[2rem] overflow-hidden w-full h-full relative z-0 relative isolate border border-white/5">
                            <iframe
                                className="w-full h-full border-0 filter grayscale-[20%] contrast-[1.05] opacity-90 group-hover:opacity-100 transition-all duration-700"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3660.5169063973126!2d87.46448067592092!3d23.441812100552156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f77fc54fe62d4d%3A0x7fac5b12dbdacecd!2sLustomotive%20By%20AmarBharatCompany!5e0!3m2!1sen!2sin!4v1755325054463!5m2!1sen!2sin"
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Lustomotive Location Map"
                            ></iframe>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
