import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function GCAcademy() {
  const [loaded,     setLoaded]     = useState(false);
  const [count,      setCount]      = useState(0);
  const canvasRef                   = useRef(null);

  /* ── entrance delay ── */
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  /* ── countdown to arbitrary launch date ── */
  useEffect(() => {
    const LAUNCH = new Date("2026-09-01T00:00:00Z").getTime();
    function tick() {
      const diff = LAUNCH - Date.now();
      setCount(Math.max(0, Math.floor(diff / 1000)));
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  /* ── particle canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx    = canvas.getContext("2d");
    let raf;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COUNT = 55;
    const particles = Array.from({ length: COUNT }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      r:  Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      o:  Math.random() * 0.5 + 0.15,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(127,179,141,${p.o})`;
        ctx.fill();
      });

      // faint connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(127,179,141,${0.07 * (1 - dist / 110)})`;
            ctx.lineWidth   = 0.6;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  /* ── countdown format ── */
  const days    = Math.floor(count / 86400);
  const hours   = Math.floor((count % 86400) / 3600);
  const minutes = Math.floor((count % 3600)  / 60);
  const seconds = count % 60;
  const pad     = n => String(n).padStart(2, "0");

  const v = loaded ? "1" : "0";

  return (
    <>
      <style>{`
        .gca-root {
          position: relative; min-height: 100svh;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          background: #0e1f14; overflow: hidden;
          font-family: "DM Sans", system-ui, sans-serif;
          padding: 100px 24px 60px;
        }

        /* ── canvas ── */
        .gca-canvas {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          pointer-events: none;
        }

        /* ── grain ── */
        .gca-grain {
          position: absolute; inset: 0; opacity: .032;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 128px; pointer-events: none;
        }

        /* ── radial glow ── */
        .gca-glow {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 60% 55% at 50% 50%, rgba(74,138,91,.13) 0%, transparent 70%),
            radial-gradient(ellipse 30% 30% at 20% 80%, rgba(224,122,95,.06) 0%, transparent 60%);
        }

        /* ── inner ── */
        .gca-inner {
          position: relative; z-index: 5;
          display: flex; flex-direction: column;
          align-items: center; text-align: center;
          max-width: 700px;
        }

        /* ── eyebrow ── */
        .gca-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 9px; font-weight: 500; letter-spacing: .24em; text-transform: uppercase;
          color: #7fb38d; margin-bottom: 28px;
          opacity: 0; transform: translateY(16px);
          transition: opacity .7s ease .1s, transform .7s ease .1s;
        }
        .gca-eyebrow.vis { opacity: 1; transform: translateY(0); }
        .gca-eyebrow-rule { display: block; width: 22px; height: 1px; background: #7fb38d; }

        /* ── headline ── */
        .gca-h1 {
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: clamp(56px, 10vw, 120px);
          font-weight: 300; line-height: 1; letter-spacing: -.03em;
          color: #fff; margin-bottom: 10px;
          opacity: 0; transform: translateY(28px);
          transition: opacity .9s ease .25s, transform .9s ease .25s;
        }
        .gca-h1.vis { opacity: 1; transform: translateY(0); }

        /* ── "soon" italic accent ── */
        .gca-soon {
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: clamp(56px, 10vw, 120px);
          font-weight: 300; font-style: italic;
          line-height: 1; letter-spacing: -.03em;
          color: transparent;
          -webkit-text-stroke: 1px rgba(127,179,141,.65);
          display: block; margin-bottom: 36px;
          opacity: 0; transform: translateY(28px);
          transition: opacity .9s ease .4s, transform .9s ease .4s;
        }
        .gca-soon.vis { opacity: 1; transform: translateY(0); }

        /* ── sub ── */
        .gca-sub {
          font-size: clamp(13px, 1.5vw, 16px); font-weight: 300; line-height: 1.8;
          color: #fff; max-width: 460px;
          margin-bottom: 52px;
          opacity: 0; transform: translateY(18px);
          transition: opacity .8s ease .55s, transform .8s ease .55s;
        }
        .gca-sub.vis { opacity: 1; transform: translateY(0); }

        /* ── countdown ── */
        .gca-countdown {
          display: flex; align-items: flex-start; gap: clamp(16px, 4vw, 36px);
          margin-bottom: 56px;
          opacity: 0; transform: translateY(18px);
          transition: opacity .8s ease .7s, transform .8s ease .7s;
        }
        .gca-countdown.vis { opacity: 1; transform: translateY(0); }

        .gca-cd-unit { display: flex; flex-direction: column; align-items: center; gap: 6px; }

        .gca-cd-num {
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: clamp(32px, 6vw, 64px); font-weight: 300; line-height: 1;
          color: #fff; letter-spacing: -.02em;
          background: rgba(255,255,255,.04);
          border: 1px solid rgba(127,179,141,.15);
          border-radius: 4px;
          padding: clamp(10px,2vw,18px) clamp(14px,2.5vw,24px);
          min-width: clamp(60px, 8vw, 96px);
          text-align: center;
          transition: border-color .3s;
        }
        .gca-cd-num:hover { border-color: rgba(127,179,141,.4); }

        .gca-cd-lbl {
          font-size: 8px; font-weight: 500; letter-spacing: .2em; text-transform: uppercase;
          color: #FFF;
        }

        .gca-cd-sep {
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: clamp(28px, 5vw, 52px); font-weight: 300;
          color: #FFF; line-height: 1;
          padding-top: clamp(10px, 2vw, 18px);
          animation: gca-blink 1s ease-in-out infinite;
        }
        @keyframes gca-blink { 0%,100% { opacity:.3; } 50% { opacity:1; } }

        /* ── notify bar ── */
        .gca-notify {
          display: flex; flex-direction: column; align-items: center; gap: 14px;
          width: 100%; max-width: 420px;
          opacity: 0; transform: translateY(14px);
          transition: opacity .8s ease .9s, transform .8s ease .9s;
        }
        .gca-notify.vis { opacity: 1; transform: translateY(0); }

        .gca-notify-label {
          font-size: 9px; font-weight: 500; letter-spacing: .2em; text-transform: uppercase;
          color: rgba(255,255,255,.3);
        }

        .gca-notify-form {
          display: flex; width: 100%; gap: 0;
          border: 1px solid rgba(127,179,141,.22); border-radius: 2px; overflow: hidden;
          background: rgba(255,255,255,.04);
          backdrop-filter: blur(8px);
          transition: border-color .25s;
        }
        .gca-notify-form:focus-within { border-color: rgba(127,179,141,.5); }

        .gca-notify-input {
          flex: 1; background: transparent; border: none; outline: none;
          font-family: "DM Sans", system-ui, sans-serif;
          font-size: 13px; color: #fff; padding: 13px 18px;
        }
        .gca-notify-input::placeholder { color: rgba(255,255,255,.25); }

        .gca-notify-btn {
          background: #4a8a5b; border: none; cursor: pointer;
          font-family: "DM Sans", system-ui, sans-serif;
          font-size: 9px; font-weight: 500; letter-spacing: .16em; text-transform: uppercase;
          color: #fff; padding: 13px 20px; white-space: nowrap;
          transition: background .25s;
          display: flex; align-items: center; gap: 7px;
        }
        .gca-notify-btn:hover { background: #7fb38d; color: #0e1f14; }

        /* ── back link ── */
        .gca-back {
          position: relative; z-index: 5; margin-top: 48px;
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 9px; font-weight: 500; letter-spacing: .2em; text-transform: uppercase;
          color: #FFF; text-decoration: none;
          transition: color .25s;
          opacity: 0; transition: opacity .8s ease 1.1s, color .25s;
        }
        .gca-back.vis { opacity: 1; }
        .gca-back:hover { color: #7fb38d; }
        .gca-back-rule { display: block; width: 18px; height: 1px; background: currentColor; }

       
        /* ── success state ── */
        .gca-success {
          font-size: 12px; color: #7fb38d; letter-spacing: .1em;
          display: flex; align-items: center; gap: 6px;
        }

        @media (max-width: 480px) {
          .gca-countdown { gap: 10px; }
          .gca-cd-sep    { display: none; }
        }
      `}</style>

      <div className="gca-root">
        <canvas ref={canvasRef} className="gca-canvas" />
        <div className="gca-grain" />
        <div className="gca-glow" />

        <div className="gca-inner">

          {/* Eyebrow */}
          <div className={`gca-eyebrow ${loaded ? "vis" : ""}`}>
            <span className="gca-eyebrow-rule" />
            Gartner Callaway Academy
            <span className="gca-eyebrow-rule" />
          </div>

          {/* Headline */}
          <h1 className={`gca-h1 ${loaded ? "vis" : ""}`}>Coming</h1>
          <em className={`gca-soon ${loaded ? "vis" : ""}`}>Soon.</em>

          {/* Subtext */}
          <p className={`gca-sub ${loaded ? "vis" : ""}`}>
            GC Academy is where regenerative agriculture becomes a career.
            Practical training, certified programmes, and field-based learning —
            built for the next generation of Nigerian farm professionals.
          </p>

          {/* Countdown */}
          <div className={`gca-countdown ${loaded ? "vis" : ""}`}>
            <div className="gca-cd-unit">
              <span className="gca-cd-num">{pad(days)}</span>
              <span className="gca-cd-lbl">Days</span>
            </div>
            <span className="gca-cd-sep">:</span>
            <div className="gca-cd-unit">
              <span className="gca-cd-num">{pad(hours)}</span>
              <span className="gca-cd-lbl">Hours</span>
            </div>
            <span className="gca-cd-sep">:</span>
            <div className="gca-cd-unit">
              <span className="gca-cd-num">{pad(minutes)}</span>
              <span className="gca-cd-lbl">Minutes</span>
            </div>
            <span className="gca-cd-sep">:</span>
            <div className="gca-cd-unit">
              <span className="gca-cd-num">{pad(seconds)}</span>
              <span className="gca-cd-lbl">Seconds</span>
            </div>
          </div>

          {/* Notify form */}
          {/* <NotifyForm loaded={loaded} /> */}

        </div>

        {/* Back link */}
        <Link to="/" className={`gca-back ${loaded ? "vis" : ""}`}>
          <span className="gca-back-rule" />
          Back to Homepage
        </Link>
      </div>
    </>
  );
}

/* ─── Notify Form ────────────────────────────────────────── */
// function NotifyForm({ loaded }) {
//   const [email,     setEmail]     = useState("");
//   const [submitted, setSubmitted] = useState(false);

//   function handleSubmit(e) {
//     e.preventDefault();
//     if (!email) return;
//     // TODO: wire to your mailing list / Sanity / emailjs
//     console.log("Notify signup:", email);
//     setSubmitted(true);
//   }

//   return (
//     <div className={`gca-notify ${loaded ? "vis" : ""}`}>
//       <p className="gca-notify-label">Be first to know when we launch</p>

//       {submitted ? (
//         <p className="gca-success">
//           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
//             <path d="M20 6L9 17l-5-5" />
//           </svg>
//           You're on the list — we'll be in touch.
//         </p>
//       ) : (
//         <form className="gca-notify-form" onSubmit={handleSubmit}>
//           <input
//             className="gca-notify-input"
//             type="email"
//             required
//             placeholder="Your email address"
//             value={email}
//             onChange={e => setEmail(e.target.value)}
//           />
//           <button type="submit" className="gca-notify-btn">
//             Notify Me
//             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
//               <path d="M5 12h14M12 5l7 7-7 7" />
//             </svg>
//           </button>
//         </form>
//       )}
//     </div>
//   );
// }