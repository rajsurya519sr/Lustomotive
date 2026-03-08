"use client";

import { motion } from "framer-motion";


export default function Gallery() {
    const images = [
        { id: 1, title: "Lustomotive Detailing", src: "/images/1.jpg", tag: "Ceramic Coating" },
        { id: 2, title: "Premium Wash", src: "/images/2.jpg", tag: "Detailing" },
        { id: 3, title: "Our Vision", src: "/images/353159.jpg", tag: "Craftsmanship" },
        { id: 4, title: "The Finish", src: "/images/footerX.jpg", tag: "Showroom Finish" },
    ];

    return (
        <section id="gallery" className="py-12 md:py-16 bg-black overflow-hidden relative">
            <motion.div
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-3xl md:text-5xl font-orbitron font-bold tracking-widest text-white mb-4 drop-shadow-[0_0_15px_rgba(255,23,68,0.5)]">
                    Our <span className="text-[#ff1744]">Masterpieces</span>
                </h2>
                <p className="text-gray-400 uppercase tracking-widest text-sm mb-12">Witness the Transformation</p>
            </motion.div>

            <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {images.map((img, idx) => (
                    <motion.div
                        key={img.id}
                        className="snap-center shrink-0 w-[80vw] md:w-[40vw] lg:w-[30vw] aspect-[4/5] relative group rounded-xl overflow-hidden cursor-pointer flex-shrink-0"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                            style={{ backgroundImage: `url('${img.src}')` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                        <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <span className="text-red-500 text-xs font-bold uppercase tracking-[0.2em] mb-2 block">{img.tag}</span>
                            <h3 className="text-2xl font-orbitron font-bold text-white tracking-widest drop-shadow-[0_0_10px_rgba(255,23,68,0.5)]">{img.title}</h3>
                        </div>

                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-600/50 rounded-xl transition-colors duration-500"></div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
