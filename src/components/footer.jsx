import { useState, useEffect } from "react";

/* ─── data ──────────────────────────────────────────────────── */
const COLS = [
  {
    heading: "Company",
    links: [
      { label: "About",      href: "/about" },
      { label: "Insights",      href: "/insights" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Farm Design & Build",          href: "/SubServices/productionPage" },
      { label: "Institutional Field Services", href: "/SubServices/institutional" },
      { label: "Production & Processing",      href: "/SubServices/processingPage" },
      { label: "GC Academy",                  href: "/services/academy" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Insights",               href: "/insights" },
      { label: "GC Academy Platform",    href: "/services/academy" },
      { label: "Book a Site Visit",      href: "/contact/site-visit", accent: true },
    ],
  },
];

const OFFICES = [
  {
    city: "Lagos",
    role: "54A Earls Court Road ikate Lekki",
    flag: "🇳🇬",
  },
  {
    city: "Ogun State",
    role: "Operational Estate & Field Services Base",
    flag: "🇳🇬",
  },
  {
    city: "London",
    role: "Shelton Street, Covent Garden",
    sub: "UK Partnership Office",
    flag: "🇬🇧",
  },
];

const GOVERNANCE = [
  { label: "Policies",           href: "/governance/policies" },
  { label: "Board",              href: "/governance/board" },
  { label: "Social Responsibility", href: "/governance/social-responsibility" },
  { label: "Terms of Use",       href: "/legal/terms-of-use" },
  { label: "Privacy Policy",     href: "/legal/privacy-policy" },
];

const SOCIALS = [
//   {
//     name: "LinkedIn",
//     href: "#",
//     icon: (
//       <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
//         <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
//       </svg>
//     ),
//   },
  {
    name: "Instagram",
    href: "https://www.instagram.com/gartnercallaway?utm_source=qr&igsh=cWgzMTJyNTEyZWpv",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  }
//   {
//     name: "X / Twitter",
//     href: "#",
//     icon: (
//       <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
//         <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.745l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
//       </svg>
//     ),
//   },
//   {
//     name: "YouTube",
//     href: "#",
//     icon: (
//       <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
//         <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
//       </svg>
//     ),
//   },
];

/* ─── newsletter form ───────────────────────────────────────── */
function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sent | error

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) { setStatus("error"); return; }
    setStatus("sent");
    setEmail("");
  };

  return (
    <div className="gc-ft-nl">
      <p className="gc-ft-nl-label">Field notes & institutional updates</p>
      {status === "sent" ? (
        <div className="gc-ft-nl-success">
          <span className="gc-ft-nl-tick" aria-hidden="true">✓</span>
          You're on the list. We'll be in touch.
        </div>
      ) : (
        <form className="gc-ft-nl-form" onSubmit={handleSubmit} noValidate>
          <input
            type="email"
            value={email}
            onChange={e => { setEmail(e.target.value); setStatus("idle"); }}
            placeholder="your@email.com"
            className={`gc-ft-nl-input${status === "error" ? " gc-ft-nl-input--err" : ""}`}
            aria-label="Email address"
          />
          <button type="submit" className="gc-ft-nl-btn" aria-label="Subscribe">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </form>
      )}
      {status === "error" && <p className="gc-ft-nl-err">Please enter a valid email.</p>}
    </div>
  );
}

/* ─── main footer ───────────────────────────────────────────── */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <style>{`
        /* ── reset & tokens ── */
        .gc-footer, .gc-footer * { box-sizing: border-box; margin: 0; padding: 0; }
        .gc-footer {
          --g900: #0e1f14; --g800: #1a3321; --g700: #22402a;
          --g500: #4a8a5b; --g400: #7fb38d; --g200: #e1f0e5;
          --r400: #e07a5f;
          --s100: #f4f4f2; --s500: #787870; --s800: #2c2c2a;
          --ep: cubic-bezier(0.34, 1.56, 0.64, 1);
          --es: cubic-bezier(0.25, 0.46, 0.45, 0.94);
          font-family: var(--fb);
          background: var(--g900);
          color: rgba(255,255,255,0.55);
          position: relative;
          overflow: hidden;
        }

        /* ── decorative background details ── */
        .gc-footer-grain {
          position: absolute; inset: 0; z-index: 0; opacity: .025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 128px; pointer-events: none;
        }
        .gc-footer-glow {
          position: absolute; bottom: -200px; right: -200px; z-index: 0;
          width: 700px; height: 700px; border-radius: 50%;
          background: radial-gradient(circle, rgba(74,138,91,.07) 0%, transparent 65%);
          pointer-events: none;
        }
        .gc-footer-glow-2 {
          position: absolute; top: -100px; left: -100px; z-index: 0;
          width: 400px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, rgba(224,122,95,.04) 0%, transparent 65%);
          pointer-events: none;
        }

        /* ── top accent line ── */
        .gc-footer-topline {
          position: relative; z-index: 1;
          height: 1px;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(127,179,141,.3) 20%,
            rgba(224,122,95,.2) 50%,
            rgba(127,179,141,.2) 80%,
            transparent 100%
          );
        }

        /* ── pre-footer: quote band ── */
        .gc-footer-quote-band {
          position: relative; z-index: 1;
          border-bottom: 1px solid rgba(255,255,255,.05);
          padding: clamp(32px,4vw,48px) clamp(24px,5.5vw,88px);
          display: flex; align-items: center; justify-content: space-between;
          gap: clamp(24px,4vw,48px);
        }
        .gc-footer-quote {
          font-family: var(--fd);
          font-size: clamp(15px,1.8vw,21px);
          font-style: italic; font-weight: 500;
          color: #FFF;
          line-height: 1.4;
          max-width: 640px;
        }
        .gc-footer-quote em { color: var(--g400); font-style: italic; }
        .gc-footer-quote-cta {
          display: inline-flex; align-items: center; gap: 9px;
          font-family: var(--fb);
          font-size: 11px; font-weight: 500;
          letter-spacing: .13em; text-transform: uppercase;
          color: var(--g900); background: var(--g400);
          padding: 12px 24px; border-radius: 2px;
          text-decoration: none; white-space: nowrap; flex-shrink: 0;
          transition: background .22s ease, transform .22s var(--ep);
        }
        .gc-footer-quote-cta:hover { background: var(--g500); color: #fff; transform: translateY(-2px); }
        .gc-footer-quote-cta svg { transition: transform .22s ease; }
        .gc-footer-quote-cta:hover svg { transform: translateX(3px); }

        /* ── main footer body ── */
        .gc-footer-body {
          position: relative; z-index: 1;
          padding: clamp(48px,7vw,88px) clamp(24px,5.5vw,88px) clamp(40px,5vw,64px);
        }

        /* ── top grid: logo-brand + 4 cols ── */
        .gc-footer-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr 1fr 1fr;
          gap: clamp(32px,4vw,64px);
          padding-bottom: clamp(40px,5vw,64px);
          border-bottom: 1px solid rgba(255,255,255,.05);
        }

        /* ── brand column ── */
        .gc-ft-brand { display: flex; flex-direction: column; gap: 0; }
        .gc-ft-logo {
          display: flex; align-items: center; gap: 12px;
          text-decoration: none; margin-bottom: clamp(16px,2.5vw,24px);
        }
        .gc-ft-logo-text span { color: var(--g400); font-weight: 300; }

        .gc-ft-tagline {
          font-size: clamp(12px,1.2vw,14px);
          font-weight: 500; line-height: 1.78;
          color: #FFF;
          margin-bottom: clamp(20px,2.5vw,28px);
          max-width: 280px;
        }

        /* offices */
        .gc-ft-offices { display: flex; flex-direction: column; gap: 12px; }
        .gc-ft-office {
          display: flex; gap: 10px; align-items: flex-start;
          padding: 10px 12px;
          background: rgba(255,255,255,.025);
          border: 1px solid rgba(255,255,255,.05);
          border-radius: 2px;
          transition: background .2s, border-color .2s;
        }
        .gc-ft-office:hover { background: rgba(255,255,255,.04); border-color: rgba(127,179,141,.15); }
        .gc-ft-office-flag { font-size: 13px; flex-shrink: 0; margin-top: 1px; }
        .gc-ft-office-city {
          font-family: var(--fd);
          font-size: 13px; font-weight: 400;
          color: rgba(255,255,255,.7); line-height: 1.2;
          margin-bottom: 2px;
        }
        .gc-ft-office-role {
          font-size: 10px; font-weight: 500;
          color: #FFF; line-height: 1.4;
        }
        .gc-ft-office-sub {
          font-size: 9px; font-weight: 500;
          letter-spacing: .1em; text-transform: uppercase;
          color: var(--g400); margin-top: 2px;
        }

        /* contact chips */
        .gc-ft-contact { margin-top: clamp(16px,2vw,22px); display: flex; flex-direction: column; gap: 8px; }
        .gc-ft-contact-row {
          display: flex; align-items: center; gap: 8px;
          font-size: 11px; font-weight: 300;
          color: #FFF;
          text-decoration: none;
          transition: color .2s;
        }
        .gc-ft-contact-row:hover { color: rgba(255,255,255,.75); }
        .gc-ft-contact-icon { color: var(--g400); flex-shrink: 0; }

        /* ── nav columns ── */
        .gc-ft-col { display: flex; flex-direction: column; }
        .gc-ft-col-heading {
          font-size: 9px; font-weight: 500;
          letter-spacing: .22em; text-transform: uppercase;
          color: #FFF;
          margin-bottom: clamp(16px,2vw,22px);
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(255,255,255,.05);
        }
        .gc-ft-col-links { display: flex; flex-direction: column; gap: 0; }
        .gc-ft-link {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 7px 0;
          font-size: clamp(12px,1.1vw,13.5px); font-weight: 500;
          color: #FFF;
          text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,.03);
          transition: color .2s ease, padding-left .2s var(--ep);
          position: relative;
        }
        .gc-ft-link:last-child { border-bottom: none; }
        .gc-ft-link:hover { color: rgba(255,255,255,.85); padding-left: 5px; }
        .gc-ft-link--accent { color: var(--r400); opacity: .8; }
        .gc-ft-link--accent:hover { color: var(--r400); opacity: 1; }
        .gc-ft-link-dot {
          width: 4px; height: 4px; border-radius: 50%;
          background: var(--r400); flex-shrink: 0; opacity: 0;
          transition: opacity .2s;
        }
        .gc-ft-link--accent .gc-ft-link-dot { opacity: 1; }

        /* ── middle strip: contact + newsletter + socials ── */
        .gc-footer-mid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: clamp(32px,4vw,56px);
          padding: clamp(32px,4vw,48px) 0;
          border-bottom: 1px solid rgba(255,255,255,.05);
        }
        .gc-ft-mid-heading {
          font-size: 9px; font-weight: 500;
          letter-spacing: .22em; text-transform: uppercase;
          color: #FFF;
          margin-bottom: clamp(14px,1.8vw,20px);
        }

        /* socials */
        .gc-ft-socials { display: flex; gap: 8px; flex-wrap: wrap; }
        .gc-ft-social {
          display: flex; align-items: center; justify-content: center;
          width: 36px; height: 36px; border-radius: 2px;
          border: 1px solid rgba(255,255,255,.08);
          color: #FFF;
          text-decoration: none;
          transition: border-color .2s, color .2s, background .2s, transform .2s var(--ep);
        }
        .gc-ft-social:hover { border-color: var(--g400); color: var(--g400); background: rgba(127,179,141,.06); transform: translateY(-2px); }

        /* retail badge */
        .gc-ft-retail {
          display: flex; align-items: flex-start;
          gap: 12px;
          padding: 14px 16px;
          background: rgba(255,255,255,.025);
          border: 1px solid rgba(255,255,255,.06);
          border-radius: 2px;
          margin-top: clamp(12px,1.5vw,16px);
          text-decoration: none;
          transition: background .2s, border-color .2s;
        }
        .gc-ft-retail:hover { background: rgba(127,179,141,.05); border-color: rgba(127,179,141,.2); }
        .gc-ft-retail-icon {
          width: 28px; height: 28px; border-radius: 50%;
          background: rgba(127,179,141,.15);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          color: var(--g400); font-size: 13px;
        }
        .gc-ft-retail-label {
          font-size: 11px; font-weight: 500;
          color: #FFF; line-height: 1.2;
        }
        .gc-ft-retail-sub {
          font-size: 9.5px; font-weight: 300;
          color: #FFF; margin-top: 2px;
        }
        .gc-ft-retail-arrow {
          margin-left: auto; color: var(--g400); opacity: .5;
          transition: transform .2s, opacity .2s;
          align-self: center; flex-shrink: 0;
        }
        .gc-ft-retail:hover .gc-ft-retail-arrow { transform: translate(2px,-2px); opacity: 1; }

        /* newsletter */
        .gc-ft-nl { display: flex; flex-direction: column; gap: 0; }
        .gc-ft-nl-label {
          font-size: 10px; font-weight: 500;
          color: #FFF; margin-bottom: 10px;
        }
        .gc-ft-nl-form {
          display: flex; gap: 0;
          border: 1px solid rgba(255,255,255,.1);
          border-radius: 2px; overflow: hidden;
          transition: border-color .2s;
        }
        .gc-ft-nl-form:focus-within { border-color: rgba(127,179,141,.4); }
        .gc-ft-nl-input {
          flex: 1; background: rgba(255,255,255,.04);
          border: none; outline: none;
          padding: 11px 14px;
          font-family: var(--fb);
          font-size: 12px; font-weight: 500;
          color: #FFF;
          min-width: 0;
        }
        .gc-ft-nl-input::placeholder { color: #FFF; }
        .gc-ft-nl-input--err { background: rgba(224,122,95,.06); }
        .gc-ft-nl-btn {
          background: var(--g500); border: none; cursor: pointer;
          padding: 11px 16px; color: #fff; display: flex; align-items: center;
          transition: background .2s;
          flex-shrink: 0;
        }
        .gc-ft-nl-btn:hover { background: var(--g400); }
        .gc-ft-nl-success {
          display: flex; align-items: center; gap: 8px;
          font-size: 12px; font-weight: 300; color: var(--g400);
          padding: 11px 0;
        }
        .gc-ft-nl-tick {
          display: flex; align-items: center; justify-content: center;
          width: 20px; height: 20px; border-radius: 50%;
          background: rgba(74,138,91,.2); color: var(--g400);
          font-size: 11px; flex-shrink: 0;
        }
        .gc-ft-nl-err {
          font-size: 10px; color: var(--r400);
          margin-top: 6px;
        }

        /* governance */
        .gc-ft-gov { display: flex; flex-direction: column; gap: 0; }
        .gc-ft-gov-link {
          display: block; padding: 6px 0;
          font-size: 11px; font-weight: 500;
          color: #FFF;
          text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,.03);
          transition: color .2s;
        }
        .gc-ft-gov-link:last-child { border-bottom: none; }
        .gc-ft-gov-link:hover { color: #FFF; }

        /* ── bottom bar ── */
        .gc-footer-bottom {
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: clamp(12px,2vw,20px);
          padding-top: clamp(24px,3vw,32px);
        }
        .gc-ft-copyright {
          font-size: 11px; font-weight: 300;
          color: #FFF;
          line-height: 1.6;
        }
        .gc-ft-copyright strong { color: #FFF; font-weight: 400; }
        .gc-ft-bottom-links {
          display: flex; align-items: center; gap: clamp(14px,2vw,24px);
          flex-wrap: wrap;
        }
        .gc-ft-bottom-link {
          font-size: 10px; font-weight: 500;
          letter-spacing: .06em;
          color: #FFF;
          text-decoration: none;
          transition: color .2s;
        }
        .gc-ft-bottom-link:hover { color: rgba(255,255,255,.55); }
        .gc-ft-bottom-sep {
          width: 1px; height: 10px;
          background: rgba(255,255,255,.1);
        }

        /* ── credentials badge strip ── */
        .gc-footer-creds {
          position: relative; z-index: 1;
          display: flex; align-items: center; justify-content: center;
          flex-wrap: wrap; gap: clamp(16px,3vw,36px);
          padding: clamp(16px,2vw,22px) clamp(24px,5.5vw,88px);
          border-top: 1px solid rgba(255,255,255,.04);
          background: rgba(0,0,0,.12);
        }
        .gc-ft-cred {
          display: flex; align-items: center; gap: 8px;
          font-size: 9.5px; font-weight: 500;
          letter-spacing: .14em; text-transform: uppercase;
          color: #FFF;
          white-space: nowrap;
        }
        .gc-ft-cred-dot {
          width: 4px; height: 4px; border-radius: 50%;
          background: var(--g400); opacity: .5;
        }

        /* ══ RESPONSIVE ══════════════════════════════════ */
        @media (max-width: 1100px) {
          .gc-footer-grid { grid-template-columns: 1fr 1fr; gap: clamp(28px,4vw,48px); }
          .gc-ft-brand { grid-column: 1 / -1; flex-direction: row; flex-wrap: wrap; gap: clamp(24px,4vw,48px); }
          .gc-ft-tagline { max-width: 360px; }
          .gc-footer-mid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 768px) {
          .gc-footer-quote-band { flex-direction: column; align-items: flex-start; }
          .gc-footer-grid { grid-template-columns: 1fr 1fr; }
          .gc-ft-brand { flex-direction: column; gap: 20px; }
          .gc-footer-mid { grid-template-columns: 1fr; }
          .gc-footer-creds { gap: 14px; }
        }
        @media (max-width: 540px) {
          .gc-footer-grid { grid-template-columns: 1fr; }
          .gc-footer-bottom { flex-direction: column; align-items: flex-start; gap: 16px; }
          .gc-ft-bottom-links { gap: 12px; }
        }
      `}</style>

      <footer className="gc-footer" role="contentinfo" aria-label="Site footer">
        <div className="gc-footer-grain" aria-hidden="true" />
        <div className="gc-footer-glow"  aria-hidden="true" />
        <div className="gc-footer-glow-2" aria-hidden="true" />

        {/* ── top accent line ── */}
        <div className="gc-footer-topline" aria-hidden="true" />

        {/* ── quote band ── */}
        <div className="gc-footer-quote-band">
          <p className="gc-footer-quote">
            "We do not farm by intuition and we do not build by guesswork.<br />
            Every system we deliver is <em>measurable, defensible, and export-ready.</em>"
          </p>
          <a href="/contact" className="gc-footer-quote-cta">
            Start a Project
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* ── main body ── */}
        <div className="gc-footer-body">

          {/* top grid */}
          <div className="gc-footer-grid">

            {/* col 0: brand */}
            <div className="gc-ft-brand">
              <div>
                <a href="/" className="gc-ft-logo" aria-label="Gartner Callaway home">
                    <img className="w-44" src = "/assets/logo.png" alt="Gartner Callaway Logo" />
                </a>
                <p className="gc-ft-tagline">
                  An integrated agricultural production and services company. Lagos State, Nigeria serving West Africa, the UK, and the EU.
                </p>
              </div>

              {/* offices */}
              <div>
                <div className="gc-ft-offices">
                  {OFFICES.map((o, i) => (
                    <div key={i} className="gc-ft-office">
                      <span className="gc-ft-office-flag" aria-hidden="true">{o.flag}</span>
                      <div>
                        <div className="gc-ft-office-city">{o.city}</div>
                        <div className="gc-ft-office-role">{o.role}</div>
                        {o.sub && <div className="gc-ft-office-sub">{o.sub}</div>}
                      </div>
                    </div>
                  ))}
                </div>

                {/* contact */}
                <div className="gc-ft-contact">
                  <a href="mailto:gartnercallaway@gmail.com" className="gc-ft-contact-row">
                    <svg className="gc-ft-contact-icon" width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <rect x="1" y="3" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                      <path d="M1 5l7 5 7-5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                    gartnercallaway@gmail.com
                  </a>
                  <a href="tel:+2348185811939" className="gc-ft-contact-row">
                    <svg className="gc-ft-contact-icon" width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 2h3l1.5 3.5-1.75 1a9 9 0 004.75 4.75l1-1.75L15 11v3a1 1 0 01-1 1A12 12 0 012 3a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                    </svg>
                    +234 704 979 5940
                  </a>
                </div>
              </div>
            </div>

            {/* nav cols 1–3 */}
            {COLS.map((col) => (
              <nav key={col.heading} className="gc-ft-col" aria-label={col.heading}>
                <h3 className="gc-ft-col-heading">{col.heading}</h3>
                <div className="gc-ft-col-links">
                  {col.links.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      className={`gc-ft-link${l.accent ? " gc-ft-link--accent" : ""}`}
                    >
                      {l.accent && <span className="gc-ft-link-dot" aria-hidden="true"/>}
                      {l.label}
                    </a>
                  ))}
                </div>
              </nav>
            ))}
          </div>

          {/* ── middle strip ── */}
          <div className="gc-footer-mid">

            {/* connect: socials + retail */}
            <div>
              <h3 className="gc-ft-mid-heading">Connect</h3>
              <div className="gc-ft-socials">
                {SOCIALS.map((s) => (
                  <a key={s.name} href={s.href} className="gc-ft-social" aria-label={s.name} target="_blank" rel="noopener noreferrer">
                    {s.icon}
                  </a>
                ))}
              </div>
              {/* <a href="https://gcworld.world" className="gc-ft-retail" target="_blank" rel="noopener noreferrer" aria-label="GCWorld retail store">
                <div className="gc-ft-retail-icon" aria-hidden="true">🌱</div>
                <div>
                  <div className="gc-ft-retail-label">gcworld.world</div>
                  <div className="gc-ft-retail-sub">Retail store — fresh & dried produce</div>
                </div>
                <span className="gc-ft-retail-arrow" aria-hidden="true">
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path d="M2 12L12 2M12 2H6M12 2v6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </a> */}
            </div>

            {/* newsletter */}
            <div>
              <h3 className="gc-ft-mid-heading">Stay Informed</h3>
              <NewsletterForm />
            </div>

            {/* governance */}
            <div>
              <h3 className="gc-ft-mid-heading">Governance & Legal</h3>
              <nav className="gc-ft-gov" aria-label="Governance and legal links">
                {GOVERNANCE.map((g) => (
                  <a key={g.label} href={g.href} className="gc-ft-gov-link">{g.label}</a>
                ))}
              </nav>
            </div>
          </div>

          {/* ── bottom bar ── */}
          <div className="gc-footer-bottom">
            <p className="gc-ft-copyright">
              © {year} <strong>GartnerCallaway Ltd.</strong> All rights reserved.<br />
              Registered in Nigeria. UK partnership office: London
            </p>
            <div className="gc-ft-bottom-links">
              <a href="/legal/terms-of-use"   className="gc-ft-bottom-link">Terms</a>
              <div className="gc-ft-bottom-sep" aria-hidden="true"/>
              <a href="/legal/privacy-policy"  className="gc-ft-bottom-link">Privacy</a>
              <div className="gc-ft-bottom-sep" aria-hidden="true"/>
              <a href="/governance/policies"   className="gc-ft-bottom-link">Policies</a>
              <div className="gc-ft-bottom-sep" aria-hidden="true"/>
              <a href="/sitemap.xml"           className="gc-ft-bottom-link">Sitemap</a>
            </div>
          </div>
        </div>

        {/* ── credentials strip ── */}
        <div className="gc-footer-creds" aria-label="Key credentials">
          {[
            "200 ha Ogun State Estate",
            "500 kW Solar Facility",
            "CropX Precision Sensing",
            "1,000+ Trained",
            "UK & EU Export Qualified",
            "Bank · Insurer · Donor Ready",
          ].map((c, i) => (
            <div key={i} className="gc-ft-cred">
              {i > 0 && <div className="gc-ft-cred-dot" aria-hidden="true"/>}
              {c}
            </div>
          ))}
        </div>
      </footer>
    </>
  );
}