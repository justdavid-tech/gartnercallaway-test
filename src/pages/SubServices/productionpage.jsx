import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, CheckCircle, Droplets, Leaf, BarChart3,
  Building2, Cpu, Tractor, ChevronDown, Play, Pause,
} from "lucide-react";

/* useInView */
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

/* Fade */
function Fade({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

/* Animated Counter */
function Counter({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useInView(0.4);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [visible, target, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* Data */
const SERVICES = [
  { icon: <Droplets size={28} />, title: "Irrigation Engineering", desc: "Precision drip, sprinkler, and flood systems designed for your soil profile, crop type, and water source, engineered for zero waste." },
  { icon: <Leaf size={28} />, title: "Soil & Land Preparation", desc: "Full soil profiling, amendment planning, land levelling, and contour mapping to create the optimal growing environment before planting." },
  { icon: <Building2 size={28} />, title: "Greenhouse Structures", desc: "Commercial-grade greenhouse and shade net installations built for Nigeria's climate, optimised for year-round yield and pest control." },
  { icon: <Cpu size={28} />, title: "Smart Sensing & Monitoring", desc: "IoT-based sensor networks tracking soil moisture, temperature, humidity, and crop health in real time, accessible from anywhere." },
  { icon: <Tractor size={28} />, title: "Livestock Infrastructure", desc: "Pen design, feed systems, waste management, and veterinary facilities integrated into your farm's overall production plan." },
  { icon: <BarChart3 size={28} />, title: "Processing & Storage", desc: "Post-harvest handling facilities, cold rooms, drying units, and packaging lines built to export and food-safety standards." },
];

const PROCESS = [
  { step: "01", title: "Site Assessment", desc: "We visit your land, conduct soil tests, water source analysis, and topographic surveys to understand exactly what you're working with." },
  { step: "02", title: "System Design", desc: "Our engineers produce detailed farm layout plans, irrigation schematics, and structural drawings tailored to your crop and budget." },
  { step: "03", title: "Engineering & Build", desc: "Our on-ground teams execute the build to spec, civil works, installation, and integration with weekly progress reporting." },
  { step: "04", title: "Commissioning", desc: "We test every system end-to-end, train your farm team, and hand over full documentation before we consider the project complete." },
  { step: "05", title: "Ongoing Support", desc: "Post-handover maintenance contracts, remote monitoring, and seasonal agronomy advisory to keep your farm performing at its peak." },
];

const DIFFERENTIATORS = [
  "Designs that meet bankable, insurable standards",
  "Export-grade infrastructure from day one",
  "In-house engineering, no third-party subcontracting",
  "Precision sensing integrated into every build",
  "Full lifecycle support from design through harvest",
  "Proven across multiple crop types and geographies",
];

const STATS = [
  { value: 20, suffix: "+", label: "Farm Systems Built" },
  { value: 4, suffix: "+", label: "States Covered" },
  { value: 250, suffix: "ha", label: "Hectares Designed" },
  { value: 98, suffix: "%", label: "Client Retention" },
];

const PROJECTS = [
  { img: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80", title: "Ogun Drip Irrigation Complex", tag: "Irrigation · 240ha" },
  { img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80", title: "Kaduna Greenhouse Array", tag: "Greenhouse · Tomato" },
  { img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80", title: "Delta Aquaculture Integration", tag: "Livestock · Fish" },
  { img: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80", title: "Kebbi Smart Rice Farm", tag: "Sensing · 500ha" },
  { img: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80", title: "Lagos Peri-Urban Vertical", tag: "Greenhouse · Leafy Greens" },
  { img: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&q=80", title: "Plateau Potato Cold Chain", tag: "Processing · Storage" },
];

/* Hero */
// function Hero() {
//   const videoRef = useRef(null);
//   const [playing, setPlaying] = useState(true);

//   function toggleVideo() {
//     const v = videoRef.current;
//     if (!v) return;
//     playing ? v.pause() : v.play();
//     setPlaying(!playing);
//   }

//   return (
//     <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
//       {/* Video background — swap src when you have your own mp4 */}
//       <video
//         ref={videoRef}
//         autoPlay muted loop playsInline
//         className="absolute inset-0 w-full h-full object-cover scale-105"
//         // src="https://www.pexels.com/download/video/2169880/"
//         poster="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&q=80"
//       />

//       {/* Overlays */}
//       <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-gc-green-900/80" />
//       <div className="absolute inset-0 bg-gradient-to-r from-gc-green-900/50 via-transparent to-transparent" />

//       {/* Grain texture overlay for premium feel */}
//       <div className="absolute inset-0 opacity-[0.03]"
//         style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />

//       {/* Content */}
//       <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">

//         {/* Eyebrow */}
//         <div className="overflow-hidden mb-6">
//           <p className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-gc-green-400"
//             style={{ animation: "fadeDown 0.9s ease forwards" }}>
//             <span className="w-1.5 h-1.5 rounded-full bg-gc-green-400 animate-pulse" />
//             Farm Design & Build
//           </p>
//         </div>

//         {/* Headline */}
//         <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-light text-white leading-[1.05] mb-6 tracking-tight"
//           style={{ animation: "fadeUp 1s ease 0.15s both" }}>
//           We build farms<br />
//           <em className="not-italic font-light"
//             style={{ WebkitTextStroke: "1px rgba(255,255,255,0.9)", color: "transparent" }}>
//             that work.
//           </em>
//         </h1>

//         {/* Subtext */}
//         <p className="max-w-2xl mx-auto text-lg sm:text-xl text-white/70 font-body leading-relaxed mb-10"
//           style={{ animation: "fadeUp 1s ease 0.3s both" }}>
//           End-to-end integrated farm systems designed by engineers, 
//           built to export standards, and monitored by precision sensors.
//         </p>

//         {/* CTAs */}
//         <div className="flex flex-col sm:flex-row items-center justify-center gap-4"
//           style={{ animation: "fadeUp 1s ease 0.45s both" }}>
//           <Link to="/contact"
//             className="inline-flex items-center gap-2 bg-gc-green-500 hover:bg-gc-green-400 text-white font-semibold text-sm uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 hover:gap-3">
//             Start Your Project <ArrowRight size={16} />
//           </Link>
//           <a href="#process"
//             className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/25 text-white font-semibold text-sm uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300">
//             See How It Works
//           </a>
//         </div>
//       </div>

//       {/* Video toggle */}
//       <button onClick={toggleVideo}
//         className="absolute bottom-8 right-8 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all">
//         {playing ? <Pause size={14} /> : <Play size={14} />}
//       </button>

//       {/* Scroll cue */}
//       <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-white/40"
//         style={{ animation: "bounce 2s infinite" }}>
//         <span className="text-[10px] uppercase tracking-widest">Scroll</span>
//         <ChevronDown size={16} />
//       </div>

//       <style>{`
//         @keyframes fadeUp   { from { opacity:0; transform:translateY(30px) } to { opacity:1; transform:translateY(0) } }
//         @keyframes fadeDown { from { opacity:0; transform:translateY(-20px) } to { opacity:1; transform:translateY(0) } }
//         @keyframes bounce   { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(8px)} }
//       `}</style>
//     </section>
//   );
// }

/* ─── Hero ───────────────────────────────────────────────── */
function Hero() {
  const [ref, vis] = useInView(0.1);
  return (
    <section className="relative h-[100vh] min-h-[460px] flex items-center bg-gc-green-900 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&q=80"
          alt="Farm design and construction"
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
            <span className="text-[9.5px] font-medium tracking-[.22em] uppercase text-gc-green-400">Farm Design & Build</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold font-display font-light text-white leading-[1.05] mb-5"
            style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(24px)", transition: "opacity .9s ease .2s, transform .9s ease .2s" }}>
            Engineering Farms<br />
            <em className="italic text-gc-green-400 font-semibold">That Perform</em>
          </h1>

          <p className="text-base sm:text-lg text-white font-body leading-relaxed max-w-xl"
            style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(18px)", transition: "opacity .9s ease .38s, transform .9s ease .38s" }}>
            GC designs, engineers, and builds complete farm systems from irrigation and 
            greenhouses to processing and storage delivered to export-ready standards.
          </p>

        <div
  className="flex flex-col sm:flex-row flex-wrap items-center gap-3 sm:gap-4 mt-8 w-full px-4"
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
    Start Your Project <ArrowRight size={14} />
  </Link>

  <a
    href="#what-we-build"
    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/25 hover:border-white/60 text-white/80 hover:text-white font-medium text-[11px] sm:text-xs uppercase tracking-widest px-6 sm:px-7 py-3.5 rounded-sm transition-all duration-300 text-center"
  >
    What We Build
  </a>
</div>
        </div>
      </div>
    </section>
  );
}
/* Overview */
function Overview() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Fade>
            <p className="eyebrow mb-4 font-semibold text-[16.5px]">What We Do</p>
            <h2 className="text-4xl sm:text-5xl font-semibold font-display font-light text-gc-stone-800 leading-tight mb-6">
              Integrated Farm Systems<br />
              <em className="italic text-gc-green-500 font-semibold">Engineered End-to-End</em>
            </h2>
            <p className="text-black leading-relaxed mb-4">
              Gartner Callaway doesn't just consult, we design, procure, build, and commission complete farm systems from the ground up. Every project is delivered by our in-house engineering team to bankable, insurable, and export-ready standards.
            </p>
            <p className="text-black leading-relaxed">
              Whether you're establishing a greenfield farm, retrofitting an existing operation, or scaling an institutional agriculture programme, we bring the precision, engineering depth, and agricultural science to make it viable at commercial scale.
            </p>
          </Fade>

          <Fade delay={150} className="relative">
            <img
              src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=900&q=80"
              alt="Farm irrigation system"
              className="rounded-2xl w-full h-[440px] object-cover shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-gc-green-900 text-white rounded-2xl p-6 shadow-xl max-w-[220px]">
              <p className="text-3xl font-display font-light mb-1">
                <Counter target={20} suffix="+" />
              </p>
              <p className="text-xs text-white uppercase tracking-widest">Farm Systems Delivered</p>
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
}

/* Services Grid */
function Services() {
  return (
    <section className="py-24 bg-gc-stone-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Fade className="text-center mb-16">
          <p className="eyebrow mb-4 font-semibold text-[16.5px]">What We Design & Build</p>
          <h2 className="text-4xl sm:text-5xl font-display font-semibold text-gc-stone-800">
            Six Systems<br />
            <em className="italic text-gc-green-500 font-semibold">One Integrated Farm</em>
          </h2>
        </Fade>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <Fade key={s.title} delay={i * 80}
              className="bg-white rounded-2xl p-7 border border-gc-stone-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-xl bg-gc-green-200 text-gc-green-500 flex items-center justify-center mb-5 group-hover:bg-gc-green-500 group-hover:text-white transition-colors duration-300">
                {s.icon}
              </div>
              <h3 className="font-display font-semibold text-gc-stone-800 text-xl mb-3">{s.title}</h3>
              <p className="text-sm text-black leading-relaxed">{s.desc}</p>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Process */
function Process() {
  return (
    <section id="process" className="py-24 bg-gc-green-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Fade className="text-center mb-16">
          <p className="eyebrow mb-4 font-semibold text-[16.5px] text-gc-green-400">Our Process</p>
          <h2 className="text-4xl sm:text-5xl font-semibold font-display font-light text-white">
            From Bare Land<br />
            <em className="italic font-semibold text-gc-green-400">Operating Farm</em>
          </h2>
        </Fade>

        <div className="relative">
          {/* Vertical line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />

          <div className="space-y-8 lg:space-y-0">
            {PROCESS.map((p, i) => (
              <Fade key={p.step} delay={i * 100}
                className={`lg:grid lg:grid-cols-2 lg:gap-16 items-center ${i % 2 === 0 ? "" : "lg:direction-rtl"}`}>
                <div className={`mb-6 lg:mb-0 ${i % 2 !== 0 ? "lg:order-2 lg:text-right" : ""}`}>
                  <span className="text-7xl font-display font-light text-white/70 leading-none">{p.step}</span>
                  <h3 className="text-2xl font-display font-light text-white mt-2 mb-3">{p.title}</h3>
                  <p className="text-gc-stone-500 text-white leading-relaxed text-sm">{p.desc}</p>
                </div>
                <div className={`hidden lg:flex items-center ${i % 2 !== 0 ? "lg:order-1 justify-end" : "justify-start"}`}>
                  <div className="w-4 h-4 rounded-full bg-gc-green-500 border-4 border-gc-green-900 ring-1 ring-gc-green-500" />
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* Stats */
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
              <p className="text-xs uppercase tracking-widest text-white font-medium">{s.label}</p>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Why GC */
function WhyGC() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Fade delay={100} className="relative order-2 lg:order-1">
            <img
              src="/assets/prodtpage.jpg"
              alt="Precision agriculture"
              className="rounded-2xl w-full h-[480px] object-cover shadow-2xl"
            />
            <div className="absolute -top-6 -right-6 bg-white border border-gc-stone-100 rounded-2xl p-5 shadow-xl">
              <p className="text-3xl font-display font-light text-gc-green-500 mb-1">
                <Counter target={98} suffix="%" />
              </p>
              <p className="text-xs text-black uppercase tracking-widest">Client Retention</p>
            </div>
          </Fade>

          <Fade className="order-1 lg:order-2">
            <p className="eyebrow mb-4 font-bold text-[16.5px]">Why Gartner Callaway</p>
            <h2 className="text-4xl sm:text-5xl font-display font-semibold font-light text-gc-stone-800 leading-tight mb-8">
              Built Different<br />
              <em className="italic text-gc-green-500">By Design</em>
            </h2>
            <ul className="space-y-4">
              {DIFFERENTIATORS.map((d) => (
                <li key={d} className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-gc-green-500 mt-0.5 shrink-0" />
                  <span className="text-black text-sm leading-relaxed">{d}</span>
                </li>
              ))}
            </ul>
          </Fade>
        </div>
      </div>
    </section>
  );
}


/* CTA */
function CTA() {
  return (
    <section className="py-28 bg-gc-green-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #4a8a5b 0%, transparent 60%), radial-gradient(circle at 80% 50%, #e07a5f 0%, transparent 60%)" }} />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Fade>
          <p className="eyebrow mb-6 text-gc-green-400 text-[16.5px]">Ready to Build?</p>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-display font-semibold font-light text-white leading-tight mb-6">
            Your Farm Starts<br />
            <em className="italic font-display font-semibold text-gc-green-500">
              With a Conversation
            </em>
          </h2>
          <p className="max-w-xl mx-auto text-white text-lg leading-relaxed mb-10">
            Tell us about your land, your crop, and your vision. Our engineering team will take it from there.
          </p>
          <Link to="/contact"
            className="inline-flex items-center gap-2 bg-gc-green-500 hover:bg-gc-green-400 text-white font-semibold text-sm uppercase tracking-widest px-10 py-4 rounded-full transition-all duration-300 hover:gap-4">
            Start Your Project <ArrowRight size={16} />
          </Link>
        </Fade>
      </div>
    </section>
  );
}

/* Page */
export default function ProductionPage() {
  return (
    <>
      <Hero />
      <Overview />
      <Services />
      <Process />
      <Stats />
      <WhyGC />
      <CTA />
    </>
  );
}