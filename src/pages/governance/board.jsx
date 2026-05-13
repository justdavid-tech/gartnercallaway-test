import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, ChevronDown, Users } from "lucide-react";

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
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

/* ─── Board Governance Data ──────────────────────────────── */
const SECTIONS = [
  {
    number: "01",
    title: "Board Meetings",
    summary: "How the Board of Directors convenes to set strategic direction and oversee business affairs.",
    sections: [
      {
        heading: "Role of the Board",
        body: "The Board of Directors of Gartner Callaway is responsible for setting the strategic direction for the Company and overseeing its business affairs. The Board develops and implements sustainable policies which reflect the Company's responsibility to all its stakeholders. The affairs of the Board are tailored to the requirements of relevant corporate governance principles.",
      },
      {
        heading: "Meeting Frequency & Scheduling",
        body: "The Board meets at least once every quarter. Additional meetings are scheduled whenever matters arise which require the attention of the Board. Teleconference and video conferencing facilities are available for flexibility and cost effectiveness.",
      },
      {
        heading: "Agenda & Documentation",
        body: "The office of the Company Secretary circulates the agenda for each meeting along with all documents that the Directors would be required to deliberate upon in advance of the meeting. This enables directors to apprise themselves of the matters to be discussed and contribute effectively at Board meetings.",
      },
      {
        heading: "Director Attendance",
        body: "Directors are required to attend all meetings of the Board and committees they have been appointed to. Remote attendance via teleconference or video conferencing is available where physical attendance is not possible.",
      },
    ],
  },
  {
    number: "02",
    title: "Director Training & Development",
    summary: "Induction, continuing education, and skills development programmes for members of the Board.",
    sections: [
      {
        heading: "Directors' Induction Programme",
        body: "Newly appointed members of the Board are educated on the provisions of the Group's Code of Business Conduct & Ethics and other related policies as part of the induction programme, which also includes on-site visits to company facilities. This well-rounded, intensive induction process helps directors understand the diverse nature of the businesses, the ethical values to which Gartner Callaway subscribes, and the culture of the organisation enabling them to discharge their duties to all stakeholders effectively and efficiently.",
      },
      {
        heading: "Continuing Education",
        body: "Directors attend training programmes and conferences covering a wide range of topics aimed at supporting professional development and keeping them current on recent regulatory changes that may affect the Company.",
      },
      {
        heading: "Skills Gap & Individual Development Plans",
        body: "The Board evaluation process identifies skill gaps on the Board and recommends ways to bridge those gaps. Individual development plans can be drawn up for each director and implemented to address any knowledge gaps identified through the evaluation process.",
      },
    ],
  },
  {
    number: "03",
    title: "Shareholder Relations",
    summary: "Our commitment to accountability, transparency, fairness, and respect in all shareholder dealings.",
    sections: [
      {
        heading: "Governing Principles",
        body: "Our relationship with our shareholders is governed by the principles of accountability, transparency, fairness, and respect. We recognise the powers reserved for shareholders in the decision-making process of the company hence our practice to keep shareholders fully informed and to seek their approval before embarking on major transactions or matters reserved for shareholders' approval by the Companies and Allied Matters Act.",
      },
      {
        heading: "Equal Treatment",
        body: "All shareholders receive equal consideration regardless of the size of their holdings in the company. This is in line with Rule 22 of the Securities and Exchange Commission (SEC) Consolidated Rules, which requires information to be disseminated at the same time to all shareholders without preference.",
      },
      {
        heading: "Accountability",
        body: "We are committed to the principles of accountability through the establishment of a properly constituted board of directors whose ultimate goal is to act always in the best interest of the company. The board is guided by the rules of good corporate governance demonstrated by the various ways we communicate information to investors in a clear and prompt manner and by our willingness to respond to concerns raised promptly.",
      },
      {
        heading: "Transparency & Disclosure",
        body: "We effectively manage our relationship with shareholders through transparent and appropriate disclosure of business and financial information. Company information is disseminated through publications and corporate announcements on the company's website, quarterly analyst calls led by the Group Chief Executive, and press publications. Statutory meetings and shareholder forums also provide avenues for shareholders to provide feedback and participate actively in the decision-making process.",
      },
      {
        heading: "Reporting Preferences",
        body: "Shareholders of Gartner Callaway can specify the manner through which they want to receive the Annual Reports and other statutory reports of the Company. Management strategy and financial information are divulged in a transparent and timely manner.",
      },
    ],
  },
  {
    number: "04",
    title: "Internal Controls & Risk Management",
    summary: "How Gartner Callaway identifies, measures, and controls risk across the Group's operations.",
    sections: [
      {
        heading: "Risk Management Committee",
        body: "Gartner Callaway's Risk Management Committee (RMC) is a management committee established pursuant to the Risk Management strategy of Gartner Callaway. The Committee is mandated to develop policies and procedures for identifying, measuring, and controlling risks identified in the Group's risk universe.",
      },
      {
        heading: "Board Assurance",
        body: "The Committee provides assurance to the Board and the Risk Environment, Security, Safety, and Quality Committee on the adequacy of the Group's risk management systems as implemented. It evaluates the Group's risk profile, the action plans in place to manage high risks, and the progress against plans to achieve the Group's risk strategy.",
      },
      {
        heading: "Committee Composition & Leadership",
        body: "Selected officers from across the Group provide risk management supervision through the RMC. The Committee is chaired by the Group Chief Executive Officer and has a primary responsibility to provide independent risk oversight facilitating, monitoring, and challenging the effectiveness and integrity of the risk management processes.",
      },
      {
        heading: "Risk Reporting",
        body: "The RMC reviews all risk information and the analysis of data as prepared by the Risk Management Department, and approves the risk report presented to the Board Risk Committee (the Risk and Environmental, Health, Security, Safety, and Quality Committee). The Risk Management and Control department facilitates the identification, assessment, and management of risk for each of the Group's subsidiaries.",
      },
    ],
  },
];

/* ─── Hero ───────────────────────────────────────────────── */
function Hero() {
  const [ref, vis] = useInView(0.1);
  return (
    <section className="relative h-[68vh] min-h-[460px] flex items-center bg-gc-green-900 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&q=80"
          alt="Board Governance"
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gc-green-900 via-gc-green-900/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-gc-green-900 via-transparent to-transparent" />
      </div>
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"}} />

      <div ref={ref} className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-6"
            style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(16px)", transition: "opacity .7s ease .1s, transform .7s ease .1s" }}>
            <span className="block w-7 h-px bg-gc-green-400" />
            <span className="text-[9.5px] font-medium tracking-[.22em] uppercase text-gc-green-400">
              Corporate Governance
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-semibold text-white leading-[1.05] mb-5"
            style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(24px)", transition: "opacity .9s ease .2s, transform .9s ease .2s" }}>
            Board &<br />
            <em className="italic text-gc-green-400">Governance.</em>
          </h1>

          <p className="text-base sm:text-lg text-white font-body leading-relaxed max-w-xl"
            style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(18px)", transition: "opacity .9s ease .38s, transform .9s ease .38s" }}>
            How Gartner Callaway's Board of Directors operates, develops, manages
            shareholder relationships, and controls risk across the Group.
          </p>

          <div className="flex items-center gap-3 mt-8"
            style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(14px)", transition: "opacity .8s ease .55s, transform .8s ease .55s" }}>
            <Users size={14} className="text-gc-green-400" />
            <span className="text-xs text-white tracking-widest uppercase">
              Signed by Yomi Williams, Group CEO · 4 Governance Frameworks
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Accordion Item ─────────────────────────────────────── */
function BoardItem({ item, isOpen, onToggle, index }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <Fade delay={index * 70} className="border border-gc-stone-100 rounded-2xl overflow-hidden bg-white hover:border-gc-green-200 transition-colors duration-300">

      {/* Header */}
      <button onClick={onToggle} className="w-full flex items-center gap-5 px-7 py-6 text-left group">
        <span className="text-[11px] font-medium tracking-[.2em] text-gc-green-400 shrink-0 font-body">
          {item.number}
        </span>
        <span className="block w-px h-8 bg-gc-stone-100 shrink-0" />
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-medium text-black text-xl sm:text-2xl leading-snug mb-1 group-hover:text-gc-green-500 transition-colors duration-200">
            {item.title}
          </h3>
          {!isOpen && (
            <p className="text-xs text-gc-stone-400 leading-relaxed line-clamp-1 hidden sm:block">
              {item.summary}
            </p>
          )}
        </div>
        <div className={`shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 group-hover:border-gc-green-300 group-hover:bg-gc-green-200 ${isOpen ? "bg-gc-green-500 border-gc-green-500" : "border-gc-stone-100"}`}>
          <ChevronDown size={15} className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-white" : "text-gc-stone-400 group-hover:text-gc-green-500"}`} />
        </div>
      </button>

      {/* Content */}
      <div style={{ height, overflow: "hidden", transition: "height 0.45s cubic-bezier(0.4,0,0.2,1)" }}>
        <div ref={contentRef}>
          <div className="px-7 pb-8 border-t border-gc-stone-100">

            {/* Summary strip */}
            <div className="flex items-start gap-3 py-5 mb-6 border-b border-gc-stone-100">
              <Shield size={14} className="text-gc-green-400 mt-0.5 shrink-0" />
              <p className="text-sm text-black leading-relaxed italic">{item.summary}</p>
            </div>

            {/* Sections */}
            <div className="space-y-7">
              {item.sections.map((sec, i) => (
                <div key={i}>
                  <h4 className="text-[16px] font-semibold uppercase tracking-[.18em] text-gc-green-500 mb-3">
                    {sec.heading}
                  </h4>
                  {sec.body && (
                    <p className="text-sm text-black leading-relaxed">{sec.body}</p>
                  )}
                  {sec.list && (
                    <ul className="space-y-2.5">
                      {sec.list.map((li, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span className="mt-[7px] w-1 h-1 rounded-full bg-gc-green-400 shrink-0" />
                          <span className="text-sm text-black leading-relaxed">{li}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gc-stone-100 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gc-green-900 flex items-center justify-center">
                  <span className="text-gc-green-400 font-display text-sm">YW</span>
                </div>
                <div>
                  <p className="text-xs font-medium text-gc-stone-800">Yomi Williams, Group CEO</p>
                  <p className="text-[10px] text-gc-stone-400 tracking-wider uppercase">Governance Signatory</p>
                </div>
              </div>
              <span className="text-[10px] text-gc-stone-300 uppercase tracking-widest">
                Section {item.number} of 04
              </span>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
}

/* ─── Page ───────────────────────────────────────────────── */
export default function BoardPage() {
  const [openIndex, setOpenIndex] = useState(null);

  function toggle(i) {
    setOpenIndex(prev => prev === i ? null : i);
  }

  return (
    <>
      <Hero />

      {/* Intro strip */}
      <section className="bg-gc-green-900 border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Fade className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-px h-10 bg-gc-green-400/30" />
              <p className="text-sm text-white leading-relaxed max-w-lg">
                The following frameworks govern how the Gartner Callaway Board of Directors
                operates, trains, engages shareholders, and manages organisational risk.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-2 h-2 rounded-full bg-gc-green-400 animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest text-gc-green-400">
                4 Active Frameworks
              </span>
            </div>
          </Fade>
        </div>
      </section>

      {/* Accordion */}
      <section className="py-20 bg-gc-stone-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-4">
            {SECTIONS.map((item, i) => (
              <BoardItem
                key={item.number}
                item={item}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>

          {/* Footer CTA */}
          <Fade delay={200} className="max-w-4xl mx-auto mt-14">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-7 rounded-2xl border border-gc-stone-100 bg-white">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gc-stone-400 mb-1">Governance Enquiries</p>
                <p className="text-sm text-gc-stone-500 leading-relaxed">
                  For questions relating to board governance, shareholder relations,
                  or risk management frameworks, please contact us directly.
                </p>
              </div>
              <Link to="/contact"
                className="inline-flex items-center gap-2 bg-gc-green-500 hover:bg-gc-green-900 text-white font-semibold text-xs uppercase tracking-widest px-6 py-3.5 rounded-lg transition-colors duration-300 shrink-0 hover:gap-3">
                Contact Us <ArrowRight size={13} />
              </Link>
            </div>
          </Fade>
        </div>
      </section>
    </>
  );
}