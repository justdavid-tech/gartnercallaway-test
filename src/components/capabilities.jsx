import { useEffect, useRef, useState } from "react";

/* ─── capability data ───────────────────────────────────────── */
const CAPABILITIES = [
  {
    num: "01",
    title: "Vertical Farming",
    location: "Urban Farms · Lekki, Lagos, Nigeria",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="6" y="8" width="16" height="14" rx="1" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M10 22V8M14 22V6M18 22V8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
        <path d="M4 22h20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M8 12h4M8 16h4" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
    description: "Hydroponic towers and climate-controlled growing systems producing premium leafy greens, herbs, and microgreens 365 days a year independent of rainfall and soil degradation, delivering consistent quality to Lagos's premium hospitality and retail sectors.",
    technologies: ["Hydroponics", "Climate Control", "LED Optimization", "Year-round Production"],
    metrics: { label: "Leafy Greens Capacity" },
    accent: "#4a8a5b",
  },
  {
    num: "02",
    title: "CropX Precision Sensing",
    location: "Across the Operation",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.2"/>
        <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M14 4V7M14 21V24M4 14H7M21 14H24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M8 8L10 10M18 18L20 20M18 8L20 6M8 20L10 18" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
    description: "Real-time soil moisture, temperature, electrical conductivity, and salinity monitoring across 200+ hectares. Every data point is timestamped, GPS-referenced, cloud-archived, and accessible via dashboard enabling precision irrigation, fertigation, and yield prediction.",
    technologies: ["Soil Moisture", "Temperature", "Electrical Conductivity", "Salinity"],
    metrics: { label: "Monitored Farmland" },
    accent: "#FF0000",
  },
  {
    num: "03",
    title: "10 + 4",
    location: "Institutional Service Lines + Four Architectures",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="4" y="8" width="20" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M4 13h20" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M9 18h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M7 4L14 8L21 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="14" cy="8" r="1.5" fill="currentColor"/>
      </svg>
    ),
    description: "Ten institutional service lines spanning pre-loan verification, in-season monitoring, harvest confirmation, claims investigation, audit reporting, capacity building, irrigation management, soil mapping, crop modelling, and ESG compliance delivered through four integrated service architectures: Farm Design & Build, Institutional Field Services, Production & Processing, and GC Academy.",
    technologies: ["10 Service Lines", "4 Architectures", "Full Stack", "Institutional Grade"],
    metrics: { label: "Integrated Capabilities" },
    accent: "#4a8a5b",
  },
];

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

/* ─── single capability card ────────────────────────────────── */
function CapabilityCard({ capability, index }) {
  const [ref, vis] = useInView(0.1);
  const delay = index * 100;

  return (
    <article
      ref={ref}
      className="gc-cap-card"
      style={{
        "--accent": capability.accent,
        opacity:    vis ? 1 : 0,
        transform:  vis ? "translateY(0)" : "translateY(36px)",
        transition: `opacity .8s ease ${delay}ms, transform .9s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
      aria-label={`Capability ${capability.num}: ${capability.title}`}
    >
      {/* top: number + icon + location */}
      <div className="gc-cap-top">
        <div className="gc-cap-badge">
          <span className="gc-cap-num">{capability.num}</span>
          <span className="gc-cap-icon">{capability.icon}</span>
        </div>
        <div className="gc-cap-location">
          <span className="gc-cap-location-dot" />
          <span>{capability.location}</span>
        </div>
      </div>

      {/* accent line */}
      <div className="gc-cap-rule" />

      {/* title */}
      <h3 className="gc-cap-title">{capability.title}</h3>

      {/* description */}
      <p className="gc-cap-description">{capability.description}</p>

      {/* technologies tags */}
      <div className="gc-cap-tags">
        {capability.technologies.map(tag => (
          <span key={tag} className="gc-cap-tag">{tag}</span>
        ))}
      </div>

      {/* metric card */}
      <div className="gc-cap-metric">
        <div className="gc-cap-metric-label">{capability.metrics.label}</div>
      </div>
    </article>
  );
}

/* ─── section header (same elegant style) ───────────────────── */
function SectionHeader() {
  const [ref, vis] = useInView(0.3);
  return (
    <header
      ref={ref}
      className="gc-cap-header"
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(24px)",
        transition: "opacity .8s ease, transform .9s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <div className="gc-cap-eyebrow">
        <span className="gc-cap-eyebrow-line" aria-hidden="true" />
        Operational Capability
      </div>
      <h2 className="gc-cap-heading">
        Precision Infrastructure<br />
        <em>Deployed At Scale</em>
      </h2>
      <p className="gc-cap-subhead">
        From urban vertical farms to estate-wide sensor networks and integrated service architectures. Our capability stack delivers bankable, verifiable, and export-ready agricultural production.
      </p>
    </header>
  );
}

/* ─── main export ───────────────────────────────────────────── */
export default function CapabilityStrip() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
        /* ── tokens + reset ── */
        .gc-cap-section, .gc-cap-section * { box-sizing: border-box; }
        .gc-cap-section {
          --g900: #0e1f14;
          --g800: #1a3321;
          --g500: #4a8a5b;
          --g400: #7fb38d;
          --g200: #e1f0e5;
          --r400: #FF0000;
          --stone-100: #f4f4f2;
          --stone-500: #787870;
          --stone-800: #2c2c2a;
          --fd: "Montserrat", system-ui, sans-serif;
          --fb: "Montserrat", system-ui, sans-serif;
          --ep: cubic-bezier(0.34, 1.56, 0.64, 1);
          --es: cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        /* ── section shell ── */
        .gc-cap-section {
          background: var(--stone-100);
          padding: clamp(72px, 10vw, 120px) clamp(20px, 6vw, 96px);
          position: relative;
          overflow: hidden;
          font-family: var(--fb);
        }

        /* decorative backdrop elements */
        .gc-cap-deco {
          position: absolute;
          top: -200px; right: -200px;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(74,138,91,.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .gc-cap-deco-2 {
          position: absolute;
          bottom: -120px; left: -120px;
          width: 400px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(224,122,95,.04) 0%, transparent 70%);
          pointer-events: none;
        }
        
        /* large ghost number watermark */
        .gc-cap-watermark {
          position: absolute;
          bottom: 20px; right: 20px;
          font-family: var(--fd);
          font-size: clamp(180px, 25vw, 320px);
          font-weight: 300;
          color: rgba(74,138,91,.03);
          line-height: 1;
          pointer-events: none;
          user-select: none;
          letter-spacing: -.04em;
        }

        /* ── header layout (matched from four pillars) ── */
        .gc-cap-header {
          max-width: 800px;
          margin: 0 auto clamp(56px, 8vw, 96px);
          text-align: center;
        }
        .gc-cap-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 16.5px; font-weight: 600;
          letter-spacing: .22em; text-transform: uppercase;
          color: var(--r400);
          margin-bottom: clamp(16px, 2vw, 24px);
        }
        .gc-cap-eyebrow-line {
          display: block; width: 28px; height: 1px;
          background: var(--r400); flex-shrink: 0;
        }
        .gc-cap-heading {
          font-family: var(--fd);
          font-size: clamp(34px, 5.5vw, 68px);
          font-weight: 600; line-height: 1.08;
          color: var(--stone-800);
          letter-spacing: -.015em;
          margin: 0 0 clamp(16px, 2vw, 24px);
        }
        .gc-cap-heading em {
          font-style: italic; font-weight: 600;
          color: var(--g500);
        }
        .gc-cap-subhead {
          font-size: clamp(13.5px, 1.4vw, 16px);
          font-weight: 500; line-height: 1.78;
          color: #000;
          max-width: 640px; margin: 0 auto;
        }

        /* ── grid ── */
        .gc-cap-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          border: 1px solid rgba(44,44,42,.1);
          border-radius: 4px;
          overflow: hidden;
          position: relative; z-index: 1;
        }

        /* ── capability card ── */
        .gc-cap-card {
          position: relative;
          padding: clamp(28px, 3.5vw, 40px) clamp(24px, 3vw, 36px);
          background: #fff;
          border-right: 1px solid rgba(44,44,42,.08);
          display: flex; flex-direction: column;
          transition: background .3s ease;
        }
        .gc-cap-card:last-child { border-right: none; }
        .gc-cap-card:hover { background: #fdfdfb; }

        /* accent bar on hover */
        .gc-cap-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 3px; height: 0;
          background: var(--accent);
          transition: height .45s cubic-bezier(0.22,1,0.36,1);
        }
        .gc-cap-card:hover::before { height: 100%; }

        /* ── top section: badge + location ── */
        .gc-cap-top {
          display: flex; align-items: flex-start;
          justify-content: space-between;
          margin-bottom: clamp(18px, 2.5vw, 24px);
          flex-wrap: wrap;
          gap: 12px;
        }
        .gc-cap-badge {
          display: flex; align-items: center;
          gap: 12px;
        }
        .gc-cap-num {
          font-family: var(--fd);
          font-size: clamp(13px, 1.4vw, 15px);
          font-weight: 600;
          letter-spacing: .14em;
          color: var(--accent);
          line-height: 1;
        }
        .gc-cap-icon {
          color: var(--stone-500);
          opacity: .6;
          transition: opacity .25s ease, color .25s ease;
          line-height: 0;
        }
        .gc-cap-card:hover .gc-cap-icon {
          opacity: 1; color: var(--accent);
        }
        .gc-cap-location {
          display: flex; align-items: center;
          gap: 8px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: #00000;
        }
        .gc-cap-location-dot {
          width: 4px; height: 4px;
          border-radius: 50%;
          background: var(--g400);
        }

        /* ── accent rule ── */
        .gc-cap-rule {
          width: 32px; height: 1.5px;
          background: var(--accent);
          margin-bottom: clamp(16px, 2vw, 22px);
          transition: width .4s var(--ep);
        }
        .gc-cap-card:hover .gc-cap-rule { width: 52px; }

        /* ── title ── */
        .gc-cap-title {
          font-family: var(--fd);
          font-size: clamp(24px, 2.6vw, 32px);
          font-weight: 600; line-height: 1.15;
          color: var(--stone-800);
          margin: 0 0 clamp(12px, 1.5vw, 16px);
          letter-spacing: -.01em;
        }

        /* ── description ── */
        .gc-cap-description {
          font-size: clamp(12.5px, 1.1vw, 14px);
          font-weight: 500; line-height: 1.75;
          color: #000;
          margin: 0 0 clamp(16px, 2vw, 20px);
          flex: 1;
        }

        /* ── tags ── */
        .gc-cap-tags {
          display: flex; flex-wrap: wrap;
          gap: 8px;
          margin-bottom: clamp(20px, 2.5vw, 28px);
        }
        .gc-cap-tag {
          font-size: 9px; font-weight: 500;
          letter-spacing: .12em; text-transform: uppercase;
          color: var(--accent);
          background: rgba(74,138,91,.08);
          padding: 4px 10px; border-radius: 2px;
          transition: background .2s ease;
        }
        .gc-cap-card:hover .gc-cap-tag {
          background: rgba(74,138,91,.12);
        }

        /* ── metric card ── */
        .gc-cap-metric {
          margin-top: auto;
          padding: 14px 16px;
          background: rgba(74,138,91,.05);
          border-radius: 4px;
          text-align: center;
          transition: background .25s ease;
        }
        .gc-cap-card:hover .gc-cap-metric {
          background: rgba(74,138,91,.08);
        }
        .gc-cap-metric-value {
          font-family: var(--fd);
          font-size: clamp(28px, 3vw, 36px);
          font-weight: 400;
          color: var(--accent);
          line-height: 1;
          margin-bottom: 6px;
        }
        .gc-cap-metric-unit {
          font-size: 14px;
          font-weight: 300;
        }
        .gc-cap-metric-label {
          font-size: 15px;
          font-weight: 600;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: #000;
        }

        /* ── RESPONSIVE ── */

        /* 2-col on tablet */
        @media (max-width: 1024px) {
          .gc-cap-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .gc-cap-card { 
            border-right: 1px solid rgba(44,44,42,.08); 
          }
          .gc-cap-card:nth-child(2) { 
            border-right: none; 
          }
          .gc-cap-card:nth-child(3) {
            border-right: none;
            border-top: 1px solid rgba(44,44,42,.08);
            grid-column: span 2;
          }
        }

        /* 1-col on mobile */
        @media (max-width: 640px) {
          .gc-cap-grid {
            grid-template-columns: 1fr;
          }
          .gc-cap-card {
            border-right: none !important;
            border-top: 1px solid rgba(44,44,42,.08);
          }
          .gc-cap-card:first-child { border-top: none; }
          .gc-cap-card:nth-child(3) {
            grid-column: auto;
          }
          .gc-cap-top {
            flex-direction: column;
            align-items: flex-start;
          }
          .gc-cap-deco, .gc-cap-deco-2 { display: none; }
        }

        /* hide watermark on tablet/mobile */
        @media (max-width: 768px) {
          .gc-cap-watermark { display: none; }
        }
      `}</style>

      <section className="gc-cap-section" aria-labelledby="cap-heading">
        {/* decorative elements */}
        <div className="gc-cap-deco" aria-hidden="true" />
        <div className="gc-cap-deco-2" aria-hidden="true" />
        <div className="gc-cap-watermark" aria-hidden="true">GC</div>

        {/* header */}
        <SectionHeader />

        {/* grid */}
        <div className="gc-cap-grid" id="cap-heading" role="list">
          {CAPABILITIES.map((cap, i) => (
            <CapabilityCard key={cap.num} capability={cap} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}