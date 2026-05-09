import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, CheckCircle, Wheat, Leaf, Apple, Wind,
  Fish, Flame, Package, Thermometer, FlaskConical,
  FileCheck, SlidersHorizontal, Layers, ShoppingCart,
  Building2, Globe, Landmark, Users, MessageCircle, ChevronRight,
} from "lucide-react";

/* ─── useInView ──────────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ─── Fade ───────────────────────────────────────────────── */
function Fade({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(30px)",
      transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

/* ─── Counter ────────────────────────────────────────────── */
function useCounter(target, duration = 1800, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      setValue(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return value;
}

function Counter({ target, suffix = "" }) {
  const [ref, visible] = useInView(0.4);
  const count = useCounter(target, 1800, visible);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── Data ───────────────────────────────────────────────── */
const WHAT_WE_PRODUCE = [
  { icon: <Wheat size={26} />,  title: "Grains & Cereals",         desc: "Maize, sorghum, soybeans, and millet grown at commercial scale with precision inputs and mechanised harvesting." },
  { icon: <Leaf size={26} />,   title: "Vegetables & Leafy Greens",desc: "Year-round production of tomatoes, peppers, spinach, ugwu, and lettuce under controlled and open-field systems." },
  { icon: <Apple size={26} />,  title: "Fruits & Tree Crops",      desc: "Plantain, citrus, pawpaw, and mango grown across our estate with traceability from orchard to offtaker." },
  { icon: <Wind size={26} />,   title: "Fibre Crops",              desc: "Cotton and kenaf grown to export specifications for textile and industrial fibre supply chains." },
  { icon: <Flame size={26} />,  title: "Feedstock & Biomass",      desc: "Energy crop production and agricultural residue processing for biogas, pellets, and industrial feedstock." },
  { icon: <Fish size={26} />,   title: "Livestock & Aquaculture",  desc: "Integrated catfish, poultry, and small ruminant systems producing protein for local and institutional markets." },
];

const PROCESSING = [
  { icon: <SlidersHorizontal size={22} />, title: "Cleaning & Sorting",          desc: "Machine-grade cleaning lines remove foreign matter and grade produce by size, weight, and quality class." },
  { icon: <Flame size={22} />,             title: "Drying & Milling",            desc: "Solar and mechanical drying to precise moisture levels, with on-site milling for grains and cereals." },
  { icon: <Thermometer size={22} />,       title: "Cold Chain Storage",          desc: "Temperature-controlled storage facilities extending shelf life and maintaining quality for perishables." },
  { icon: <Package size={22} />,           title: "Packaging & Labelling",       desc: "Retail-ready and bulk packaging with full traceability labelling compliant with NAFDAC and export standards." },
  { icon: <FlaskConical size={22} />,      title: "Quality Assurance & Testing", desc: "In-house and third-party laboratory testing for pesticide residue, microbial load, moisture, and nutritional content." },
  { icon: <FileCheck size={22} />,         title: "Export Documentation",        desc: "Phytosanitary certificates, certificates of origin, and compliance packs for UK, EU, and GCC export destinations." },
];

const QUALITY_STANDARDS = [
  "NAFDAC compliant production and packaging",
  "SON (Standards Organisation of Nigeria) certified",
  "UK food safety standards compliant",
  "EU import requirement ready",
  "Full field-to-shelf traceability on every SKU",
  "Third-party laboratory verification on request",
];

const STATS = [
  { value: 3200, suffix: " ha", label: "Hectares Under Production"  },
  { value: 12,   suffix: "k+",  label: "Tonnes Processed Annually"  },
  { value: 24,   suffix: "+",   label: "Crop SKUs Available"        },
  { value: 6,    suffix: "+",   label: "Export Destinations"        },
];

const FLOW = [
  { label: "Production",    sub: "Precision-managed growing" },
  { label: "Processing",    sub: "Cleaning, drying, milling" },
  { label: "Packaging",     sub: "Retail & bulk formats"     },
  { label: "Distribution",  sub: "Local & national delivery" },
  { label: "Export",        sub: "UK, EU & GCC markets"      },
];

const BUYERS = [
  { icon: <ShoppingCart size={24} />, title: "Retailers & Supermarkets",   desc: "Consistent volume, retail-ready packaging, and compliance documentation for modern trade buyers." },
  { icon: <Layers size={24} />,       title: "Wholesalers & Traders",      desc: "Bulk commodity supply with flexible offtake agreements and weekly volume commitments." },
  { icon: <Building2 size={24} />,    title: "Food Manufacturers",         desc: "Raw material supply for processors, grains, oils, and produce to your specification and schedule." },
  { icon: <Globe size={24} />,        title: "Export Partners",            desc: "CIF and FOB supply arrangements for buyers in the UK, EU, and Gulf markets." },
  { icon: <Landmark size={24} />,     title: "Government Offtakers",       desc: "Strategic reserve supply and school feeding programme produce for federal and state agencies." },
  { icon: <Users size={24} />,        title: "Institutional Buyers",       desc: "Regular produce supply to hospitals, universities, hotels, and large corporate catering operations." },
];

/* ─── Hero ───────────────────────────────────────────────── */
function Hero() {
  const [ref, vis] = useInView(0.1);
  return (
    <section className="relative h-[100vh] min-h-[460px] flex items-center bg-gc-green-900 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1920&q=80"
          alt="Production and processing"
          className="w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gc-green-900 via-gc-green-900/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-gc-green-900 via-transparent to-transparent" />
      </div>
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E" }} />

      <div ref={ref} className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-6"
            style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(16px)", transition: "opacity .7s ease .1s, transform .7s ease .1s" }}>
            <span className="block w-7 h-px bg-gc-green-400" />
            <span className="text-[9.5px] font-medium tracking-[.22em] uppercase text-gc-green-400">Production & Processing</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-light text-white leading-[1.05] mb-5"
            style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(24px)", transition: "opacity .9s ease .2s, transform .9s ease .2s" }}>
            From soil to shelf,<br />
            <em className="not-italic text-gc-green-400">at commercial scale.</em>
          </h1>

          <p className="text-base sm:text-lg text-white/60 font-body leading-relaxed max-w-xl"
            style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(18px)", transition: "opacity .9s ease .38s, transform .9s ease .38s" }}>
            GC grows, processes, packages, and delivers food, fibre, and feedstock 
            to buyers across Nigeria and international markets, traceable, certified, and consistent.
          </p>

        <div
  className="flex flex-col sm:flex-row flex-wrap items-center  gap-3 sm:gap-4 mt-8 w-full px-4"
  style={{
    opacity: vis ? 1 : 0,
    transform: vis ? "translateY(0)" : "translateY(14px)",
    transition: "opacity .8s ease .55s, transform .8s ease .55s"
  }}
>
  <Link
    to="/contact"
    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gc-green-400 hover:bg-gc-green-500 text-gc-green-900 hover:text-white font-semibold text-[11px] sm:text-xs uppercase tracking-widest px-6 sm:px-7 py-3.5 rounded-sm transition-all duration-300 hover:gap-3 text-center"
  >
    Source From GC <ArrowRight size={14} />
  </Link>

  <a
    href="#what-we-produce"
    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/25 hover:border-white/60 text-white/80 hover:text-white font-medium text-[11px] sm:text-xs uppercase tracking-widest px-6 sm:px-7 py-3.5 rounded-sm transition-all duration-300 text-center"
  >
    What We Produce
  </a>
</div>
        </div>
      </div>
    </section>
  );
}

/* ─── What We Produce ────────────────────────────────────── */
function WhatWeProduce() {
  return (
    <section id="what-we-produce" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Fade className="max-w-2xl mb-14">
          <p className="eyebrow mb-4">What We Produce</p>
          <h2 className="text-4xl sm:text-5xl font-display font-light text-gc-stone-800 leading-tight">
            Six commodity lines.<br />
            <em className="not-italic text-gc-green-500">One integrated estate.</em>
          </h2>
          <p className="mt-4 text-gc-stone-500 leading-relaxed">
            Every crop on our estate is grown under a precision production system monitored, documented, and delivered to spec.
          </p>
        </Fade>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHAT_WE_PRODUCE.map((item, i) => (
            <Fade key={item.title} delay={i * 70}
              className="group relative overflow-hidden rounded-2xl border border-gc-stone-100 hover:border-gc-green-200 hover:shadow-xl transition-all duration-300 p-7">
              <div className="w-12 h-12 rounded-xl bg-gc-green-200 text-gc-green-500 flex items-center justify-center mb-5 group-hover:bg-gc-green-500 group-hover:text-white transition-colors duration-300">
                {item.icon}
              </div>
              <h3 className="font-display font-medium text-gc-stone-800 text-xl mb-2">{item.title}</h3>
              <p className="text-sm text-gc-stone-500 leading-relaxed">{item.desc}</p>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Production System ──────────────────────────────────── */
function ProductionSystem() {
  return (
    <section className="py-24 bg-gc-stone-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Fade delay={100} className="relative">
            <img
              src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=900&q=80"
              alt="Precision production"
              className="rounded-2xl w-full h-[480px] object-cover shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-gc-green-900 text-white rounded-2xl p-6 shadow-xl">
              <p className="text-3xl font-display font-light mb-1">
                <Counter target={3200} suffix=" ha" />
              </p>
              <p className="text-xs text-white/55 uppercase tracking-widest">Under Production</p>
            </div>
          </Fade>

          <Fade>
            <p className="eyebrow mb-4">The Production System</p>
            <h2 className="text-4xl sm:text-5xl font-display font-light text-gc-stone-800 leading-tight mb-6">
              Precision inputs.<br />
              <em className="not-italic text-gc-green-500">Monitored yield.</em>
            </h2>
            <p className="text-gc-stone-500 leading-relaxed mb-5">
              Every hectare on our estate is managed under a structured crop programme
              soil-tested before planting, drip-irrigated to schedule, and monitored via 
              CropX sensing throughout the season.
            </p>
            <p className="text-gc-stone-500 leading-relaxed">
              This means buyers get consistent produce volumes, documented inputs, 
              and verified yield data not estimates. Our system is designed to be 
              bankable, insurable, and auditable at every stage.
            </p>
          </Fade>
        </div>
      </div>
    </section>
  );
}

/* ─── Processing ─────────────────────────────────────────── */
function Processing() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Fade className="text-center mb-14">
          <p className="eyebrow mb-4">Processing Capabilities</p>
          <h2 className="text-4xl sm:text-5xl font-display font-light text-gc-stone-800">
            Harvest is just<br />
            <em className="not-italic text-gc-green-500">the beginning.</em>
          </h2>
        </Fade>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROCESSING.map((p, i) => (
            <Fade key={p.title} delay={i * 70}
              className="group bg-gc-stone-100 hover:bg-white rounded-2xl p-7 border border-transparent hover:border-gc-stone-100 hover:shadow-lg transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-white group-hover:bg-gc-green-200 text-gc-green-500 flex items-center justify-center mb-5 transition-colors duration-300 shadow-sm">
                {p.icon}
              </div>
              <h3 className="font-display font-medium text-gc-stone-800 text-xl mb-2">{p.title}</h3>
              <p className="text-sm text-gc-stone-500 leading-relaxed">{p.desc}</p>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Quality ────────────────────────────────────────────── */
function Quality() {
  return (
    <section className="py-24 bg-gc-green-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Fade>
            <p className="eyebrow mb-4 text-gc-green-400">Quality & Traceability</p>
            <h2 className="text-4xl sm:text-5xl font-display font-light text-white leading-tight mb-8">
              Certified from field<br />
              <em className="not-italic text-gc-green-400">to shelf.</em>
            </h2>
            <ul className="space-y-4">
              {QUALITY_STANDARDS.map((q) => (
                <li key={q} className="flex items-start gap-3">
                  <CheckCircle size={17} className="text-gc-green-400 mt-0.5 shrink-0" />
                  <span className="text-sm text-white/65 leading-relaxed">{q}</span>
                </li>
              ))}
            </ul>
          </Fade>

          <Fade delay={150} className="relative">
            <img
              src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=900&q=80"
              alt="Quality control"
              className="rounded-2xl w-full h-[440px] object-cover shadow-2xl opacity-80"
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10" />
          </Fade>
        </div>
      </div>
    </section>
  );
}

/* ─── Stats ──────────────────────────────────────────────── */
function Stats() {
  return (
    <section className="py-20 bg-gc-green-500">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {STATS.map((s, i) => (
            <Fade key={s.label} delay={i * 80}>
              <p className="text-5xl sm:text-6xl font-display font-light text-white mb-2">
                <Counter target={s.value} suffix={s.suffix} />
              </p>
              <p className="text-xs uppercase tracking-widest text-white/65 font-medium">{s.label}</p>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Flow ───────────────────────────────────────────────── */
function Flow() {
  return (
    <section className="py-24 bg-gc-stone-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Fade className="text-center mb-14">
          <p className="eyebrow mb-4">Farm to Market</p>
          <h2 className="text-4xl sm:text-5xl font-display font-light text-gc-stone-800">
            One seamless<br />
            <em className="not-italic text-gc-green-500">supply chain.</em>
          </h2>
        </Fade>

        <Fade className="flex flex-col sm:flex-row items-stretch justify-center gap-0">
          {FLOW.map((step, i) => (
            <div key={step.label} className="flex flex-col sm:flex-row items-center flex-1">
              <div className="flex-1 bg-white rounded-2xl p-6 text-center border border-gc-stone-100 hover:border-gc-green-200 hover:shadow-lg transition-all duration-300 group w-full">
                <div className="w-8 h-8 rounded-full bg-gc-green-500 text-white text-xs font-semibold flex items-center justify-center mx-auto mb-3">
                  {i + 1}
                </div>
                <p className="font-display font-medium text-gc-stone-800 text-lg mb-1">{step.label}</p>
                <p className="text-xs text-gc-stone-400">{step.sub}</p>
              </div>
              {i < FLOW.length - 1 && (
                <ChevronRight size={20} className="text-gc-green-400 shrink-0 mx-2 rotate-90 sm:rotate-0 my-2 sm:my-0" />
              )}
            </div>
          ))}
        </Fade>
      </div>
    </section>
  );
}

/* ─── Who Buys ───────────────────────────────────────────── */
function WhoBuys() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Fade className="text-center mb-14">
          <p className="eyebrow mb-4">Who Buys From GC</p>
          <h2 className="text-4xl sm:text-5xl font-display font-light text-gc-stone-800">
            Built for every<br />
            <em className="not-italic text-gc-green-500">serious buyer.</em>
          </h2>
        </Fade>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BUYERS.map((b, i) => (
            <Fade key={b.title} delay={i * 70}
              className="group flex items-start gap-5 p-6 rounded-2xl border border-gc-stone-100 hover:border-gc-green-200 hover:shadow-lg transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-gc-green-200 text-gc-green-500 flex items-center justify-center shrink-0 group-hover:bg-gc-green-500 group-hover:text-white transition-colors duration-300">
                {b.icon}
              </div>
              <div>
                <h3 className="font-display font-medium text-gc-stone-800 text-lg mb-1">{b.title}</h3>
                <p className="text-xs text-gc-stone-500 leading-relaxed">{b.desc}</p>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Case Study ─────────────────────────────────────────── */
function CaseStudy() {
  return (
    <section className="py-24 bg-gc-stone-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Fade className="text-center mb-14">
          <p className="eyebrow mb-4">Case Study</p>
          <h2 className="text-4xl sm:text-5xl font-display font-light text-gc-stone-800">
            Production in <em className="not-italic text-gc-green-500">action.</em>
          </h2>
        </Fade>

        <Fade className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gc-stone-100">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="h-64 lg:h-auto relative">
              <img
                src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&q=80"
                alt="Maize production"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gc-green-900/60 to-transparent" />
              <span className="absolute bottom-5 left-5 text-[10px] font-semibold uppercase tracking-widest text-gc-green-400 bg-gc-green-900/70 backdrop-blur-sm px-3 py-1.5 rounded-full">
                Grains · Ogun State
              </span>
            </div>

            <div className="p-8 md:p-12 flex flex-col justify-center">
              <p className="eyebrow mb-3">Commercial Maize Production 800 ha</p>
              <h3 className="text-3xl font-display font-light text-gc-stone-800 mb-6 leading-snug">
                800 hectares of maize,<br />delivered to spec in one season.
              </h3>

              <div className="space-y-5 mb-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gc-stone-400 mb-1">The Challenge</p>
                  <p className="text-sm text-gc-stone-500 leading-relaxed">
                    A feed manufacturer needed 4,000 tonnes of dry maize at 13.5% moisture,
                    consistent across the full order, delivered over 6 weeks, with phytosanitary 
                    documentation for their food safety audit.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gc-stone-400 mb-1">What GC Did</p>
                  <p className="text-sm text-gc-stone-500 leading-relaxed">
                    We planted 800 ha of hybrid maize under precision irrigation, managed 
                    inputs to NAFDAC standards, mechanically harvested, solar-dried to spec, 
                    and delivered in phytosanitary-certified 50kg bags over 5 weeks.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gc-stone-400 mb-1">The Outcome</p>
                  <p className="text-sm text-gc-stone-500 leading-relaxed">
                    4,200 tonnes delivered, 5% above contracted volume. Zero rejected loads. 
                    The buyer placed a 3-year offtake agreement at the end of the season.
                  </p>
                </div>
              </div>

              <Link to="/contact"
                className="inline-flex items-center gap-2 text-gc-green-500 hover:text-gc-green-900 font-semibold text-xs uppercase tracking-widest transition-colors group">
                Discuss your supply needs <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
}

/* ─── CTA ────────────────────────────────────────────────── */
function CTA() {
  return (
    <section className="py-28 bg-gc-green-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: "radial-gradient(circle at 25% 50%, #4a8a5b 0%, transparent 55%), radial-gradient(circle at 75% 50%, #e07a5f 0%, transparent 55%)" }} />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Fade>
          <div className="inline-flex items-center gap-2 mb-6 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-2">
            <MessageCircle size={13} className="text-gc-green-400" />
            <span className="text-[10px] font-medium tracking-widest uppercase text-gc-green-400">Ready to source?</span>
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-display font-light text-white leading-tight mb-6">
            Ready to source<br />
            <em className="not-italic"
              style={{ WebkitTextStroke: "1px rgba(255,255,255,0.55)", color: "transparent" }}>
              from GC?
            </em>
          </h2>
          <p className="max-w-lg mx-auto text-white/55 text-lg leading-relaxed mb-10">
            Tell us your commodity, volume, and delivery schedule. 
            We'll tell you exactly what we can do.
          </p>
          <Link to="/contact"
            className="inline-flex items-center gap-2 bg-gc-green-400 hover:bg-gc-green-500 text-gc-green-900 hover:text-white font-semibold text-xs uppercase tracking-widest px-10 py-4 rounded-sm transition-all duration-300 hover:gap-4">
            Get in Touch <ArrowRight size={15} />
          </Link>
        </Fade>
      </div>
    </section>
  );
}

/* ─── Page ───────────────────────────────────────────────── */
export default function ProductionProcessingPage() {
  return (
    <>
      <Hero />
      <WhatWeProduce />
      <ProductionSystem />
      <Processing />
      <Quality />
      <Stats />
      <Flow />
      <WhoBuys />
      <CaseStudy />
      <CTA />
    </>
  );
}