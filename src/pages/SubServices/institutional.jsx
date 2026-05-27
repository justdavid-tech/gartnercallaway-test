import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, CheckCircle, GraduationCap, Building2,
  Landmark, Shield, Users, BookOpen,
  Sprout, Tractor, MessageCircle, Factory, Leaf, Cpu,
  MapPin, BadgeCheck,
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
  {
    icon: <Landmark size={26} />,
    title: "Commercial Banks & MFIs",
    desc: "Pre-loan soil verification, GPS farm mapping, in-season portfolio monitoring, and harvest yield verification, eliminating NPL exposure from unverified agricultural lending.",
  },
  {
    icon: <Shield size={26} />,
    title: "Insurance Companies",
    desc: "Independent pre-policy risk assessment, bi-monthly field monitoring, and objective claims investigation for NAIC, IGI, Sanlam, AIICO, and Leadway portfolios.",
  },
  {
    icon: <Users size={26} />,
    title: "Donor Organisations",
    desc: "End-to-end programme implementation for IFAD, GIZ, USAID, Gates Foundation, and AfDB, baseline assessment, full crop management, M&E reporting, and demonstration farm hosting.",
  },
  {
    icon: <Landmark size={26} />,
    title: "Government ADPs & NIRSAL",
    desc: "Dry-season programme delivery across entire farm clusters, pre-season assessment, full irrigation, fertigation, pest management, and compliance documentation.",
  },
  {
    icon: <Factory size={26} />,
    title: "Industrial Processors & FMCG",
    desc: "Managed backward integration for boards and CFOs of listed agro-processors and commodity companies, feasibility through multi-year operations management.",
  },
  {
    icon: <Building2 size={26} />,
    title: "Food & Hospitality Groups",
    desc: "On-site vertical hydroponic tower systems producing year-round specialty crops. 6–8× field yield per square foot. 90% water reduction. Eliminates FX-dependent specialty imports.",
  },
  {
    icon: <GraduationCap size={26} />,
    title: "Anchor Agribusinesses",
    desc: "Field services, outgrower programme management, and precision agriculture delivery integrated directly into existing supply chains and lending programmes.",
  },
  {
    icon: <BookOpen size={26} />,
    title: "Training & Certification Bodies",
    desc: "Enterprise-licensed education platform and structured day training at the Ogun State estate for agricultural loan officers, extension workers, and donor programme staff.",
  },
];

const SERVICES = [
  {
    icon: <Tractor size={24} />,
    title: "Institutional Field Services",
    desc: "Ten standalone field services: soil assessment and reporting, irrigation-as-a-service (mobile and solar), fertigation, spraying, mulching, weeding, planting, and pump rental, packaged into four institutional programmes.",
    tag: "Division 01",
  },
  {
    icon: <Leaf size={24} />,
    title: "Managed Backward Integration, Pivot",
    desc: "Full programme management for 50–200+ hectare solar-powered, pivot-irrigated raw material farms. Six-stage engagement from feasibility and engineering design through multi-year operations management.",
    tag: "Division 02",
  },
  {
    icon: <Sprout size={24} />,
    title: "Managed Backward Integration, Vertical",
    desc: "Design, procurement, installation, and ongoing management of on-site vertical hydroponic tower systems. 6–8× field yield per square foot. 90% water reduction. 90–120 day build cycle.",
    tag: "Division 03",
  },
  {
    icon: <Cpu size={24} />,
    title: "Knowledge, Training & Technology",
    desc: "Online education platform, structured day training on the working Ogun estate, and proprietary farm management software, built for Nigeria, licensed to institutions managing agricultural portfolios.",
    tag: "Division 04",
  },
  {
    icon: <MapPin size={24} />,
    title: "Institutional Farm Tours & Site Visits",
    desc: "Structured visits to the 30-acre integrated reference estate in Ogun State. A live demonstration of every capability GC sells, for bank credit teams, insurance underwriters, donors, and DFI investment officers.",
    tag: "Division 05",
  },
  {
    icon: <BadgeCheck size={24} />,
    title: "Precision Soil Sensing",
    desc: "Multi-depth volumetric soil moisture, temperature, electrical conductivity, and salinity: timestamped, GPS-referenced, cloud-archived. Court-admissible. Audit-defensible. No field report we deliver is based on observation alone.",
    tag: "Technology",
  },
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
  { value: 10,  suffix: "+",   label: "Years Operational"  },
  { value: 30,  suffix: "ac",  label: "Reference Estate"   },
  { value: 5,   suffix: "",    label: "Service Divisions"  },
  { value: 15,  suffix: "+",   label: "Service Lines"      },
];

const PROCESS = [
  { step: "01", title: "Needs Assessment",              desc: "We visit your institution, review your land, feeding requirements, budget, and compliance obligations to build a complete picture of what's needed." },
  { step: "02", title: "Programme Design",              desc: "Our agronomists and engineers produce a tailored field services plan, crop calendar, infrastructure requirements, staffing model, and reporting framework." },
  { step: "03", title: "Field Deployment & Reporting",  desc: "Our team deploys on-site, executes the programme, and delivers monthly yield and compliance reports throughout the engagement." },
];

const TIMELINE = [
  {
    year: "2017",
    label: "Pioneer",
    desc: "Built and operated five hydroponic and soilless farms across Lagos. Africa's first automated hydroponic urban vertical farms. Nigeria's first restaurant-integrated indoor grow system.",
  },
  {
    year: "2018",
    label: "Recognised",
    desc: "Entrepreneur Africa Prize for Innovation. Co-developed Nigeria's first upscale multipurpose garden centres (Green Zones). Established large-scale ornamental flower cultivation from the ground up.",
  },
  {
    year: "2020–23",
    label: "Scale",
    desc: "Founder and CEO designed and developed a 200-hectare precision farm in Ogun State: centralised pivot irrigation, 500kW solar facility, mechanised tractors, oil press infrastructure, solar drying. Documented 30% yield improvement through production-engineering research.",
  },
  {
    year: "2024",
    label: "Integration",
    desc: "Rebuilt estate as a fully integrated agroforestry model. Precision soil sensing layered across the entire operation. Regenerative system made data-defensible end-to-end: bank-ready, insurer-ready, donor-ready.",
  },
  {
    year: "2026",
    label: "Institutional",
    desc: "Opened estate, equipment fleet, sensor infrastructure, education platform, and farm management software to institutional clients across southwest Nigeria. Launched five service divisions serving banks, insurers, donors, government ADPs, and industrial processors.",
  },
];

const PACKAGES = [
  {
    id: "A",
    title: "Agricultural Lending Support",
    soldTo: "Commercial banks, MFIs, Bank of Agriculture",
    covers: "Pre-loan soil verification · GPS mapping · in-season portfolio monitoring · farmer GAP training · harvest yield verification",
    value: "₦100m – ₦200m",
    valueSub: "per bank / year",
  },
  {
    id: "B",
    title: "Insurance Field Services",
    soldTo: "NAIC, IGI, Sanlam, AIICO, Leadway",
    covers: "Pre-policy risk assessment · bi-monthly monitoring · independent claims investigation · regional exclusivity retainer",
    value: "₦50m – ₦100m",
    valueSub: "per insurer / year",
  },
  {
    id: "C",
    title: "Donor Programme Implementation",
    soldTo: "IFAD, GIZ, USAID, Gates Foundation, AfDB",
    covers: "Baseline soil assessment · irrigation · full crop management · farmer training · M&E reporting · demonstration farm hosting",
    value: "$100k – $500k+",
    valueSub: "per programme",
  },
  {
    id: "D",
    title: "Dry-Season Programme",
    soldTo: "State ADPs, NIRSAL, anchor borrowers",
    covers: "Pre-season assessment · full irrigation · fertigation · pest management · compliance documentation across entire farm cluster",
    value: "₦150k – ₦250k",
    valueSub: "per hectare",
  },
];

const TECH_STACK = [
  {
    title: "Precision Soil Sensing",
    desc: "Multi-depth volumetric soil moisture, temperature, electrical conductivity, and salinity, timestamped, GPS-referenced, cloud-archived. Data exportable in institutional report format. Court-admissible. Audit-defensible. No field report we deliver is based on observation alone.",
  },
  {
    title: "Commercial Aquaponic System",
    desc: "Modified American commercial aquaponic system operating on the reference estate, producing premium fish protein while generating nitrate-rich irrigation water that eliminates synthetic fertilizer from the leafy green production system.",
  },
  {
    title: "Solar Infrastructure, 500kW",
    desc: "The reference estate runs entirely on solar power. Solar pump systems deployed for client irrigation programmes eliminate diesel cost and qualify projects for climate-smart agriculture designation under donor frameworks. Critical for ESG and green-bond eligible backward integration projects.",
  },
  {
    title: "Proprietary Farm Management Software",
    desc: "Built in-house for the Nigerian operating context. Simple UI designed to function across education and literacy barriers. Tracks crops, livestock, inputs, yields, and financials. Licensed to institutional clients for managing lending portfolios, outgrower programmes, and insurance portfolios. Built for Africa, not adapted from Western tools.",
  },
  {
    title: "Mechanised Equipment Fleet",
    desc: "Tractors, boom sprayers, pivot irrigation infrastructure, solar dryers, oil press, venturi fertigation units, mobile and fixed water pumps, all operational, maintained under documented SOPs. Clients do not need to fund equipment for service delivery. The fleet is deployed from the estate.",
  },
  {
    title: "Online Education Platform",
    desc: "Professionally developed B2B-first learning portal with accredited short courses, certification programmes, and institutional training modules. Enterprise-licensed to banks, insurers, government programmes, and donor organisations for staff training and farmer certification at scale.",
  },
];

const QA = [
  {
    q: "Can you show us a working reference site?",
    a: "Yes. The Ogun State estate. Visit any time. Walk the rows, inspect the equipment, review the SOPs, speak to the operators. No advance preparation required.",
  },
  {
    q: "Is your data court-admissible and audit-defensible?",
    a: "Yes. Our sensor data is timestamped, GPS-referenced, and cloud-archived. Every report we issue includes the raw sensor export. Nothing is based on visual observation alone.",
  },
  {
    q: "Are you independent of equipment manufacturers?",
    a: "Yes. GC Sustainability does not sell equipment. We specify and procure what is correct for each client from our tried and tested equipment supply chain. Our income comes from programme management and services, not from equipment margins.",
  },
  {
    q: "Can you manage multi-year operations, not just installation?",
    a: "Yes. Our fee structure transitions from project fees to an operations management retainer with performance bonuses tied to yield and quality KPIs. We stay on site because our income depends on the farm performing.",
  },
  {
    q: "How do we know your team can deliver at our scale?",
    a: "The Ogun estate is the proof. Our Founder has operated 200-hectare pivot-irrigated farm infrastructure under documented SOPs. Every discipline we deploy for clients has been tested, refined, and documented on our own estate first.",
  },
  {
    q: "What makes your software better than what we have?",
    a: "It was built for Nigeria, not adapted for it. Simple UI, designed across literacy and education barriers, tracks the metrics Nigerian agricultural lenders and insurers actually need, not what a Silicon Valley product manager imagined they need.",
  },
];

/* ─── Hero ───────────────────────────────────────────────── */
function Hero() {
  const [ref, vis] = useInView(0.1);
  return (
    <section className="relative h-[120vh] sm:h-[100vh] min-h-[600px] pt-32 sm:pt-24 md:pt-10 flex items-center bg-gc-green-900 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1920&q=80"
          alt="GC Sustainability reference estate"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gc-green-900 via-gc-green-900/80 to-transparent" />
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
            <span className="text-[9px] sm:text-[9.5px] font-medium tracking-[.22em] uppercase text-gc-green-400">
              Nigeria's Independent Agricultural Infrastructure
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-semibold font-montserrat text-white leading-[1.05] mb-5"
            style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(24px)", transition: "opacity .9s ease .2s, transform .9s ease .2s" }}>
            The Operator That Makes <em className="italic font-display font-semibold text-gc-green-500">Institutional Agriculture Work</em>
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-white/80 font-body leading-relaxed max-w-xl"
            style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(18px)", transition: "opacity .9s ease .38s, transform .9s ease .38s" }}>
            We are not a desk-based advisory firm. We are a working agricultural operation, 
            backed by a live 30-acre reference estate in Ogun State that any client can visit, 
            inspect, and validate before signing a contract.
          </p>

          {/* Stats row */}
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4 mt-10 mb-8 max-w-xl"
            style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(14px)", transition: "opacity .8s ease .48s, transform .8s ease .48s" }}
          >
            {STATS.map((s) => (
              <div key={s.label} className="text-center sm:text-left">
                <div className="text-3xl font-bold text-gc-green-400 leading-none">
                  <Counter target={s.value} suffix={s.suffix} />
                </div>
                <div className="text-[10px] text-white uppercase tracking-widest mt-2 leading-tight">{s.label}</div>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row flex-wrap items-center gap-3 sm:gap-4 w-full"
            style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(14px)", transition: "opacity .8s ease .58s, transform .8s ease .58s" }}
          >
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gc-green-400 hover:bg-gc-green-500 text-gc-green-900 hover:text-white font-semibold text-[11px] sm:text-xs uppercase tracking-widest px-6 sm:px-7 py-3.5 rounded-sm transition-all duration-300 hover:gap-3 text-center"
            >
              Request a Proposal <ArrowRight size={14} />
            </Link>
            <a
              href="#who-we-serve"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-white/25 hover:border-white/60 text-white hover:text-white font-medium text-[11px] sm:text-xs uppercase tracking-widest px-6 sm:px-7 py-3.5 rounded-sm transition-all duration-300 text-center"
            >
              Who We Serve
            </a>
          </div>
        </div>
      </div>

      {/* Bottom estate badge */}
      <div
        className="absolute bottom-6 right-6 hidden lg:flex items-center gap-3 bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl px-4 py-3"
        style={{ opacity: vis ? 1 : 0, transition: "opacity 1s ease 1s" }}
      >
        <MapPin size={14} className="text-gc-green-400 shrink-0" />
        <span className="text-[10px] text-white/60 uppercase tracking-widest">Reference Estate · Ogun State · Open for Client Visits</span>
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
          <p className="eyebrow mb-4 text-[16.5px] font-medium">Who We Serve</p>
          <h2 className="text-4xl sm:text-5xl font-display font-semibold font-light text-gc-stone-800 leading-tight">
            Five Institutional Problems.<br />
            <em className="italic font-display text-gc-green-500">One Integrated Platform.</em>
          </h2>
          <p className="mt-4 text-black leading-relaxed">
            Institutions operating in Nigerian agriculture share a single costly structural problem: 
            they cannot independently verify what farmers and farm operators tell them. GC Sustainability 
            is the independent verification and service delivery layer that solves all five.
          </p>
        </Fade>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WHO_WE_SERVE.map((item, i) => (
            <Fade key={item.title} delay={i * 60}
              className="group p-6 rounded-2xl border border-gc-stone-100 hover:border-gc-green-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gc-green-200 text-gc-green-500 flex items-center justify-center mb-4 group-hover:bg-gc-green-500 group-hover:text-white transition-colors duration-300">
                {item.icon}
              </div>
              <h3 className="font-display font-medium text-black text-lg mb-2 leading-snug">{item.title}</h3>
              <p className="text-xs text-black leading-relaxed">{item.desc}</p>
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
          <p className="eyebrow mb-4 text-[16.5px] font-medium">What We Deliver</p>
          <h2 className="text-4xl sm:text-5xl font-display font-semibold text-gc-stone-800">
            Five Service Divisions<br />
            <em className="italic text-gc-green-500">No Single Competitor Can Replicate</em>
          </h2>
          <p className="mt-4 text-black leading-relaxed max-w-2xl mx-auto text-sm">
            Each division addresses a specific institutional problem in the Nigerian agricultural market 
            that currently has no credible independent solution. Together, they form an integrated capability.
          </p>
        </Fade>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <Fade key={s.title} delay={i * 70}
              className="bg-white rounded-2xl p-7 border border-gc-stone-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-gc-green-200 text-gc-green-500 flex items-center justify-center group-hover:bg-gc-green-500 group-hover:text-white transition-colors duration-300">
                  {s.icon}
                </div>
                <span className="text-[9px] font-semibold uppercase tracking-widest text-gc-green-500 bg-gc-green-200/60 px-2 py-1 rounded-full">{s.tag}</span>
              </div>
              <h3 className="font-display font-medium text-black text-xl mb-3">{s.title}</h3>
              <p className="text-sm text-black leading-relaxed">{s.desc}</p>
            </Fade>
          ))}
        </div>

        {/* Contract ranges callout */}
        <Fade delay={100} className="mt-12 bg-gc-green-900 rounded-2xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {[
            { label: "Field Services",        range: "₦12m – ₦100m",   sub: "per institutional contract"  },
            { label: "Backward Integration",  range: "₦100m – ₦400m",  sub: "programme management fee"    },
            { label: "Vertical Systems",      range: "₦25m – ₦120m",   sub: "installation programme"      },
            { label: "Donor Programmes",      range: "$100k – $500k+",  sub: "per programme"               },
          ].map((c) => (
            <div key={c.label}>
              <div className="text-[10px] uppercase tracking-widest text-gc-green-400 font-semibold mb-1">{c.label}</div>
              <div className="text-xl font-bold text-white leading-tight">{c.range}</div>
              <div className="text-[10px] text-white/50 mt-1">{c.sub}</div>
            </div>
          ))}
        </Fade>
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
            <p className="eyebrow mb-4 text-[16.5px] font-medium">Why Institutions Choose GC</p>
            <h2 className="text-4xl sm:text-5xl font-display font-semibold text-gc-stone-800 leading-tight mb-8">
              Precision Delivery<br />
              <em className="italic text-gc-green-500">Documented Outcomes</em>
            </h2>
            <ul className="space-y-4">
              {DIFFERENTIATORS.map((d) => (
                <li key={d} className="flex items-start gap-3">
                  <CheckCircle size={17} className="text-gc-green-500 mt-0.5 shrink-0" />
                  <span className="text-sm text-black leading-relaxed">{d}</span>
                </li>
              ))}
            </ul>
          </Fade>

          <Fade delay={150} className="relative">
            <img
              src="/assets/precision.jpg"
              alt="Field team at work"
              className="rounded-2xl w-full h-[460px] object-cover shadow-2xl"
            />
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
          <p className="eyebrow mb-4 text-gc-green-400 text-[16.5px] font-medium">The Engagement Model</p>
          <h2 className="text-4xl sm:text-5xl font-semibold font-display font-light text-white">
            Three Steps to a<br />
            <em className="italic text-gc-green-400">Running Programme</em>
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
              <p className="text-sm text-white leading-relaxed">{p.desc}</p>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Reference Estate Strip ─────────────────────────────── */
function EstateStrip() {
  return (
    <section className="py-16 bg-gc-stone-100 border-y border-gc-stone-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Fade className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="eyebrow mb-4 text-[16.5px] font-medium">The Reference Estate, Ogun State</p>
            <h2 className="text-3xl sm:text-4xl font-display font-semibold text-gc-stone-800 leading-tight mb-4">
              Every Capability We Sell<br />
              <em className="italic text-gc-green-500">Runs on Our Own Farm</em>
            </h2>
            <p className="text-sm text-black leading-relaxed mb-6">
              The 30-acre integrated estate in Ogun State is a production operation generating 
              revenue across fifteen streams, leafy greens, cut flowers, aquaponic fish, premium 
              livestock protein, economic trees, and training. It operates entirely on solar energy 
              and uses aquaponic outflow to eliminate synthetic fertilizer from vegetable production.
            </p>
            <p className="text-sm text-black leading-relaxed italic">
              When a bank's credit officer, an insurer's underwriter, or a donor's programme manager 
              walks this farm, they see the same technology, the same systems, and the same operating 
              discipline we deploy for their institutional engagements.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "500kW",  label: "Solar Infrastructure" },
              { value: "15",     label: "Revenue Streams"      },
              { value: "Sensor", label: "Precision Sensing"    },
              { value: "Zero",   label: "External Inputs"      },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl p-6 border border-gc-stone-100 text-center">
                <div className="text-2xl font-bold text-gc-green-500 mb-1">{s.value}</div>
                <div className="text-xs text-black/60 uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
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
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-semibold font-display font-light text-white leading-tight mb-6">
            Bring GC to<br />
            <em className="italic font-display font-semibold text-gc-green-400 font-light">
              Your Institution
            </em>
          </h2>
          <p className="max-w-lg mx-auto text-white text-lg leading-relaxed mb-4">
            Tell us your institutional challenge. We will prepare a tailored service proposal 
            within five business days, scoped, priced, and referenced against comparable engagements.
          </p>
          <p className="max-w-md mx-auto text-white/35 text-sm leading-relaxed mb-10 italic">
            Or visit the Ogun State estate first. Walk the rows, inspect the equipment, meet the team. 
            No advance preparation required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact"
              className="inline-flex items-center gap-2 bg-gc-green-400 hover:bg-gc-green-500 text-gc-green-900 hover:text-white font-semibold text-xs uppercase tracking-widest px-10 py-4 rounded-sm transition-all duration-300 hover:gap-4">
              Request a Proposal <ArrowRight size={15} />
            </Link>
            <a href="#who-we-serve"
              className="inline-flex items-center gap-2 border border-white/25 hover:border-white/60 text-white font-medium text-xs uppercase tracking-widest px-8 py-4 rounded-sm transition-all duration-300">
              Visit the Estate
            </a>
          </div>
          <p className="mt-10 text-white/25 text-xs italic max-w-sm mx-auto">
            "True resilience for African agriculture lies not in choosing between the past and the future, 
            but in a thoughtful amalgamation of both." — Yomi Williams, Founder
          </p>
        </Fade>
      </div>
    </section>
  );
}

/* ─── Timeline ───────────────────────────────────────────── */
function Timeline() {
  return (
    <section className="py-24 bg-gc-green-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Fade className="max-w-2xl mb-16">
          <p className="eyebrow mb-4 text-gc-green-400 text-[16.5px] font-medium">A Decade of Verified Agricultural Innovation</p>
          <h2 className="text-4xl sm:text-5xl font-display font-semibold text-white leading-tight">
            Ten Years Building<br />
            <em className="italic text-gc-green-400">Before Opening to Clients</em>
          </h2>
        </Fade>

        <div className="relative">
          {/* Vertical spine */}
          <div className="absolute left-[28px] sm:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />

          <div className="space-y-10">
            {TIMELINE.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <Fade key={item.year} delay={i * 80}>
                  <div className={`relative flex items-start gap-6 sm:gap-0 ${isLeft ? "sm:flex-row" : "sm:flex-row-reverse"}`}>
                    {/* Year bubble — centered on spine */}
                    <div className="relative z-10 shrink-0 sm:absolute sm:left-1/2 sm:-translate-x-1/2 sm:top-0">
                      <div className="w-25 h-25 rounded-full bg-gc-green-500 border-4 border-gc-green-900 flex flex-col items-center justify-center shadow-lg">
                        <span className="text-[9px] font-bold text-white leading-none tracking-wider uppercase">{item.label}</span>
                        <span className="text-[8px] text-white/70 leading-none mt-0.5">{item.year}</span>
                      </div>
                    </div>

                    {/* Content card */}
                    <div className={`sm:w-[calc(50%-3rem)] ml-6 sm:ml-0 ${isLeft ? "sm:pr-8 sm:text-right" : "sm:pl-8 sm:ml-[calc(50%+3rem)]"}`}>
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                        <p className="text-sm text-white leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                </Fade>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Packages ───────────────────────────────────────────── */
function Packages() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Fade className="max-w-2xl mb-14">
          <p className="eyebrow mb-4 text-[16.5px] font-medium">The Four Institutional Service Packages</p>
          <h2 className="text-4xl sm:text-5xl font-display font-semibold text-gc-stone-800 leading-tight">
            One Partner.<br />
            <em className="italic text-gc-green-500">Complete Field Coverage.</em>
          </h2>
          <p className="mt-4 text-black leading-relaxed text-sm">
            The highest-value engagements combine multiple service lines into one contract. 
            One accountable partner. One invoice. Complete field coverage.
          </p>
        </Fade>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PACKAGES.map((pkg, i) => (
            <Fade key={pkg.id} delay={i * 80}
              className="group rounded-2xl border border-gc-stone-100 hover:border-gc-green-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
              {/* Header */}
              <div className="bg-gc-green-900 px-7 py-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gc-green-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {pkg.id}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-white text-lg leading-snug">{pkg.title}</h3>
                  <p className="text-[11px] text-gc-green-400 mt-0.5">{pkg.soldTo}</p>
                </div>
              </div>
              {/* Body */}
              <div className="px-7 py-6 bg-white">
                <p className="text-xs text-black leading-relaxed mb-5">{pkg.covers}</p>
                <div className="flex items-end justify-between border-t border-gc-stone-100 pt-4">
                  <span className="text-[10px] uppercase tracking-widest text-black/40 font-medium">Annual Value</span>
                  <div className="text-right">
                    <div className="text-xl font-bold text-gc-green-500 leading-none">{pkg.value}</div>
                    <div className="text-[10px] text-black/40 mt-1">{pkg.valueSub}</div>
                  </div>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Technology & Infrastructure ────────────────────────── */
function TechStack() {
  return (
    <section className="py-24 bg-gc-stone-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Fade className="max-w-2xl mb-14">
          <p className="eyebrow mb-4 text-[16.5px] font-medium">Technology & Infrastructure Credentials</p>
          <h2 className="text-4xl sm:text-5xl font-display font-semibold text-gc-stone-800 leading-tight">
            Verifiability Is<br />
            <em className="italic text-gc-green-500">The Product.</em>
          </h2>
          <p className="mt-4 text-black leading-relaxed text-sm">
            The difference between a GC Sustainability engagement and any competitor offering is not 
            price, it is verifiability. Every service we deliver is backed by technology that 
            timestamps, geo-references, and archives the data.
          </p>
        </Fade>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TECH_STACK.map((item, i) => (
            <Fade key={item.title} delay={i * 70}
              className="bg-white rounded-2xl p-7 border border-gc-stone-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-2 h-2 rounded-full bg-gc-green-500 mb-4" />
              <h3 className="font-display font-semibold text-black text-lg mb-3 leading-snug">{item.title}</h3>
              <p className="text-sm text-black leading-relaxed">{item.desc}</p>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── QA ─────────────────────────────────────────────────── */
function QASection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Fade className="max-w-2xl mb-14">
          <p className="eyebrow mb-4 text-[16.5px] font-medium">Why Gartner Callaway Sustainability</p>
          <h2 className="text-4xl sm:text-5xl font-display font-semibold text-gc-stone-800 leading-tight">
            Every Question<br />
            <em className="italic text-gc-green-500">Answered Directly.</em>
          </h2>
          <p className="mt-4 text-black leading-relaxed text-sm">
            These are the questions every institutional client asks before signing. 
            Here are the answers, specific, verifiable, and backed by infrastructure you can visit.
          </p>
        </Fade>

        <div className="space-y-4 max-w-4xl">
          {QA.map((item, i) => (
            <Fade key={i} delay={i * 60}
              className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-gc-stone-100 hover:border-gc-green-200 hover:shadow-md transition-all duration-300">
              {/* Question */}
              <div className="bg-gc-green-900 px-7 py-6 flex items-start gap-3">
                <span className="text-gc-green-400 font-bold text-sm shrink-0 mt-0.5">Q</span>
                <p className="text-white font-medium text-sm leading-relaxed">{item.q}</p>
              </div>
              {/* Answer */}
              <div className="bg-gc-stone-100 px-7 py-6 flex items-start gap-3">
                <span className="text-gc-green-500 font-bold text-sm shrink-0 mt-0.5">A</span>
                <p className="text-black text-sm leading-relaxed">{item.a}</p>
              </div>
            </Fade>
          ))}
        </div>
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
      <Timeline />
      <Services />
      <Packages />
      <WhyGC />
      <Process />
      <TechStack />
      <EstateStrip />
      <QASection />
      <CTA />
    </>
  );
}