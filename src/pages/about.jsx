import { useEffect, useRef, useState } from "react";

/* ═══════════════════════════════════════════════════════════════
   SHARED UTILITIES
═══════════════════════════════════════════════════════════════ */
function useInView(threshold = 0.12) {
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

function Reveal({ children, delay = 0, y = 28, className = "" }) {
  const [ref, vis] = useInView(0.1);
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : `translateY(${y}px)`,
      transition: `opacity .8s ease ${delay}ms, transform .9s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 1 — HERO
═══════════════════════════════════════════════════════════════ */
function AboutHero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 60); }, []);
  const v = loaded;

  return (
    <section className="ab-hero" aria-label="About hero">
      <div className="ab-hero-bg" aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1800&q=80"
          alt="Gartner Callaway Ogun State estate, agroforestry canopy"
          className={loaded ? "ab-img-rdy" : ""}
          onLoad={() => setLoaded(true)}
        />
      </div>
      <div className="ab-hero-veil" aria-hidden="true" />
      <div className="ab-grain" aria-hidden="true" />

      <div className="ab-hero-body">
<h1 className="ab-hero-h1" style={{
  opacity: v ? 1 : 0, 
  transform: v ? "translateY(0)" : "translateY(28px)",
  transition: "opacity .9s ease .22s, transform .95s cubic-bezier(0.22,1,0.36,1) .22s",
}}>
  Nature And Technology<br />
  <em>Synchronized</em>
</h1>

        <p className="ab-hero-sub" style={{
          opacity: v?1:0, transform: v?"translateY(0)":"translateY(20px)",
          transition:"opacity .85s ease .48s, transform .9s cubic-bezier(0.22,1,0.36,1) .48s",
        }}>
          Gartner Callaway is an integrated agricultural production and services company headquartered in Lagos State, Nigeria, with an export-ready portfolio.
        </p>

      </div>

      {/* scroll cue */}
      <div className="ab-scroll-cue" style={{ opacity: v?1:0, transition:"opacity .8s ease 1.3s" }} aria-hidden="true">
        <span className="ab-scroll-txt">Scroll</span>
        <div className="ab-scroll-line"/>
      </div>

      <div className="ab-hero-stats" style={{
        opacity: v?1:0, transition:"opacity .8s ease .7s",
      }}>
        {[
          "Ogun State Estate",
          "Solar Capacity",
          "People Trained",
          "Organisations Advised",
        ].map((label, i) => (
          <div key={i} className="ab-hero-stat">
            <span className="ab-hero-stat-l">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 2 — WHO WE ARE
═══════════════════════════════════════════════════════════════ */
function WhoWeAre() {
  const [ref, vis] = useInView(0.2);
  return (
    <section className="ab-who" aria-labelledby="who-heading">
      <div className="ab-who-inner" ref={ref} style={{
        opacity: vis?1:0, transform: vis?"translateY(0)":"translateY(24px)",
        transition:"opacity .85s ease, transform .95s cubic-bezier(0.22,1,0.36,1)",
      }}>
        <div className="ab-who-left">
          <div className="ab-eyebrow ab-eyebrow--dark">
            <span className="ab-eyebrow-rule ab-eyebrow-rule--red" aria-hidden="true"/>
            Who We Are
          </div>
          <h2 id="who-heading" className="ab-who-h2">
            One Company<br />
            <em>The Entire Stack</em>
          </h2>
          {/* decorative photo inset */}
          <div className="ab-who-img-wrap" aria-hidden="true">
            <img
              src="/assets/production (3).jpeg"
              alt=""
              loading="lazy"
            />
            <div className="ab-who-img-badge">
              <span>Est. 2017</span>
              <span>Lagos, Nigeria</span>
            </div>
          </div>
        </div>

        <div className="ab-who-right">
          <p className="ab-who-lead">
            Gartner Callaway operates at the intersection of regenerative agriculture, precision technology, and institutional services. We design and build integrated farm systems. We verify farms for banks, insurers, and donors. We grow and export premium produce. We train the next generation.
          </p>
          <p className="ab-who-body">
            Founded in 2017, we began by pioneering Africa's first automated hydroponic urban vertical farms across Lagos. We then engineered Nigeria's first restaurant-integrated indoor grow system before designing and developing our new integrated farm model, now the operational proof point at the centre of every institutional engagement we take on.
          </p>
          <p className="ab-who-body">
            Today, Gartner Callaway is the independent agricultural production, services, and education company that makes regenerative agriculture bankable, insurable, and exportable across southwest Nigeria, West Africa, and the UK partnership corridor.
          </p>

          {/* pull quote */}
          <blockquote className="ab-pullquote">
            <p>"Where ancient wisdom meets modern engineering."</p>
            <cite>— Yomi Williams, Founder</cite>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 3 — EVOLUTION TIMELINE
═══════════════════════════════════════════════════════════════ */
const TIMELINE = [
  {
    year: "2017",
    title: "Vertical Farming Pioneer",
    body: "Built Africa's first automated hydroponic urban vertical farms, 5 installations across Lagos delivering 50% water reduction over field farming.",
    tags: ["5 hydroponic farms", "Lagos, Nigeria", "50% water reduction"],
    accent: "#4a8a5b",
  },
  {
    year: "2018–2020",
    title: "Production Engineering at Scale",
    body: "Launched Nigeria's first upscale garden centres the 'Green Zones'. Scaled ornamental and cut-flower production. Awarded the Entrepreneur Africa Prize for Innovation (2018). We embarked on various precision production projects using soil and nethouses - full commercial open field cultivation of cut-flowers - all to test yield and market dynamics.",
    tags: ["Green Zones", "Cut flowers", "Innovation Prize 2018"],
    accent: "#FF0000",
  },
  {
    year: "2020–2023",
    title: "Commercial Structure Build-Out",
    body: "Designed and built a new urban farm and retail store as part of our forward integration strategy.",
    tags: ["200 ha estate", "500 kW solar", "30% yield uplift"],
    accent: "#4a8a5b",
  },
  {
    year: "2024",
    title: "Regenerative Integration",
    body: "Rebuilt the estate as an agroforestry model. Deployed precision sensing across the full hectarage. All outputs made bank-ready, insurer-ready, and donor-defensible.",
    tags: ["Precision sensing", "Agroforestry", "Institutional-grade data"],
    accent: "#FF0000",
  },
  {
    year: "2026",
    title: "Institutional Services Division",
    body: "Opened our estate, equipment, and education infrastructure to institutional clients delivering 10 standalone service lines and 4 bundled service architectures.",
    tags: ["10 service lines", "4 architectures", "Bank, insurer, donor ready"],
    accent: "#4a8a5b",
  },
];

function Timeline() {
  return (
    <section className="ab-timeline-section" aria-labelledby="timeline-heading">
      <Reveal>
        <div className="ab-section-header ab-section-header--centered">
          <div className="ab-eyebrow ab-eyebrow--light">
            <span className="ab-eyebrow-rule" aria-hidden="true"/>
            Our Evolution
          </div>
          <h2 id="timeline-heading" className="ab-section-h2 ab-section-h2--light">
            Nine Years of Building<br /><em>One Operating Thesis</em>
          </h2>
        </div>
      </Reveal>

      <div className="ab-timeline">
        {/* vertical spine */}
        <div className="ab-timeline-spine" aria-hidden="true"/>

        {TIMELINE.map((m, i) => (
          <Reveal key={i} delay={i * 100} className="ab-tl-item-wrap">
            <article
              className={`ab-tl-item ab-tl-item--${i % 2 === 0 ? "left" : "right"}`}
              style={{ "--accent": m.accent }}
            >
              {/* year node */}
              <div className="ab-tl-node" aria-hidden="true">
                <span className="ab-tl-year">{m.year}</span>
                <div className="ab-tl-dot"/>
              </div>
              {/* card */}
              <div className="ab-tl-card">
                <h3 className="ab-tl-title">{m.title}</h3>
                <p className="ab-tl-body">{m.body}</p>
                <div className="ab-tl-tags">
                  {m.tags.map(t => <span key={t} className="ab-tl-tag">{t}</span>)}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 4 — INTEGRATED FARM MODEL
═══════════════════════════════════════════════════════════════ */
const FARM_POINTS = [
  {
    num:"01",
    icon:(
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 11C3 11 4 6 11 4C18 6 19 11 19 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M11 4V19" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        {[7,11,15].map(y=><line key={y} x1="6" y1={y} x2="16" y2={y} stroke="currentColor" strokeWidth=".8" strokeDasharray="2 1.5" opacity=".5"/>)}
      </svg>
    ),
    title:"Drip irrigation & fertigation",
    body:"Sensor-scheduled delivery water and nutrients drop by drop, with every cycle logged and cloud-archived.",
  },
  {
    num:"02",
    icon:(
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 3C11 3 6 6.5 6 12C6 15 8.5 17 11 17C13.5 17 16 15 16 12C16 6.5 11 3 11 3Z" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M11 7V17" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M11 12L8 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
    title:"Economic trees replace shade nets",
    body:"Moringa, plantain, citrus, mango, and palm serve as the canopy layer, productive, permanent, and soil-building.",
  },
  {
    num:"03",
    icon:(
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.2"/>
        <circle cx="11" cy="11" r="3" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M11 4V7M11 15V18M4 11H7M15 11H18" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
    title:"Livestock as productive partners",
    body:"Poultry and ruminants deliver natural pest management and nitrogen cycling replacing synthetic inputs.",
  },
  {
    num:"04",
    icon:(
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 17C3 17 7 12 11 12C15 12 19 17 19 17" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M3 17H19" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M7 12C7 9 9 5 11 4C13 5 15 9 15 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity=".5"/>
      </svg>
    ),
    title:"Crop residues feed the soil",
    body:"Mulched biomass is returned to the field, organic matter rises season by season, reducing external inputs.",
  },
  {
    num:"05",
    icon:(
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="9" width="16" height="6" rx="1" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M6 9V7M10 9V6M14 9V7M18 9V8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity=".6"/>
        <path d="M3 15L5 19M19 15L17 19" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity=".5"/>
      </svg>
    ),
    title:"Solar infrastructure powers operations",
    body:"Solar powers pumps, presses, dryers, and cold storage, minimal fossil fuel dependency.",
  },
  {
    num:"06",
    icon:(
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="3" stroke="currentColor" strokeWidth="1.2"/>
        {[6,9,12].map(r=><circle key={r} cx="11" cy="11" r={r} stroke="currentColor" strokeWidth=".7" opacity={1-r*.07} fill="none"/>)}
        <path d="M11 2V4M11 18V20M2 11H4M18 11H20" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity=".4"/>
      </svg>
    ),
    title:"Sensors verify outcomes",
    body:"GPS-stamped, cloud-archived, and institutionally defensible, every output passes bank, insurer, and donor scrutiny.",
  },
];

function FarmModel() {
  return (
    <section className="ab-farm-section" aria-labelledby="farm-heading">
      <div className="ab-farm-inner">
        <div className="ab-farm-left">
          <Reveal>
            <div className="ab-eyebrow ab-eyebrow--dark">
              <span className="ab-eyebrow-rule ab-eyebrow-rule--green" aria-hidden="true"/>
              How We Farm
            </div>
            <h2 id="farm-heading" className="ab-section-h2">
              The Integrated<br /><em>Farm Model</em>
            </h2>
            <p className="ab-farm-intro">
              Every farm Gartner Callaway designs operates as a closed-loop system. Six components water, trees, livestock, soil, energy, and data are woven together so that each one subsidises the others.
            </p>
          </Reveal>

          {/* SVG ecosystem diagram */}
          <Reveal delay={150}>
            <div className="ab-farm-diagram" aria-hidden="true">
              <svg viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* outer ring */}
                <circle cx="140" cy="140" r="118" stroke="rgba(74,138,91,.1)" strokeWidth="1"/>
                <circle cx="140" cy="140" r="88"  stroke="rgba(74,138,91,.08)" strokeWidth="1"/>
                <circle cx="140" cy="140" r="58"  stroke="rgba(74,138,91,.12)" strokeWidth="1" strokeDasharray="3 2"/>
                {/* centre */}
                <circle cx="140" cy="140" r="26" fill="rgba(74,138,91,.12)" stroke="rgba(74,138,91,.5)" strokeWidth="1.2"/>
                <text x="140" y="136" textAnchor="middle" fill="rgba(74,138,91,.8)" fontSize="7" fontFamily="DM Sans,sans-serif" fontWeight="500">GC</text>
                <text x="140" y="147" textAnchor="middle" fill="rgba(74,138,91,.6)" fontSize="6" fontFamily="DM Sans,sans-serif">FARM OS</text>
                {/* spokes + nodes */}
                {[
                  { angle:-90, label:"Water",    sub:"Drip + Ferti" },
                  { angle:-30, label:"Trees",    sub:"Agroforestry" },
                  { angle: 30, label:"Energy",   sub:"500 kW Solar" },
                  { angle: 90, label:"Soil",     sub:"Biomass Cycle" },
                  { angle:150, label:"Livestock",sub:"Pest + N cycle" },
                  { angle:210, label:"Data",     sub:"Sensors" },
                ].map(({angle,label,sub},i)=>{
                  const r=angle*Math.PI/180;
                  const x=140+95*Math.cos(r), y=140+95*Math.sin(r);
                  const xs=140+60*Math.cos(r), ys=140+60*Math.sin(r);
                  const isRed = i%2===1;
                  return (
                    <g key={i}>
                      <line x1={xs} y1={ys} x2={x} y2={y} stroke="rgba(74,138,91,.2)" strokeWidth=".8"/>
                      <circle cx={x} cy={y} r="14" fill={isRed?"rgba(224,122,95,.1)":"rgba(74,138,91,.1)"} stroke={isRed?"rgba(224,122,95,.45)":"rgba(74,138,91,.45)"} strokeWidth="1"/>
                      <text x={x} y={y-2}  textAnchor="middle" fill={isRed?"rgba(224,122,95,.85)":"rgba(74,138,91,.85)"} fontSize="5.5" fontFamily="DM Sans,sans-serif" fontWeight="500">{label}</text>
                      <text x={x} y={y+7}  textAnchor="middle" fill="rgba(255,255,255,.3)"  fontSize="4.5" fontFamily="DM Sans,sans-serif">{sub}</text>
                    </g>
                  );
                })}
                {/* outer label */}
                <text x="140" y="272" textAnchor="middle" fill="rgba(74,138,91,.3)" fontSize="6.5" fontFamily="DM Sans,sans-serif" letterSpacing="2">CLOSED-LOOP SYSTEM</text>
              </svg>
            </div>
          </Reveal>
        </div>

        <div className="ab-farm-right">
          {FARM_POINTS.map((p,i) => (
            <Reveal key={i} delay={i*70} className="ab-farm-point">
              <div className="ab-farm-point-icon" aria-hidden="true">{p.icon}</div>
              <div>
                <h3 className="ab-farm-point-title">
                  <span className="ab-farm-point-num">{p.num}</span>
                  {p.title}
                </h3>
                <p className="ab-farm-point-body">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 5 — WHO WE SERVE
═══════════════════════════════════════════════════════════════ */
const CLIENTS = [
  { client:"Banks & MFIs",          what:"Pre-loan verification, in-season monitoring, harvest confirmation",                            accent:"#FF0000" },
  { client:"Insurance Companies",   what:"Pre-policy risk assessment, in-season monitoring, claims investigation",                       accent:"#4a8a5b" },
  { client:"Donor Organisations",   what:"Programme implementation irrigation, crop management, training, M&E",                        accent:"#FF0000" },
  { client:"Government Programmes", what:"ADP and NIRSAL technical assistance, dry-season irrigation, farmer profiling",                 accent:"#4a8a5b" },
  { client:"Anchor Agribusinesses", what:"Outgrower farm management, input application, compliance, harvest documentation",               accent:"#FF0000" },
  { client:"Institutions & Govts",  what:"Certified online education platform for training at scale",                                    accent:"#4a8a5b" },
  { client:"Wholesale & Export",    what:"Traceable, verified, premium produce, UK and EU qualified",                                   accent:"#FF0000" },
];

function WhoWeServe() {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="ab-serve-section" aria-labelledby="serve-heading">
      <Reveal>
        <div className="ab-section-header">
          <div className="ab-eyebrow ab-eyebrow--dark">
            <span className="ab-eyebrow-rule ab-eyebrow-rule--red" aria-hidden="true"/>
            Who We Serve
          </div>
          <div className="ab-serve-header-grid">
            <h2 id="serve-heading" className="ab-section-h2">
              Seven Client Types<br /><em>One Accountable Partner</em>
            </h2>
            <p className="ab-serve-sub">
              Our institutional client base spans the full agricultural finance and development stack from commercial banks to export buyers. Each engagement is governed by written SOPs, milestone billing, and SLA-backed delivery.
            </p>
          </div>
        </div>
      </Reveal>

      <div className="ab-serve-table" role="table" aria-label="Clients we serve">
        <div className="ab-serve-thead" role="row">
          <span role="columnheader">Client Type</span>
          <span role="columnheader">What We Deliver</span>
        </div>
        {CLIENTS.map((row,i) => (
          <Reveal key={i} delay={i*60} className="ab-serve-row-wrap">
            <div
              className="ab-serve-row"
              role="row"
              style={{ "--accent": row.accent }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <span className="ab-serve-client" role="cell">
                <span className="ab-serve-client-dot" aria-hidden="true"/>
                {row.client}
              </span>
              <span className="ab-serve-what" role="cell">{row.what}</span>
              <span className="ab-serve-arrow" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 6 — MISSION
═══════════════════════════════════════════════════════════════ */
function Mission() {
  const [ref, vis] = useInView(0.25);
  return (
    <section className="ab-mission-section" aria-labelledby="mission-heading" ref={ref}>
      <div className="ab-mission-inner" style={{
        opacity: vis?1:0, transform: vis?"translateY(0)":"translateY(24px)",
        transition:"opacity .9s ease, transform 1s cubic-bezier(0.22,1,0.36,1)",
      }}>
        <div className="ab-eyebrow ab-eyebrow--light">
          <span className="ab-eyebrow-rule" aria-hidden="true"/>
          Our Mission
        </div>
        <blockquote id="mission-heading" className="ab-mission-quote">
          <p>
            "To make regenerative African agriculture <em>bankable, insurable, exportable,</em> and teachable at the scale required to feed a continent and the precision required to compete globally."
          </p>
        </blockquote>
        <div className="ab-mission-rule" aria-hidden="true"/>
        <cite className="ab-mission-cite">Gartner Callaway Mission Statement</cite>
      </div>
      {/* decorative watermark */}
      <div className="ab-mission-wm" aria-hidden="true">GC</div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 7 — VALUES
═══════════════════════════════════════════════════════════════ */
const VALUES = [
  {
    num:"01",
    title:"Practical Innovation",
    body:"Deploy technology because it works, not because it's fashionable. Every tool we use earns its place on the farm.",
    accent:"#4a8a5b",
  },
  {
    num:"02",
    title:"Verifiable Outcomes",
    body:"Every claim is backed by data and institutionally defensible. If we cannot measure it, we do not report it.",
    accent:"#FF0000",
  },
  {
    num:"03",
    title:"Regeneration Over Extraction",
    body:"We leave land healthier than we found it economically, ecologically, and in terms of the communities we serve.",
    accent:"#4a8a5b",
  },
  {
    num:"04",
    title:"Inclusive Scale",
    body:"Institutional value and training the next generation are not competing priorities, they are the same agenda.",
    accent:"#FF0000",
  },
  {
    num:"05",
    title:"Sovereignty Through Knowledge",
    body:"Nations must master their own biodiversity. Gartner Callaway exists to ensure that mastery is earned, not borrowed.",
    accent:"#4a8a5b",
  },
];

function Values() {
  return (
    <section className="ab-values-section" aria-labelledby="values-heading">
      <Reveal>
        <div className="ab-section-header ab-section-header--centered">
          <div className="ab-eyebrow ab-eyebrow--dark">
            <span className="ab-eyebrow-rule ab-eyebrow-rule--red" aria-hidden="true"/>
            Our Values
          </div>
          <h2 id="values-heading" className="ab-section-h2">
            Five Commitments<br /><em>Not Aspirations Constraints</em>
          </h2>
        </div>
      </Reveal>

      <div className="ab-values-grid">
        {VALUES.map((v,i) => (
          <Reveal key={i} delay={i*80} className="ab-value-card-wrap">
            <div className="ab-value-card" style={{ "--accent": v.accent }}>
              <div className="ab-value-top">
                <span className="ab-value-num">{v.num}</span>
                <div className="ab-value-rule"/>
              </div>
              <h3 className="ab-value-title">{v.title}</h3>
              <p className="ab-value-body">{v.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 8 — LEADERSHIP
═══════════════════════════════════════════════════════════════ */
const AWARDS = [
  { year:"2018", award:"Entrepreneur Africa Prize for Innovation" },
  { year:"2018", award:"Cover Star, Farm & Food Magazine" },
  { year:"2023", award:"Training Plaque, Nigerian Armed Forces" },
  { year:"2023", award:"Achiever Par Excellence Award, NANNS" },
  { year:"2024", award:"Facilitator, NBCC Women & Youth Entrepreneurship Centre" },
];

const ORGS = [
  "Union Bank", "Nigerian Armed Forces", "NBCC", "NIRSAL", "ADP",
  "30+ organisations advised across Nigeria",
];

function Leadership() {
  return (
    <section className="ab-leader-section" aria-labelledby="leader-heading">
      <Reveal>
        <div className="ab-eyebrow ab-eyebrow--light">
          <span className="ab-eyebrow-rule" aria-hidden="true"/>
          Leadership
        </div>
        <h2 id="leader-heading" className="ab-section-h2 ab-section-h2--light">
          The Founder
        </h2>
      </Reveal>

      <div className="ab-leader-grid">
        {/* photo side */}
        <Reveal delay={0} className="ab-leader-photo-col">
          <div className="ab-leader-photo-wrap">
            <img
              src="/assets/ceo.jpeg"
              alt="Yomi Williams, Founder of Gartner Callaway"
              loading="lazy"
            />
            {/* name plate */}
            <div className="ab-leader-nameplate">
              <span className="ab-leader-name">Yomi Williams</span>
              <span className="ab-leader-role">Founder & Principal Partner</span>
              <a href="https://yomiwilliams.com" className="ab-leader-site" target="_blank" rel="noopener noreferrer">
                yomiwilliams.com ↗
              </a>
            </div>
          </div>
        </Reveal>

        {/* bio side */}
        <Reveal delay={100} className="ab-leader-bio-col">
          <p className="ab-leader-lead">
            Yomi Williams is Nigeria's foremost precision agriculture engineer, the technologist who built Africa's first automated hydroponic urban vertical farms, and the practitioner who turned 200 undeveloped hectares in Ogun State into an institutional-grade regenerative estate.
          </p>
          <p className="ab-leader-body">
            Over nine years, Yomi has designed and delivered farm systems for individual investors, government agencies, and multinational agribusinesses. He has advised more than 30 organisations including Union Bank, the Nigerian Armed Forces, and the NBCC and has trained more than 1,000 youths and women in modern agriculture.
          </p>
          <p className="ab-leader-body">
            His philosophy is simple: the best agricultural technology is the one that works reliably in African conditions, generates data that institutions trust, and leaves communities more capable than it found them.
          </p>

          {/* milestones */}
          <div className="ab-leader-milestones">
            <h3 className="ab-leader-milestones-h">Key Achievements</h3>
            <ul className="ab-leader-list">
              <li>Pioneered Africa's first automated hydroponic urban vertical farms</li>
              <li>Designed & developed the 200 ha Ogun State hibiscus estate</li>
              <li>Engineered Nigeria's first restaurant-integrated indoor grow system</li>
              <li>Trained 1,000+ youths and women in modern agriculture</li>
              <li>Advisory to 30+ organisations</li>
            </ul>
          </div>

          {/* awards */}
          <div className="ab-leader-awards">
            <h3 className="ab-leader-milestones-h">Recognition</h3>
            <div className="ab-awards-list">
              {AWARDS.map((a,i) => (
                <div key={i} className="ab-award-row">
                  <span className="ab-award-year">{a.year}</span>
                  <span className="ab-award-name">{a.award}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 9 — UNIVERSAL CTA
═══════════════════════════════════════════════════════════════ */
function UniversalCTA() {
  const [ref, vis] = useInView(0.2);
  return (
    <section className="ab-cta-section" ref={ref} aria-labelledby="cta-heading">
      <div className="ab-cta-inner" style={{
        opacity: vis?1:0, transform: vis?"translateY(0)":"translateY(24px)",
        transition:"opacity .85s ease, transform .95s cubic-bezier(0.22,1,0.36,1)",
      }}>
        <div className="ab-cta-bg-num" aria-hidden="true">GC</div>
        <div className="ab-eyebrow ab-eyebrow--light">
          <span className="ab-eyebrow-rule" aria-hidden="true"/>
          Work With Us
        </div>
        <h2 id="cta-heading" className="ab-cta-h2">
          Ready To Transform Your Programme<br />
          <em>Your Portfolio Or Your Farm?</em>
        </h2>
        <p className="ab-cta-sub">
          We welcome conversations with banks, insurers, donor organisations, government programmes, agribusiness anchors, and investors operating across southwest Nigeria, West Africa, and our UK partnership corridor.
        </p>
        <div className="ab-cta-btns">
          <a href="/contact" className="ab-btn-primary">
            Start a Project
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="/contact/site-visit" className="ab-btn-secondary">Book a Site Visit</a>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ROOT — STYLES + ASSEMBLY
═══════════════════════════════════════════════════════════════ */
export default function AboutPage() {
  return (
    <>
      <style>{`
        /* ── reset & tokens ── */
        .gc-about, .gc-about * { box-sizing: border-box; margin: 0; padding: 0; }
        .gc-about {
          --g900: #0e1f14; --g800: #1a3321; --g500: #4a8a5b;
          --g400: #7fb38d; --g200: #e1f0e5;
          --r400: #FF0000;
          --s100: #f4f4f2; --s500: #787870; --s800: #2c2c2a;
          // --fd: "Cormorant Garamond", Georgia, serif;
          // --fb: "DM Sans", system-ui, sans-serif;
          --ep: cubic-bezier(0.34, 1.56, 0.64, 1);
          --es: cubic-bezier(0.25, 0.46, 0.45, 0.94);
          font-family: var(--fb);
          color: var(--s800);
          overflow-x: hidden;
        }

        /* ── shared atoms ── */
        .ab-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 16.5px; font-weight: 500;
          letter-spacing: .22em; text-transform: uppercase;
          margin-bottom: clamp(14px,2vw,22px);
        }
        .ab-eyebrow--light { color: var(--g400); }
        .ab-eyebrow--dark  { color: var(--r400); }
        .ab-eyebrow-rule {
          display: block; width: 28px; height: 1px; flex-shrink: 0;
        }
        .ab-eyebrow-rule--red   { background: var(--r400); }
        .ab-eyebrow-rule--green { background: var(--g400); }
        .ab-eyebrow--light .ab-eyebrow-rule { background: var(--g400); }
        .ab-eyebrow--dark  .ab-eyebrow-rule { background: var(--r400); }

        .ab-section-h2 {
          font-family: var(--fd);
          font-size: clamp(30px,4.5vw,56px);
          font-weight: 600; line-height: 1.08;
          letter-spacing: -.015em; color: var(--s800);
          margin-bottom: clamp(16px,2.5vw,28px);
        }
        .ab-section-h2 em { font-style: italic; font-weight: 600; color: var(--g500); }
        .ab-section-h2--light { color: #fff; }
        .ab-section-h2--light em { color: var(--g400); }

        .ab-section-header { margin-bottom: clamp(40px,6vw,72px); }
        .ab-section-header--centered { text-align: center; }

        .ab-pullquote {
          border-left: 2.5px solid var(--r400);
          padding-left: clamp(18px,2.5vw,24px);
          margin: clamp(24px,3.5vw,36px) 0 0;
        }
        .ab-pullquote p {
          font-family: #000;
          font-size: clamp(15px,1.6vw,20px);
          font-style: italic; font-weight: 500;
          line-height: 1.6; color: #000; margin-bottom: 10px;
        }
        .ab-pullquote cite {
          font-size: 9.5px; font-style: normal; font-weight: 500;
          letter-spacing: .18em; text-transform: uppercase;
          color: var(--r400);
        }

        /* ══════════ HERO ══════════ */
        .ab-hero {
          position: relative; min-height: 100svh;
          display: flex; flex-direction: column; justify-content: flex-end;
          overflow: hidden; background: var(--g900);
        }
        .ab-hero-bg { position: absolute; inset: 0; z-index: 0; }
        .ab-hero-bg img {
          width: 100%; height: 100%; object-fit: cover;
          object-position: center 35%;
          filter: saturate(.8) brightness(.45);
          transform: scale(1.05);
          transition: transform 14s ease-out;
        }
        .ab-hero-bg img.ab-img-rdy { transform: scale(1); }
        .ab-hero-veil {
          position: absolute; inset: 0; z-index: 1;
          background:
            linear-gradient(to top, var(--g900) 0%, transparent 55%),
            linear-gradient(to right, rgba(14,31,20,.68) 0%, transparent 65%);
        }
        .ab-grain {
          position: absolute; inset: 0; z-index: 2; opacity: .028;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 128px; pointer-events: none;
        }
        .ab-hero-body {
          position: relative; z-index: 5;
          padding: clamp(80px,12vw,140px) clamp(20px,5.5vw,88px) clamp(48px,7vw,80px);
          max-width: 900px;
        }
        .ab-hero-h1 {
          font-family: var(--fd);
          font-size: clamp(34px,6vw,78px);
          font-weight: 600; line-height: 1.06;
          color: #fff; letter-spacing: -.015em;
          margin-bottom: clamp(20px,2.5vw,28px);
        }
        .ab-hero-h1 em { font-style: italic; color: var(--g400); font-weight: 600; }
        .ab-hero-sub {
          font-size: clamp(13px,1.4vw,16px);
          font-weight: 400; line-height: 1.78;
          color: #FFF;
          max-width: min(580px,90%);
          margin-bottom: clamp(32px,5vw,52px);
        }
        .ab-hero-stats {
          position: relative; z-index: 6; flex-shrink: 0;
          display: grid; grid-template-columns: repeat(4,1fr);
          border-top: 1px solid rgba(255,255,255,.07);
          background: rgba(14,31,20,.90);
          backdrop-filter: blur(20px) saturate(160%); -webkit-backdrop-filter: blur(20px) saturate(160%);
        }
        .ab-hero-stat {
          padding: clamp(16px,2.5vw,28px) clamp(16px,3vw,40px); border-right: 1px solid rgba(255,255,255,.07); text-align: center;
        }
        .ab-hero-stat:last-child { border-right: none; }
        .ab-hero-stat-n {
          display: block; font-family: var(--fd); font-size: clamp(24px,3.5vw,38px); font-weight: 300; color: #fff; line-height: 1; margin-bottom: 5px; letter-spacing: -.01em;
        }
        .ab-hero-stat-l {
          display: block; font-size: clamp(8px,.95vw,10px); font-weight: 400; letter-spacing: .16em; text-transform: uppercase; color: #FFF;
        }
        /* scroll cue */
        .ab-scroll-cue {
          position: absolute; right: clamp(24px,4vw,56px); bottom: clamp(110px,14vw,140px);
          z-index: 6; display: flex; flex-direction: column; align-items: center; gap: 10px;
        }
        .ab-scroll-txt { font-size: 8.5px; letter-spacing: .22em; text-transform: uppercase; color: rgba(255,255,255,.3); writing-mode: vertical-rl; }
        .ab-scroll-line { width: 1px; height: 44px; background: linear-gradient(to bottom, rgba(127,179,141,.6), transparent); animation: sPulse 2s ease-in-out infinite; }
        @keyframes sPulse { 0%,100%{opacity:.4;transform:scaleY(1)}50%{opacity:1;transform:scaleY(.55)} }

        /* ══════════ WHO WE ARE ══════════ */
        .ab-who {
          background: var(--s100);
          padding: clamp(72px,10vw,130px) clamp(20px,5.5vw,88px);
        }
        .ab-who-inner {
          display: grid; grid-template-columns: 1fr 1.3fr;
          gap: clamp(40px,6vw,88px); align-items: start;
        }
        .ab-who-h2 { font-family: var(--fd); font-size: clamp(28px,4vw,52px); font-weight: 600; line-height: 1.1; letter-spacing: -.015em; margin-bottom: clamp(24px,3vw,36px); }
        .ab-who-h2 em { font-style: italic; color: var(--g500); font-weight: 600; }
        .ab-who-img-wrap {
          position: relative; border-radius: 3px; overflow: hidden;
          margin-top: clamp(24px,3vw,36px);
          aspect-ratio: 4/3;
        }
        .ab-who-img-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .ab-who-img-badge {
          position: absolute; bottom: 0; left: 0; right: 0;
          background: rgba(14,31,20,.88); backdrop-filter: blur(12px);
          padding: 14px 18px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .ab-who-img-badge span { font-size: 11px; font-weight: 400; letter-spacing: .1em; color: #FFF; }
        .ab-who-lead {
          font-size: clamp(15px,1.6vw,18px); font-weight: 400; line-height: 1.72;
          color: #000; margin-bottom: clamp(16px,2vw,22px);
        }
        .ab-who-body {
          font-size: clamp(13px,1.2vw,15px); font-weight: 400; line-height: 1.82;
          color: #000; margin-bottom: clamp(12px,1.5vw,18px);
        }
        .ab-who-body:last-of-type { margin-bottom: 0; }

        /* ══════════ TIMELINE ══════════ */
        .ab-timeline-section {
          background: var(--g900);
          padding: clamp(72px,10vw,130px) clamp(20px,5.5vw,88px);
        }
        .ab-timeline {
          position: relative;
          margin-top: clamp(48px,7vw,80px);
        }
        .ab-timeline-spine {
          position: absolute; left: 50%; top: 0; bottom: 0;
          width: 1px; background: rgba(255,255,255,.07);
          transform: translateX(-50%);
        }
        .ab-tl-item-wrap { width: 100%; }
        .ab-tl-item {
          display: grid; grid-template-columns: 1fr 64px 1fr;
          gap: 0; align-items: start;
          margin-bottom: clamp(36px,5vw,60px);
          --accent: #4a8a5b;
        }
        .ab-tl-item--left  .ab-tl-card { grid-column: 1; order: -1; text-align: right; padding-right: clamp(28px,4vw,52px); }
        .ab-tl-item--left  .ab-tl-node { grid-column: 2; }
        .ab-tl-item--left  .ab-tl-card + * { grid-column: 3; }
        .ab-tl-item--right .ab-tl-node { grid-column: 2; }
        .ab-tl-item--right .ab-tl-card { grid-column: 3; padding-left: clamp(28px,4vw,52px); }

        .ab-tl-node {
          display: flex; flex-direction: column;
          align-items: center; gap: 8px; padding-top: 4px;
        }
        .ab-tl-year {
          font-family: var(--fd); font-size: 12px; font-weight: 600;
          letter-spacing: .12em; color: var(--accent); white-space: nowrap;
        }
        .ab-tl-dot {
          width: 10px; height: 10px; border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 0 3px rgba(255,255,255,.06), 0 0 0 6px rgba(255,255,255,.03);
        }
        .ab-tl-title {
          font-family: var(--fd); font-size: clamp(18px,2vw,24px);
          font-weight: 500; color: #fff; line-height: 1.15;
          margin-bottom: 10px;
        }
        .ab-tl-body {
          font-size: clamp(12px,1.1vw,14px); font-weight: 400;
          line-height: 1.78; color: #fff;
          margin-bottom: 12px;
        }
        .ab-tl-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .ab-tl-item--left .ab-tl-tags { justify-content: flex-end; }
        .ab-tl-tag {
          font-size: 9px; font-weight: 500; letter-spacing: .12em; text-transform: uppercase;
          color: var(--accent); background: rgba(255,255,255,.04);
          border: 1px solid rgba(255,255,255,.07);
          padding: 3px 8px; border-radius: 2px;
        }

        /* ══════════ FARM MODEL ══════════ */
        .ab-farm-section {
          background: var(--s100);
          padding: clamp(72px,10vw,130px) clamp(20px,5.5vw,88px);
        }
        .ab-farm-inner {
          display: grid; grid-template-columns: 1fr 1.1fr;
          gap: clamp(48px,7vw,96px); align-items: start;
        }
        .ab-farm-intro {
          font-size: clamp(13px,1.3vw,15.5px); font-weight: 500; line-height: 1.8;
          color: #000; margin-bottom: clamp(28px,4vw,40px);
        }
        .ab-farm-diagram {
          width: 100%; max-width: 280px;
          background: rgba(14,31,20,.04);
          border: 1px solid rgba(74,138,91,.12);
          border-radius: 50%; padding: clamp(12px,2vw,20px);
          margin: 0 auto;
        }
        .ab-farm-point {
          display: flex; gap: clamp(14px,2vw,20px); align-items: flex-start;
          padding: clamp(16px,2vw,22px) 0;
          border-bottom: 1px solid rgba(44,44,42,.08);
        }
        .ab-farm-point:first-child { border-top: 1px solid rgba(44,44,42,.08); }
        .ab-farm-point-icon {
          flex-shrink: 0; color: var(--g500);
          width: 22px; height: 22px; margin-top: 2px;
        }
        .ab-farm-point-title {
          font-family: var(--fd); font-size: clamp(16px,1.6vw,19px);
          font-weight: 500; color: var(--s800); margin-bottom: 5px;
          display: flex; align-items: baseline; gap: 10px;
        }
        .ab-farm-point-num {
          font-size: 10px; font-weight: 500; letter-spacing: .14em;
          color: var(--r400); flex-shrink: 0;
        }
        .ab-farm-point-body {
          font-size: clamp(12px,1.1vw,13.5px); font-weight: 500;
          color: #000;
          line-height: 1.75; 
        }

        /* ══════════ WHO WE SERVE ══════════ */
        .ab-serve-section {
          background: #fff;
          padding: clamp(72px,10vw,130px) clamp(20px,5.5vw,88px);
        }
        .ab-serve-header-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: clamp(24px,4vw,64px); align-items: end;
        }
        .ab-serve-sub {
          font-size: clamp(13px,1.3vw,15px); font-weight: 500;
          line-height: 1.8; color: #000;
          padding-bottom: 6px;
        }
        .ab-serve-table {
          border: 1px solid rgba(44,44,42,.1); border-radius: 3px; overflow: hidden;
        }
        .ab-serve-thead {
          display: grid; grid-template-columns: 1fr 2fr;
          padding: 12px clamp(16px,2.5vw,28px);
          background: var(--g900);
          font-size: 9.5px; font-weight: 500;
          letter-spacing: .18em; text-transform: uppercase;
          color: #fff;
        }
        .ab-serve-row-wrap { width: 100%; }
        .ab-serve-row {
          display: grid; grid-template-columns: 1fr 2fr 32px;
          align-items: center;
          padding: clamp(16px,2vw,22px) clamp(16px,2.5vw,28px);
          border-bottom: 1px solid rgba(44,44,42,.06);
          cursor: default;
          transition: background .2s ease;
        }
        .ab-serve-row:hover { background: rgba(74,138,91,.03); }
        .ab-serve-row:last-child { border-bottom: none; }
        .ab-serve-client {
          display: flex; align-items: center; gap: 10px;
          font-family: var(--fd); font-size: clamp(15px,1.4vw,18px);
          font-weight: 500; color: #000;
        }
        .ab-serve-client-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent, var(--g500)); flex-shrink: 0;
        }
        .ab-serve-what {
          font-size: clamp(15px,1.1vw,13.5px); font-weight: 500;
          line-height: 1.6; color: #000;
        }
        .ab-serve-arrow {
          color: var(--s500); opacity: .4;
          transition: opacity .2s, transform .2s var(--ep);
        }
        .ab-serve-row:hover .ab-serve-arrow { opacity: 1; transform: translateX(3px); color: var(--accent); }

        /* ══════════ MISSION ══════════ */
        .ab-mission-section {
          position: relative; overflow: hidden;
          background: var(--g900);
          padding: clamp(88px,12vw,160px) clamp(20px,5.5vw,88px);
          text-align: center;
        }
        .ab-mission-inner { position: relative; z-index: 2; max-width: 860px; margin: 0 auto; }
        .ab-mission-quote {
          margin: clamp(24px,3vw,36px) 0 clamp(28px,3.5vw,40px);
        }
        .ab-mission-quote p {
          font-family: var(--fd);
          font-size: clamp(22px,3.5vw,46px);
          font-weight: 060; font-style: italic;
          line-height: 1.25; color: #fff;
          letter-spacing: -.01em;
        }
        .ab-mission-quote em { color: var(--g400); font-style: italic; }
        .ab-mission-rule {
          width: 48px; height: 1.5px;
          background: linear-gradient(90deg, var(--g400), var(--r400));
          margin: 0 auto clamp(16px,2vw,22px);
        }
        .ab-mission-cite {
          font-size: 9.5px; font-style: normal; font-weight: 500;
          letter-spacing: .22em; text-transform: uppercase;
          color: var(--g400);
        }
        .ab-mission-wm {
          position: absolute; bottom: -40px; right: -20px;
          font-family: var(--fd); font-size: clamp(180px,25vw,340px);
          font-weight: 300; color: rgba(127,179,141,.03);
          line-height: 1; pointer-events: none; user-select: none;
          letter-spacing: -.04em; z-index: 1;
        }

        /* ══════════ VALUES ══════════ */
        .ab-values-section {
          background: var(--s100);
          padding: clamp(72px,10vw,130px) clamp(20px,5.5vw,88px);
        }
        .ab-values-grid {
          display: grid; grid-template-columns: repeat(5,1fr);
          gap: 0;
          border: 1px solid rgba(44,44,42,.1);
          border-radius: 3px; overflow: hidden;
        }
        .ab-value-card-wrap { height: 100%; }
        .ab-value-card {
          height: 100%; display: flex; flex-direction: column;
          padding: clamp(24px,3vw,36px) clamp(18px,2.2vw,26px);
          background: #fff;
          border-right: 1px solid rgba(44,44,42,.08);
          position: relative; overflow: hidden;
          transition: background .3s ease;
        }
        .ab-value-card:last-child { border-right: none; }
        .ab-value-card::before {
          content: ''; position: absolute; top: 0; left: 0;
          width: 2px; height: 0; background: var(--accent);
          transition: height .45s cubic-bezier(0.22,1,0.36,1);
        }
        .ab-value-card:hover::before { height: 100%; }
        .ab-value-card:hover { background: #fdfdfb; }
        .ab-value-top { display: flex; align-items: center; gap: 10px; margin-bottom: clamp(14px,2vw,20px); }
        .ab-value-num { font-family: var(--fd); font-size: 12px; font-weight: 500; letter-spacing: .14em; color: var(--accent); }
        .ab-value-rule { height: 1px; flex: 1; background: rgba(44,44,42,.08); transition: background .3s ease; }
        .ab-value-card:hover .ab-value-rule { background: var(--accent); opacity: .3; }
        .ab-value-title {
          font-family: var(--fd); font-size: clamp(17px,1.8vw,22px);
          font-weight: 500; color: #000; line-height: 1.15;
          margin-bottom: clamp(10px,1.2vw,14px);
        }
        .ab-value-body {
          font-size: clamp(11.5px,.95vw,13px); font-weight: 500;
          line-height: 1.78; color: #000;
        }

        /* ══════════ LEADERSHIP ══════════ */
        .ab-leader-section {
          background: var(--g900);
          padding: clamp(72px,10vw,130px) clamp(20px,5.5vw,88px);
        }
        .ab-leader-grid {
          display: grid; grid-template-columns: 1fr 1.6fr;
          gap: clamp(40px,6vw,80px); align-items: start;
          margin-top: clamp(40px,5vw,60px);
        }
        .ab-leader-photo-col { width: 100%; }
        .ab-leader-photo-wrap {
          position: relative; border-radius: 3px; overflow: hidden;
          aspect-ratio: 3/4;
        }
        .ab-leader-photo-wrap img { width: 100%; height: 100%; object-fit: cover; object-position: center top; display: block; filter: grayscale(15%); }
        .ab-leader-nameplate {
          position: absolute; bottom: 0; left: 0; right: 0;
          background: rgba(14,31,20,.9); backdrop-filter: blur(14px);
          padding: 18px 20px;
          display: flex; flex-direction: column; gap: 4px;
        }
        .ab-leader-name { font-family: var(--fd); font-size: 20px; font-weight: 500; color: #fff; }
        .ab-leader-role { font-size: 10px; font-weight: 500; letter-spacing: .12em; color: #fff; }
        .ab-leader-site { font-size: 9.5px; font-weight: 500; letter-spacing: .1em; color: var(--g400); text-decoration: none; margin-top: 4px; transition: color .2s; }
        .ab-leader-site:hover { color: #fff; }
        .ab-leader-lead {
          font-size: clamp(15px,1.6vw,18px); font-weight: 500; line-height: 1.72;
          color: #fff; margin-bottom: clamp(16px,2vw,22px);
        }
        .ab-leader-body {
          font-size: clamp(12.5px,1.1vw,14px); font-weight: 500; line-height: 1.82;
          color: #fff; margin-bottom: clamp(12px,1.5vw,16px);
        }
        .ab-leader-milestones, .ab-leader-awards { margin-top: clamp(24px,3vw,32px); }
        .ab-leader-milestones-h {
          font-size: 9.5px; font-weight: 500; letter-spacing: .2em; text-transform: uppercase;
          color: var(--g400); margin-bottom: 14px;
        }
        .ab-leader-list { padding-left: 0; list-style: none; }
        .ab-leader-list li {
          font-size: clamp(12px,1.1vw,13.5px); font-weight: 500; line-height: 1.7;
          color: #fff; padding: 7px 0;
          border-bottom: 1px solid rgba(255,255,255,.05);
          padding-left: 14px; position: relative;
        }
        .ab-leader-list li::before { content: '—'; position: absolute; left: 0; color: var(--g400); font-size: 10px; }
        .ab-awards-list { display: flex; flex-direction: column; gap: 0; }
        .ab-award-row {
          display: flex; gap: 16px; align-items: baseline;
          padding: 9px 0; border-bottom: 1px solid rgba(255,255,255,.05);
        }
        .ab-award-year {
          font-size: 12px; font-weight: 500; letter-spacing: .12em;
          color: var(--r400); flex-shrink: 0; width: 36px;
        }
        .ab-award-name { font-size: clamp(11.5px,1vw,13px); font-weight: 500; color: #fff; line-height: 1.5; }

        /* ══════════ CTA BLOCK ══════════ */
        .ab-cta-section {
          position: relative; overflow: hidden;
          background: var(--g800);
          padding: clamp(88px,12vw,160px) clamp(20px,5.5vw,88px);
          text-align: center;
        }
        .ab-cta-section::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse at 20% 50%, rgba(74,138,91,.12) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 50%, rgba(224,122,95,.08) 0%, transparent 60%);
          pointer-events: none;
        }
        .ab-cta-inner { position: relative; z-index: 2; max-width: 720px; margin: 0 auto; }
        .ab-cta-bg-num {
          position: absolute; bottom: -30px; right: -10px;
          font-family: var(--fd); font-size: clamp(160px,22vw,300px);
          font-weight: 300; color: rgba(127,179,141,.04);
          line-height: 1; pointer-events: none; user-select: none;
        }
        .ab-cta-h2 {
          font-family: var(--fd); font-size: clamp(28px,4vw,54px);
          font-weight: 600; line-height: 1.1; color: #fff;
          letter-spacing: -.015em;
          margin-bottom: clamp(16px,2.5vw,24px);
        }
        .ab-cta-h2 em { font-style: italic; color: var(--g400); font-weight: 600; }
        .ab-cta-sub {
          font-size: clamp(13px,1.3vw,15px); font-weight: 500;
          line-height: 1.8; color: #fff;
          max-width: 600px; margin: 0 auto clamp(36px,5vw,52px);
        }
        .ab-cta-btns { display: flex; align-items: center; justify-content: center; gap: clamp(10px,2vw,18px); flex-wrap: wrap; }
        .ab-btn-primary {
          display: inline-flex; align-items: center; gap: 9px;
          font-family: var(--fb); font-size: 11px; font-weight: 500;
          letter-spacing: .12em; text-transform: uppercase;
          color: var(--g900); background: var(--g400);
          padding: 14px 28px; border-radius: 2px; text-decoration: none;
          transition: background .22s, transform .2s var(--ep);
        }
        .ab-btn-primary:hover { background: var(--g500); color: #fff; transform: translateY(-2px); }
        .ab-btn-secondary {
          display: inline-flex; align-items: center;
          font-family: var(--fb); font-size: 11px; font-weight: 400;
          letter-spacing: .12em; text-transform: uppercase;
          color: rgba(255,255,255,.75);
          border: 1px solid rgba(255,255,255,.2);
          padding: 14px 28px; border-radius: 2px; text-decoration: none;
          transition: border-color .22s, color .22s, transform .2s;
        }
        .ab-btn-secondary:hover { border-color: rgba(255,255,255,.6); color: #fff; transform: translateY(-2px); }
        .ab-btn-ghost {
          display: inline-flex; align-items: center;
          font-family: var(--fb); font-size: 11px; font-weight: 400;
          letter-spacing: .12em; text-transform: uppercase;
          color: rgba(255,255,255,.4);
          border-bottom: 1px solid rgba(255,255,255,.15);
          padding: 14px 0 3px; text-decoration: none;
          transition: color .22s, border-color .22s;
        }
        .ab-btn-ghost:hover { color: rgba(255,255,255,.8); border-color: var(--g400); }

        /* ══ RESPONSIVE ══════════════════════════════════ */
        @media (max-width: 1100px) {
          .ab-values-grid { grid-template-columns: repeat(3,1fr); }
          .ab-value-card:nth-child(3) { border-right: none; }
          .ab-value-card:nth-child(4),
          .ab-value-card:nth-child(5) { border-top: 1px solid rgba(44,44,42,.08); }
          .ab-value-card:nth-child(5) { border-right: none; }
        }
        @media (max-width: 900px) {
          .ab-who-inner { grid-template-columns: 1fr; }
          .ab-who-img-wrap { max-width: 480px; }
          .ab-farm-inner { grid-template-columns: 1fr; }
          .ab-farm-diagram { max-width: 220px; }
          .ab-serve-header-grid { grid-template-columns: 1fr; }
          .ab-serve-thead { grid-template-columns: 1fr 1fr; }
          .ab-serve-row { grid-template-columns: 1fr 1fr 28px; }
          .ab-leader-grid { grid-template-columns: 1fr; }
          .ab-leader-photo-wrap { max-width: 360px; aspect-ratio: 1/1; }
        }
        @media (max-width: 768px) {
          /* timeline: single column */
          .ab-timeline-spine { left: 20px; transform: none; }
          .ab-tl-item { grid-template-columns: 48px 1fr; }
          .ab-tl-item--left .ab-tl-card,
          .ab-tl-item--right .ab-tl-card { grid-column: 2; order: unset; text-align: left; padding-left: clamp(16px,3vw,24px); padding-right: 0; }
          .ab-tl-item--left .ab-tl-node,
          .ab-tl-item--right .ab-tl-node { grid-column: 1; }
          .ab-tl-item--left .ab-tl-tags { justify-content: flex-start; }
          .ab-values-grid { grid-template-columns: repeat(2,1fr); }
          .ab-value-card:nth-child(3) { border-right: 1px solid rgba(44,44,42,.08); }
          .ab-value-card:nth-child(2),
          .ab-value-card:nth-child(4) { border-right: none; }
          .ab-value-card:nth-child(3),
          .ab-value-card:nth-child(4),
          .ab-value-card:nth-child(5) { border-top: 1px solid rgba(44,44,42,.08); }
          .ab-hero-stats { grid-template-columns: repeat(2,1fr); width: 100%; max-width: none; }
          .ab-hero-stat:nth-child(2) { border-right: none; }
          .ab-hero-stat:nth-child(3), .ab-hero-stat:nth-child(4) { border-top: 1px solid rgba(255,255,255,.07); }
          .ab-hero-stat:nth-child(4) { border-right: none; border-bottom: none; }
        }
        @media (max-width: 540px) {
          .ab-values-grid { grid-template-columns: 1fr; }
          .ab-value-card { border-right: none !important; border-top: 1px solid rgba(44,44,42,.08) !important; }
          .ab-value-card:first-child { border-top: none !important; }
          .ab-serve-row { grid-template-columns: 1fr; gap: 6px; }
          .ab-serve-arrow { display: none; }
          .ab-serve-thead { display: none; }
          .ab-cta-btns { flex-direction: column; align-items: center; }
          .ab-scroll-cue { display: none; }
        }
      `}</style>

      <div className="gc-about">
        <AboutHero />
        <WhoWeAre />
        <Timeline />
        <FarmModel />
        <WhoWeServe />
        <Mission />
        <Values />
        <Leadership />
        <UniversalCTA />
      </div>
    </>
  );
}