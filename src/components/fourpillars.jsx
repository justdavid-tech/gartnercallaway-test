import { useEffect, useRef, useState } from "react";

/* ─── pillar data ───────────────────────────────────────────── */
const PILLARS = [
  {
    num: "01",
    title: "Regeneration",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path d="M14 4C14 4 6 8.5 6 16C6 20.418 9.582 24 14 24C18.418 24 22 20.418 22 16C22 8.5 14 4 14 4Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
        <path d="M14 10V24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M14 17L10 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M14 14L18 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    body: "Our farms are designed as ecosystems, not extraction sites. Economic trees replace shade nets. Animal integration replaces synthetic pest control. Crop and tree residues feed the soil that grows the next harvest. Every hectare of our work leaves the land more productive than we found it.",
    quote: "We have spent too long sacrificing perennial abundance for annual convenience. The ultimate agricultural innovation isn't just about higher yields today; it is about constructing systems that regenerate the resources needed for the next century.",
    accent: "var(--g500)", /* green */
  },
  {
    num: "02",
    title: "Precision",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="9" stroke="currentColor" strokeWidth="1.2"/>
        <circle cx="14" cy="14" r="3" stroke="currentColor" strokeWidth="1.2"/>
        <line x1="14" y1="3" x2="14" y2="6"  stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="14" y1="22" x2="14" y2="25" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="3"  y1="14" x2="6"  y2="14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="22" y1="14" x2="25" y2="14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    body: "We do not farm by intuition. Sensors track soil moisture, temperature, electrical conductivity, and salinity in real time across our hectarage. Drip irrigation and fertigation deliver water and nutrients drop by drop. Every output is timestamped, GPS-referenced, cloud-archived, and institutionally defensible.",
    quote: "The era of rain-fed gambling is over. To move from precarious subsistence to bankable prosperity, we must replace the blanket application of chemicals with the precision of data.",
    accent: "var(--r400)", /* red */
  },
  {
    num: "03",
    title: "Integration",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="4"  y="4"  width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
        <rect x="16" y="4"  width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
        <rect x="4"  y="16" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
        <rect x="16" y="16" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
        <line x1="12" y1="8"  x2="16" y2="8"  stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="8"  y1="12" x2="8"  y2="16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="20" y1="12" x2="20" y2="16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <line x1="12" y1="20" x2="16" y2="20" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    body: "Drip irrigation and agroforestry. Solar infrastructure and on-farm processing. Annual crops and perennial trees. Livestock and soil renewal. We do not choose one model and reject the others. We weave them into a single operating system where each component subsidises the next.",
    quote: "True resilience for African agriculture lies not in choosing between the past and the future, but in a thoughtful amalgamation of both.",
    accent: "var(--g500)", /* green */
  },
  {
    num: "04",
    title: "Institutional Readiness",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect x="4" y="6" width="20" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M4 11h20" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M9 16h4M9 19h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M19 14l1.5 1.5L23 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    body: "Banks, insurers, donor agencies, government programmes, and anchor agribusinesses across Nigeria rely on us as their independent verification, irrigation, and crop management partner. Every report we issue is bank-ready. Every dataset we deliver is audit-defensible. Every contract is milestone-billed and SLA-governed.",
    quote: null,
    accent: "var(--r400)", /* red */
  },
];

/* ─── intersection hook ─────────────────────────────────────── */
function useInView(threshold = 0.18) {
  const ref  = useRef(null);
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

/* ─── single pillar card ────────────────────────────────────── */
function PillarCard({ pillar, index }) {
  const [ref, vis] = useInView(0.15);
  const delay = index * 110;

  return (
    <article
      ref={ref}
      className="gc-pillar"
      style={{
        "--accent": pillar.accent,
        opacity:    vis ? 1 : 0,
        transform:  vis ? "translateY(0)" : "translateY(36px)",
        transition: `opacity .8s ease ${delay}ms, transform .9s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
      aria-label={`Pillar ${pillar.num}: ${pillar.title}`}
    >
      {/* top: number + icon */}
      <div className="gc-pillar-top">
        <span className="gc-pillar-num">{pillar.num}</span>
        <span className="gc-pillar-icon">{pillar.icon}</span>
      </div>

      {/* accent line */}
      <div className="gc-pillar-rule" />

      {/* title */}
      <h3 className="gc-pillar-title">{pillar.title}</h3>

      {/* body */}
      <p className="gc-pillar-body">{pillar.body}</p>

      {/* quote */}
      {pillar.quote && (
        <blockquote className="gc-pillar-quote">
          <p>"{pillar.quote}"</p>
          <cite>— Yomi Williams</cite>
        </blockquote>
      )}

      {/* no-quote placeholder keeps card height consistent */}
      {!pillar.quote && <div className="gc-pillar-no-quote" />}
    </article>
  );
}

/* ─── section header ────────────────────────────────────────── */
function SectionHeader() {
  const [ref, vis] = useInView(0.3);
  return (
    <header
      ref={ref}
      className="gc-pillars-header"
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(24px)",
        transition: "opacity .8s ease, transform .9s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <div className="gc-pillars-eyebrow">
        <span className="gc-pillars-eyebrow-line" aria-hidden="true" />
        Value Proposition
      </div>
      <h2 className="gc-pillars-heading">
        Four principles.<br />
        One <em>operating system.</em>
      </h2>
      <p className="gc-pillars-subhead">
        Every farm we design, every service we deliver, every report we issue
        is governed by the same four commitments not as values on a wall,
        but as engineering constraints we hold ourselves to.
      </p>
    </header>
  );
}

/* ─── main export ───────────────────────────────────────────── */
export default function FourPillars() {
  return (
    <>
      <style>{`
        /* ── tokens + reset ── */
        .gc-pillars-section, .gc-pillars-section * { box-sizing: border-box; }
        .gc-pillars-section {
          --g900: #0e1f14;
          --g800: #1a3321;
          --g500: #4a8a5b;
<<<<<<< HEAD
          --g400: #FF0000;
=======
          --g400: #7fb38d;
>>>>>>> c74e62832805ac203e201e619a100373de3f16e2
          --g200: #e1f0e5;
          --r400: #e07a5f;
          --stone-100: #f4f4f2;
          --stone-500: #787870;
          --stone-800: #2c2c2a;
          --fd: "Cormorant Garamond", Georgia, serif;
          --fb: "DM Sans", system-ui, sans-serif;
          --ep: cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        /* ── section shell ── */
        .gc-pillars-section {
          background: var(--stone-100);
          padding: clamp(72px, 10vw, 140px) clamp(20px, 6vw, 96px);
          position: relative;
          overflow: hidden;
          font-family: var(--fb);
        }

        /* ── decorative backdrop ── */
        .gc-pillars-deco {
          position: absolute;
          top: -160px; right: -160px;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(74,138,91,.07) 0%, transparent 70%);
          pointer-events: none;
        }
        .gc-pillars-deco-2 {
          position: absolute;
          bottom: -100px; left: -100px;
          width: 400px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(224,122,95,.05) 0%, transparent 70%);
          pointer-events: none;
        }
        /* large ghost number watermark */
        .gc-pillars-watermark {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          font-family: var(--fd);
          font-size: clamp(200px, 30vw, 380px);
          font-weight: 300;
          color: rgba(74,138,91,.04);
          line-height: 1;
          pointer-events: none;
          user-select: none;
          letter-spacing: -.04em;
          white-space: nowrap;
        }

        /* ── header layout ── */
        .gc-pillars-header {
          max-width: 680px;
          margin: 0 auto clamp(56px, 8vw, 96px);
          text-align: center;
        }
        .gc-pillars-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 9.5px; font-weight: 500;
          letter-spacing: .22em; text-transform: uppercase;
<<<<<<< HEAD
          color: #FF0000;
=======
          color: var(--r400);
>>>>>>> c74e62832805ac203e201e619a100373de3f16e2
          margin-bottom: clamp(16px, 2vw, 24px);
        }
        .gc-pillars-eyebrow-line {
          display: block; width: 28px; height: 1px;
<<<<<<< HEAD
          background: #FF0000; flex-shrink: 0;
=======
          background: var(--r400); flex-shrink: 0;
>>>>>>> c74e62832805ac203e201e619a100373de3f16e2
        }
        .gc-pillars-heading {
          font-family: var(--fd);
          font-size: clamp(34px, 5.5vw, 68px);
          font-weight: 300; line-height: 1.08;
          color: var(--stone-800);
          letter-spacing: -.015em;
          margin: 0 0 clamp(16px, 2vw, 24px);
        }
        .gc-pillars-heading em {
          font-style: italic; font-weight: 300;
          color: var(--g500);
        }
        .gc-pillars-subhead {
          font-size: clamp(13.5px, 1.4vw, 16px);
          font-weight: 300; line-height: 1.78;
          color: var(--stone-500);
          max-width: 560px; margin: 0 auto;
        }

        /* ── grid ── */
        .gc-pillars-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          border: 1px solid rgba(44,44,42,.1);
          border-radius: 4px;
          overflow: hidden;
          position: relative; z-index: 1;
        }

        /* ── pillar card ── */
        .gc-pillar {
          position: relative;
          padding: clamp(28px, 3.5vw, 48px) clamp(22px, 2.8vw, 36px);
          background: #fff;
          border-right: 1px solid rgba(44,44,42,.08);
          display: flex; flex-direction: column;
          transition: background .3s ease;
          cursor: default;
        }
        .gc-pillar:last-child { border-right: none; }
        .gc-pillar:hover { background: #fdfdfb; }

        /* hover: show full-height accent line on left */
        .gc-pillar::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 3px; height: 0;
          background: var(--accent);
          transition: height .45s cubic-bezier(0.22,1,0.36,1);
        }
        .gc-pillar:hover::before { height: 100%; }

        /* ── top: num + icon ── */
        .gc-pillar-top {
          display: flex; align-items: flex-start;
          justify-content: space-between;
          margin-bottom: clamp(18px, 2.5vw, 28px);
        }
        .gc-pillar-num {
          font-family: var(--fd);
          font-size: clamp(13px, 1.4vw, 15px);
          font-weight: 400;
          letter-spacing: .14em;
          color: var(--accent);
          line-height: 1;
        }
        .gc-pillar-icon {
          color: var(--stone-500);
          opacity: .6;
          transition: opacity .25s ease, color .25s ease;
          line-height: 0;
        }
        .gc-pillar:hover .gc-pillar-icon {
          opacity: 1; color: var(--accent);
        }

        /* ── accent rule ── */
        .gc-pillar-rule {
          width: 28px; height: 1.5px;
          background: var(--accent);
          margin-bottom: clamp(16px, 2vw, 22px);
          transition: width .4s var(--ep);
        }
        .gc-pillar:hover .gc-pillar-rule { width: 48px; }

        /* ── title ── */
        .gc-pillar-title {
          font-family: var(--fd);
          font-size: clamp(22px, 2.4vw, 30px);
          font-weight: 400; line-height: 1.1;
          color: var(--stone-800);
          margin: 0 0 clamp(14px, 1.8vw, 20px);
          letter-spacing: -.01em;
        }

        /* ── body ── */
        .gc-pillar-body {
          font-size: clamp(12.5px, 1.1vw, 14px);
          font-weight: 300; line-height: 1.82;
          color: var(--stone-500);
          margin: 0;
          flex: 1;
        }

        /* ── quote ── */
        .gc-pillar-quote {
          margin: clamp(20px, 2.5vw, 28px) 0 0;
          padding: clamp(14px, 1.8vw, 18px) 0 0;
          border-top: 1px solid rgba(44,44,42,.08);
        }
        .gc-pillar-quote p {
          font-family: var(--fd);
          font-size: clamp(13px, 1.2vw, 15.5px);
          font-style: italic; font-weight: 300;
          line-height: 1.65;
          color: var(--stone-800);
          margin: 0 0 10px;
        }
        .gc-pillar-quote cite {
          display: block;
          font-size: 9.5px; font-style: normal;
          font-weight: 500; letter-spacing: .18em;
          text-transform: uppercase;
          color: var(--accent);
        }

        /* placeholder when no quote — keeps uniform card height */
        .gc-pillar-no-quote {
          margin-top: clamp(20px, 2.5vw, 28px);
          height: 1px;
        }

        /* ── RESPONSIVE ── */

        /* 2-col on tablet */
        @media (max-width: 1024px) {
          .gc-pillars-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .gc-pillar { border-right: 1px solid rgba(44,44,42,.08); }
          .gc-pillar:nth-child(2) { border-right: none; }
          .gc-pillar:nth-child(3) {
            border-right: 1px solid rgba(44,44,42,.08);
            border-top: 1px solid rgba(44,44,42,.08);
          }
          .gc-pillar:nth-child(4) {
            border-right: none;
            border-top: 1px solid rgba(44,44,42,.08);
          }
        }

        /* 1-col on mobile */
        @media (max-width: 600px) {
          .gc-pillars-grid {
            grid-template-columns: 1fr;
          }
          .gc-pillar {
            border-right: none !important;
            border-top: 1px solid rgba(44,44,42,.08);
          }
          .gc-pillar:first-child { border-top: none; }
          .gc-pillars-deco, .gc-pillars-deco-2 { display: none; }
        }

        /* hide watermark on mobile to avoid layout bleed */
        @media (max-width: 768px) {
          .gc-pillars-watermark { display: none; }
        }
      `}</style>

      <section className="gc-pillars-section" aria-labelledby="pillars-heading">

        {/* decorative elements */}
        <div className="gc-pillars-deco"      aria-hidden="true" />
        <div className="gc-pillars-deco-2"    aria-hidden="true" />
        <div className="gc-pillars-watermark" aria-hidden="true">GC</div>

        {/* header */}
        <SectionHeader />

        {/* grid */}
        <div className="gc-pillars-grid" id="pillars-heading" role="list">
          {PILLARS.map((p, i) => (
            <PillarCard key={p.num} pillar={p} index={i} />
          ))}
        </div>

      </section>
    </>
  );
}