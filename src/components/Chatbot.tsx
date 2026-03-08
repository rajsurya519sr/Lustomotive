"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2 } from "lucide-react";

import Image from "next/image";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────
type BotReply = { text: string; chips: string[] };

type Message = {
    id: string;
    sender: "bot" | "user";
    text: string;
    chips?: string[]; // contextual follow-up chips attached to bot messages
    timestamp: Date;
};

// ─────────────────────────────────────────────────────────────────────────────
// Helper
// ─────────────────────────────────────────────────────────────────────────────
const match = (input: string, ...keywords: string[]): boolean =>
    keywords.some((k) => input.includes(k));

// ─────────────────────────────────────────────────────────────────────────────
// Knowledge Base — returns text + contextual follow-up chips
// ─────────────────────────────────────────────────────────────────────────────
const getBotReply = (raw: string): BotReply => {
    const q = raw.toLowerCase().trim();

    // ── Greetings ──────────────────────────────────────────────────────────────
    if (match(q, "hi", "hello", "hey", "hii", "greet", "namaste", "hlo", "sup", "start", "begin"))
        return {
            text: "Hey there! 👋 Welcome to Lustomotive Detailing Studio — Panagarh's most trusted premium car care destination. How can I assist you today?",
            chips: ["Services", "Pricing", "Book Appointment", "Location"],
        };

    // ── Farewell ───────────────────────────────────────────────────────────────
    if (match(q, "bye", "goodbye", "see you", "later", "cya", "thats all", "that's all", "nothing else", "no more"))
        return {
            text: "Thank you for visiting Lustomotive! 🚗✨ We look forward to pampering your car. See you soon!",
            chips: ["Book Appointment", "Contact Us", "Services"],
        };

    // ── Thanks ─────────────────────────────────────────────────────────────────
    if (match(q, "thank", "thanks", "great", "awesome", "perfect", "brilliant", "helpful"))
        return {
            text: "You're very welcome! 😊 Feel free to ask anything else about our services, packages, or to book an appointment.",
            chips: ["Services", "Pricing", "Book Appointment", "Hours"],
        };

    // ── About / Who ───────────────────────────────────────────────────────────
    if (match(q, "about", "who are you", "who is lustomotive", "company", "brand", "studio", "amar bharat", "what is this", "tell me about", "detailing studio"))
        return {
            text: "Lustomotive Detailing Studio is a premium automotive care studio located in Panagarh, West Bengal. We are a proud sub-brand of Amar Bharat Company, offering world-class car detailing, PPF, ceramic coatings, interior restoration, and paint correction — all rooted in The Detailing Mafia's proven excellence standards.",
            chips: ["Our Services", "Why Choose Us", "Our Partners", "Location"],
        };

    // ── All Services ──────────────────────────────────────────────────────────
    if (match(q, "all service", "list service", "what service", "services", "what do you offer", "what you do", "menu", "options"))
        return {
            text: "We offer 6 premium services:\n\n1️⃣ Showroom Finish – Restore that brand-new shine\n2️⃣ Paint Correction – Remove swirls, scratches & oxidation\n3️⃣ Ceramic Coating – Advanced long-lasting protection\n4️⃣ PPF Installation – Invisible paint shield\n5️⃣ Interior Detailing – Deep cabin restoration\n6️⃣ Maintenance – Regular upkeep & detailing\n\nAsk me about any specific one for full details!",
            chips: ["Showroom Finish", "Paint Correction", "Ceramic Coating", "PPF", "Interior Detailing", "Maintenance"],
        };

    // ── Showroom Finish ───────────────────────────────────────────────────────
    if (match(q, "showroom", "shine", "showroom finish", "new look", "glossy", "shiny car"))
        return {
            text: "Our Showroom Finish service restores your car to its original factory-fresh appearance — using expert polishing, wax, and exterior protection techniques for that deep, glossy shine you love.",
            chips: ["Pricing", "Paint Correction", "Ceramic Coating", "Book Appointment"],
        };

    // ── Paint Correction ──────────────────────────────────────────────────────
    if (match(q, "paint correction", "swirl", "scratch", "oxidation", "scratch remov", "swirl mark", "dull paint", "faded paint", "paint restor"))
        return {
            text: "Our Paint Correction service professionally removes swirl marks, light scratches, water spots, and oxidation from your car's paintwork. Using machine polishing and multi-step cutting compounds, we restore deep gloss and clarity to your vehicle's finish.",
            chips: ["Pricing", "How Long Does It Take", "Ceramic Coating", "Book Appointment"],
        };

    // ── Ceramic Coating ───────────────────────────────────────────────────────
    if (match(q, "ceramic", "coating", "hydrophobic", "water bead", "uv protect", "nano coat", "glass coat", "ceramic coat"))
        return {
            text: "Our Ceramic Coating is a nano-technology liquid polymer that bonds to your car's paint, creating a hard, ultra-hydrophobic protective layer. Benefits include:\n\n✅ Deep mirror-like gloss\n✅ Water & dirt repellency\n✅ UV ray protection\n✅ Chemical & contaminant resistance\n✅ Up to 3+ years of protection (Ceramic Coating Special Package)",
            chips: ["Ceramic Coating Price", "PPF vs Ceramic", "How Long Does It Take", "Book Appointment"],
        };

    // ── PPF ───────────────────────────────────────────────────────────────────
    if (match(q, "ppf", "paint protection film", "film", "wrap", "invisible shield", "rock chip", "stone chip", "self heal"))
        return {
            text: "PPF (Paint Protection Film) is a clear, self-healing thermoplastic film we apply to your car's exterior surfaces. It's essentially an invisible armour that protects against:\n\n🛡️ Rock chips & stone impacts\n🛡️ Bug splatter & bird droppings\n🛡️ Minor scratches & scuffs\n🛡️ UV yellowing\n\nThe film self-heals minor scratches with heat exposure — keeping your car looking factory fresh.",
            chips: ["PPF Price", "PPF vs Ceramic", "How Long Does It Take", "Book Appointment"],
        };

    // ── PPF vs Ceramic ────────────────────────────────────────────────────────
    if (match(q, "ppf vs ceramic", "ceramic vs ppf", "difference between ppf", "which is better ppf", "ppf or ceramic"))
        return {
            text: "Great question! Here's the key difference:\n\n🛡️ PPF — Physical protection. Shields against rock chips, deep scratches & impacts. Self-healing.\n\n✨ Ceramic Coating — Chemical & UV protection. Provides hydrophobic gloss, repels water, dirt & UV rays.\n\n💡 Best combo: Many clients opt for PPF on high-impact areas + ceramic coating on top for ultimate protection and shine!",
            chips: ["PPF Pricing", "Ceramic Coating Price", "Book Appointment", "How Long Does It Take"],
        };

    // ── Interior Detailing ────────────────────────────────────────────────────
    if (match(q, "interior", "cabin", "seat", "vacuum", "steam clean", "dashboard", "interior detail", "inside", "carpet", "leather"))
        return {
            text: "Our Interior Detailing is a complete cabin restoration service:\n\n🧹 Deep vacuuming of seats, carpets & boot\n🧼 Steam cleaning for germ-free surfaces\n💺 Leather conditioning & rejuvenation\n🪟 Door panel & dashboard cleaning/polishing\n✨ Odour elimination for a fresh, like-new cabin\n\nPerfect for a 'just-bought' feel inside your car!",
            chips: ["Interior Detailing Price", "Complete Package", "How Long Does It Take", "Book Appointment"],
        };

    // ── Maintenance ───────────────────────────────────────────────────────────
    if (match(q, "routine", "upkeep", "maintain", "regular care") || (match(q, "maintenance") && !match(q, "maintenance package")))
        return {
            text: "Our Maintenance Packages are designed to keep your car looking its best continuously. Regular scheduled detailing prevents build-up of contaminants, preserves paint protection coatings, and maintains your vehicle's value over time.",
            chips: ["Maintenance Package Price", "Complete Package", "Book Appointment", "Hours"],
        };

    // ── Car Spa / Wash ────────────────────────────────────────────────────────
    if (match(q, "car spa", "spa", "car wash", "foam wash", "hand wash") || (match(q, "wash", "clean") && !match(q, "interior", "engine")))
        return {
            text: "Our Car Spa uses pH-neutral shampoos, safe two-bucket wash methods, and premium microfibre towels — ensuring a scratch-free, spotless exterior clean every time. No automated brushes that damage your paint — only professional hand-care techniques.",
            chips: ["Complete Package", "Showroom Finish", "Pricing", "Book Appointment"],
        };

    // ── All Pricing ───────────────────────────────────────────────────────────
    if (match(q, "package", "plan", "bundle", "pricing", "price", "cost", "rate", "fee", "charge", "how much", "tariff", "rupee", "affordable", "₹") && !match(q, "complete", "ceramic special", "maintenance package", "ppf price", "ceramic price", "interior"))
        return {
            text: "We have 3 Special Offer Packages:\n\n🔵 Complete Detailing — ₹12,500 (was ₹15,000)\n   Exterior wash, interior deep clean, paint decontamination, leather conditioning, engine bay\n\n🔴 Ceramic Coating Special — ₹29,999 (was ₹35,000) — Best Value\n   3-year ceramic, 2-step paint correction, glass & wheel protection\n\n🟡 Maintenance Package — ₹6,500 (was ₹8,000)\n   Exterior wash, vacuum, tyre dressing, window & dashboard cleaning\n\n🎁 First-time booking? Get an extra 10% discount!\nVisit: offers.lustomotive.com",
            chips: ["Complete Detailing Package", "Ceramic Coating Special", "Maintenance Package", "Discounts"],
        };

    // ── PPF Price ─────────────────────────────────────────────────────────────
    if (match(q, "ppf price", "ppf cost", "ppf rate", "price of ppf", "cost of ppf", "how much ppf", "ppf fee"))
        return {
            text: "PPF pricing depends on the coverage area (partial/full) and your car's size. Contact us for a personalised quote:\n\n📱 WhatsApp: +91 94754 14545\n📞 Call: +91 94754 14545\n\nWe offer competitive rates with world-class XPEL & 3M film options.",
            chips: ["Book Appointment", "Ceramic Coating Price", "PPF Details", "Contact Us"],
        };

    // ── Ceramic Price ─────────────────────────────────────────────────────────
    if (match(q, "ceramic price", "ceramic cost", "price of ceramic", "cost of ceramic", "how much ceramic", "ceramic coating price", "ceramic coating special"))
        return {
            text: "The Ceramic Coating Special Package is priced at ₹29,999 (originally ₹35,000) — Best Value!\n\nThis includes:\n✅ 3-year ceramic coating\n✅ 2-step paint correction\n✅ Glass treatment\n✅ Wheel & interior protection",
            chips: ["Book Appointment", "PPF vs Ceramic", "Complete Package", "Discounts"],
        };

    // ── Complete Detailing Package ────────────────────────────────────────────
    if (match(q, "complete detailing", "full detailing", "complete package", "full package", "exterior interior"))
        return {
            text: "The Complete Detailing Package (₹12,500, was ₹15,000) includes:\n✅ Full exterior wash & wax\n✅ Interior deep cleaning\n✅ Paint decontamination\n✅ Leather conditioning\n✅ Engine bay cleaning\n\nPerfect for a head-to-toe rejuvenation of your vehicle!",
            chips: ["Book Appointment", "Ceramic Coating Special", "Maintenance Package", "Discounts"],
        };

    // ── Maintenance Package ───────────────────────────────────────────────────
    if (match(q, "maintenance package", "basic package", "regular package", "cheapest package"))
        return {
            text: "The Maintenance Package (₹6,500, was ₹8,000) keeps your car fresh regularly:\n✅ Full exterior wash\n✅ Interior vacuum & wipe down\n✅ Tyre dressing\n✅ Window cleaning\n✅ Dashboard polishing\n\nGreat for monthly or bi-monthly scheduled visits!",
            chips: ["Book Appointment", "Complete Package", "Discounts", "Hours"],
        };

    // ── Interior Price ────────────────────────────────────────────────────────
    if (match(q, "interior price", "interior cost", "interior detailing price", "how much interior"))
        return {
            text: "Interior Detailing pricing depends on your car size and condition. It's also included in our Complete Detailing Package at ₹12,500. For custom pricing, contact us via WhatsApp or call +91 94754 14545.",
            chips: ["Complete Package", "Book Appointment", "Contact Us", "Hours"],
        };

    // ── Discounts / Offers ────────────────────────────────────────────────────
    if (match(q, "discount", "coupon", "promo", "first time", "new customer", "special offer", "exclusive", "unlock", "deal"))
        return {
            text: "🎁 Limited Time Offer — Book your slot today and receive an extra 10% discount on your first service!\n\nVisit: offers.lustomotive.com to unlock exclusive deals and seasonal promotions.",
            chips: ["Book Appointment", "All Packages", "Ceramic Coating Special", "Contact Us"],
        };

    // ── Book / Appointment ────────────────────────────────────────────────────
    if (match(q, "book", "appointment", "slot", "reservation", "when can i", "how to book", "walk in", "walk-in", "visit us"))
        return {
            text: "To book an appointment:\n\n📱 WhatsApp us at +91 94754 14545 (green button on screen)\n📞 Call us at +91 94754 14545\n📧 Email: Lustomotive@gmail.com\n\nWe're open Mon–Sat, 9:00 AM to 7:00 PM. Walk-ins are welcome but we recommend booking in advance for your preferred slot!",
            chips: ["Hours", "Location", "All Packages", "Discounts"],
        };

    // ── Contact ───────────────────────────────────────────────────────────────
    if (match(q, "contact", "reach", "get in touch", "talk", "speak", "connect", "support", "helpline", "help line", "contact us"))
        return {
            text: "You can reach Lustomotive through:\n\n📞 Phone: +91 94754 14545 / +91 94754 24545\n📧 Email: Lustomotive@gmail.com\n💬 WhatsApp: Use the green button on our website\n\nOur team is always happy to assist!",
            chips: ["Book Appointment", "Location", "Hours", "Services"],
        };

    // ── Phone ─────────────────────────────────────────────────────────────────
    if (match(q, "phone", "mobile", "landline", "phone number") || (match(q, "call", "number") && !match(q, "how long", "time")))
        return {
            text: "📞 Our contact numbers:\n• +91 94754 14545\n• +91 94754 24545\n\nYou can call or WhatsApp us anytime during business hours (Mon–Sat, 9 AM – 7 PM).",
            chips: ["WhatsApp", "Email", "Book Appointment", "Hours"],
        };

    // ── Email ─────────────────────────────────────────────────────────────────
    if (match(q, "email", "mail", "gmail", "e-mail"))
        return {
            text: "📧 Our email address is: Lustomotive@gmail.com\n\nFeel free to email us for inquiries, quotes, or any questions — we typically respond within a few hours on business days.",
            chips: ["Phone Number", "WhatsApp", "Book Appointment", "Location"],
        };

    // ── WhatsApp ──────────────────────────────────────────────────────────────
    if (match(q, "whatsapp", "wa", "message us", "text us", "chat"))
        return {
            text: "💬 WhatsApp us directly at +91 94754 14545! Just click the green WhatsApp icon at the top-right of our website to start chatting instantly with our team.",
            chips: ["Phone Number", "Email", "Book Appointment", "Hours"],
        };

    // ── Location / Address ────────────────────────────────────────────────────
    if (match(q, "location", "address", "panagarh", "west bengal", "find you", "directions", "map", "google map", "how to reach", "where are you"))
        return {
            text: "📍 We are located in Panagarh, West Bengal, India.\n\nSearch 'Lustomotive By AmarBharatCompany' on Google Maps, or click the map on our Contact section for direct directions!",
            chips: ["Hours", "Contact Us", "Book Appointment", "Nearby Areas"],
        };

    // ── Nearby Areas ──────────────────────────────────────────────────────────
    if (match(q, "nearby", "durgapur", "asansol", "bardhaman", "burdwan", "kolkata", "far", "distance"))
        return {
            text: "Our studio in Panagarh, West Bengal is conveniently accessible from nearby cities:\n\n📍 Durgapur — ~30 mins\n📍 Asansol — ~45 mins\n📍 Bardhaman — ~40 mins\n📍 Kolkata — ~2.5 hrs\n\nMany clients travel from across West Bengal for our premium services!",
            chips: ["Location on Map", "Book Appointment", "Contact Us", "Services"],
        };

    // ── Working Hours ─────────────────────────────────────────────────────────
    if (match(q, "hours", "timing", "time", "open", "close", "working", "when are you", "available", "sunday", "monday", "saturday", "weekday", "weekend", "what time"))
        return {
            text: "🕘 We are open:\n• Monday to Saturday: 9:00 AM – 7:00 PM\n\nSundays may be available by appointment only — contact us to confirm. We recommend booking in advance for busy weekend slots!",
            chips: ["Book Appointment", "Contact Us", "Location", "Services"],
        };

    // ── Why Choose Us ─────────────────────────────────────────────────────────
    if (match(q, "why choose", "why lustomotive", "why you", "best", "better than", "difference", "unique", "edge", "advantage", "trust", "reliable"))
        return {
            text: "Here's why Panagarh trusts Lustomotive 🏆:\n\n✨ Premium Quality — Only the finest products & techniques\n👨‍🔧 Expert Craftsmanship — Certified professionals from The Detailing Mafia\n🛡️ Advanced Protection — State-of-the-art PPF, ceramic & paint solutions\n🎯 Attention to Detail — Every inch meticulously cared for",
            chips: ["Our Partners", "How Long In Business", "Testimonials", "Services"],
        };

    // ── Vision ────────────────────────────────────────────────────────────────
    if (match(q, "vision", "mission", "strive", "goal", "commitment", "philosophy", "values", "principle"))
        return {
            text: "At Lustomotive, we strive for 4 core values:\n\n🖌️ Excellence in Every Detail — Perfection in every service\n💡 Innovation & Technology — Adopting the latest car care technologies\n❤️ Customer Satisfaction — Going above and beyond your expectations\n🌱 Sustainable Practices — Eco-friendly solutions for your car and the planet",
            chips: ["Why Choose Us", "About Lustomotive", "Our Partners", "Services"],
        };

    // ── Partners ──────────────────────────────────────────────────────────────
    if (match(q, "partner", "collaborat", "sponsor", "3m", "xpel", "modesta", "carpro", "gyeon", "koch", "gtechnic", "detailing mafia", "alliance", "our partner"))
        return {
            text: "We collaborate with world-class automotive brands:\n\n🤝 3M Automotive\n🤝 The Detailing Mafia\n🤝 XPEL\n🤝 Modesta\n🤝 CarPro\n🤝 Gyeon\n🤝 Koch Chemie\n🤝 Gtechnic\n\nThese partnerships ensure we only use industry-leading, premium-grade products on your vehicle.",
            chips: ["Why Choose Us", "Services", "Pricing", "About Us"],
        };

    // ── Testimonials / Reviews ────────────────────────────────────────────────
    if (match(q, "review", "testimonial", "feedback", "rating", "customer say", "client say", "happy customer", "what people say", "star", "experience"))
        return {
            text: "Our clients love us! ⭐⭐⭐⭐⭐\n\n💬 R. Singh (Panagarh): \"My car looks brand new! The attention to detail is truly unmatched.\"\n\n💬 A. Das (Durgapur): \"Ceramic coating is incredible — water beads right off!\"\n\n💬 P. Ghosh (Panagarh): \"Got PPF on my Creta — flawless finish!\"\n\n💬 N. Paul (Asansol): \"Best detailing studio in West Bengal!\"\n\nScroll to our Testimonials section to see all reviews!",
            chips: ["Services", "Pricing", "Book Appointment", "Why Choose Us"],
        };

    // ── Stats / Achievements ──────────────────────────────────────────────────
    if (match(q, "how many", "vehicles", "statistic", "achievement", "track record", "how long in business", "years", "stat"))
        return {
            text: "Our achievements speak for themselves:\n\n🚗 1,000+ Vehicles Detailed\n🏆 2+ Years of Excellence\n😊 92% Customer Satisfaction Rate\n🔑 100+ Cashless Insurance Claims Handled\n\nAnd we're growing faster than ever!",
            chips: ["Testimonials", "Why Choose Us", "Services", "Book Appointment"],
        };

    // ── Cashless / Insurance ──────────────────────────────────────────────────
    if (match(q, "cashless", "insurance", "claim", "accident", "damage"))
        return {
            text: "We have successfully handled 100+ cashless insurance claims! If your vehicle has sustained damage covered under insurance, we guide you through the entire cashless repair & restoration process.\n\nContact us for details on how to get started.",
            chips: ["Contact Us", "Book Appointment", "Services", "Location"],
        };

    // ── Engine Bay ────────────────────────────────────────────────────────────
    if (match(q, "engine", "engine bay", "bonnet", "under hood", "hood", "engine clean"))
        return {
            text: "Yes! Engine bay cleaning is included in our Complete Detailing Package. We carefully degrease and clean the engine bay — making it look as impressive as the exterior, while keeping all electrical components safe.",
            chips: ["Complete Package", "Pricing", "Book Appointment", "Services"],
        };

    // ── Glass / Window ────────────────────────────────────────────────────────
    if (match(q, "glass", "window", "windshield", "windscreen", "visibility", "rain repell"))
        return {
            text: "Our glass treatment (included in the Ceramic Coating Special) applies a hydrophobic coating to all glass surfaces — causing water to bead and roll off instantly, dramatically improving visibility in rain.",
            chips: ["Ceramic Coating Special", "PPF", "Pricing", "Book Appointment"],
        };

    // ── Tyre / Wheel ──────────────────────────────────────────────────────────
    if (match(q, "tyre", "tire", "wheel", "rim", "alloy"))
        return {
            text: "We offer tyre dressing (deep black shine) and wheel/rim protection as part of our packages:\n\n• Tyre dressing — included in the Maintenance Package\n• Wheel protection — included in the Ceramic Coating Special\n\nAsk about standalone tyre or rim detailing too!",
            chips: ["Maintenance Package", "Ceramic Coating Special", "Pricing", "Book Appointment"],
        };

    // ── How Long Does It Take ─────────────────────────────────────────────────
    if (match(q, "how long", "duration", "time taken", "quick", "fast", "how many hours", "same day", "how long does"))
        return {
            text: "Approximate service durations:\n\n⏱️ Maintenance Package: 2–3 hours\n⏱️ Complete Detailing: 4–6 hours\n⏱️ Ceramic Coating / PPF: 1–2 days (curing time needed)\n\nWe recommend dropping your car in the morning. Simple services are often ready the same day!",
            chips: ["Book Appointment", "All Packages", "Contact Us", "Hours"],
        };

    // ── Car Compatibility ─────────────────────────────────────────────────────
    if (match(q, "which car", "my car", "compatible", "all car", "suv", "sedan", "hatchback", "truck", "luxury", "ev", "electric", "sports car"))
        return {
            text: "All our services are compatible with every vehicle type:\n\n🚘 Hatchbacks, Sedans, SUVs, MUVs\n🚗 Luxury cars (BMW, Mercedes, Audi, etc.)\n⚡ Electric vehicles (EVs)\n🚙 Trucks & commercial vehicles\n🏎️ Sports cars & supercars\n\nNo matter what you drive, we treat it with the highest level of care!",
            chips: ["Services", "Pricing", "Book Appointment", "Why Choose Us"],
        };

    // ── Eco-friendly ──────────────────────────────────────────────────────────
    if (match(q, "eco", "environment", "green", "sustainable", "waterless", "bio", "chemical free"))
        return {
            text: "🌱 We are committed to sustainable automotive care! We use eco-friendly, biodegradable detailing products wherever possible, minimise water waste, and avoid harsh chemicals — without compromising on results.",
            chips: ["Our Vision", "Services", "Why Choose Us", "About Us"],
        };

    // ── Navigation ────────────────────────────────────────────────────────────
    if (match(q, "navigate", "scroll", "section", "page", "where is", "how to find on website", "navbar"))
        return {
            text: "Our website sections:\n\n🏠 Hero | 📖 About Us | ⚙️ Why Choose Us\n🎯 Our Vision | 🚗 Services | 💰 Special Offers\n🤝 Collabs | ⭐ Testimonials | 📞 Contact\n\nUse the top navigation bar to jump to any section!",
            chips: ["Services", "Pricing", "Testimonials", "Contact Us"],
        };

    // ── Social Media ──────────────────────────────────────────────────────────
    if (match(q, "instagram", "facebook", "social", "social media", "follow", "youtube", "twitter"))
        return {
            text: "For our latest work, before/after transformations, and promotional content, follow us on social media! You can find our social links in the footer section of the website. 📱",
            chips: ["Contact Us", "Services", "Discounts", "Book Appointment"],
        };

    // ── Default Fallback ──────────────────────────────────────────────────────
    return {
        text: "Hmm, I didn't quite catch that! 🤔 Here are some things I can help with:\n\n• Services (PPF, Ceramic, Detailing, etc.)\n• Pricing & Packages\n• Location & Hours\n• Booking an appointment\n• Our partners & values",
        chips: ["Services", "Pricing", "Book Appointment", "Location", "Contact Us"],
    };
};

// ─────────────────────────────────────────────────────────────────────────────
// Initial message
// ─────────────────────────────────────────────────────────────────────────────
const INITIAL_MESSAGE: Message = {
    id: "1",
    sender: "bot",
    text: "Hello! 👋 Welcome to Lustomotive Detailing Studio — Panagarh's premium car care destination. I can answer anything about our services, pricing, location, packages, and more. How can I help?",
    chips: ["Services", "Pricing", "Book Appointment", "Location", "Why Choose Us", "Discounts"],
    timestamp: new Date(),
};

// ─────────────────────────────────────────────────────────────────────────────
// Chip renderer
// ─────────────────────────────────────────────────────────────────────────────
function SuggestionChips({
    chips,
    onSelect,
}: {
    chips: string[];
    onSelect: (chip: string) => void;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
            className="flex flex-wrap gap-1.5 mt-2 pl-9"
        >
            {chips.map((chip) => (
                <button
                    key={chip}
                    onClick={() => onSelect(chip)}
                    className="text-[11px] px-2.5 py-1 rounded-full border border-red-600/40 text-red-400 hover:bg-red-600/20 hover:border-red-500 hover:text-red-200 transition-all duration-150 font-medium"
                >
                    {chip}
                </button>
            ))}
        </motion.div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────
export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen, isTyping]);

    const sendMessage = (text: string) => {
        if (!text.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            sender: "user",
            text: text.trim(),
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMsg]);
        setInputValue("");
        setIsTyping(true);

        setTimeout(() => {
            const reply = getBotReply(userMsg.text);
            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                sender: "bot",
                text: reply.text,
                chips: reply.chips,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botMsg]);
            setIsTyping(false);
        }, 900 + Math.random() * 600);
    };

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        sendMessage(inputValue);
    };

    return (
        <>
            {/* ── Floating toggle button + tooltip ── */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="fixed bottom-6 right-6 z-50 flex items-center group"
                    >
                        {/* Tooltip — slides in from right to left on hover */}
                        <div className="absolute right-[calc(100%+12px)] flex flex-col items-end pointer-events-none">
                            <div className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-3 transition-all duration-300 ease-out bg-black/90 backdrop-blur-sm border border-red-600/40 text-white text-[12px] font-orbitron tracking-widest whitespace-nowrap px-4 py-2.5 rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.2)] flex flex-col gap-0.5">
                                <span className="text-red-500 font-bold text-[11px] uppercase tracking-[0.2em]">LustoBot</span>
                                <span className="text-white/70 font-sans font-normal tracking-normal text-[11px]">Your Friendly Assistant · Ask me anything!</span>
                            </div>
                            {/* Tooltip arrow */}
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[7px] border-l-black/90 self-center" />
                        </div>

                        {/* Button */}
                        <motion.button
                            whileHover={{ scale: 1.12 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsOpen(true)}
                            className="relative w-14 h-14 bg-gradient-to-br from-red-600 to-red-900 text-white rounded-full shadow-[0_0_24px_rgba(220,38,38,0.45)] flex items-center justify-center"
                            aria-label="Open LustoBot — Your Friendly Assistant"
                        >
                            {/* Pulsing ring */}
                            <span className="absolute inset-0 rounded-full animate-ping bg-red-600/30" />
                            <Image src="/images/chatbot.png" alt="LustoBot" width={32} height={32} className="relative z-10 drop-shadow-sm pointer-events-none object-contain brightness-0 invert" />
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Chat window ── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 24, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 24, scale: 0.95 }}
                        transition={{ duration: 0.28, type: "spring", stiffness: 220, damping: 22 }}
                        className="fixed bottom-6 right-6 z-[60] w-[340px] sm:w-[400px] flex flex-col bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_8px_60px_rgba(0,0,0,0.7)] overflow-hidden"
                        style={{ maxHeight: "min(600px, 84vh)" }}
                    >
                        {/* Header */}
                        <div className="relative flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-zinc-950 to-black border-b border-white/10 flex-shrink-0">
                            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-red-600/60 to-transparent" />
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-9 h-9 rounded-full bg-red-600/20 border border-red-500/50 flex items-center justify-center overflow-hidden">
                                        <Image src="/images/chatbot.png" alt="LustoBot" width={22} height={22} className="object-contain brightness-0 invert" />
                                    </div>
                                    <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-black" />
                                </div>
                                <div>
                                    <h3 className="font-orbitron font-semibold text-white tracking-wider text-[0.8rem]">LustoBot</h3>
                                    <p className="text-[0.63rem] text-green-400/80 tracking-widest uppercase">Online · Always here to help</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1.5 text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2 min-h-0 custom-scrollbar">
                            {messages.map((msg, index) => (
                                <div key={msg.id}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className={`flex items-end gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        {msg.sender === "bot" && (
                                            <div className="w-7 h-7 rounded-full bg-red-600/10 border border-red-500/30 flex-shrink-0 flex items-center justify-center mb-0.5 overflow-hidden">
                                                <Image src="/images/chatbot.png" alt="LustoBot" width={16} height={16} className="object-contain brightness-0 invert" />
                                            </div>
                                        )}
                                        <div
                                            className={`px-3.5 py-2.5 max-w-[82%] rounded-2xl text-[13px] leading-relaxed whitespace-pre-line ${msg.sender === "user"
                                                ? "bg-red-600 text-white rounded-br-sm"
                                                : "bg-white/[0.08] text-white/90 rounded-bl-sm border border-white/[0.06]"
                                                }`}
                                        >
                                            {msg.text}
                                        </div>
                                        {msg.sender === "user" && (
                                            <div className="w-7 h-7 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex-shrink-0 flex items-center justify-center mb-0.5 overflow-hidden">
                                                <div
                                                    className="w-3.5 h-3.5 bg-red-500"
                                                    style={{
                                                        WebkitMaskImage: "url('/images/user.png')",
                                                        WebkitMaskSize: "contain",
                                                        WebkitMaskRepeat: "no-repeat",
                                                        WebkitMaskPosition: "center",
                                                        maskImage: "url('/images/user.png')",
                                                        maskSize: "contain",
                                                        maskRepeat: "no-repeat",
                                                        maskPosition: "center"
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </motion.div>

                                    {/* Contextual chips after every bot message (hide chips of older messages once new ones appear) */}
                                    {msg.sender === "bot" && msg.chips && msg.chips.length > 0 && index === messages.length - 1 && !isTyping && (
                                        <SuggestionChips chips={msg.chips} onSelect={sendMessage} />
                                    )}
                                </div>
                            ))}

                            {/* Typing indicator */}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-end gap-2 justify-start"
                                >
                                    <div className="w-7 h-7 rounded-full bg-red-600/10 border border-red-500/30 flex-shrink-0 flex items-center justify-center overflow-hidden">
                                        <Image src="/images/chatbot.png" alt="LustoBot" width={16} height={16} className="object-contain brightness-0 invert" />
                                    </div>
                                    <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-white/[0.08] border border-white/[0.06] flex items-center gap-1">
                                        {[0, 0.18, 0.36].map((delay, i) => (
                                            <motion.div
                                                key={i}
                                                animate={{ y: [0, -4, 0] }}
                                                transition={{ duration: 0.55, repeat: Infinity, delay }}
                                                className="w-1.5 h-1.5 bg-white/40 rounded-full"
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="px-4 pt-2 pb-3 bg-black/30 border-t border-white/[0.07] flex-shrink-0">
                            <form onSubmit={handleSubmit} className="relative flex items-center">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Ask anything about Lustomotive..."
                                    className="w-full bg-white/[0.05] border border-white/10 rounded-full py-2.5 pl-4 pr-11 text-[13px] text-white placeholder-white/35 focus:outline-none focus:border-red-500/50 focus:bg-white/[0.08] transition-all"
                                    autoComplete="off"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim() || isTyping}
                                    className="absolute right-1.5 p-2 bg-red-600 hover:bg-red-500 text-white rounded-full transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    {isTyping ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
                                </button>
                            </form>
                            <p className="text-center mt-2 text-[10px] text-white/25 tracking-widest">LUSTOMOTIVE VIRTUAL ASSISTANT</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style dangerouslySetInnerHTML={{
                __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.16); }
      `}} />
        </>
    );
}
