import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronRight, ArrowUpRight } from "lucide-react";

/* ─── nav data ─────────────────────────────────────────────── */
const NAV = [

  { name: "Home", href: "/" },
  {
    name: "About", href: "/about",
    // I wanted to create a dropdown for about but didn't find a need to since it's already incoporated into it. But if necessary, why not?
    // sub: [
    //   { name: "Our Story",    href: "/about#story",      hint: "Est. 2017" },
    //   { name: "Leadership",   href: "/about#leadership", hint: "Meet Yomi" },
    //   { name: "Philosophy",   href: "/about#philosophy", hint: "Ancient wisdom" },
    // ]
  },
  {
    name: "Services", href: "/services",
    sub: [
      { name: "Farm Design & Build", href: "/SubServices/productionpage", hint: "Blueprint" },
      { name: "Institutional Field Services", href: "/SubServices/institutional", hint: "Bank-ready" },
      { name: "Production & Processing", href: "/SubServices/processingPage", hint: "200 ha estate" },
      { name: "GC Academy", href: "/SubServices/academy", hint: "1,000+ trained" },
    ]
  },
  { name: "Production", href: "/production" },
  {
    name: "Insights", disabled: true,
    sub: [
      { name: "Articles", href: "/insights", hint: "Field notes" },
      { name: "Videos", href: "/videos", hint: "Interviews" },
    ]
  },
  { name: "Contact", href: "/contact" },
];

/* ─── sub-items for mobile large-menu columns ──────────────── */
const MOBILE_COLS = [
  {
    heading: "Services",
    items: [
      { name: "Farm Design & Build", href: "/services/farm-design-build" },
      { name: "Institutional Field Services", href: "/services/institutional-field-services" },
      { name: "Production & Processing", href: "/services/production-processing" },
      { name: "GC Academy", href: "/services/academy" },
    ],
  },
  {
    heading: "Company",
    items: [
      { name: "About", href: "/about" },
      { name: "Leadership", href: "/about#leadership" },
      { name: "Insights", href: "/insights" },
      { name: "Contact", href: "/contact" },
    ],
  },
];

/* ─── stats shown in mobile menu ───────────────────────────── */
const STATS = [
  { value: "200 ha", label: "Ogun State Estate" },
  { value: "500 kW", label: "Solar Capacity" },
  { value: "30%", label: "Yield Improvement" },
];

export default function Navbar() {
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [activeDrop, setActiveDrop] = useState(null);
  const [menuMounted, setMenuMounted] = useState(false);
  const closeTimer = useRef(null);

  /* scroll listener */
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* body lock when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  /* mount/unmount mobile menu for animation */
  useEffect(() => {
    if (open) setMenuMounted(true);
  }, [open]);

  const handleMenuClose = () => {
    setOpen(false);
    setTimeout(() => setMenuMounted(false), 600);
  };

  /* dropdown hover helpers */
  const enterDrop = (name) => { clearTimeout(closeTimer.current); setActiveDrop(name); };
  const leaveDrop = () => { closeTimer.current = setTimeout(() => setActiveDrop(null), 120); };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        /* ── tokens ── */
        :root {
          --gc-green-900: #0e1f14;
          --gc-green-800: #1a3321;
          --gc-green-500: #4a8a5b;
          --gc-green-400: #7fb38d;
          --gc-green-200: #e1f0e5;
          --gc-red-400:   #e07a5f;
          --gc-stone-100: #f4f4f2;
          --gc-stone-500: #787870;
          --gc-stone-800: #2c2c2a;
          --ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1);
          --ease-smooth:  cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        /* ── bar ── */
.gc-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;

  /* =======================================================
     CHANGE NAVBAR BACKGROUND COLOR HERE
  ======================================================= */
  background: rgba(14, 31, 20, 0.96);

  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);

  box-shadow: 0 1px 0 rgba(127,179,141,0.12);

  transition:
    padding 0.35s var(--ease-smooth),
    box-shadow 0.35s ease;

  font-family: "DM Sans", system-ui, sans-serif;
}
        .gc-bar-inner {
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 52px;
          transition: padding 0.35s var(--ease-smooth);
        }

        /* ── progress ── */
        .gc-progress {
          position: absolute; bottom: 0; left: 0; height: 1.5px;
          background: #FF0000;
          transition: width 0.15s linear;
          pointer-events: none;
        }

        /* ── logo ── */
        .gc-logo {
          display: flex; align-items: center; gap: 12px;
          text-decoration: none; flex-shrink: 0;
          margin-left: 20px;
        }

        .gc-logo-image {
          width: 30px;
          height: auto;
          object-fit: contain;
          display: block;
          scale: 4.5;
        }

        /* ── desktop nav links ── */
        .gc-nav-links {
          display: flex; align-items: center; gap: 4px;
          list-style: none; margin: 0; padding: 0;
        }
        .gc-nav-item { position: relative; }

        .gc-nav-link {
          display: flex; align-items: center; gap: 4px;
          padding: 8px 14px;
          font-size: 11.5px; font-weight: 400;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: rgba(255,255,255,0.65);
          text-decoration: none;
          border-radius: 2px;
          transition: color 0.2s ease, background 0.2s ease;
          position: relative;
        }
        .gc-nav-link:hover, .gc-nav-link.drop-open { color: #fff; }

        .gc-nav-link::after {
          content: '';
          position: absolute; bottom: 5px; left: 14px; right: 14px;
          height: 1px;
          background: var(--gc-red-400);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.3s var(--ease-spring);
        }
        .gc-nav-link:hover::after, .gc-nav-link.drop-open::after {
          transform: scaleX(1);
        }

        .gc-chevron {
          width: 10px; height: 10px;
          transition: transform 0.25s var(--ease-smooth);
          opacity: 0.5;
        }
        .gc-nav-link.drop-open .gc-chevron { transform: rotate(90deg); opacity: 1; }

        /* ── dropdown ── */
        .gc-dropdown {
          position: absolute; top: calc(100% + 10px); left: 0;
          min-width: 230px;
          background: rgba(14, 31, 20, 0.97);
          backdrop-filter: blur(20px) saturate(200%);
          border: 1px solid rgba(127,179,141,0.15);
          border-radius: 4px;
          overflow: hidden;
          transform-origin: top left;
          animation: dropIn 0.28s var(--ease-smooth) forwards;
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-6px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        .gc-drop-item {
          display: flex; align-items: center; justify-content: space-between;
          padding: 11px 18px;
          text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          transition: background 0.18s ease;
          gap: 16px;
        }
        .gc-drop-item:last-child { border-bottom: none; }
        .gc-drop-item:hover { background: rgba(127,179,141,0.08); }
        .gc-drop-name {
          font-size: 12.5px; font-weight: 400;
          letter-spacing: 0.04em;
          color: rgba(255,255,255,0.8);
          transition: color 0.18s ease;
        }
        .gc-drop-item:hover .gc-drop-name { color: #fff; }
        .gc-drop-hint {
          font-size: 10px; font-weight: 300;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--gc-green-400); opacity: 0.6;
          white-space: nowrap;
        }

        /* ── CTA button ── */
        .gc-cta-btn {
          display: inline-flex; align-items: center; gap: 7px;
          font-family: "DM Sans", sans-serif;
          font-size: 11px; font-weight: 500;
          letter-spacing: 0.13em; text-transform: uppercase;
          color: var(--gc-green-900);
          background: var(--gc-green-400);
          padding: 10px 22px;
          border-radius: 2px;
          border: none; cursor: pointer;
          text-decoration: none;
          transition: background 0.22s ease, color 0.22s ease, transform 0.22s var(--ease-spring);
        }
        .gc-cta-btn:hover {
          background: var(--gc-green-500); color: #fff;
          transform: translateY(-2px);
        }
        .gc-cta-btn svg { transition: transform 0.22s var(--ease-spring); }
        .gc-cta-btn:hover svg { transform: translate(2px,-2px); }

        /* ── hamburger ── */
        .gc-hamburger {
          display: none;
          width: 40px; height: 40px;
          align-items: center; justify-content: center;
          background: transparent; border: none; cursor: pointer;
          position: relative; z-index: 200;
          padding: 0;
        }
        .gc-ham-lines {
          width: 24px; height: 16px;
          display: flex; flex-direction: column;
          justify-content: space-between;
          transition: transform 0.3s ease;
        }
        .gc-ham-line {
          display: block; height: 1.5px;
          background: rgba(255,255,255,0.85);
          border-radius: 99px;
          transition: transform 0.35s var(--ease-spring),
                      opacity   0.2s ease,
                      width     0.3s var(--ease-spring);
          transform-origin: left center;
        }
        .gc-ham-line:nth-child(2) { width: 70%; }
        .gc-hamburger:hover .gc-ham-line:nth-child(2) { width: 100%; }
        /* open state */
        .gc-hamburger.is-open .gc-ham-line:nth-child(1) {
          transform: rotate(38deg) translateY(-1px);
        }
        .gc-hamburger.is-open .gc-ham-line:nth-child(2) {
          opacity: 0; transform: scaleX(0);
        }
        .gc-hamburger.is-open .gc-ham-line:nth-child(3) {
          transform: rotate(-38deg) translateY(1px);
        }

        /* ── FULL-SCREEN MOBILE MENU ── */
        .gc-mobile-menu {
          position: fixed; inset: 0; z-index: 150;
          background: var(--gc-green-900);
          display: flex; flex-direction: column;
          overflow: hidden;
          opacity: 0; visibility: hidden;
          transition: opacity 0.5s var(--ease-smooth),
                      visibility 0.5s;
        }
        .gc-mobile-menu.is-open {
          opacity: 1; visibility: visible;
        }

        /* decorative circle */
        .gc-menu-deco {
          position: absolute; bottom: -120px; right: -120px;
          width: 420px; height: 420px; border-radius: 50%;
          border: 1px solid rgba(127,179,141,0.07);
          pointer-events: none;
        }
        .gc-menu-deco-2 {
          position: absolute; top: -80px; left: -80px;
          width: 280px; height: 280px; border-radius: 50%;
          border: 1px solid rgba(127,179,141,0.05);
          pointer-events: none;
        }

        .gc-menu-top {
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 28px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          flex-shrink: 0;
        }

        .gc-menu-body {
          flex: 1; overflow-y: auto; padding: 40px 28px 0;
          display: flex; flex-direction: column; gap: 0;
        }

        /* primary mobile links */
        .gc-mob-link {
          display: flex; align-items: baseline; justify-content: space-between;
          padding: 18px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          text-decoration: none;
          opacity: 0; transform: translateX(-18px);
          transition: opacity 0.45s ease, transform 0.45s var(--ease-spring);
        }
        .gc-mobile-menu.is-open .gc-mob-link { opacity: 1; transform: translateX(0); }
        .gc-mob-link-name {
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: clamp(32px, 8vw, 48px);
          font-weight: 300; line-height: 1;
          color: rgba(255,255,255,0.85);
          letter-spacing: -0.01em;
          transition: color 0.2s ease;
        }
        .gc-mob-link:hover .gc-mob-link-name { color: var(--gc-green-400); }
        .gc-mob-link-num {
          font-size: 11px; font-weight: 300;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(255,255,255,0.2);
          align-self: flex-start; padding-top: 6px;
        }

        /* columns */
        .gc-menu-cols {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 32px; padding: 32px 0 24px;
          opacity: 0;
          transition: opacity 0.5s ease 0.25s;
        }
        .gc-mobile-menu.is-open .gc-menu-cols { opacity: 1; }
        .gc-col-heading {
          font-size: 9px; font-weight: 500;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--gc-green-400); margin-bottom: 14px;
        }
        .gc-col-link {
          display: block; padding: 6px 0;
          font-size: 13px; font-weight: 300;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          transition: color 0.18s ease;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .gc-col-link:last-child { border-bottom: none; }
        .gc-col-link:hover { color: rgba(255,255,255,0.9); }

        /* stats row */
        .gc-menu-stats {
          display: flex; gap: 0;
          border-top: 1px solid rgba(255,255,255,0.06);
          margin-top: auto; flex-shrink: 0;
          opacity: 0;
          transition: opacity 0.5s ease 0.35s;
        }
        .gc-mobile-menu.is-open .gc-menu-stats { opacity: 1; }
        .gc-menu-stat {
          flex: 1; padding: 20px 24px;
          border-right: 1px solid rgba(255,255,255,0.06);
        }
        .gc-menu-stat:last-child { border-right: none; }
        .gc-menu-stat-val {
          display: block;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: 24px; font-weight: 300;
          color: #fff; line-height: 1; margin-bottom: 4px;
        }
        .gc-menu-stat-lbl {
          font-size: 9px; font-weight: 400;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: rgba(255,255,255,0.3);
        }

        /* menu CTA */
        .gc-menu-cta-row {
          padding: 20px 28px;
          border-top: 1px solid rgba(255,255,255,0.06);
          display: flex; align-items: center; justify-content: space-between;
          flex-shrink: 0;
          opacity: 0;
          transition: opacity 0.5s ease 0.4s;
        }
        .gc-mobile-menu.is-open .gc-menu-cta-row { opacity: 1; }
        .gc-menu-tagline {
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: 12px; font-weight: 300; font-style: italic;
          color: rgba(255,255,255,0.3);
          max-width: 180px; line-height: 1.5;
        }

        /* stagger delays for mobile links */
        .gc-mob-link:nth-child(1) { transition-delay: 0.06s; }
        .gc-mob-link:nth-child(2) { transition-delay: 0.12s; }
        .gc-mob-link:nth-child(3) { transition-delay: 0.18s; }
        .gc-mob-link:nth-child(4) { transition-delay: 0.24s; }
        .gc-mob-link:nth-child(5) { transition-delay: 0.30s; }

        /* ── responsive breakpoint ── */
        @media (max-width: 1024px) {
          .gc-nav-links, .gc-desktop-cta { display: none !important; }
          .gc-hamburger { display: flex; }
          .gc-bar-inner { padding: 18px 24px;}
          .gc-logo { margin-left: 30px;}
        }
        @media (min-width: 1025px) {
          .gc-hamburger { display: none !important; }
          .gc-mobile-menu { display: none !important; }
        }
      `}</style>

      {/* ── Navbar bar ── */}
      <nav className="gc-bar" role="navigation" aria-label="Main">
        <div className="gc-bar-inner">

          {/* Logo */}
          <a href="/" className="gc-logo" aria-label="Gartner Callaway home">
            <div className="gc-logo-mark" aria-hidden="true">
              {/* stylised leaf mark */}
              <img
                src="/assets/logo.png"
                alt="Gartner Callaway"
                className="gc-logo-image"
              />
            </div>
          </a>

          {/* Desktop links */}
          <ul className="gc-nav-links" role="list">
            {NAV.map((item) => (
              <li key={item.name} className="gc-nav-item"
                onMouseEnter={() => item.sub && enterDrop(item.name)}
                onMouseLeave={() => item.sub && leaveDrop()}
              >
                <a
                  href={item.href}
                  className={`gc-nav-link${activeDrop === item.name ? " drop-open" : ""}`}
                  aria-haspopup={item.sub ? "true" : undefined}
                  aria-expanded={activeDrop === item.name ? "true" : undefined}
                >
                  {item.name}
                  {item.sub && (
                    <ChevronRight size={10} className="gc-chevron" aria-hidden="true" />
                  )}
                </a>
                {item.sub && activeDrop === item.name && (
                  <div className="gc-dropdown" role="menu">
                    {item.sub.map((s) => (
                      <a key={s.name} href={s.href} className="gc-drop-item" role="menuitem">
                        <span className="gc-drop-name">{s.name}</span>
                        {s.hint && <span className="gc-drop-hint">{s.hint}</span>}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <a href="/contact" className="gc-cta-btn gc-desktop-cta">
            Let's Collaborate
            <ArrowUpRight size={13} aria-hidden="true" />
          </a>

          {/* Hamburger */}
          <button
            className={`gc-hamburger${open ? " is-open" : ""}`}
            onClick={() => (open ? handleMenuClose() : setOpen(true))}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="gc-mobile-menu"
          >
            <span className="gc-ham-lines" aria-hidden="true">
              <span className="gc-ham-line" />
              <span className="gc-ham-line" />
              <span className="gc-ham-line" />
            </span>
          </button>
        </div>

        {/* scroll progress */}
        <div className="gc-progress" style={{ width: `${progress}%` }} aria-hidden="true" />
      </nav>

      {/* ── Full-screen mobile menu ── */}
      {menuMounted && (
        <div
          id="gc-mobile-menu"
          className={`gc-mobile-menu${open ? " is-open" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
        >
          {/* decorative rings */}
          <div className="gc-menu-deco" aria-hidden="true" />
          <div className="gc-menu-deco-2" aria-hidden="true" />

          {/* top bar — logo + close */}
          <div className="gc-menu-top">
            <a href="/" className="gc-logo" onClick={handleMenuClose}>
              <div className="gc-logo-mark" aria-hidden="true">
                <img
                  src="/assets/logo.png"
                  alt="Gartner Callaway"
                  className="gc-logo-image"
                />
              </div>
            </a>
            <button
              onClick={handleMenuClose}
              aria-label="Close menu"
              style={{
                background: "none", border: "none", cursor: "pointer", padding: "8px",
                color: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center"
              }}
            >
              <X size={22} />
            </button>
          </div>

          {/* scrollable body */}
          <div className="gc-menu-body">
            {/* large primary links */}
            {NAV.map((item, i) => (
              <div key={item.name}>

                {/* IF ITEM HAS DROPDOWN */}
                {item.sub ? (
                  <>
                    <button
                      className="gc-mob-link"
                      onClick={() =>
                        setActiveDrop(
                          activeDrop === item.name ? null : item.name
                        )
                      }
                      style={{
                        width: "100%",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      <span className="gc-mob-link-name">
                        {item.name}
                      </span>

                      <span
                        className="gc-mob-link-num"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        0{i + 1}

                        <ChevronRight
                          size={14}
                          style={{
                            transition: "0.3s ease",
                            transform:
                              activeDrop === item.name
                                ? "rotate(90deg)"
                                : "rotate(0deg)",
                          }}
                        />
                      </span>
                    </button>

                    {/* MOBILE DROPDOWN */}
                    <div
                      style={{
                        maxHeight:
                          activeDrop === item.name ? "500px" : "0px",
                        overflow: "hidden",
                        transition: "0.4s ease",
                        paddingLeft: "10px",
                      }}
                    >
                      {item.sub.map((sub) => (
                        <a
                          key={sub.name}
                          href={sub.href}
                          className="gc-col-link"
                          onClick={handleMenuClose}
                          style={{
                            padding: "14px 0",
                            display: "block",
                            fontSize: "15px",
                          }}
                        >
                          {sub.name}
                        </a>
                      ))}

                      {/* OPTIONAL VIEW ALL LINK */}
                      <a
                        href={item.href}
                        className="gc-col-link"
                        onClick={handleMenuClose}
                        style={{
                          padding: "14px 0",
                          display: "block",
                          fontSize: "15px",
                          color: "var(--gc-green-400)",
                        }}
                      >
                        View All {item.name}
                      </a>
                    </div>
                  </>
                ) : (
                  /* NORMAL LINK */
                  <a
                    href={item.href}
                    className="gc-mob-link"
                    onClick={handleMenuClose}
                  >
                    <span className="gc-mob-link-name">
                      {item.name}
                    </span>

                    <span className="gc-mob-link-num">
                      0{i + 1}
                    </span>
                  </a>
                )}
              </div>
            ))}

            {/* secondary columns */}
            <div className="gc-menu-cols">
              {MOBILE_COLS.map((col) => (
                <div key={col.heading}>
                  <div className="gc-col-heading">{col.heading}</div>
                  {col.items.map((it) => (
                    <a key={it.name} href={it.href} className="gc-col-link" onClick={handleMenuClose}>
                      {it.name}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* stats strip */}
          <div className="gc-menu-stats" role="region" aria-label="Key stats">
            {STATS.map((s) => (
              <div key={s.label} className="gc-menu-stat">
                <span className="gc-menu-stat-val">{s.value}</span>
                <span className="gc-menu-stat-lbl">{s.label}</span>
              </div>
            ))}
          </div>

          {/* bottom CTA row */}
          <div className="gc-menu-cta-row">
            <a href="/contact" className="gc-cta-btn" onClick={handleMenuClose}
              style={{ whiteSpace: "nowrap", flexShrink: 0 }}>
              Let's Collaborate
              <ArrowUpRight size={12} aria-hidden="true" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}