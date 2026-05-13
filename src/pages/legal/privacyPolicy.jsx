import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Lock } from "lucide-react";

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
const SECTIONS = [
  {
    number: "01",
    heading: "Who We Are",
    body: "Gartner Callaway is an independent agricultural production, services, and education company operating in Nigeria. Our registered address is Km 28, Lagos-Ibadan Expressway, Ogun State, Nigeria. For all privacy-related enquiries, you may contact us at info@gartnercallaway.com.",
  },
  {
    number: "02",
    heading: "Information We Collect",
    body: "We may collect the following categories of personal information when you interact with our website, contact forms, or services:",
    list: [
      "Identity data: full name, job title, and organisation.",
      "Contact data: email address, phone number, and postal address.",
      "Communication data: messages you send us via our contact form or email.",
    ],
  },
  {
    number: "03",
    heading: "How We Collect Your Information",
    body: "We collect personal information through the following means:",
    list: [
      "Direct interactions: when you fill in our contact form, send us an email, or engage with us directly.",
      "Automated technologies: as you interact with our website, we may automatically collect technical and usage data via cookies and similar technologies.",
      "Third parties: we may receive data from analytics providers, search platforms, or referral partners.",
    ],
  },
  {
    number: "04",
    heading: "How We Use Your Information",
    body: "Gartner Callaway uses your personal information only for legitimate purposes, including:",
    list: [
      "To respond to enquiries submitted via our contact form or email.",
      "To provide information about our services, programmes, or events that you have requested.",
      "To notify you of changes to our website, services, or policies.",
      "To improve our website experience through anonymised analytics.",
      "To comply with legal obligations applicable under Nigerian law and relevant international standards.",
    ],
  },
  {
    number: "05",
    heading: "Legal Basis for Processing",
    body: "We process your personal data on the following legal grounds:",
    list: [
      "Consent: where you have given clear, informed consent for us to process your data for a specific purpose.",
      "Legitimate interests: where processing is necessary for our legitimate business interests, provided those interests are not overridden by your rights.",
      "Legal obligation: where processing is necessary for compliance with applicable laws or regulations.",
      "Contractual necessity: where processing is required to fulfil a contract with you or take pre-contractual steps at your request.",
    ],
  },
  {
    number: "06",
    heading: "Data Sharing & Disclosure",
    body: "We do not sell, rent, or trade your personal information to third parties. We may share your data only in the following limited circumstances:",
    list: [
      "With trusted service providers who assist us in operating our website and conducting our business bound by confidentiality obligations.",
      "Where required by law, regulation, court order, or government authority.",
      "To protect the rights, property, or safety of Gartner Callaway, our employees, or others.",
      "In connection with a business restructuring, merger, or acquisition subject to equivalent data protection commitments.",
    ],
  },
  {
    number: "07",
    heading: "Cookies & Tracking Technologies",
    body: "Our website uses cookies and similar tracking technologies to enhance your browsing experience and collect usage data. Cookies are small text files placed on your device. We use:",
    list: [
      "Essential cookies: necessary for the website to function correctly.",
      "Analytics cookies: to understand how visitors use our site, helping us improve content and navigation.",
      "Preference cookies: to remember your settings and preferences across visits.",
    ],
    footer: "You may control or disable cookies through your browser settings at any time. Note that disabling certain cookies may affect the functionality of the website.",
  },
  {
    number: "08",
    heading: "Data Retention",
    body: "We retain personal data only for as long as necessary to fulfil the purposes for which it was collected, or as required by law. Contact form submissions and enquiry data are typically retained for up to 24 months. Analytics data is retained in anonymised form. Where we no longer need your data, it is securely deleted or anonymised.",
  },
  {
    number: "09",
    heading: "Data Security",
    body: "We take the security of your personal data seriously and implement appropriate technical and organisational measures to protect it against unauthorised access, loss, destruction, or alteration. These measures include encrypted data transmission (SSL/TLS), restricted internal access to personal data, and regular security reviews. However, no method of transmission over the internet is entirely secure, and we cannot guarantee absolute security.",
  },
  {
    number: "10",
    heading: "Your Rights",
    body: "Subject to applicable law, you have the following rights in relation to your personal data:",
    list: [
      "Right of access: to request a copy of the personal data we hold about you.",
      "Right to rectification: to request correction of inaccurate or incomplete data.",
      "Right to erasure: to request deletion of your personal data where there is no legitimate reason for us to continue processing it.",
      "Right to restrict processing: to request that we limit how we use your data.",
      "Right to data portability: to receive your data in a structured, machine-readable format.",
      "Right to object: to object to processing based on legitimate interests or for direct marketing purposes.",
      "Right to withdraw consent: where processing is based on consent, to withdraw it at any time.",
    ],
    footer: "To exercise any of these rights, please contact us at info@gartnercallaway.com. We will respond within 30 days.",
  },
  {
    number: "11",
    heading: "Children's Privacy",
    body: "Our website is not directed at children under the age of 18. We do not knowingly collect personal data from minors. If you believe we have inadvertently collected information from a child, please contact us immediately and we will take prompt steps to delete it.",
  },
  {
    number: "12",
    heading: "International Data Transfers",
    body: "Your data is primarily processed and stored within Nigeria. If we transfer data outside Nigeria, we ensure that adequate protections are in place consistent with applicable data protection laws, including contractual safeguards and equivalent privacy standards.",
  },
  {
    number: "13",
    heading: "Changes to This Policy",
    body: "Gartner Callaway reserves the right to update this Privacy Policy at any time. We will notify users of material changes by updating the effective date at the top of this page. Your continued use of our website following any changes constitutes your acceptance of the revised policy. We encourage you to review this page periodically.",
  },
  {
    number: "14",
    heading: "Contact & Complaints",
    body: "If you have questions, concerns, or complaints about this Privacy Policy or how we handle your personal data, please contact us at info@gartnercallaway.com. If you are unsatisfied with our response, you have the right to lodge a complaint with the relevant data protection authority in Nigeria.",
  },
];

/* ─── Hero ───────────────────────────────────────────────── */
function Hero() {
  const [ref, vis] = useInView(0.1);
  return (
    <section className="relative h-[46vh] min-h-[380px] flex items-center bg-gc-green-900 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=80"
          alt="Privacy Policy"
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
              Legal · Data Protection
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold text-white leading-[1.05] mb-4"
            style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(24px)", transition: "opacity .9s ease .2s, transform .9s ease .2s" }}>
            Privacy <em className="italic text-gc-green-400">Policy</em>
          </h1>

          <p className="text-sm text-white leading-relaxed max-w-lg"
            style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(18px)", transition: "opacity .9s ease .38s, transform .9s ease .38s" }}>
            How Gartner Callaway collects, uses, and protects your personal information
            when you interact with our website and services.
          </p>

          <p className="mt-5 text-[10px] uppercase tracking-widest text-white"
            style={{ opacity: vis ? 1 : 0, transition: "opacity .8s ease .55s" }}>
            Last updated: May 2026
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── Commitment Strip ───────────────────────────────────── */
function CommitmentStrip() {
  const items = [
    { icon: "", label: "We never sell your data" },
    { icon: "", label: "You control your information" },
    { icon: "", label: "SSL encrypted transmission" },
    { icon: "", label: "Nigeria data law compliant" },
  ];
  return (
    <section className="bg-gc-green-900 border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <Fade key={i} delay={i * 60}
              className="flex items-center gap-3">
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs text-white leading-snug">{item.label}</span>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Page ───────────────────────────────────────────────── */
export default function PrivacyPolicy() {
  return (
    <>
      <Hero />
      <CommitmentStrip />

      {/* Body */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">

            {/* Intro */}
            <Fade className="mb-14 pb-10 border-b border-gc-stone-100">
              <div className="flex items-start gap-4">
                <Lock size={16} className="text-gc-green-400 mt-1 shrink-0" />
                <p className="text-sm text-black leading-relaxed">
                  Gartner Callaway respects your privacy and is committed to protecting
                  your personal data. This Privacy Policy explains what information we collect,
                  how we use it, and your rights in relation to it. It applies to all users of
                  our website at{" "}
                  <a href="https://gartnercallaway-testing.vercel.app"
                    className="text-gc-green-500 underline underline-offset-2 hover:text-gc-green-900 transition-colors">
                    gartnercallaway.com
                  </a>.
                </p>
              </div>
            </Fade>

            {/* Sections */}
            <div className="space-y-10">
              {SECTIONS.map((sec, i) => (
                <Fade key={sec.number} delay={i * 35}
                  className="grid grid-cols-[40px_1fr] gap-6 pb-10 border-b border-gc-stone-100 last:border-0 last:pb-0">

                  {/* Number */}
                  <div className="pt-0.5">
                    <span className="text-[20px] font-medium tracking-[.2em] text-gc-green-400 font-body">
                      {sec.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="font-display font-medium text-black text-xl sm:text-2xl mb-3 leading-snug">
                      {sec.heading}
                    </h3>
                    {sec.body && (
                      <p className="text-sm text-black leading-relaxed mb-4">{sec.body}</p>
                    )}
                    {sec.list && (
                      <ul className="space-y-2.5 mb-4">
                        {sec.list.map((item, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <span className="mt-[7px] w-1 h-1 rounded-full bg-gc-green-400 shrink-0" />
                            <span className="text-sm text-black leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {sec.footer && (
                      <p className="text-sm text-black leading-relaxed mt-2 pl-4 border-l-2 border-gc-green-200 italic">
                        {sec.footer}
                      </p>
                    )}
                  </div>
                </Fade>
              ))}
            </div>

            {/* Footer card */}
            <Fade delay={100} className="mt-16 p-7 rounded-2xl bg-gc-stone-100 border border-gc-stone-100">
              <p className="text-xs font-semibold uppercase tracking-widest text-gc-stone-500 mb-2">
                Privacy Enquiries
              </p>
              <p className="text-sm text-black leading-relaxed mb-5">
                If you have questions about this Privacy Policy, wish to exercise your data
                rights, or want to raise a concern, please contact our team directly.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/contact"
                  className="inline-flex items-center gap-2 bg-gc-green-500 hover:bg-gc-green-900 text-white font-semibold text-xs uppercase tracking-widest px-6 py-3 rounded-lg transition-colors duration-300 hover:gap-3">
                  Contact Us <ArrowRight size={13} />
                </Link>
                <a href="mailto:info@gartnercallaway.com"
                  className="inline-flex items-center gap-2 border border-gc-stone-200 hover:border-gc-green-400 text-black hover:text-gc-green-500 font-semibold text-xs uppercase tracking-widest px-6 py-3 rounded-lg transition-colors duration-300">
                  Email Us Directly
                </a>
              </div>
            </Fade>

          </div>
        </div>
      </section>
    </>
  );
}