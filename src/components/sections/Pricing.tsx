"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Tag } from "lucide-react";

export default function Offers() {
    const packages = [
        {
            name: "Complete Detailing Package",
            badge: "Popular",
            oldPrice: "15,000",
            price: "12,500",
            description: "Complete interior and exterior rejuvenation.",
            features: [
                "Full exterior wash and wax",
                "Interior deep cleaning",
                "Paint decontamination",
                "Leather conditioning",
                "Engine bay cleaning",
            ],
            popular: false,
        },
        {
            name: "Ceramic Coating Special",
            badge: "Best Value",
            oldPrice: "35,000",
            price: "29,999",
            description: "Ultimate scratch protection and ceramic finish.",
            features: [
                "3-year ceramic coating",
                "Paint correction (2-step)",
                "Glass treatment",
                "Wheel protection",
                "Interior protection",
            ],
            popular: true,
        },
        {
            name: "Maintenance Package",
            badge: "New",
            oldPrice: "8,000",
            price: "6,500",
            description: "Regular protection to maintain your vehicle.",
            features: [
                "Full exterior wash",
                "Interior vacuum & wipe down",
                "Tire dressing",
                "Window cleaning",
                "Dashboard polishing",
            ],
            popular: false,
        },
    ];

    return (
        <section id="offers" className="py-12 md:py-16 bg-[#050505] relative z-20 border-y border-neutral-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-3xl md:text-5xl font-orbitron font-bold tracking-widest text-white mb-4 drop-shadow-[0_0_15px_rgba(255,23,68,0.5)]">
                        Special <span className="text-[#ff1744]">Offers</span>
                    </h2>
                    <p className="text-gray-400 font-light text-sm">Exclusive deals and packages for your vehicle care needs</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {packages.map((pkg, idx) => (
                        <motion.div
                            key={pkg.name}
                            className={`group flex flex-col h-full glass-card rounded-2xl p-6 relative isolate transition-all duration-300 z-10 
                                border border-solid hover:z-30 hover:scale-105 hover:-translate-y-3 
                                hover:bg-[#050505] hover:border-[#ff1744] hover:shadow-[0_0_30px_rgba(255,23,68,0.25)] 
                                ${pkg.popular ? "border-[#ff1744] shadow-[0_0_20px_rgba(255,23,68,0.15)]" : "border-white/5"}`}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: idx * 0.1 }}
                        >
                            <div className={`absolute top-0 right-8 -translate-y-1/2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg transition-colors duration-300 ${pkg.popular ? "bg-[#ff1744] text-white" : "bg-neutral-800 text-gray-300 group-hover:bg-[#ff1744] group-hover:text-white"}`}>
                                {pkg.badge}
                            </div>

                            <h3 className="text-lg md:text-xl font-orbitron font-bold text-white mb-2 uppercase tracking-widest drop-shadow-[0_0_10px_rgba(255,23,68,0.5)] min-h-[56px]">{pkg.name}</h3>

                            <div className="mb-6">
                                <div className="flex items-baseline gap-3 mb-1">
                                    <span className="text-gray-500 font-medium line-through text-lg">₹{pkg.oldPrice}</span>
                                </div>
                                <div className="flex items-baseline text-white">
                                    <span className="text-4xl font-black text-[#ff1744] tracking-tight">₹{pkg.price}</span>
                                </div>
                            </div>

                            <ul className="space-y-3 mb-6 flex-grow">
                                {pkg.features.map((feature, i) => (
                                    <li key={i} className="flex items-start">
                                        <CheckCircle2 className="w-5 h-5 text-[#ff1744] shrink-0 mr-3 mt-0.5 drop-shadow-sm" />
                                        <span className="text-gray-300 font-light text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <a
                                href="#contact"
                                className={`w-full flex items-center justify-center py-4 rounded-full font-bold uppercase tracking-widest transition-all ${pkg.popular
                                    ? "bg-[#ff1744] border border-[#ff1744] hover:bg-[#ff1744]/80 text-white shadow-[0_0_20px_rgba(255,23,68,0.4)]"
                                    : "bg-transparent border border-white/20 hover:border-[#ff1744] hover:bg-[#ff1744] text-white hover:shadow-[0_0_30px_rgba(255,23,68,0.6)]"
                                    }`}
                            >
                                Book Now
                            </a>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="mt-12 md:mt-16 text-center max-w-4xl mx-auto"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="flex items-center justify-center flex-wrap text-gray-300 mb-10 font-light text-base md:text-lg">
                        <Tag className="w-5 h-5 text-[#ff1744] mr-2 shrink-0 drop-shadow-[0_0_8px_rgba(255,23,68,0.7)]" />
                        <strong className="text-[#ff1744] font-bold uppercase tracking-widest drop-shadow-[0_0_10px_rgba(255,23,68,0.4)] mr-2">
                            Limited Time Offers
                        </strong>
                        <span className="text-gray-400">- Book your slot today and get an extra 10% discount on your first service!</span>
                    </p>
                    <a
                        href="https://www.offers.lustomotive.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-white border border-[#ff1744] bg-[#ff1744]/5 hover:bg-[#ff1744]/20 uppercase font-bold text-sm tracking-[0.2em] py-4 px-10 rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,23,68,0.3)] hover:shadow-[0_0_30px_rgba(255,23,68,0.6)] group"
                    >
                        <Tag className="w-5 h-5 mr-3 group-hover:-rotate-12 transition-transform" /> Unlock Exclusive Deals
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
