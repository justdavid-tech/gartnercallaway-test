import { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom'

/* ─── LOADER COMPONENT ───────────────────────────────────── */
function Loader({ visible }) {
  return (
    <div className="loader-wrapper" style={{
      opacity: visible ? 1 : 0,
      pointerEvents: visible ? "all" : "none",
      transition: "opacity 0.6s ease",
    }}>
      <div className="loader">
        <svg viewBox="0 0 80 80">
          <circle r="32" cy="40" cx="40"></circle>
        </svg>
      </div>
      <div className="loader triangle">
        <svg viewBox="0 0 86 80">
          <polygon points="43 8 79 72 7 72"></polygon>
        </svg>
      </div>
      <div className="loader">
        <svg viewBox="0 0 80 80">
          <rect height="64" width="64" y="8" x="8"></rect>
        </svg>
      </div>

      <style>{`
        .loader-wrapper {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
          background: #0e1f14;
          z-index: 10000;
        }
        .loader {
          --path: #4a8a5b;
          --dot: #FF0000;
          --duration: 3s;
          width: 44px;
          height: 44px;
          position: relative;
          display: inline-block;
          margin: 0 16px;
        }
        .loader:before {
          content: "";
          width: 6px; height: 6px;
          border-radius: 50%;
          position: absolute;
          display: block;
          background: var(--dot);
          top: 37px; left: 19px;
          transform: translate(-18px, -18px);
          animation: dotRect var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
        }
        .loader svg {
          display: block;
          width: 100%; height: 100%;
        }
        .loader svg rect,
        .loader svg polygon,
        .loader svg circle {
          fill: none;
          stroke: var(--path);
          stroke-width: 10px;
          stroke-linejoin: round;
          stroke-linecap: round;
        }
        .loader svg polygon {
          stroke-dasharray: 145 76 145 76;
          stroke-dashoffset: 0;
          animation: pathTriangle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
        }
        .loader svg rect {
          stroke-dasharray: 192 64 192 64;
          stroke-dashoffset: 0;
          animation: pathRect 3s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
        }
        .loader svg circle {
          stroke-dasharray: 150 50 150 50;
          stroke-dashoffset: 75;
          animation: pathCircle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
        }
        .loader.triangle { width: 48px; }
        .loader.triangle:before {
          left: 21px;
          transform: translate(-10px, -18px);
          animation: dotTriangle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
        }
        @keyframes pathTriangle {
          33%  { stroke-dashoffset: 74;  }
          66%  { stroke-dashoffset: 147; }
          100% { stroke-dashoffset: 221; }
        }
        @keyframes dotTriangle {
          33%  { transform: translate(0, 0);          }
          66%  { transform: translate(10px, -18px);   }
          100% { transform: translate(-10px, -18px);  }
        }
        @keyframes pathRect {
          25%  { stroke-dashoffset: 64;  }
          50%  { stroke-dashoffset: 128; }
          75%  { stroke-dashoffset: 192; }
          100% { stroke-dashoffset: 256; }
        }
        @keyframes dotRect {
          25%  { transform: translate(0, 0);           }
          50%  { transform: translate(18px, -18px);    }
          75%  { transform: translate(0, -36px);       }
          100% { transform: translate(-18px, -18px);   }
        }
        @keyframes pathCircle {
          25%  { stroke-dashoffset: 125; }
          50%  { stroke-dashoffset: 175; }
          75%  { stroke-dashoffset: 225; }
          100% { stroke-dashoffset: 275; }
        }
      `}</style>
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

function Stat({ value, suffix, label, delay, animate }) {
  const count = useCounter(value, 1800, animate);
  return (
    <div className="gc-stat-item" style={{
      opacity: animate ? 1 : 0,
      transform: animate ? "translateY(0)" : "translateY(16px)",
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
    }}>
      <span className="gc-stat-num">{count}{suffix}</span>
      <span className="gc-stat-lbl">{label}</span>
    </div>
  );
}

/* ─── Data ───────────────────────────────────────────────── */
const STATS = [
  { value: 200, suffix: " ha", label: "Ogun State Estate",  delay: 0   },
  { value: 500, suffix: " kW", label: "Solar Capacity",     delay: 100 },
  { value: 30,  suffix: "%",   label: "Yield Improvement",  delay: 200 },
  { value: 50,  suffix: "%",   label: "Water Reduction",    delay: 300 },
];

const BADGES = [
  "CropX precision sensing across 200 ha",
  "Bank-ready & insurer-ready reports",
  "UK & EU export qualified",
  "1,000+ people trained",
];

const WORDS = ["bankable", "insurable", "exportable", "scalable"];

const LOADER_DURATION = 6000; // ms — change to adjust load time

/* ─── Hero ───────────────────────────────────────────────── */
export default function HeroSection() {
  const [loaderVisible,  setLoaderVisible]  = useState(true);  // controls opacity
  const [heroReady,      setHeroReady]      = useState(false);  // hero rendered under loader
  const [loaded,         setLoaded]         = useState(false);  // hero content animations
  const [statsVisible,   setStatsVisible]   = useState(false);
  const [wordIndex,      setWordIndex]      = useState(0);
  const [muted,          setMuted]          = useState(true);
  const [playing,        setPlaying]        = useState(true);

  const statsRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    // Render hero immediately underneath the loader (no flash)
    setHeroReady(true);

    const fadeOut = setTimeout(() => {
      // Fade the loader out — hero is already rendered behind it
      setLoaderVisible(false);

      // Start hero animations after loader finishes fading (0.6s transition)
      setTimeout(() => {
        setLoaded(true);
      }, 650);

    }, LOADER_DURATION);

    return () => clearTimeout(fadeOut);
  }, []);

  /* stats intersection */
  useEffect(() => {
    if (!loaded) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsVisible(true); },
      { threshold: 0.2 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, [loaded]);

  /* rotating word */
  useEffect(() => {
    if (!loaded) return;
    const id = setInterval(() => setWordIndex(i => (i + 1) % WORDS.length), 2400);
    return () => clearInterval(id);
  }, [loaded]);

  function togglePlay() {
    const vid = videoRef.current;
    if (!vid) return;
    playing ? vid.pause() : vid.play();
    setPlaying(!playing);
  }

  function toggleMute() {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !muted;
    setMuted(!muted);
  }

  const v = loaded ? "gc-vis" : "";

  return (
    <>
      {/* Loader sits ON TOP, fades out — hero renders underneath immediately */}
      <Loader visible={loaderVisible} />

      {heroReady && (
        <>
          <style>{`
          // @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
            .gc-hero, .gc-hero * { box-sizing: border-box; margin: 0; padding: 0; }
            .gc-hero {
              --g900: #0e1f14; --g800: #1a3321; --g500: #4a8a5b; --g400: #7fb38d;
              --g200: #e1f0e5; --r400: #e07a5f;
              --ep: cubic-bezier(0.34, 1.56, 0.64, 1);
              position: relative; min-height: 100svh;
              display: flex; flex-direction: column;
              overflow: hidden; background: var(--g900); font-family: var(--fb);
            }
            .gc-video-wrap { position: absolute; inset: 0; z-index: 0; }
            .gc-video-wrap video {
              width: 100%; height: 100%; object-fit: cover; object-position: center;
              filter: saturate(1.3) brightness(0.58);
              transform: scale(1.04); transition: transform 14s ease-out;
            }
            .gc-video-wrap video.rdy { transform: scale(1); }
            .gc-veil {
              position: absolute; inset: 0; z-index: 1;
              background:
                linear-gradient(to top, var(--g900) 0%, transparent 52%),
                linear-gradient(to right, rgba(14,31,20,.78) 0%, transparent 65%);
            }
            .gc-grain {
              position: absolute; inset: 0; z-index: 2; opacity: .032;
              background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
              background-size: 128px; pointer-events: none;
            }
            .gc-body {
              position: relative; z-index: 5; flex: 1;
              display: flex; flex-direction: column; justify-content: center;
              width: 100%; max-width: 1440px; margin: 0 auto;
              padding: clamp(120px,10vw,160px) clamp(28px,6vw,90px) clamp(60px,6vw,90px);
            }
            .gc-eyebrow {
              display: inline-flex; align-items: center; gap: 10px;
              font-size: 9.5px; font-weight: 500; letter-spacing: .22em; text-transform: uppercase;
              color: var(--g400); margin-bottom: clamp(16px,2.5vw,28px);
              opacity: 0; transition: opacity .7s ease .1s;
            }
            .gc-eyebrow.gc-vis { opacity: 1; }
            .gc-eyebrow-rule { display: block; width: 28px; height: 1px; background: var(--g400); flex-shrink: 0; }
            .gc-h1 {
              font-family: var(--fd); font-size: clamp(42px,7vw,96px); font-weight: 300;
              line-height: 1.03; color: #fff; margin-bottom: clamp(16px,2vw,24px);
              letter-spacing: -.02em; max-width: 14ch;
              opacity: 0; transform: translateY(24px);
              transition: opacity .9s ease .2s, transform .9s ease .2s;
            }
            .gc-h1.gc-vis { opacity: 1; transform: translateY(0); }
            .gc-h1 em {
              font-style: italic; font-weight: 300; color: var(--g400);
              display: inline-block; animation: gcWordFade .5s ease;
            }
            @keyframes gcWordFade {
              from { opacity: 0; transform: translateY(10px); }
              to   { opacity: 1; transform: translateY(0);    }
            }
            .gc-sub {
              font-size: clamp(13px,1.5vw,16px); font-weight: 300; line-height: 1.8;
              color: rgba(255,255,255,.60); max-width: min(560px,90%);
              margin-bottom: clamp(28px,4.5vw,48px);
              opacity: 0; transform: translateY(18px);
              transition: opacity .9s ease .42s, transform .9s ease .42s;
            }
            .gc-sub.gc-vis { opacity: 1; transform: translateY(0); }
            .gc-ctas {
              display: flex; align-items: center; gap: clamp(10px,2vw,20px); flex-wrap: wrap;
              opacity: 0; transform: translateY(14px);
              transition: opacity .8s ease .62s, transform .8s ease .62s;
            }
            .gc-ctas.gc-vis { opacity: 1; transform: translateY(0); }
            .gc-btn-p {
              display: inline-flex; align-items: center; gap: 9px;
              font-family: var(--fb); font-size: clamp(10px,1.1vw,12px); font-weight: 500;
              letter-spacing: .12em; text-transform: uppercase;
              color: var(--g900); background: var(--g400);
              padding: clamp(12px,1.4vw,16px) clamp(20px,2.8vw,32px);
              border-radius: 2px; text-decoration: none; white-space: nowrap;
              transition: background .25s, color .25s, transform .2s var(--ep);
            }
            .gc-btn-p:hover { background: var(--g500); color: #fff; transform: translateY(-2px); }
            .gc-btn-p svg { flex-shrink: 0; transition: transform .25s; }
            .gc-btn-p:hover svg { transform: translateX(3px); }
            .gc-btn-s {
              display: inline-flex; align-items: center; gap: 9px;
              font-family: var(--fb); font-size: clamp(10px,1.1vw,12px); font-weight: 400;
              letter-spacing: .12em; text-transform: uppercase;
              color: rgba(255,255,255,.8); border: 1px solid rgba(255,255,255,.28);
              padding: clamp(12px,1.4vw,16px) clamp(20px,2.8vw,32px);
              border-radius: 2px; text-decoration: none; white-space: nowrap;
              transition: border-color .25s, color .25s, transform .2s;
            }
            .gc-btn-s:hover { border-color: rgba(255,255,255,.7); color: #fff; transform: translateY(-2px); }
            .gc-badge {
              margin-top: clamp(28px,4vw,42px); width: min(540px,100%);
              background: rgba(255,255,255,.05); border: 1px solid rgba(127,179,141,.22);
              backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
              border-radius: 6px; padding: 22px;
              display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
              opacity: 0; transform: translateY(18px);
              transition: opacity .8s ease .9s, transform .8s ease .9s;
            }
            .gc-badge.gc-vis { opacity: 1; transform: translateY(0); }
            .gc-badge-row { display: flex; align-items: flex-start; gap: 10px; }
            .gc-badge-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--g400); margin-top: 6px; flex-shrink: 0; }
            .gc-badge-txt { font-size: 11px; font-weight: 300; color: rgba(255,255,255,.65); line-height: 1.5; }
            .gc-vid-controls {
              position: absolute; bottom: clamp(110px,14vw,140px); right: clamp(24px,4vw,56px);
              z-index: 8; display: flex; flex-direction: column; align-items: center; gap: 10px;
              opacity: 0; transition: opacity .8s ease 1.2s;
            }
            .gc-vid-controls.gc-vis { opacity: 1; }
            .gc-vid-btn {
              width: 36px; height: 36px; border-radius: 50%;
              border: 1px solid rgba(255,255,255,.22); background: rgba(255,255,255,.08);
              backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center;
              cursor: pointer; transition: background .2s, border-color .2s;
            }
            .gc-vid-btn:hover { background: rgba(255,255,255,.18); border-color: rgba(255,255,255,.5); }
            .gc-vid-btn svg { color: rgba(255,255,255,.8); }
            .gc-scroll {
              position: absolute; left: clamp(24px,4vw,56px); bottom: clamp(110px,14vw,140px);
              z-index: 8; display: flex; flex-direction: column; align-items: center; gap: 10px;
              opacity: 0; transition: opacity .8s ease 1.2s;
            }
            .gc-scroll.gc-vis { opacity: 1; }
            .gc-scroll-txt { font-size: 8.5px; letter-spacing: .22em; text-transform: uppercase; color: rgba(255,255,255,.3); writing-mode: vertical-rl; }
            .gc-scroll-line {
              width: 1px; height: 44px;
              background: linear-gradient(to bottom, rgba(127,179,141,.6), transparent);
              animation: sPulse 2s ease-in-out infinite;
            }
            @keyframes sPulse {
              0%,100% { opacity:.4; transform:scaleY(1);   }
              50%      { opacity:1;  transform:scaleY(.55); }
            }
            .gc-stats {
              position: relative; z-index: 6; flex-shrink: 0;
              display: grid; grid-template-columns: repeat(4,1fr);
              border-top: 1px solid rgba(255,255,255,.07);
              background: rgba(14,31,20,.90);
              backdrop-filter: blur(20px) saturate(160%); -webkit-backdrop-filter: blur(20px) saturate(160%);
            }
            .gc-stat-item { padding: clamp(16px,2.5vw,28px) clamp(16px,3vw,40px); border-right: 1px solid rgba(255,255,255,.07); }
            .gc-stat-item:last-child { border-right: none; }
            .gc-stat-num { display: block; font-family: var(--fd); font-size: clamp(24px,3.5vw,38px); font-weight: 300; color: #fff; line-height: 1; margin-bottom: 5px; letter-spacing: -.01em; }
            .gc-stat-lbl { display: block; font-size: clamp(8px,.95vw,10px); font-weight: 400; letter-spacing: .16em; text-transform: uppercase; color: rgba(255,255,255,.38); }
            @media (max-width: 1024px) { .gc-badge { width: 100%; max-width: 100%; } .gc-scroll { display: none; } .gc-vid-controls { right: 20px; bottom: 100px; } }
            @media (max-width: 768px) {
              .gc-stats { grid-template-columns: repeat(2,1fr); }
              .gc-stat-item:nth-child(2) { border-right: none; }
              .gc-stat-item:nth-child(3), .gc-stat-item:nth-child(4) { border-top: 1px solid rgba(255,255,255,.07); }
              .gc-stat-item:nth-child(4) { border-right: none; }
              .gc-veil { background: linear-gradient(to top, var(--g900) 0%, rgba(14,31,20,.3) 60%, transparent 100%), linear-gradient(to right, rgba(14,31,20,.55) 0%, transparent 80%); }
            }
            @media (max-width: 640px) {
              .gc-body { padding: 120px 22px 42px; }
              .gc-h1, .gc-sub { max-width: 100%; }
              .gc-badge { grid-template-columns: 1fr; padding: 16px; gap: 12px; }
              .gc-badge-txt { font-size: 10px; line-height: 1.45; }
            }
            @media (max-width: 480px) {
              .gc-ctas { flex-direction: column; align-items: stretch; }
              .gc-btn-p, .gc-btn-s { justify-content: center; }
            }
          `}</style>

          <section className="gc-hero" aria-label="Hero">
            <div className="gc-video-wrap" aria-hidden="true">
              <video
                ref={videoRef}
                autoPlay muted loop playsInline
                className={loaded ? "rdy" : ""}
                onCanPlay={() => {}}
                src="/assets/hero-bg.mp4"
              />
            </div>
            <div className="gc-veil"  aria-hidden="true" />
            <div className="gc-grain" aria-hidden="true" />

            <div className="gc-body">
              <div className={`gc-eyebrow ${v}`}>
                <span className="gc-eyebrow-rule" aria-hidden="true" />
                <span>Nigeria · West Africa · UK Partnership Corridor</span>
              </div>
              <h1 className={`gc-h1 ${v}`}>
                Regenerative agriculture,<br />
                made <em key={wordIndex}>{WORDS[wordIndex]}</em>.
              </h1>
              <p className={`gc-sub ${v}`}>
                We design, build, and operate integrated farm systems
                that produce food, fibre, and feedstock at commercial
                scale backed by precision sensing and irrigation
                engineering in Nigeria.
              </p>
              <div className={`gc-ctas ${v}`}>
                <Link to="/production" className="gc-btn-p">
                  Explore Our Work
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link to="/contact" className="gc-btn-s">Contact Us</Link>
              </div>
              <aside className={`gc-badge ${v}`} aria-label="Key credentials">
                {BADGES.map((b) => (
                  <div className="gc-badge-row" key={b}>
                    <div className="gc-badge-dot" aria-hidden="true" />
                    <span className="gc-badge-txt">{b}</span>
                  </div>
                ))}
              </aside>
            </div>

            <div className={`gc-vid-controls ${v}`} aria-label="Video controls">
              <button className="gc-vid-btn" onClick={togglePlay} aria-label={playing ? "Pause video" : "Play video"}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  {playing
                    ? <><rect x="2" y="2" width="3.5" height="10" rx="1" fill="currentColor"/><rect x="8.5" y="2" width="3.5" height="10" rx="1" fill="currentColor"/></>
                    : <path d="M3 2l9 5-9 5V2z" fill="currentColor"/>
                  }
                </svg>
              </button>
              <button className="gc-vid-btn" onClick={toggleMute} aria-label={muted ? "Unmute video" : "Mute video"}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  {muted
                    ? <><path d="M2 5h2.5L8 2v10L4.5 9H2V5z" fill="currentColor"/><path d="M10 4l2 2m0 0l-2 2m2-2l-2-2m2 2l-2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></>
                    : <><path d="M2 5h2.5L8 2v10L4.5 9H2V5z" fill="currentColor"/><path d="M10 4.5a3 3 0 010 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></>
                  }
                </svg>
              </button>
            </div>

            <div className="gc-scroll" style={{ opacity: loaded ? 1 : 0, transition: "opacity .8s ease 1.2s" }} aria-hidden="true">
              <span className="gc-scroll-txt">Scroll</span>
              <div className="gc-scroll-line" />
            </div>

            <div className="gc-stats" ref={statsRef} role="region" aria-label="Key statistics">
              {STATS.map((s) => (
                <Stat key={s.label} {...s} animate={statsVisible} />
              ))}
            </div>
          </section>
        </>
      )}
    </>
  );
}