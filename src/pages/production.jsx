import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
    Leaf,
    Droplets,
    Sun,
    TrendingUp,
    Shield,
    Truck,
    Package,
    Award,
    ArrowRight,
    CheckCircle,
    BarChart3,
    Users,
    Globe,
    Sparkles
} from "lucide-react";

/* ─── intersection observer hook ────────────────────────────── */
function useInView(threshold = 0.15) {
    const ref = useRef(null);
    const [vis, setVis] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
            { threshold }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [threshold]);
    return [ref, vis];
}

/* ─── Product Categories ────────────────────────────────────── */
const PRODUCT_CATEGORIES = [
    {
        name: "Hibiscus",
        variety: "Hibiscus Sabdariffa",
        description: "Premium deep-red calyces with high anthocyanin content, organic-certified, and traceable from seed to export.",
        image: "/assets/farm (5).jpg",
        tags: ["Organic", "High Anthocyanin", "Export Grade"],
        accent: "#4a8a5b"
    },
    {
        name: "Cut Flowers",
        variety: "Mixed Seasonal Varieties",
        description: "Stem-cut-to-spec, climate-controlled, and packed for extended vase life, serving premium florists and exporters.",
        image: "/assets/farm (8).jpg",
        tags: ["Stem-cut", "Climate Controlled", "Extended Vase Life"],
        accent: "#FF0000"
    },
    {
        name: "Premium Herbs",
        variety: "Basil, Mint, Rosemary, Thyme",
        description: "Hydroponically grown, pesticide-free culinary herbs harvested on demand for Lagos's premium hospitality sector.",
        image: "/assets/farm (1).jpg",
        tags: ["Hydroponic", "Pesticide-free", "On-demand Harvest"],
        accent: "#4a8a5b"
    },
    {
        name: "Leafy Greens",
        variety: "Lettuce, Kale, Swiss Chard",
        description: "365-day production of crisp, nutrient-dense leafy greens independent of rainfall and soil degradation.",
        image: "/assets/farm (3).jpg",
        tags: ["Year-round", "Nutrient-dense", "Rainfall Independent"],
        accent: "#4a8a5b"
    },
    {
        name: "Specialty Vegetables",
        variety: "Heirloom Tomatoes, Bell Peppers, Cucumbers",
        description: "Premium vegetables grown in controlled environments with precision irrigation and fertigation.",
        image: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=600&q=80",
        tags: ["Controlled Environment", "Precision Irrigation", "Premium Grade"],
        accent: "#FF0000"
    },
    {
        name: "Coco Coir",
        variety: "Sustainable Growing Medium",
        description: "Eco-friendly, renewable coco coir substrate for both soil-based and container cultivation, export-ready.",
        image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&q=80",
        tags: ["Eco-friendly", "Renewable", "Export-ready"],
        accent: "#4a8a5b"
    },
    {
        name: "Botanical Extracts",
        variety: "Essential Oils & Concentrates",
        description: "Solar-processed botanical extracts for cosmetics, nutraceuticals, and natural wellness industries.",
        image: "https://images.unsplash.com/photo-1598520106830-8c45c2035460?w=600&q=80",
        tags: ["Solar-processed", "Clean Label", "Industrial Grade"],
        accent: "#FF0000"
    },
    {
        name: "Value-added Products",
        variety: "Dried Herbs, Teas, Spices",
        description: "Solar-dried and packaged value-added products for retail, hospitality, and export markets.",
        image: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=600&q=80",
        tags: ["Solar-dried", "Retail Ready", "Value-added"],
        accent: "#4a8a5b"
    }
];

/* ─── Why Different Pillars ─────────────────────────────────── */
const WHY_PILLARS = [
    {
        icon: <Leaf size={32} />,
        title: "Regeneratively Grown",
        description: "No synthetic fertilisers. No chemical pesticides. Our farms build soil organic matter, sequester carbon, and host biodiversity.",
        accent: "#4a8a5b"
    },
    {
        icon: <Droplets size={32} />,
        title: "Sensor-Verified",
        description: "CropX soil sensors track moisture, temperature, EC, and salinity in real time. Every batch is timestamped and GPS-referenced.",
        accent: "#4a8a5b"
    },
    {
        icon: <Sun size={32} />,
        title: "Solar-Powered",
        description: "Our cold chain, irrigation pumps, and processing facilities run on solar, reducing carbon footprint and operating costs.",
        accent: "#FF0000"
    },
    {
        icon: <BarChart3 size={32} />,
        title: "Data-Traceable",
        description: "From seed to export, every product batch carries farm-level data, soil conditions, irrigation logs, harvest timestamps.",
        accent: "#4a8a5b"
    },
    {
        icon: <Shield size={32} />,
        title: "Export-Qualified",
        description: "UK and EU market-compliant. Our processes meet SPS, phytosanitary, and food safety standards for international markets.",
        accent: "#FF0000"
    }
];

/* ─── Engagement Models ─────────────────────────────────────── */
const ENGAGEMENT_MODELS = [
    {
        title: "Wholesale Purchase",
        description: "Direct purchase of fresh or processed products by volume, for distributors, food processors, and manufacturers.",
        moq: "MOQ: 100kg",
        leadTime: "Lead time: 5–10 days",
        pricing: "Volume-based pricing",
        icon: <Package size={24} />,
        accent: "#4a8a5b"
    },
    {
        title: "Supply Agreement",
        description: "Fixed-volume, fixed-schedule supply contracts for hotels, restaurants, supermarkets, and food service chains.",
        moq: "6–12 month contracts",
        leadTime: "Predictable weekly delivery",
        pricing: "Fixed pricing, invoiced monthly",
        icon: <Truck size={24} />,
        accent: "#4a8a5b"
    },
    {
        title: "Contract Farming",
        description: "We grow specific varieties to your specifications, volume, quality parameters, and delivery schedule pre-agreed.",
        moq: "Seasonal production runs",
        leadTime: "Planting-to-harvest planning",
        pricing: "Custom pricing per spec",
        icon: <Users size={24} />,
        accent: "#FF0000"
    },
    {
        title: "Export Partnership",
        description: "Joint venture or exclusive distribution for UK, EU, and Middle East markets, leveraging our export certifications.",
        moq: "Container-volume minimums",
        leadTime: "12–24 week lead time",
        pricing: "Tiered export pricing",
        icon: <Globe size={24} />,
        accent: "#FF0000"
    }
];

/* ─── Sister Brands ─────────────────────────────────────────── */
const SISTER_BRANDS = [
  { name: "Shaishen", description: "Premium botanical extracts" },
  { name: "Lambert Willis", description: "Agri-finance & advisory" },
  { name: "CropX Nigeria", description: "Precision sensing" },
  { name: "GC Academy", description: "Agricultural training" }
];

/* ─── Hero Section ──────────────────────────────────────────── */
function Hero() {
    const [ref, vis] = useInView(0.3);

    return (
        <section className="relative min-h-screen flex items-center bg-gc-green-900 overflow-hidden">
            {/* Background Image & Overlay */}
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&q=80"
                    alt="Harvest fields"
                    className="w-full h-full object-cover opacity-250"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gc-green-900/60 via-gc-green-900 to-gc-green-900" />
                <div className="absolute inset-0 bg-gradient-to-r from-gc-green-900 via-gc-green-900/40 to-transparent" />
            </div>

            {/* Content */}
            <div ref={ref} className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl">
                    {/* Badge */}
                    <div
                        className="inline-flex items-center gap-2 bg-gc-green-500/10 border border-gc-green-500/20 backdrop-blur-md rounded-full px-4 py-2 mb-8"
                        style={{
                            opacity: vis ? 1 : 0,
                            transform: vis ? "translateY(0)" : "translateY(20px)",
                            transition: "all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)"
                        }}
                    >
                        <Sparkles size={16} className="text-gc-green-400" />
                        <span className="text-xs font-semibold text-gc-green-400 uppercase tracking-widest">Our Produce</span>
                    </div>

                    {/* Headline */}
                    <h1
                        className="text-4xl sm:text-7xl font-semibold lg:text-7xl font-display font-light text-white leading-[1.05] mb-8"
                        style={{
                            opacity: vis ? 1 : 0,
                            transform: vis ? "translateY(0)" : "translateY(20px)",
                            transition: "all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s"
                        }}
                    >
                        Regeneratively Produced<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gc-green-400 to-emerald-200 italic">Sensor-Verified</span>
                    </h1>

                    {/* Description */}
                    <p
                        className="text-lg sm:text-xl text-white font-body leading-relaxed max-w-2xl mb-10"
                        style={{
                            opacity: vis ? 1 : 0,
                            transform: vis ? "translateY(0)" : "translateY(20px)",
                            transition: "all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.2s"
                        }}
                    >
                        From our integrated regenerative estate to your supply chain, traceable,
                        verifiable, and built for commercial-scale reliability.
                    </p>

                    {/* Buttons */}
                    <div 
                        className="flex flex-col sm:flex-row gap-4"
                        style={{
                            opacity: vis ? 1 : 0,
                            transform: vis ? "translateY(0)" : "translateY(20px)",
                            transition: "all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s"
                        }}
                    >
                        <button className="px-8 py-4 bg-gc-green-500 hover:bg-gc-green-400 text-gc-green-950 font-semibold rounded-full transition-colors flex items-center justify-center gap-2 group">
                            View Catalog
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        
                        <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-medium rounded-full border border-white/10 transition-all backdrop-blur-sm">
                            Request Data Sheet
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
/* ─── Product Grid ──────────────────────────────────────────── */
function ProductGrid() {
    const [ref, vis] = useInView(0.3);

    return (
        <section className="py-24 bg-white">
            <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="eyebrow mb-4 text-[16.5px]">Our Portfolio</div>
                    <h2 className="text-4xl sm:text-5xl font-semibold font-display font-light text-gc-stone-800 mb-4">
                        Product Categories<br />
                        <em className="text-gc-green-500 text-xl italic">One Integrated System</em>
                    </h2>
                    <p className="text-black max-w-2xl mx-auto">
                        Every product is regeneratively grown, sensor-verified, solar-processed,
                        and backed by farm-to-export traceability.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {PRODUCT_CATEGORIES.map((product, idx) => (
                        <ProductCard key={product.name} product={product} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProductCard({ product, index }) {
    const [ref, vis] = useInView(0.15);
    const delay = index * 80;

    return (
        <div
            ref={ref}
            className="group bg-white border border-gc-stone-100 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-500"
            style={{
                opacity: vis ? 1 : 0,
                transform: vis ? "translateY(0)" : "translateY(30px)",
                transition: `opacity 0.7s ease ${delay}ms, transform 0.8s ease ${delay}ms`
            }}
        >
            <div className="relative h-48 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 flex gap-2">
                    {product.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[9px] font-medium px-2 py-1 bg-black/60 backdrop-blur-sm text-white rounded">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="p-5">
                <h3 className="text-xl font-display font-medium text-gc-stone-800 mb-1">
                    {product.name}
                </h3>
                <p className="text-xs text-black font-mono mb-3">{product.variety}</p>
                <p className="text-sm text-black leading-relaxed mb-4">
                    {product.description}
                </p>
                <button className="text-xs font-semibold uppercase tracking-wide text-gc-green-500 hover:text-gc-green-600 transition-colors flex items-center gap-2">
                    Enquire Now <ArrowRight size={12} />
                </button>
            </div>
        </div>
    );
}

/* ─── Why Different Section ─────────────────────────────────── */
function WhyDifferent() {
    const [ref, vis] = useInView(0.3);

    return (
        <section className="py-24 bg-gc-stone-100">
            <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="eyebrow mb-4 text-[16.5px]">Why Our Produce Is Different</div>
                    <h2 className="text-4xl sm:text-5xl font-semibold font-display font-light text-gc-stone-800 mb-4">
                        Five Commitments<br />
                        <em className="text-gc-green-500 italic">Zero Compromise</em>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                    {WHY_PILLARS.map((pillar, idx) => (
                        <PillarCard key={pillar.title} pillar={pillar} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function PillarCard({ pillar, index }) {
    const [ref, vis] = useInView(0.15);
    const delay = index * 100;

    return (
        <div
            ref={ref}
            className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-all duration-500"
            style={{
                opacity: vis ? 1 : 0,
                transform: vis ? "translateY(0)" : "translateY(30px)",
                transition: `opacity 0.7s ease ${delay}ms, transform 0.8s ease ${delay}ms`
            }}
        >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gc-green-100 text-gc-green-500 mb-4">
                {pillar.icon}
            </div>
            <h3 className="text-lg font-display font-medium text-black mb-3">
                {pillar.title}
            </h3>
            <p className="text-sm text-black leading-relaxed">
                {pillar.description}
            </p>
        </div>
    );
}

/* ─── Engagement Models ─────────────────────────────────────── */
function EngagementModels() {
    const [ref, vis] = useInView(0.3);

    return (
        <section className="py-24 bg-white">
            <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="eyebrow mb-4 text-[16.5px]">How To Work With Us</div>
                    <h2 className="text-4xl sm:text-5xl font-semibold font-display font-light text-gc-stone-800 mb-4">
                        Four Commercial Models<br />
                        <em className="text-gc-green-500 italic">One Accountable Partner</em>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {ENGAGEMENT_MODELS.map((model, idx) => (
                        <EngagementCard key={model.title} model={model} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function EngagementCard({ model, index }) {
    const [ref, vis] = useInView(0.15);
    const delay = index * 100;

    return (
        <div
            ref={ref}
            className="border border-gc-stone-100 rounded-lg p-6 hover:shadow-lg transition-all duration-500"
            style={{
                opacity: vis ? 1 : 0,
                transform: vis ? "translateY(0)" : "translateY(30px)",
                transition: `opacity 0.7s ease ${delay}ms, transform 0.8s ease ${delay}ms`
            }}
        >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gc-green-100 text-gc-green-500 mb-4">
                {model.icon}
            </div>
            <h3 className="text-lg font-display font-medium text-black mb-2">
                {model.title}
            </h3>
            <p className="text-sm text-black leading-relaxed mb-4">
                {model.description}
            </p>
            <div className="border-t border-gc-stone-100 pt-4 space-y-2">
                <p className="text-xs text-black"><span className="font-semibold">MOQ:</span> {model.moq}</p>
                <p className="text-xs text-black"><span className="font-semibold">Lead time:</span> {model.leadTime}</p>
                <p className="text-xs text-black">{model.pricing}</p>
            </div>
        </div>
    );
}

/* ─── Sister Brands Strip ───────────────────────────────────── */
function SisterBrands() {
    const [ref, vis] = useInView(0.3);

    return (
        <section className="py-16 bg-gc-green-900">
            <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <p className="font-semibold uppercase tracking-[0.22em] text-gc-green-400 mb-2">
                        Part of a bigger ecosystem
                    </p>
                    <h2 className="text-2xl font-display font-semibold font-light text-white">
                        Our sister brands and partners
                    </h2>
                </div>

                <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                    {SISTER_BRANDS.map((brand, idx) => (
                        <div
                            key={brand.name}
                            className="text-center group cursor-pointer"
                            style={{
                                opacity: vis ? 1 : 0,
                                transform: vis ? "translateY(0)" : "translateY(20px)",
                                transition: `opacity 0.6s ease ${idx * 100}ms, transform 0.7s ease ${idx * 100}ms`
                            }}
                        >
                            <p className="text-white font-display text-lg font-medium mb-1">
                                {brand.name}
                            </p>
                            <p className="text-xs text-gc-green-400">
                                {brand.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ─── Wholesale Enquiry CTA ─────────────────────────────────── */
function WholesaleEnquiry() {
    const [ref, vis] = useInView(0.3);

    return (
        <section className="py-24 bg-white">
            <div ref={ref} className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <div
                        className="inline-flex items-center gap-2 bg-gc-green-100 rounded-full px-4 py-2 mb-6"
                        style={{
                            opacity: vis ? 1 : 0,
                            transform: vis ? "translateY(0)" : "translateY(20px)",
                            transition: "opacity 0.7s ease, transform 0.7s ease"
                        }}
                    >
                        <Truck size={16} className="text-gc-green-500" />
                        <span className="text-[16.5px] font-medium text-gc-green-600 tracking-wide">Ready to partner</span>
                    </div>

                    <h2
                        className="text-4xl sm:text-5xl font-semibold  font-display font-light text-black mb-6"
                        style={{
                            opacity: vis ? 1 : 0,
                            transform: vis ? "translateY(0)" : "translateY(20px)",
                            transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s"
                        }}
                    >
                        Ready to Transform your Supply Chain?
                    </h2>

                    <p
                        className="text-lg text-black mb-8 max-w-2xl mx-auto"
                        style={{
                            opacity: vis ? 1 : 0,
                            transform: vis ? "translateY(0)" : "translateY(20px)",
                            transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s"
                        }}
                    >
                        Whether you need wholesale volumes, contract farming, or export partnerships,
                        our team is ready to discuss your specifications.
                    </p>

                    <div
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                        style={{
                            opacity: vis ? 1 : 0,
                            transform: vis ? "translateY(0)" : "translateY(20px)",
                            transition: "opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s"
                        }}
                    >
                        <button className="bg-gc-green-500 text-white px-8 py-4 rounded-full font-semibold uppercase tracking-wide text-sm hover:bg-gc-green-600 transition-all duration-300 hover:shadow-lg">
                            Submit Enquiry
                        </button>
                    </div>

                    <p className="text-xs text-black mt-8">
                        Our team responds to all wholesale enquiries within 24 hours.
                    </p>
                </div>
            </div>
        </section>
    );
}

/* ─── Main Export ───────────────────────────────────────────── */
export default function ProductionPage() {
    return (
        <>
            <Hero />
            <ProductGrid />
            <WhyDifferent />
            <EngagementModels />
            <SisterBrands />
            <WholesaleEnquiry />
        </>
    );
}