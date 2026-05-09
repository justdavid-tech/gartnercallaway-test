import { useEffect, useRef, useState } from "react";

/* ─── intersection hook ─────────────────────────────────────── */
function useInView(threshold = 0.3) {
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

/* ─── main export ───────────────────────────────────────────── */
export default function WhyNow() {
  const [contentRef, contentVis] = useInView(0.3);
  const [quoteRef, quoteVis] = useInView(0.3);

  return (
    <>
      <style>{`
        /* ── tokens + reset ── */
        .gc-why-section, .gc-why-section * { box-sizing: border-box; }
        .gc-why-section {
          --g900: #0e1f14;
          --g800: #1a3321;
          --g500: #4a8a5b;
          --g400: #7fb38d;
          --g200: #e1f0e5;
          --r400: #FF0000;
          --stone-100: #f4f4f2;
          --stone-500: #787870;
          --stone-800: #2c2c2a;
          --fd: "Cormorant Garamond", Georgia, serif;
          --fb: "DM Sans", system-ui, sans-serif;
          --ep: cubic-bezier(0.34, 1.56, 0.64, 1);
          --es: cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        /* ── section shell ── */
        .gc-why-section {
          background: var(--g900);
          padding: clamp(80px, 12vw, 160px) clamp(20px, 6vw, 96px);
          position: relative;
          overflow: hidden;
          font-family: var(--fb);
        }

        /* decorative backdrop elements */
        .gc-why-deco {
          position: absolute;
          top: -200px; left: -200px;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(127,179,141,.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .gc-why-deco-2 {
          position: absolute;
          bottom: -150px; right: -150px;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(224,122,95,.06) 0%, transparent 70%);
          pointer-events: none;
        }
        
        /* large ghost number watermark */
        .gc-why-watermark {
          position: absolute;
          bottom: 20px; left: 20px;
          font-family: var(--fd);
          font-size: clamp(180px, 25vw, 340px);
          font-weight: 300;
          color: rgba(127,179,141,.04);
          line-height: 1;
          pointer-events: none;
          user-select: none;
          letter-spacing: -.04em;
        }

        /* ── header layout (same elegant style) ── */
        .gc-why-header {
          max-width: 860px;
          margin: 0 auto clamp(40px, 6vw, 72px);
          text-align: center;
        }
        .gc-why-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 9.5px; font-weight: 500;
          letter-spacing: .22em; text-transform: uppercase;
          color: var(--r400);
          margin-bottom: clamp(16px, 2vw, 24px);
        }
        .gc-why-eyebrow-line {
          display: block; width: 28px; height: 1px;
          background: var(--r400); flex-shrink: 0;
        }
        .gc-why-heading {
          font-family: var(--fd);
          font-size: clamp(40px, 6vw, 76px);
          font-weight: 300; line-height: 1.08;
          color: #fff;
          letter-spacing: -.015em;
          margin: 0 0 clamp(20px, 3vw, 32px);
        }
        .gc-why-heading em {
          font-style: italic; font-weight: 300;
          color: var(--g400);
        }

        /* ── main content container ── */
        .gc-why-content {
          max-width: 880px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        /* ── body text ── */
        .gc-why-body {
          font-size: clamp(16px, 1.6vw, 19px);
          font-weight: 300;
          line-height: 1.75;
          color: rgba(255,255,255,.65);
          margin-bottom: clamp(32px, 5vw, 48px);
        }
        .gc-why-body p {
          margin-bottom: 1.8em;
        }
        .gc-why-body strong {
          font-weight: 500;
          color: #fff;
        }

        /* ── pull quote (styled like your pillar quotes) ── */
        .gc-why-quote {
          margin: clamp(40px, 6vw, 64px) 0;
          padding: clamp(24px, 3vw, 36px) clamp(28px, 4vw, 48px);
          background: rgba(255,255,255,.04);
          border-left: 3px solid var(--g500);
          border-radius: 2px;
          backdrop-filter: blur(10px);
        }
        .gc-why-quote p {
          font-family: var(--fd);
          font-size: clamp(20px, 2.2vw, 26px);
          font-style: italic;
          font-weight: 300;
          line-height: 1.45;
          color: rgba(255,255,255,.9);
          margin: 0 0 16px;
        }
        .gc-why-quote cite {
          display: block;
          font-size: 10px;
          font-style: normal;
          font-weight: 500;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: var(--g400);
        }

        /* ── closing statement ── */
        .gc-why-closing {
          font-size: clamp(16px, 1.6vw, 19px);
          font-weight: 400;
          line-height: 1.75;
          color: rgba(255,255,255,.8);
          border-top: 1px solid rgba(255,255,255,.08);
          padding-top: clamp(32px, 5vw, 48px);
          margin-top: clamp(16px, 2vw, 24px);
        }
        .gc-why-closing strong {
          color: #fff;
          font-weight: 500;
        }

        /* ── subtle divider ── */
        .gc-why-divider {
          width: 60px;
          height: 2px;
          background: linear-gradient(90deg, var(--g500), var(--r400));
          margin: clamp(32px, 5vw, 48px) auto 0;
        }

        /* ── animation classes ── */
        .fade-up {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.9s ease, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .gc-why-quote {
            padding: clamp(20px, 4vw, 28px) clamp(20px, 4vw, 32px);
          }
          .gc-why-quote p {
            font-size: clamp(18px, 3.5vw, 22px);
          }
          .gc-why-deco, .gc-why-deco-2 {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .gc-why-watermark {
            display: none;
          }
          .gc-why-body {
            font-size: 15px;
            line-height: 1.7;
          }
        }
      `}</style>

      <section className="gc-why-section" aria-labelledby="why-heading">
        {/* decorative elements */}
        <div className="gc-why-deco" aria-hidden="true" />
        <div className="gc-why-deco-2" aria-hidden="true" />
        <div className="gc-why-watermark" aria-hidden="true">GC</div>

        {/* header */}
        <div className="gc-why-header">
          <div className="gc-why-eyebrow">
            <span className="gc-why-eyebrow-line" aria-hidden="true" />
            The Evolution
          </div>
          <h2 className="gc-why-heading" id="why-heading">
            Why now.<br />
            <em>The next stage.</em>
          </h2>
        </div>

        {/* main content */}
        <div className="gc-why-content">
          {/* opening provocative statement */}
          <div 
            ref={contentRef}
            className={`gc-why-body fade-up ${contentVis ? 'visible' : ''}`}
          >
            <p>
              <strong>A continent does not feed itself with greenhouses alone.</strong>
            </p>
            
            <p>
              We pioneered Africa's first automated hydroponic urban vertical farms. 
              We mastered soilless cultivation, climate control, and precision input 
              delivery and along the way, we learned what the controlled-environment 
              industry rarely admits: vertical farming, however brilliant, will not 
              feed a continent. It cannot scale to the volumes required. It cannot 
              rebuild degraded soils. It cannot host the biodiversity our ecosystems 
              have lost.
            </p>
            
            <p>
              <strong>So we evolved.</strong>
            </p>
          </div>

          {/* pull quote - animated separately */}
          <div 
            ref={quoteRef}
            className={`gc-why-quote fade-up ${quoteVis ? 'visible' : ''}`}
            style={{ transitionDelay: '0.15s' }}
          >
            <p>
              "The marriage of two disciplines: the engineering precision of modern 
              agriculture drip irrigation, fertigation, sensor-verified scheduling, 
              solar infrastructure and the ecological logic of the natural world 
              agroforestry canopies, livestock integration, biomass cycling, 
              biological pest control."
            </p>
            <cite>— Our Operating Philosophy</cite>
          </div>

          {/* closing statement */}
          <div 
            className={`gc-why-closing fade-up ${contentVis ? 'visible' : ''}`}
            style={{ transitionDelay: '0.3s' }}
          >
            <p>
              The result is not a compromise between productivity and regeneration. 
              It is a system in which <strong>both reinforce each other</strong>. 
              This is the next stage of African agricultural sophistication. 
              We are building it.
            </p>
          </div>

          {/* subtle decorative divider */}
          <div className="gc-why-divider" aria-hidden="true" />
        </div>
      </section>
    </>
  );
}