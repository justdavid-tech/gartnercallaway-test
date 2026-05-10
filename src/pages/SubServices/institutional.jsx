import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, CheckCircle, GraduationCap, Building2,
  HeartPulse, Landmark, Shield, Church, Users, TreePine,
  ClipboardList, Sprout, FlaskConical, BookOpen,
  BarChart3, Tractor, MessageCircle,
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

/* ─── Animated Counter ───────────────────────────────────── */
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
const WHO_WE_SERVE = [
  { icon: <Landmark size={26} />,      title: "Federal & State Government",   desc: "Agricultural programmes, land-use agencies, and public food security initiatives." },
  { icon: <GraduationCap size={26} />, title: "Universities & Polytechnics",  desc: "Teaching farms, student feeding programmes, and campus agriculture estates." },
  { icon: <HeartPulse size={26} />,    title: "Hospitals & Health Estates",   desc: "Produce supply for patient feeding, therapeutic gardens, and wellness farms." },
  { icon: <Users size={26} />,         title: "NGOs & Development Agencies",  desc: "Field implementation for donor-funded food security and livelihood projects." },
  { icon: <Shield size={26} />,        title: "Correctional Facilities",      desc: "Rehabilitation farming programmes, food self-sufficiency, and skills training." },
  { icon: <Church size={26} />,        title: "Religious Estates",            desc: "Farm setup and management for church and mosque community feeding initiatives." },
  { icon: <TreePine size={26} />,      title: "Military Installations",       desc: "Food production systems for barracks, canteens, and garrison self-sufficiency." },
  { icon: <Building2 size={26} />,     title: "Corporate Campuses",           desc: "Staff canteen supply chains, green space farming, and CSR agriculture projects." },
];

const SERVICES = [
  { icon: <Tractor size={24} />,       title: "Farm Setup & Management",       desc: "End-to-end establishment and ongoing management of institutional farm land, from clearing and soil prep to planting and harvest." },
  { icon: <Sprout size={24} />,        title: "Feeding Programme Production",  desc: "Structured produce supply planning aligned to your institution's daily feeding requirements, with consistent volume and quality." },
  { icon: <ClipboardList size={24} />, title: "Agronomy Advisory",            desc: "On-site agronomists providing crop scheduling, pest management, soil health guidance, and seasonal planning." },
  { icon: <BookOpen size={24} />,      title: "Staff Training & Capacity",     desc: "Certified training programmes for institution staff, covering practical farming, food safety, and post-harvest handling." },
  { icon: <FlaskConical size={24} />,  title: "Soil & Water Testing",         desc: "Laboratory-grade soil and irrigation water analysis with actionable recommendations for your land and crop mix." },
  { icon: <BarChart3 size={24} />,     title: "Yield Reporting & Compliance", desc: "Monthly performance reports, traceability documentation, and compliance records for audits, donors, and government bodies." },
];

const DIFFERENTIATORS = [
  "Government procurement-ready documentation",
  "Bankable and insurer-ready field reports",
  "Traceable produce from soil to institution",
  "Staff capacity building included in every engagement",
  "Flexible engagement, retainer or project-based",
  "Compliant with UK, EU, and Nigerian export standards",
];

const STATS = [
  { value: 34,   suffix: "+",   label: "Institutions Served"        },
  { value: 1800, suffix: " ha", label: "Hectares Under Management"  },
  { value: 50,   suffix: "k+",  label: "People Fed Monthly"         },
  { value: 1000, suffix: "+",   label: "Staff Trained"              },
];

const PROCESS = [
  { step: "01", title: "Needs Assessment",              desc: "We visit your institution, review your land, feeding requirements, budget, and compliance obligations to build a complete picture of what's needed." },
  { step: "02", title: "Programme Design",              desc: "Our agronomists and engineers produce a tailored field services plan, crop calendar, infrastructure requirements, staffing model, and reporting framework." },
  { step: "03", title: "Field Deployment & Reporting",  desc: "Our team deploys on-site, executes the programme, and delivers monthly yield and compliance reports throughout the engagement." },
];

/* ─── Hero ───────────────────────────────────────────────── */
function Hero() {
  const [ref, vis] = useInView(0.1);
  return (
    <section className="relative h-[100vh] min-h-[460px] flex items-center bg-gc-green-900 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1920&q=80"
          alt="Institutional field services"
          className="w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gc-green-900 via-gc-green-900/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-gc-green-900 via-transparent to-transparent" />
      </div>

      {/* Grain */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"}} />

      {/* Content */}
      <div ref={ref} className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-6"
            style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(16px)", transition: "opacity .7s ease .1s, transform .7s ease .1s" }}>
            <span className="block w-7 h-px bg-gc-green-400" />
            <span className="text-[9.5px] font-medium tracking-[.22em] uppercase text-gc-green-400">
              Institutional Field Services
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-light font-montserrat text-white leading-[1.05] mb-5"
            style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(24px)", transition: "opacity .9s ease .2s, transform .9s ease .2s" }}>
            Field services built<br />
            <em className="not-italic text-gc-green-400">for institutions.</em>
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-white/60 font-body leading-relaxed max-w-xl"
            style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(18px)", transition: "opacity .9s ease .38s, transform .9s ease .38s" }}>
            From government agencies to university campuses, GC deploys precision agriculture 
            programmes directly into your institution's land and operations.
          </p>

          {/* CTAs */}
     <div
  className="flex flex-col sm:flex-row flex-wrap items-center gap-3 sm:gap-4 mt-8 w-full"
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
    Start an Engagement <ArrowRight size={14} />
  </Link>

  <a
    href="#who-we-serve"
    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/25 hover:border-white/60 text-white/80 hover:text-white font-medium text-[11px] sm:text-xs uppercase tracking-widest px-6 sm:px-7 py-3.5 rounded-sm transition-all duration-300 text-center"
  >
    Who We Serve
  </a>
</div>
        </div>
      </div>
    </section>
  );
}

/* ─── Who We Serve ───────────────────────────────────────── */
function WhoWeServe() {
  return (
    <section id="who-we-serve" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Fade className="max-w-2xl mb-14">
          <p className="eyebrow mb-4">Who We Serve</p>
          <h2 className="text-4xl sm:text-5xl font-display font-light text-gc-stone-800 leading-tight">
            Agriculture delivered<br />
            <em className="not-italic text-gc-green-500">where it matters most.</em>
          </h2>
          <p className="mt-4 text-gc-stone-500 leading-relaxed">
            GC works directly with institutions that need reliable, professionally managed 
            agricultural programmes, not just consultants, but field teams that show up and deliver.
          </p>
        </Fade>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WHO_WE_SERVE.map((item, i) => (
            <Fade key={item.title} delay={i * 60}
              className="group p-6 rounded-2xl border border-gc-stone-100 hover:border-gc-green-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gc-green-200 text-gc-green-500 flex items-center justify-center mb-4 group-hover:bg-gc-green-500 group-hover:text-white transition-colors duration-300">
                {item.icon}
              </div>
              <h3 className="font-display font-medium text-gc-stone-800 text-lg mb-2 leading-snug">{item.title}</h3>
              <p className="text-xs text-gc-stone-500 leading-relaxed">{item.desc}</p>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Services ───────────────────────────────────────────── */
function Services() {
  return (
    <section className="py-24 bg-gc-stone-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Fade className="text-center mb-14">
          <p className="eyebrow mb-4">What We Deliver</p>
          <h2 className="text-4xl sm:text-5xl font-display font-light text-gc-stone-800">
            Six services.<br />
            <em className="not-italic text-gc-green-500">One integrated programme.</em>
          </h2>
        </Fade>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <Fade key={s.title} delay={i * 70}
              className="bg-white rounded-2xl p-7 border border-gc-stone-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-gc-green-200 text-gc-green-500 flex items-center justify-center mb-5 group-hover:bg-gc-green-500 group-hover:text-white transition-colors duration-300">
                {s.icon}
              </div>
              <h3 className="font-display font-medium text-gc-stone-800 text-xl mb-3">{s.title}</h3>
              <p className="text-sm text-gc-stone-500 leading-relaxed">{s.desc}</p>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Why GC ─────────────────────────────────────────────── */
function WhyGC() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Fade>
            <p className="eyebrow mb-4">Why Institutions Choose GC</p>
            <h2 className="text-4xl sm:text-5xl font-display font-light text-gc-stone-800 leading-tight mb-8">
              Precision delivery.<br />
              <em className="not-italic text-gc-green-500">Documented outcomes.</em>
            </h2>
            <ul className="space-y-4">
              {DIFFERENTIATORS.map((d) => (
                <li key={d} className="flex items-start gap-3">
                  <CheckCircle size={17} className="text-gc-green-500 mt-0.5 shrink-0" />
                  <span className="text-sm text-gc-stone-600 leading-relaxed">{d}</span>
                </li>
              ))}
            </ul>
          </Fade>

          <Fade delay={150} className="relative">
            <img
              src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=900&q=80"
              alt="Field team at work"
              className="rounded-2xl w-full h-[460px] object-cover shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-gc-green-900 text-white rounded-2xl p-6 shadow-xl">
              <p className="text-3xl font-display font-light mb-1">
                <Counter target={34} suffix="+" />
              </p>
              <p className="text-xs text-white/55 uppercase tracking-widest">Institutions Served</p>
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
}

/* ─── Process ────────────────────────────────────────────── */
function Process() {
  return (
    <section className="py-24 bg-gc-green-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Fade className="text-center mb-16">
          <p className="eyebrow mb-4 text-gc-green-400">The Engagement Model</p>
          <h2 className="text-4xl sm:text-5xl font-display font-light text-white">
            Three steps to a<br />
            <em className="not-italic text-gc-green-400">running programme.</em>
          </h2>
        </Fade>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connector line — desktop only */}
          <div className="hidden md:block absolute top-[52px] left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-white/10" />

          {PROCESS.map((p, i) => (
            <Fade key={p.step} delay={i * 120}
              className="relative bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <div className="w-10 h-10 rounded-full bg-gc-green-500 text-white flex items-center justify-center text-xs font-semibold tracking-widest mb-5 relative z-10">
                {p.step}
              </div>
              <h3 className="font-display font-light text-white text-2xl mb-3">{p.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{p.desc}</p>
            </Fade>
          ))}
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

/* ─── Case Study ─────────────────────────────────────────── */
function CaseStudy() {
  return (
    <section className="py-24 bg-gc-stone-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Fade className="text-center mb-14">
          <p className="eyebrow mb-4">Case Study</p>
          <h2 className="text-4xl sm:text-5xl font-display font-light text-gc-stone-800">
            In the <em className="not-italic text-gc-green-500">field.</em>
          </h2>
        </Fade>

        <Fade className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gc-stone-100">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="h-64 lg:h-auto relative">
              <img
                src="https://images.unsplash.com/photo-1560493676-04071c5f467b?w=900&q=80"
                alt="University teaching farm"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gc-green-900/60 to-transparent" />
              <span className="absolute bottom-5 left-5 text-[10px] font-semibold uppercase tracking-widest text-gc-green-400 bg-gc-green-900/70 backdrop-blur-sm px-3 py-1.5 rounded-full">
                University Teaching Farm
              </span>
            </div>

            <div className="p-8 md:p-12 flex flex-col justify-center">
              <p className="eyebrow mb-3">Federal University, North-Central Nigeria</p>
              <h3 className="text-3xl font-display font-light text-gc-stone-800 mb-6 leading-snug">
                From abandoned land to<br />a self-funding teaching farm.
              </h3>

              <div className="space-y-5 mb-8">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gc-stone-400 mb-1">The Challenge</p>
                  <p className="text-sm text-gc-stone-500 leading-relaxed">
                    82 hectares of university land sitting idle for 6 years. No staff with agricultural expertise. 
                    A directive from the NUC to activate the farm for student training within 18 months.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gc-stone-400 mb-1">What GC Did</p>
                  <p className="text-sm text-gc-stone-500 leading-relaxed">
                    GC conducted a full soil assessment, designed a 3-crop rotation system, installed drip 
                    irrigation across 40 ha, trained 12 university staff, and deployed a resident agronomist 
                    for the first 12 months.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gc-stone-400 mb-1">The Outcome</p>
                  <p className="text-sm text-gc-stone-500 leading-relaxed">
                    Farm operational in 7 months. First harvest generated ₦18M in produce revenue. 
                    Now feeds 4,200 students daily and hosts 300+ agric students per semester.
                  </p>
                </div>
              </div>

              <Link to="/contact"
                className="inline-flex items-center gap-2 text-gc-green-500 hover:text-gc-green-900 font-semibold text-xs uppercase tracking-widest transition-colors group">
                Start a similar programme <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
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
            <span className="text-[10px] font-medium tracking-widest uppercase text-gc-green-400">Ready to begin?</span>
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-display font-light text-white leading-tight mb-6">
            Bring GC to<br />
            <em className="not-italic"
              style={{ WebkitTextStroke: "1px rgba(255,255,255,0.55)", color: "transparent" }}>
              your institution.
            </em>
          </h2>
          <p className="max-w-lg mx-auto text-white/55 text-lg leading-relaxed mb-10">
            Tell us about your land, your institution type, and what you're trying to achieve. 
            We'll design a programme around it.
          </p>
          <Link to="/contact"
            className="inline-flex items-center gap-2 bg-gc-green-400 hover:bg-gc-green-500 text-gc-green-900 hover:text-white font-semibold text-xs uppercase tracking-widest px-10 py-4 rounded-sm transition-all duration-300 hover:gap-4">
            Start an Engagement <ArrowRight size={15} />
          </Link>
        </Fade>
      </div>
    </section>
  );
}

/* ─── Page ───────────────────────────────────────────────── */
export default function InstitutionalPage() {
  return (
    <>
      <Hero />
      <WhoWeServe />
      <Services />
      <WhyGC />
      <Process />
      <Stats />
      <CaseStudy />
      <CTA />
    </>
  );
}