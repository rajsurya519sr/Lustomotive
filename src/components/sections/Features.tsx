"use client";

import { motion } from "framer-motion";
import { Award, Target, Users, ShieldCheck, Brush, Lightbulb, Heart, Leaf } from "lucide-react";



export default function Features() {
    const features = [
        {
            icon: <Award className="w-8 h-8 text-red-500" />,
            title: "Premium Quality",
            description: "We use only the finest products and techniques to ensure your vehicle receives the best care possible. Every step is calibrated to perfection.",
        },
        {
            icon: <Users className="w-8 h-8 text-red-500" />,
            title: "Expert Craftsmanship",
            description: "Our certified professionals bring years of hands-on experience in high-end automotive detailing from The Detailing Mafia's proven standards.",
        },
        {
            icon: <ShieldCheck className="w-8 h-8 text-red-500" />,
            title: "Advanced Protection",
            description: "State-of-the-art PPF, ceramic coatings, and paint protection solutions that lock in your car's value for years to come.",
        },
        {
            icon: <Target className="w-8 h-8 text-red-500" />,
            title: "Attention to Detail",
            description: "Every inch of your vehicle is meticulously cared for with precision, dedication, and a relentless pursuit of perfection.",
        },
    ];

    return (
        <section id="features" className="scroll-mt-28 pb-12 md:pb-16 bg-[#0a0a0a]">

            {/* Why Choose Us */}
            <div id="why-choose-us" className="scroll-mt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-20">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="text-red-600 text-xs font-semibold tracking-[0.4em] uppercase mb-3">The Lustomotive Edge</p>
                    <h2 className="text-4xl md:text-6xl font-orbitron font-bold tracking-widest text-white leading-tight drop-shadow-[0_0_15px_rgba(255,23,68,0.5)] mb-2">
                        Why Choose <span className="text-[#ff1744]">Us?</span>
                    </h2>
                    <div className="mx-auto mt-5 mb-5 w-16 h-[2px] bg-gradient-to-r from-transparent via-red-600 to-transparent rounded-full"></div>
                    <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                        Four reasons why Panagarh trusts Lustomotive above all others for their prized vehicles.
                    </p>
                </motion.div>

                <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-6 max-w-[80rem] mx-auto mt-12 px-4 sm:px-0 h-auto md:h-32">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="group relative flex items-center h-20 w-20 md:h-24 md:w-24 lg:hover:w-[600px] md:hover:w-[500px] hover:w-[85vw] sm:hover:w-[350px] hover:h-24 md:hover:h-[110px] sm:max-w-none max-w-[85vw] rounded-full bg-[#0a0a0a] border border-white/10 hover:border-red-600/40 transition-all duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden cursor-pointer shadow-xl hover:shadow-[0_0_30px_rgba(255,23,68,0.15)] z-10 hover:z-20"
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/5 transition-colors duration-700 pointer-events-none" />
                            <div className="min-w-[5rem] min-h-[5rem] md:min-w-[6rem] md:min-h-[6rem] w-[5rem] h-[5rem] md:w-[6rem] md:h-[6rem] flex items-center justify-center relative z-10 transition-transform duration-500 group-hover:scale-110 shrink-0 group-hover:ml-2">
                                <div className="text-red-500 drop-shadow-[0_0_10px_rgba(255,23,68,0.3)] group-hover:drop-shadow-[0_0_15px_rgba(255,23,68,0.8)] mt-1 transition-all duration-500">
                                    {feature.icon}
                                </div>
                            </div>
                            <div className="flex flex-col justify-center absolute left-[5rem] md:left-[6.5rem] w-[260px] md:w-[400px] lg:w-[480px] opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-[600ms] pointer-events-none pr-4 md:pr-6">
                                <div className="flex items-center gap-3">
                                    <span className="text-red-500 text-xs font-black font-orbitron shrink-0">0{index + 1}</span>
                                    <h3 className="uppercase text-[0.85rem] sm:text-[0.9rem] md:text-[1.1rem] font-orbitron font-bold text-white tracking-[0.1em] truncate">
                                        {feature.title}
                                    </h3>
                                </div>
                                <p className="text-[#a1a1aa] text-[0.7rem] sm:text-[0.75rem] md:text-[0.85rem] lg:text-[0.9rem] leading-[1.6] mt-2 whitespace-normal break-words">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>


            {/* Our Vision */}
            <div id="vision" className="scroll-mt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-neutral-900 pt-12 md:pt-16 mt-12 md:mt-16">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="text-red-600 text-xs font-semibold tracking-[0.4em] uppercase mb-3">Our Vision</p>
                    <h2 className="text-4xl md:text-6xl font-orbitron font-bold tracking-widest text-white leading-tight drop-shadow-[0_0_15px_rgba(255,23,68,0.5)] mb-2">
                        What Do We <span className="text-[#ff1744]">Strive For?</span>
                    </h2>
                    <div className="mx-auto mt-5 mb-5 w-16 h-[2px] bg-gradient-to-r from-transparent via-red-600 to-transparent rounded-full"></div>
                    <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                        Our commitment to excellence and customer satisfaction
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 mt-8">
                    {[
                        {
                            icon: <Brush className="w-8 h-8 md:w-10 md:h-10 text-red-500 md:text-gray-600 transition-colors duration-500" />,
                            title: "Excellence in Every Detail",
                            description: "We strive to deliver perfection in every service, ensuring your vehicle looks and feels like new."
                        },
                        {
                            icon: <Lightbulb className="w-8 h-8 md:w-10 md:h-10 text-red-500 md:text-gray-600 transition-colors duration-500" />,
                            title: "Innovation & Technology",
                            description: "Constantly evolving with the latest automotive care technologies and techniques."
                        },
                        {
                            icon: <Heart className="w-8 h-8 md:w-10 md:h-10 text-red-500 md:text-gray-600 transition-colors duration-500" />,
                            title: "Customer Satisfaction",
                            description: "Your satisfaction is our priority. We go above and beyond to exceed your expectations."
                        },
                        {
                            icon: <Leaf className="w-8 h-8 md:w-10 md:h-10 text-red-500 md:text-gray-600 transition-colors duration-500" />,
                            title: "Sustainable Practices",
                            description: "Committed to eco-friendly detailing solutions that protect both your vehicle and the environment."
                        }
                    ].map((vision, index) => (
                        <motion.div
                            key={index}
                            className="group flex flex-col items-center text-center relative z-10 p-8 md:p-0 bg-[#050505] md:bg-transparent border border-white/5 md:border-transparent rounded-2xl md:rounded-none transition-all duration-300"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                        >
                            <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 md:w-auto md:h-auto rounded-full md:rounded-none border border-red-600/20 md:border-transparent bg-red-600/5 md:bg-transparent transition-all duration-300 mb-6 relative">
                                <div className="hidden md:block absolute opacity-0 group-hover:opacity-100 transition-opacity duration-500 w-24 h-24 bg-[#ff1744]/50 blur-2xl rounded-full"></div>
                                <div className="hidden md:block absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-12 h-12 bg-[#ff1744]/80 blur-lg rounded-full"></div>
                                <div className="group-hover:text-[#ff1744] group-hover:scale-110 md:group-hover:-translate-y-2 transition-all duration-500 md:group-hover:drop-shadow-[0_0_25px_rgba(255,23,68,1)] z-10 filter">
                                    {vision.icon}
                                </div>
                            </div>
                            <h3 className="uppercase text-lg font-orbitron font-bold text-white tracking-widest drop-shadow-[0_0_10px_rgba(255,23,68,0.5)] md:drop-shadow-[0_0_10px_rgba(0,0,0,0.5)] md:group-hover:text-white group-hover:text-[#ff1744] transition-colors mb-4">{vision.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                                {vision.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Our Valued Partners */}
            <div id="collabs" className="scroll-mt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-neutral-900 pt-12 md:pt-16 mt-12 md:mt-16">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-50px" }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="text-red-600 text-xs font-semibold tracking-[0.4em] uppercase mb-3">Premium Alliances</p>
                    <h2 className="text-3xl md:text-5xl font-orbitron font-bold tracking-widest text-white leading-tight drop-shadow-[0_0_15px_rgba(255,23,68,0.5)] mb-2">
                        Our Valued <span className="text-[#ff1744]">Partners</span>
                    </h2>
                    <div className="mx-auto mt-5 mb-5 w-16 h-[2px] bg-gradient-to-r from-transparent via-red-600 to-transparent rounded-full"></div>
                    <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                        We collaborate with industry-leading brands to bring you the finest automotive care products and services available.
                    </p>
                </motion.div>

                <div className="flex flex-wrap justify-center items-center gap-4 md:gap-12 mt-8">
                    {["3M Automotive", "The Detailing Mafia", "XPEL", "Modesta", "CarPro", "Gyeon", "Koch Chemie", "Gtechnic"].map((partner, index) => (
                        <motion.div
                            key={index}
                            className="relative flex items-center justify-center min-w-[140px] md:min-w-[160px] group px-6 md:px-0 py-4 md:py-2 bg-neutral-900/40 md:bg-transparent border border-white/5 md:border-transparent rounded-lg md:rounded-none transition-all duration-300"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: index * 0.05 }}
                        >
                            <span className="font-orbitron font-bold md:font-black text-gray-400 md:text-gray-500 group-hover:text-[#ff1744] md:group-hover:text-white md:group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.4)] transition-all duration-500 uppercase tracking-wider md:tracking-widest text-sm md:text-base text-center relative z-10">
                                {partner}
                            </span>
                            <div className="hidden md:block absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#ff1744] group-hover:w-full transition-all duration-500 shadow-[0_0_10px_rgba(255,23,68,0.8)]"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
