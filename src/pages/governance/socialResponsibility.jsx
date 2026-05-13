import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, ChevronDown } from "lucide-react";

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

/* ─── Data ───────────────────────────────────────────────── */
const SECTIONS = [
  {
    number: "01",
    title: "Corporate Social Responsibility",
    summary: "How Gartner Callaway integrates ethical governance, goodwill, and community investment into its business practices.",
    sections: [
      {
        heading: "Our CSR Commitment",
        body: "Gartner Callaway is committed to high standards of corporate governance, ethics, and goodwill. CSR is integrated into the company's business practices through value-adding products and services and the development of local communities through sustainable social investments.",
      },
      {
        heading: "Our Approach",
        body: "Gartner Callaway adheres to high standards of business practice and is mindful of the impact of its activities on internal and external stakeholders as well as the environment. We treat social responsibility not as an obligation but as a core expression of who we are as an organisation.",
      },
    ],
  },
  {
    number: "02",
    title: "Community Relations",
    summary: "Our strategy for improving quality of life and acting as a catalyst for development within host communities.",
    sections: [
      {
        heading: "Core Principle",
        body: "Gartner Callaway's community relations strategy is hinged on a key principle: to improve the quality of life and to be a catalyst for development and social change within and beyond areas of operation. Gartner Callaway treats host communities as an extension of its business in terms of needs and aspirations giving each community a sense of belonging as stakeholders in our business and operations.",
      },
      {
        heading: "Our Commitments to Communities",
        list: [
          "To be the catalyst for socio-economic change as stakeholders in the community.",
          "To build capacity as a means for self-reliance and economic empowerment.",
          "To entrench and foster the principles of sustainable development.",
          "To contribute in building a stable and enduring future for our host communities.",
        ],
      },
      {
        heading: "Broad Areas of Engagement",
        body: "Our overall community engagement covers economic empowerment, social development, and the active involvement of host communities in our operations. We recognise each community's unique identity and tailor our engagement accordingly.",
      },
    ],
  },
  {
    number: "03",
    title: "Economic Empowerment",
    summary: "Our employment policy and approach to driving financial stability within the communities we operate in.",
    sections: [
      {
        heading: "Our Position",
        body: "Gartner Callaway recognises the global importance of sustainable development and that each community has its uniqueness and intricacies. However, one common denominator is the need to empower individuals towards employment and financial stability.",
      },
      {
        heading: "Employment Policy",
        body: "The company has an employment policy that focuses on recruiting skilled, semi-skilled, and unskilled labour from host communities for suitable positions. This ensures that economic opportunity flows directly into the communities in which we operate, rather than being imported from outside.",
      },
    ],
  },
  {
    number: "04",
    title: "Social Development",
    summary: "Providing social amenities and improving quality of life by addressing the real, identified needs of host communities.",
    sections: [
      {
        heading: "Our Approach to Social Development",
        body: "Gartner Callaway's social development plan involves the provision of social amenities and improving the quality of life for people in host communities. In doing this, the need to drive development from the inside out is recognised development should be based on identified pressing needs of the community, as against the practice of instituting projects based on perceived needs.",
      },
      {
        heading: "Community Reception & Youth Engagement",
        body: "The warmth and reception of our host communities is a clear testament to the functionality of this principle. We provide support and sponsorship of youth-led developmental initiatives, training programmes, and seminars that create lasting impact.",
      },
      {
        heading: "Sustainable Programmes",
        body: "Our engagement strategy recognises the need to be proactive in identifying the needs of the present and next generation of inhabitants. It is therefore our practice to implement sustainable programmes that have a multiplier effect on our communities and their way of life.",
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
          src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=1920&q=80"
          alt="Social Responsibility"
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
              People & Planet
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-semibold text-white leading-[1.05] mb-5"
            style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(24px)", transition: "opacity .9s ease .2s, transform .9s ease .2s" }}>
            Social<br />
            <em className="italic text-gc-green-400">Responsibility.</em>
          </h1>

          <p className="text-base sm:text-lg text-white leading-relaxed max-w-xl"
            style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(18px)", transition: "opacity .9s ease .38s, transform .9s ease .38s" }}>
            How Gartner Callaway invests in the communities it operates within through economic empowerment, social development, and long-term
            sustainable engagement.
          </p>

          <div className="flex items-center gap-3 mt-8"
            style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(14px)", transition: "opacity .8s ease .55s, transform .8s ease .55s" }}>
            <Heart size={14} className="text-gc-green-400" />
            <span className="text-xs text-white tracking-widest uppercase">
              4 CSR Frameworks · In Effect Across All Operations
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Accordion Item ─────────────────────────────────────── */
function CSRItem({ item, isOpen, onToggle, index }) {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <Fade delay={index * 70}
      className="border border-gc-stone-100 rounded-2xl overflow-hidden bg-white hover:border-gc-green-200 transition-colors duration-300">

      {/* Header */}
      <button onClick={onToggle} className="w-full flex items-center gap-5 px-7 py-6 text-left group">
        <span className="text-[11px] font-medium tracking-[.2em] text-gc-green-500 shrink-0 font-body">
          {item.number}
        </span>
        <span className="block w-px h-8 bg-gc-stone-100 shrink-0" />
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-medium text-black text-xl sm:text-2xl leading-snug mb-1 group-hover:text-gc-green-500 transition-colors duration-200">
            {item.title}
          </h3>
          {!isOpen && (
            <p className="text-xs text-black leading-relaxed line-clamp-1 hidden sm:block">
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
              <Heart size={14} className="text-gc-green-400 mt-0.5 shrink-0" />
              <p className="text-sm text-black leading-relaxed italic">{item.summary}</p>
            </div>

            {/* Sections */}
            <div className="space-y-7">
              {item.sections.map((sec, i) => (
                <div key={i}>
                  <h4 className="text-[10px] font-semibold uppercase tracking-[.18em] text-gc-green-500 mb-3">
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
                  <p className="text-xs font-medium text-black">Yomi Williams</p>
                  <p className="text-[10px] text-gc-stone-500 tracking-wider uppercase">CSR Signatory</p>
                </div>
              </div>
              <span className="text-[10px] text-gc-stone-400 uppercase tracking-widest">
                Section {item.number} of 04
              </span>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
}

/* ─── Impact Strip ───────────────────────────────────────── */
function ImpactStrip() {
  const STATS = [
    { value: "50%",    label: "Local labour reserved for host communities" },
    { value: "100%",   label: "Community needs-led project design"         },
    { value: "1,000+", label: "People trained through GC programmes"       },
    { value: "3+",     label: "States with active community engagement"    },
  ];
  return (
    <section className="py-20 bg-gc-green-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Fade className="text-center mb-14">
          <p className="text-[16.5px] font-medium tracking-[.22em] uppercase text-gc-green-400 mb-4">
            Our Impact in Numbers
          </p>
          <h2 className="text-4xl sm:text-5xl font-display font-semibold text-white">
            Community Investment<br />
            <em className="italic text-gc-green-400">by the Numbers</em>
          </h2>
        </Fade>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
          {STATS.map((s, i) => (
            <Fade key={i} delay={i * 80}
              className="bg-gc-green-900 px-8 py-10 flex flex-col items-center text-center gap-3">
              <p className="font-display font-light text-5xl text-white">{s.value}</p>
              <p className="text-xs text-white leading-relaxed">{s.label}</p>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Page ───────────────────────────────────────────────── */
export default function SocialResponsibility() {
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
                These frameworks govern how Gartner Callaway engages with communities,
                empowers people, and delivers sustainable social value across all operations.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-2 h-2 rounded-full bg-gc-green-400 animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest text-gc-green-400">
                4 Active CSR Frameworks
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
              <CSRItem
                key={item.number}
                item={item}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Impact strip */}
      <ImpactStrip />

      {/* Footer CTA */}
      <section className="py-20 bg-gc-stone-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Fade className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-7 rounded-2xl border border-gc-stone-100 bg-white">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gc-stone-400 mb-1">
                  Community & CSR Enquiries
                </p>
                <p className="text-sm text-black leading-relaxed">
                  To learn more about our community programmes, partnership opportunities,
                  or social investment initiatives, get in touch with our team.
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