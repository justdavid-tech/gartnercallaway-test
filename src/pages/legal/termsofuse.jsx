import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

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

function Fade({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

/* ─── Data ───────────────────────────────────────────────── */
const TERMS = [
  {
    number: "01",
    heading: "Acceptance of Terms",
    body: "By accessing or using the Gartner Callaway website (gartnercallaway.com), you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use this website. These terms apply to all visitors, users, and others who access the site.",
  },
  {
    number: "02",
    heading: "Use of This Website",
    body: "This website is provided for informational purposes about Gartner Callaway's products, services, and operations. You may not use this site for any unlawful purpose, to transmit harmful or misleading content, or in any way that could damage, disable, or impair the site or interfere with any other party's use of it.",
  },
  {
    number: "03",
    heading: "Intellectual Property",
    body: "All content on this website — including text, graphics, logos, images, and data — is the property of Gartner Callaway or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from any content on this site without prior written consent from Gartner Callaway.",
  },
  {
    number: "04",
    heading: "Accuracy of Information",
    body: "Gartner Callaway makes reasonable efforts to ensure that the information on this website is accurate and up to date. However, we make no warranties or representations — express or implied — about the completeness, accuracy, reliability, or suitability of the information provided. Any reliance you place on such information is strictly at your own risk.",
  },
  {
    number: "05",
    heading: "Third-Party Links",
    body: "This website may contain links to third-party websites for your convenience. These links do not signify endorsement of those sites or their content. Gartner Callaway has no control over the nature, content, or availability of those sites and accepts no responsibility for them or for any loss or damage that may arise from your use of them.",
  },
  {
    number: "06",
    heading: "Limitation of Liability",
    body: "To the fullest extent permitted by law, Gartner Callaway shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your access to or use of this website. This includes, without limitation, any errors or omissions in content, or any loss or damage incurred as a result of the use of any content posted, transmitted, or otherwise made available via the site.",
  },
  {
    number: "07",
    heading: "Privacy",
    body: "Your use of this website is also governed by our Privacy Policy, which is incorporated into these Terms of Use by reference. By using this website, you consent to the collection and use of information as described in our Privacy Policy.",
  },
  {
    number: "08",
    heading: "Governing Law",
    body: "These Terms of Use shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the courts of Nigeria.",
  },
  {
    number: "09",
    heading: "Changes to These Terms",
    body: "Gartner Callaway reserves the right to update or modify these Terms of Use at any time without prior notice. Your continued use of the website following any changes constitutes your acceptance of the revised terms. We recommend reviewing this page periodically.",
  },
  {
    number: "10",
    heading: "Contact",
    body: "If you have any questions about these Terms of Use, please contact us at info@gartnercallaway.com or through our contact page.",
  },
];

/* ─── Hero ───────────────────────────────────────────────── */
function Hero() {
  const [ref, vis] = useInView(0.1);
  return (
    <section className="relative h-[46vh] min-h-[380px] flex items-center bg-gc-green-900 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&q=80"
          alt="Terms of Use"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gc-green-900 via-gc-green-900/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-gc-green-900 via-transparent to-transparent" />
      </div>
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"}} />

      <div ref={ref} className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 mb-5"
            style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(16px)", transition: "opacity .7s ease .1s, transform .7s ease .1s" }}>
            <span className="block w-7 h-px bg-gc-green-400" />
            <span className="text-[9.5px] font-medium tracking-[.22em] uppercase text-gc-green-400">
              Legal
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold text-white leading-[1.05] mb-4"
            style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(24px)", transition: "opacity .9s ease .2s, transform .9s ease .2s" }}>
            Terms of <em className="italic text-gc-green-400">Use.</em>
          </h1>

          <p className="text-sm text-white leading-relaxed max-w-lg"
            style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(18px)", transition: "opacity .9s ease .38s, transform .9s ease .38s" }}>
            Please read these terms carefully before using the Gartner Callaway website.
          </p>

          {/* Last updated */}
          <p className="mt-5 text-[10px] uppercase tracking-widest text-white"
            style={{ opacity: vis ? 1 : 0, transition: "opacity .8s ease .55s" }}>
            Last updated: May 2026
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── Page ───────────────────────────────────────────────── */
export default function TermsOfUse() {
  return (
    <>
      <Hero />

      {/* Body */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">

            {/* Intro note */}
            <Fade className="mb-14 pb-10 border-b border-gc-stone-100">
              <p className="text-sm text-black leading-relaxed">
                These Terms of Use govern your access to and use of the Gartner Callaway
                website and all associated pages. By continuing to use this site you confirm
                that you have read, understood, and agreed to be bound by the terms set out below.
              </p>
            </Fade>

            {/* Terms list */}
            <div className="space-y-10">
              {TERMS.map((term, i) => (
                <Fade key={term.number} delay={i * 40}
                  className="grid grid-cols-[40px_1fr] gap-6 pb-10 border-b border-gc-stone-100 last:border-0 last:pb-0">

                  {/* Number */}
                  <div className="pt-0.5">
                    <span className="text-[20px] font-medium tracking-[.2em] text-gc-green-400 font-body">
                      {term.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-display font-medium text-black text-xl sm:text-2xl mb-3 leading-snug">
                      {term.heading}
                    </h3>
                    <p className="text-sm text-black leading-relaxed">{term.body}</p>
                  </div>
                </Fade>
              ))}
            </div>

            {/* Footer note */}
            <Fade delay={100} className="mt-16 p-7 rounded-2xl bg-gc-stone-100 border border-gc-stone-100">
              <p className="text-xs font-semibold uppercase tracking-widest text-gc-stone-500 mb-2">
                Questions about these terms?
              </p>
              <p className="text-sm text-black leading-relaxed mb-5">
                If you have any questions or concerns about these Terms of Use,
                our team is happy to help.
              </p>
              <Link to="/contact"
                className="inline-flex items-center gap-2 bg-gc-green-500 hover:bg-gc-green-900 text-white font-semibold text-xs uppercase tracking-widest px-6 py-3 rounded-lg transition-colors duration-300 hover:gap-3">
                Get in Touch <ArrowRight size={13} />
              </Link>
            </Fade>

          </div>
        </div>
      </section>
    </>
  );
}