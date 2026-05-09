import { useEffect, useRef, useState } from "react";

/* ─── service data ──────────────────────────────────────────── */
const SERVICES = [
  {
    num: "01",
    title: "Farm Design\n& Build",
    href: "/SubServices/productionpage",
    oneliner: "For investors, estates, and government agencies commissioning new farms",
    description:
      "We engineer integrated farm systems from soil survey to first harvest combining drip irrigation, agroforestry layout, solar infrastructure, and precision sensing into a single construction package.",
    tags: ["Irrigation Engineering", "Agroforestry Layout", "Solar Integration", "Soil Mapping"],
    accent: "#4a8a5b", // green
  },
  {
    num: "02",
    title: "Institutional\nField Services",
    href: "/SubServices/institutional",
    oneliner: "Independent verification and field services for banks, insurers, and donors",
    description:
      "We act as the independent eye on the ground for Nigeria's financial and donor institutions providing pre-loan verification, in-season monitoring, harvest confirmation, and audit-ready documentation.",
    tags: ["Pre-loan Verification", "In-season Monitoring", "Claims Investigation", "Audit Reports"],
    accent: "#FF0000", // red
  },
  {
    num: "03",
    title: "Production &\nProcessing",
    href: "/SubServices/processingPage",
    oneliner: "Traceable, export-ready produce from our integrated regenerative estate",
    description:
      "From hibiscus calyces and cut flowers to premium herbs, vegetables, and coco coir, every product is regeneratively grown, sensor-verified, solar-processed, and export-qualified for UK and EU markets.",
    tags: ["Hibiscus & Botanicals", "Cut Flowers", "Premium Vegetables", "UK/EU Export"],
    accent: "#4a8a5b", // green
  },
  {
    num: "04",
    title: "GC Academy",
    href: "/services/academy",
    oneliner: "Institutional capacity-building in modern and regenerative agriculture",
    description:
      "Our certified online and on-site training platform has equipped 1,000+ farmers, youths, and women across Nigeria with precision agriculture skills — deployed by government programmes, donor agencies, and anchor agribusinesses.",
    tags: ["Certified Programmes", "Online & On-site", "1,000+ Trained", "Institutional Delivery"],
    accent: "#FF0000", // red
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

/* ─── single card ───────────────────────────────────────────── */
function ServiceCard({ service, index }) {
  const [ref, vis] = useInView(0.1);
  const delay = index * 90;

  const lines = service.title.split("\n");

  return (
    <a
      ref={ref}
      href={service.href}
      className="gc-svc-card"
      style={{
        "--accent": service.accent,
        opacity:    vis ? 1 : 0,
        transform:  vis ? "translateY(0)" : "translateY(40px)",
        transition: `opacity .75s ease ${delay}ms, transform .85s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        textDecoration: "none",
      }}
      aria-label={`${service.title.replace("\n"," ")} — ${service.oneliner}`}
    >

      {/* number */}
      <div className="gc-svc-num-row">
        <span className="gc-svc-num">{service.num}</span>
        <div className="gc-svc-num-line" />
      </div>

      {/* title */}
      <h3 className="gc-svc-title">
        {lines.map((l, i) => <span key={i}>{l}{i < lines.length - 1 && <br />}</span>)}
      </h3>

      {/* oneliner */}
      <p className="gc-svc-oneliner">{service.oneliner}</p>

      {/* description - always visible now */}
      <p className="gc-svc-desc">{service.description}</p>

      {/* tags */}
      <div className="gc-svc-tags">
        {service.tags.map(t => (
          <span key={t} className="gc-svc-tag">{t}</span>
        ))}
      </div>

      {/* CTA arrow */}
      <div className="gc-svc-cta">
        <span className="gc-svc-cta-txt">Explore Architecture</span>
        <span className="gc-svc-arrow" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
    </a>
  );
}

/* ─── section header ────────────────────────────────────────── */
function Header() {
  const [ref, vis] = useInView(0.3);
  return (
    <div ref={ref} className="gc-svc-header" style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(28px)",
      transition: "opacity .8s ease, transform .9s cubic-bezier(0.22,1,0.36,1)",
    }}>
      <div className="gc-svc-eyebrow">
        <span className="gc-svc-eyebrow-line" aria-hidden="true" />
        Services
      </div>
      <div className="gc-svc-header-inner">
        <h2 className="gc-svc-heading">
          Four service architectures.<br />
          <em>One integrated capability.</em>
        </h2>
        <p className="gc-svc-subhead">
          From farm design and construction to institutional verification and
          premium production. GartnerCallaway delivers the full agricultural
          services stack from a single accountable partner.
        </p>
      </div>
    </div>
  );
}

/* ─── main export ───────────────────────────────────────────── */
export default function ServicesPreview() {
  return (
    <>
      <style>{`
        /* ── reset & tokens ── */
        .gc-svc-section, .gc-svc-section * { box-sizing: border-box; }
        .gc-svc-section {
          --g900: #0e1f14;
          --g800: #1a3321;
          --g500: #4a8a5b;
          --g400: #7fb38d;
          --g200: #e1f0e5;
          --r400: #FF0000;
          --stone: #f4f4f2;
          --fd: "Cormorant Garamond", Georgia, serif;
          --fb: "DM Sans", system-ui, sans-serif;
          --ep: cubic-bezier(0.34, 1.56, 0.64, 1);
          --es: cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        /* ── section shell ── */
        .gc-svc-section {
          background: var(--g900);
          padding: clamp(72px,10vw,140px) clamp(20px,5.5vw,88px);
          position: relative;
          overflow: hidden;
          font-family: var(--fb);
        }

        /* decorative large number watermark */
        .gc-svc-bg-num {
          position: absolute;
          bottom: -40px; right: -20px;
          font-family: var(--fd);
          font-size: clamp(200px, 28vw, 380px);
          font-weight: 300;
          color: rgba(127,179,141,.03);
          line-height: 1;
          pointer-events: none;
          user-select: none;
          letter-spacing: -.04em;
        }
        /* top decorative line - PROGRESS BAR REMOVED */
        .gc-svc-section::before {
          content: '';
          position: absolute;
          top: 0; left: clamp(20px,5.5vw,88px); right: clamp(20px,5.5vw,88px);
          height: 1px;
          background: rgba(255,255,255,.08);
        }

        /* ── header ── */
        .gc-svc-header {
          margin-bottom: clamp(48px,7vw,88px);
        }
        .gc-svc-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 9.5px; font-weight: 500;
          letter-spacing: .22em; text-transform: uppercase;
          color: var(--r400);
          margin-bottom: clamp(16px,2vw,28px);
        }
        .gc-svc-eyebrow-line {
          display: block; width: 28px; height: 1px;
          background: var(--r400); flex-shrink: 0;
        }
        .gc-svc-header-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(24px,4vw,64px);
          align-items: end;
        }
        .gc-svc-heading {
          font-family: var(--fd);
          font-size: clamp(32px,5vw,62px);
          font-weight: 300; line-height: 1.08;
          color: #fff;
          letter-spacing: -.015em;
          margin: 0;
        }
        .gc-svc-heading em {
          font-style: italic; font-weight: 300;
          color: var(--g400);
        }
        .gc-svc-subhead {
          font-size: clamp(13px,1.3vw,15.5px);
          font-weight: 300; line-height: 1.82;
          color: rgba(255,255,255,.5);
          margin: 0;
          padding-bottom: 6px;
        }

        /* ── card grid ── */
        .gc-svc-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          border: 1px solid rgba(255,255,255,.06);
          border-radius: 4px;
          overflow: hidden;
          position: relative; z-index: 1;
        }

        /* ── card - NO HOVER EFFECTS ── */
        .gc-svc-card {
          position: relative;
          display: flex; flex-direction: column;
          padding: 0;
          border-right: 1px solid rgba(255,255,255,.06);
          background: rgba(255,255,255,.015);
          overflow: hidden;
          cursor: pointer;
        }
        .gc-svc-card:last-child { border-right: none; }

        /* accent left bar - REMOVED hover animation, always visible */
        .gc-svc-card::before {
          content: '';
          position: absolute; top: 0; left: 0;
          width: 2px; height: 100%;
          background: var(--accent);
          z-index: 2;
        }

        /* ── card content - NO HOVER CHANGES ── */
        .gc-svc-num-row {
          display: flex; align-items: center; gap: 10px;
          padding: clamp(18px,2.2vw,26px) clamp(18px,2.2vw,26px) 0;
        }
        .gc-svc-num {
          font-family: var(--fd);
          font-size: 12px; font-weight: 400;
          letter-spacing: .16em;
          color: var(--accent);
          line-height: 1; flex-shrink: 0;
        }
        .gc-svc-num-line {
          height: 1px; flex: 1;
          background: rgba(255,255,255,.07);
        }

        .gc-svc-title {
          font-family: var(--fd);
          font-size: clamp(20px,2.2vw,27px);
          font-weight: 400; line-height: 1.12;
          color: #fff;
          margin: clamp(10px,1.2vw,14px) clamp(18px,2.2vw,26px) 0;
          letter-spacing: -.01em;
        }

        .gc-svc-oneliner {
          font-size: clamp(11px,1vw,12.5px);
          font-weight: 300; line-height: 1.65;
          color: rgba(255,255,255,.45);
          margin: clamp(8px,1vw,12px) clamp(18px,2.2vw,26px) 0;
        }

        /* description - always visible, NO hover animation */
        .gc-svc-desc {
          font-size: clamp(11.5px,1vw,13px);
          font-weight: 300; line-height: 1.78;
          color: rgba(255,255,255,.35);
          margin: clamp(10px,1.2vw,14px) clamp(18px,2.2vw,26px) 0;
        }

        /* ── tags ── */
        .gc-svc-tags {
          display: flex; flex-wrap: wrap; gap: 6px;
          padding: clamp(14px,1.8vw,20px) clamp(18px,2.2vw,26px) 0;
          margin-top: auto;
        }
        .gc-svc-tag {
          font-size: 9px; font-weight: 500;
          letter-spacing: .14em; text-transform: uppercase;
          color: var(--accent);
          background: rgba(255,255,255,.04);
          border: 1px solid rgba(255,255,255,.07);
          padding: 4px 9px; border-radius: 2px;
        }

        /* ── CTA row ── */
        .gc-svc-cta {
          display: flex; align-items: center; justify-content: space-between;
          padding: clamp(14px,1.8vw,20px) clamp(18px,2.2vw,26px);
          margin-top: clamp(14px,1.8vw,20px);
          border-top: 1px solid rgba(255,255,255,.05);
        }
        .gc-svc-cta-txt {
          font-size: 10px; font-weight: 500;
          letter-spacing: .14em; text-transform: uppercase;
          color: rgba(255,255,255,.3);
        }

        .gc-svc-arrow {
          display: flex; align-items: center; justify-content: center;
          width: 32px; height: 32px; border-radius: 2px;
          border: 1px solid rgba(255,255,255,.1);
          color: rgba(255,255,255,.3);
          flex-shrink: 0;
        }

        /* ══ RESPONSIVE ══════════════════════════════════════════ */

        /* tablet: 2×2 */
        @media (max-width: 1100px) {
          .gc-svc-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .gc-svc-card { border-right: 1px solid rgba(255,255,255,.06); }
          .gc-svc-card:nth-child(2) { border-right: none; }
          .gc-svc-card:nth-child(3) {
            border-right: 1px solid rgba(255,255,255,.06);
            border-top: 1px solid rgba(255,255,255,.06);
          }
          .gc-svc-card:nth-child(4) {
            border-right: none;
            border-top: 1px solid rgba(255,255,255,.06);
          }
          .gc-svc-header-inner {
            grid-template-columns: 1fr;
            gap: clamp(12px,2vw,20px);
          }
          .gc-svc-subhead { max-width: 560px; }
        }

        /* mobile: 1 col */
        @media (max-width: 640px) {
          .gc-svc-grid { grid-template-columns: 1fr; border-radius: 3px; }
          .gc-svc-card {
            border-right: none !important;
            border-top: 1px solid rgba(255,255,255,.06);
          }
          .gc-svc-card:first-child { border-top: none; }
          .gc-svc-desc {
            opacity: 0.6;
          }
          .gc-svc-bg-num { display: none; }
        }
      `}</style>

      <section className="gc-svc-section" aria-labelledby="svc-heading">
        <div className="gc-svc-bg-num" aria-hidden="true">04</div>

        <Header />

        <div className="gc-svc-grid" role="list">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.num} service={s} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}