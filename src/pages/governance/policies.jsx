import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, ChevronDown } from "lucide-react";

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

/* ─── Policy Data ────────────────────────────────────────── */
const POLICIES = [
  {
    number: "01",
    title: "Business Continuity Policy",
    summary: "Framework for resilience and effective response to threats that safeguard stakeholder interests.",
    sections: [
      {
        heading: "Overview",
        body: "Gartner Callaway has a holistic business continuity management policy that identifies potential impacts that threaten our organisation and provides a framework for building resilience with the capability for an effective response that safeguards the interest of our stakeholders, reputation, and value-creating activities.",
      },
      {
        heading: "Identified Crisis Categories",
        list: [
          "Building or site incidents like flood, fire, terrorist attack affecting access to or from buildings and sites.",
          "Infrastructure incidents like loss of computer or telephony systems, loss of power.",
          "Staff or operational incidents like loss of key staff, loss of critical documents.",
          "Widespread environmental factors like pandemic, fuel shortages.",
        ],
      },
      {
        heading: "Chain of Command",
        body: "Overall responsibility for business continuity is handled by a director. In their absence, another director assumes that responsibility.",
      },
      {
        heading: "Crisis Management Group",
        body: "If a major disaster occurs, the GC Crisis Management Group comprising all senior managers will be mobilised. All media communication must be via the Head of Public Relations with direct consent from stakeholders.",
      },
      {
        heading: "Escalation Steps",
        list: [
          "Step 1: Raise the matter with your line manager, orally or in writing.",
          "Step 2: If unable to reach your line manager, contact any company Director.",
          "Step 3: If steps 1 and 2 are exhausted, contact the Chairman of the Board of Trustees.",
        ],
      },
      {
        heading: "Review & Training",
        body: "The Management Team conducts a comprehensive review of risk at least once every quarter. All staff are made aware of their roles and responsibilities during induction, supervision, and performance reviews. Staff must take personal responsibility to remain familiar with the Business Continuity Plan.",
      },
    ],
    signatory: "Yomi Williams, Group CEO",
  },
  {
    number: "02",
    title: "Code of Business Ethics",
    summary: "Standards of personal integrity, compliance, and conduct expected of all Gartner Callaway employees.",
    sections: [
      {
        heading: "Overview",
        body: "The importance of personal integrity at work can never be overstated. As ambassadors of Gartner Callaway in Nigeria and beyond, each employee must maintain a high level of honesty and integrity in all transactions and actions that could reflect on the company.",
      },
      {
        heading: "Compliance with the Law",
        body: "Employees must strictly adhere to all laws and regulations of the Federal Republic of Nigeria, and secondarily to the regulations and instructions of Gartner Callaway and its management.",
      },
      {
        heading: "Abuse of Office Prohibited Conduct",
        list: [
          "Using positions within the company for personal gains.",
          "Using company funds or assets for unauthorised, improper, or personal use.",
          "Exerting influence over contractors for personal benefit.",
          "Offering, paying, soliciting, or accepting bribes in any form.",
          "Using office time to conduct personal business.",
          "Covering up any impropriety connected with company business.",
        ],
      },
      {
        heading: "Conflict of Interest",
        body: "Professional excellence requires honesty, integrity, and fairness. Employees must avoid conflicts between their company role and private activities. Where such conflict exists, full disclosure must be made to management.",
      },
      {
        heading: "Accepting & Offering Gifts",
        body: "Acceptance of gifts from contractors that could prejudice independent business judgement is forbidden. Minor corporate gifts may be accepted and must be reported. Inducement, bribes and dash are at all times unacceptable and must be reported immediately to management. Acceptance of payments, services, or loans from suppliers or third parties is strictly forbidden.",
      },
    ],
    signatory: "Yomi Williams, Group CEO",
  },
  {
    number: "03",
    title: "Community Relations Policy",
    summary: "Our commitment to building respectful, long-term relationships with the communities in which we operate.",
    sections: [
      {
        heading: "Overview",
        body: "Gartner Callaway values the importance of strong relationships with the communities in which we operate. Nurturing community relationships is a core element of our business's social responsibility built on mutual understanding, respect, and trust that balances our business needs with community needs.",
      },
      {
        heading: "Our Commitments",
        list: [
          "Demonstrate the Community Relations Policy to all employees and stakeholders.",
          "Recognise that each community is unique and listen to community needs.",
          "Become an active member of communities through social, recreational, and cultural initiatives.",
          "Reserve 50% of skilled and casual labour for indigenes of the host community.",
          "Recognise the leadership and traditional ruling institution of the host community.",
          "Not be involved in the local politics of the host community.",
          "Continually improve our standards of community relations involvement.",
        ],
      },
    ],
    signatory: "Yomi Williams, Group CEO",
  },
  {
    number: "04",
    title: "Environmental Policy",
    summary: "Our framework for sound environmental performance, pollution prevention, and sustainable development.",
    sections: [
      {
        heading: "Overview",
        body: "This environmental policy states Gartner Callaway's commitments and principles to sound environmental performance through a framework for action and the setting of environmental objectives and targets. Maintaining the quality of our environment is a high priority in all Nigerian operations.",
      },
      {
        heading: "Our Environmental Commitments",
        list: [
          "Execute all activities in compliance with applicable local and international environmental laws and regulations.",
          "Enhance proper waste management through minimisation, recycling, and reuse.",
          "Set objectives and performance standards for continual improvement in environmental management.",
          "Systematically evaluate the environmental impact of all activities and implement mitigating measures.",
          "Encourage individual responsibility for sound environmental management and provide training.",
          "Cooperate with federal, state, and local governments on emerging environmental issues.",
          "Maintain corporate environmental monitoring programmes, periodic auditing, and internal reviews.",
          "Develop and maintain Emergency Contingency Plans for the protection of our operating environment.",
          "Manage natural resources responsibly to preserve biodiversity and promote sustainable development.",
        ],
      },
    ],
    signatory: "Yomi Williams, Group CEO",
  },
  {
    number: "05",
    title: "Health & Safety Policy",
    summary: "Our obligations and employee responsibilities for maintaining a safe and healthy working environment.",
    sections: [
      {
        heading: "Company Responsibilities",
        list: [
          "Provide a safe workplace with safe access to and from premises and a healthy working environment.",
          "Provide safe and healthy systems of work, ensuring all plant and equipment is operated safely.",
          "Provide safe arrangements for the use, handling, storage, and transport of articles and substances.",
          "Give instruction, training, supervision, and information to enable employees to carry out duties safely.",
          "Provide first aid facilities and training.",
          "Consult staff about arrangements for implementing and developing health and safety at work.",
        ],
      },
      {
        heading: "Employee Responsibilities",
        list: [
          "Take reasonable care for the health and safety of themselves, colleagues, visitors, customers, and the public.",
          "Use protective clothing and equipment when and where necessary.",
          "Not interfere with or misuse anything provided in the interests of health and safety.",
          "Report any incident to management that may have led to injury or damage.",
          "Give all assistance required in the investigation of accidents.",
          "Become familiar with and conform to this policy and all relevant safety instructions at all times.",
          "Cooperate with management in all efforts to comply with the Health and Safety at Work Act 1974.",
        ],
      },
    ],
    signatory: "Yomi Williams, Group CEO",
  },
  {
    number: "06",
    title: "Quality Policy",
    summary: "Our commitment to delivering services that meet customer quality standards and international benchmarks.",
    sections: [
      {
        heading: "Overview",
        body: "The responsibility of the Gartner Callaway management team is to offer services that meet customer quality standard requirements. Gartner Callaway has implemented a Quality and Safety Management System that is documented and has organised measures laid down in a descriptive manual.",
      },
      {
        heading: "Core Quality Principles",
        list: [
          "Human life during operations may not be put at risk.",
          "The environment is mankind's greatest asset and must be protected.",
          "The requirements and expectations of the customer must be met.",
          "Services offered must be competitive and based on both efficiency and quality.",
          "Reliability, sustainability, and safety are characteristics of quality.",
        ],
      },
      {
        heading: "Regulatory Standards Observed",
        list: [
          "ISO Classifications",
          "FAO Standards",
          "Classification rules",
          "Climate change guidelines",
          "Sustainability codes",
          "IMO, SOLAS, and MARPOL environmental protection frameworks",
        ],
      },
      {
        heading: "Employee Expectations",
        body: "Management expects good cooperation from all employees to maintain quality standards and service. Employees are expected to follow, support, and improve the procedures described in the Quality and Safety Management Manual.",
      },
    ],
    signatory: "Yomi Williams, Group CEO",
  },
  {
    number: "07",
    title: "Security Management Policy",
    summary: "Ensuring the security of personnel, facilities, and assets across all Gartner Callaway operations.",
    sections: [
      {
        heading: "Overview",
        body: "In achieving our mission of production, processing, trading of commodities, and sustainability consulting, two conditions must be fulfilled: ensuring the security of personnel, and ensuring the safety of company facilities and assets. All companies, contractors, and employees are committed to providing a secure working environment.",
      },
      {
        heading: "Security Rules",
        list: [
          "Respect of Laws: All operations comply with National and International Laws, Regulations, and GC Policies.",
          "Responsibilities: Every employee manages risks pertaining to their specific activity and their team members.",
          "Risk & Threat Evaluation: A risk and threat assessment is carried out before each procedure implementation, reviewed regularly and at least annually.",
          "Incident Analysis: Every incident or breach of security is reported, investigated, analysed, and action taken to prevent recurrence.",
          "Emergency Preparedness: Potentially serious situations are systematically analysed and emergency response procedures prepared.",
          "Confidentiality: Company proprietary information, including security documents, is protected per communications policy.",
          "Competence of Personnel: Security personnel are properly trained with effectiveness regularly assessed.",
          "Audits & Inspections: Security policy implementation is periodically checked during audits and internal reviews.",
        ],
      },
    ],
    signatory: "Yomi Williams, Group CEO",
  },
  {
    number: "08",
    title: "Substance Abuse Policy",
    summary: "Our zero-tolerance stance on alcohol and illicit substance use that could compromise safety or performance.",
    sections: [
      {
        heading: "Overview",
        body: "Substances in question include alcohol and illicit drugs such as cocaine, cannabis, and opiates. Inappropriate use of prescription medications including Diazepam, Barbiturates, and Amphetamines may also result in impairment to health, behaviour, judgement, or job performance.",
      },
      {
        heading: "Policy Objectives To Prevent",
        list: [
          "Any member of the workforce becoming a risk to themselves or others through substance abuse.",
          "Impairment of abilities to perform assigned tasks in a safe and productive manner.",
          "Dependency arising from increasing substance use and inability to stop.",
        ],
      },
      {
        heading: "Alcohol",
        body: "Impairment by use, possession, distribution, consumption, or sale of alcohol at company premises or on company business is not permitted without prior management approval. In the event of a road traffic accident, systematic detection of alcohol level will be performed and no level of detected alcohol in the blood will be tolerated.",
      },
      {
        heading: "Other Substances",
        body: "Employees are informed that they may be tested at random. The use, possession, distribution, consumption, or sale of illegal drugs at company premises or on company business is strictly prohibited. Company testing includes urine analysis for cocaine, cannabis, opiates, Diazepam, Barbiturates, and Amphetamines. Violation of these rules could result in disciplinary measures.",
      },
    ],
    signatory: "Yomi Williams, Group CEO",
  },
];

/* ─── Hero ───────────────────────────────────────────────── */
function Hero() {
  const [ref, vis] = useInView(0.1);
  return (
    <section className="relative h-[68vh] min-h-[460px] flex items-center bg-gc-green-900 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1920&q=80"
          alt="Company Policies"
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
              Governance & Compliance
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-semibold text-white leading-[1.05] mb-5"
            style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(24px)", transition: "opacity .9s ease .2s, transform .9s ease .2s" }}>
            Company<br />
            <em className="italic text-gc-green-400">Policies</em>
          </h1>

          <p className="text-base sm:text-lg text-white font-body leading-relaxed max-w-xl"
            style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(18px)", transition: "opacity .9s ease .38s, transform .9s ease .38s" }}>
            The principles, standards, and commitments that govern how Gartner
            Callaway operates across every team, site, and stakeholder relationship.
          </p>

          <div className="flex items-center gap-3 mt-8"
            style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(14px)", transition: "opacity .8s ease .55s, transform .8s ease .55s" }}>
            <Shield size={14} className="text-gc-green-400" />
            <span className="text-xs text-white tracking-widest uppercase">
              Signed by Yomi Williams, Group CEO · All policies in effect
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Policy Accordion Item ──────────────────────────────── */
function PolicyItem({ policy, isOpen, onToggle, index }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <Fade delay={index * 60} className="border border-gc-stone-100 rounded-2xl overflow-hidden bg-white hover:border-gc-green-200 transition-colors duration-300">

      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-5 px-7 py-6 text-left group"
      >
        {/* Number */}
        <span className="text-[11px] font-medium tracking-[.2em] text-gc-green-400 shrink-0 font-body">
          {policy.number}
        </span>

        {/* Divider */}
        <span className="block w-px h-8 bg-gc-stone-100 shrink-0" />

        {/* Title & summary */}
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-light text-black font-medium text-xl sm:text-2xl leading-snug mb-1 group-hover:text-gc-green-500 transition-colors duration-200">
            {policy.title}
          </h3>
          {!isOpen && (
            <p className="text-xs text-gc-stone-400 leading-relaxed line-clamp-1 hidden sm:block">
              {policy.summary}
            </p>
          )}
        </div>

        {/* Chevron */}
        <div className={`shrink-0 w-9 h-9 rounded-full border border-gc-stone-100 flex items-center justify-center transition-all duration-300 group-hover:border-gc-green-300 group-hover:bg-gc-green-200 ${isOpen ? "bg-gc-green-500 border-gc-green-500" : ""}`}>
          <ChevronDown
            size={15}
            className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-white" : "text-gc-stone-400 group-hover:text-gc-green-500"}`}
          />
        </div>
      </button>

      {/* Content */}
      <div
        style={{ height, overflow: "hidden", transition: "height 0.45s cubic-bezier(0.4,0,0.2,1)" }}
      >
        <div ref={contentRef}>
          <div className="px-7 pb-8 border-t border-gc-stone-100">

            {/* Summary strip */}
            <div className="flex items-start gap-3 py-5 mb-6 border-b border-gc-stone-100">
              <Shield size={14} className="text-gc-green-400 mt-0.5 shrink-0" />
              <p className="text-sm text-black leading-relaxed italic">{policy.summary}</p>
            </div>

            {/* Sections */}
            <div className="space-y-7">
              {policy.sections.map((sec, i) => (
                <div key={i}>
                  <h4 className="text-[10px] font-semibold uppercase tracking-[.18em] text-black mb-3">
                    {sec.heading}
                  </h4>

                  {sec.body && (
                    <p className="text-sm text-black leading-relaxed">{sec.body}</p>
                  )}

                  {sec.list && (
                    <ul className="space-y-2.5">
                      {sec.list.map((item, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span className="mt-[7px] w-1 h-1 rounded-full bg-gc-green-400 shrink-0" />
                          <span className="text-sm text-black leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* Signatory */}
            <div className="mt-8 pt-6 border-t border-gc-stone-100 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gc-green-900 flex items-center justify-center">
                  <span className="text-gc-green-400 font-display text-sm">YW</span>
                </div>
                <div>
                  <p className="text-xs font-medium text-black">{policy.signatory}</p>
                  <p className="text-[10px] text-black font-medium uppercase">Policy Signatory</p>
                </div>
              </div>
              <span className="text-[10px] text-gc-stone-300 uppercase tracking-widest">
                Policy {policy.number} of 08
              </span>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
}

/* ─── Page ───────────────────────────────────────────────── */
export default function CompanyPolicies() {
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
                These policies apply to all Gartner Callaway employees, contractors, and
                stakeholders. Select any policy below to read its full content.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-2 h-2 rounded-full bg-gc-green-400 animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest text-gc-green-400">
                8 Active Policies
              </span>
            </div>
          </Fade>
        </div>
      </section>

      {/* Accordion */}
      <section className="py-20 bg-gc-stone-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-4">
            {POLICIES.map((policy, i) => (
              <PolicyItem
                key={policy.number}
                policy={policy}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>

          {/* Footer note */}
          <Fade delay={200} className="max-w-4xl mx-auto mt-14">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-7 rounded-2xl border border-gc-stone-100 bg-white">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gc-stone-400 mb-1">Policy Enquiries</p>
                <p className="text-sm text-gc-stone-500 leading-relaxed">
                  For questions about any of these policies, please contact your line manager
                  or reach the team directly via our contact page.
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