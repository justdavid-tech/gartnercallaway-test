import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  MapPin, Phone, Mail, Clock, Send,
  Linkedin, Twitter, Instagram, Facebook,
  CheckCircle, ArrowRight, Building,
  MessageCircle, AlertCircle, Loader,
} from "lucide-react";

/* ─── EmailJS Config ─────────────────────────────────────────
   Replace these values with your real EmailJS credentials.
   Get them at: https://dashboard.emailjs.com
──────────────────────────────────────────────────────────── */
const EJS = {
  SERVICE_ID:  "your_service_id",
  TEMPLATE_ID: "your_template_id",
  PUBLIC_KEY:  "your_public_key",
};

/* ─── Data ───────────────────────────────────────────────── */
const CONTACT_INFO = [
  {
    icon: <MapPin size={22} />,
    title: "Head Office",
    details: ["Gartner Callaway Farms", "Km 28, Lagos-Ibadan Expressway", "Ogun State, Nigeria"],
    action: { label: "Get Directions", href: "#" },
  },
  {
    icon: <Building size={22} />,
    title: "Lagos Office",
    details: ["12B Awolowo Road", "Ikoyi, Lagos", "Lagos State, Nigeria"],
    action: { label: "Get Directions", href: "#" },
  },
  {
    icon: <Phone size={22} />,
    title: "Phone & WhatsApp",
    details: ["+234 812 345 6789", "+234 902 345 6789"],
    action: { label: "Call Now", href: "tel:+2348123456789" },
  },
  {
    icon: <Mail size={22} />,
    title: "Email",
    details: ["info@gartnercallaway.com", "sales@gartnercallaway.com"],
    action: { label: "Send Email", href: "mailto:info@gartnercallaway.com" },
  },
];

const HOURS = [
  { day: "Monday – Friday", time: "8:00 AM – 6:00 PM" },
  { day: "Saturday",        time: "9:00 AM – 4:00 PM" },
  { day: "Sunday",          time: "Closed" },
];

const SOCIALS = [
  { label: "LinkedIn",  icon: <Linkedin  size={18} />, href: "#" },
  { label: "Twitter",   icon: <Twitter   size={18} />, href: "#" },
  { label: "Instagram", icon: <Instagram size={18} />, href: "#" },
  { label: "Facebook",  icon: <Facebook  size={18} />, href: "#" },
];

const DEPARTMENTS = [
  "General Enquiry", "Sales & Wholesale", "Farm Design & Build",
  "Institutional Services", "Export Partnership", "Media & Press",
  "Careers", "GC Academy",
];

const FAQS = [
  { q: "How quickly will I receive a response?",  a: "Our team responds to all enquiries within 24 business hours. For urgent matters, please call our office directly." },
  { q: "Do you offer farm tours?",                a: "Yes, we offer guided tours of our Ogun State estate by appointment. Please contact us to schedule a visit." },
  { q: "Can I place a wholesale order online?",   a: "Wholesale orders require consultation. Please fill out the form and our sales team will contact you with pricing and availability." },
  { q: "Do you accept international partnerships?", a: "Yes, we actively pursue export partnerships and joint ventures. Please select 'Export Partnership' from the department dropdown." },
];

/* ─── useInView hook ─────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

/* ─── Fade wrapper ───────────────────────────────────────── */
function Fade({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Hero ───────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative h-[52vh] min-h-[420px] flex items-center bg-gc-green-900 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1920&q=80"
          alt="Office"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gc-green-900 via-gc-green-900/75 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <Fade>
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
            <MessageCircle size={14} className="text-gc-green-400" />
            <span className="text-xs font-medium tracking-widest text-gc-green-400 uppercase">Get in Touch</span>
          </span>
        </Fade>

        <Fade delay={100}>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-light text-white leading-[1.1] mb-5">
            Let's connect.<br />
            <em className="not-italic text-gradient">Start a conversation.</em>
          </h1>
        </Fade>

        <Fade delay={200}>
          <p className="text-lg text-white/65 font-body max-w-xl leading-relaxed">
            Whether you're a buyer, investor, partner, or talent — our team is ready
            to discuss how we can work together.
          </p>
        </Fade>
      </div>
    </section>
  );
}

/* ─── Info Card ──────────────────────────────────────────── */
function InfoCard({ card, delay }) {
  return (
    <Fade delay={delay} className="bg-white rounded-2xl p-6 border border-gc-stone-100 hover:shadow-lg transition-shadow duration-300">
      <div className="w-11 h-11 rounded-xl bg-gc-green-200 text-gc-green-500 flex items-center justify-center mb-4">
        {card.icon}
      </div>
      <h3 className="font-display font-medium text-gc-stone-800 text-lg mb-2">{card.title}</h3>
      <ul className="space-y-0.5 mb-4">
        {card.details.map((d) => (
          <li key={d} className="text-sm text-gc-stone-500">{d}</li>
        ))}
      </ul>
      <a href={card.action.href} className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-gc-green-500 hover:text-gc-green-900 transition-colors">
        {card.action.label} <ArrowRight size={11} />
      </a>
    </Fade>
  );
}

/* ─── Contact Form ───────────────────────────────────────── */
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", department: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => { emailjs.init(EJS.PUBLIC_KEY); }, []);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status !== "idle") setStatus("idle");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const result = await emailjs.send(EJS.SERVICE_ID, EJS.TEMPLATE_ID, {
        from_name:  form.name,
        from_email: form.email,
        phone:      form.phone,
        department: form.department,
        message:    form.message,
        reply_to:   form.email,
      });

      if (result.status === 200) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", department: "", message: "" });
      } else {
        throw new Error("Unexpected status");
      }
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
      setErrorMsg("Could not send your message. Please try again or call us directly.");
    }
  }

  return (
    <Fade className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gc-stone-100">
      <h3 className="text-2xl font-display font-light text-gc-stone-800 mb-1">Send us a message</h3>
      <p className="text-sm text-gc-stone-500 mb-6">We'll respond within 24 hours.</p>

      {status === "success" && (
        <div className="mb-6 flex items-start gap-3 rounded-xl bg-green-50 border border-green-200 p-4">
          <CheckCircle size={18} className="text-green-600 mt-0.5 shrink-0" />
          <div>
            <p className="font-medium text-green-800 text-sm">Message sent!</p>
            <p className="text-xs text-green-700 mt-0.5">Thank you for reaching out. We'll be in touch shortly.</p>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="mb-6 flex items-start gap-3 rounded-xl bg-red-50 border border-red-200 p-4">
          <AlertCircle size={18} className="text-red-600 mt-0.5 shrink-0" />
          <div>
            <p className="font-medium text-red-800 text-sm">Failed to send</p>
            <p className="text-xs text-red-700 mt-0.5">{errorMsg}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gc-stone-500 mb-1.5">Full Name *</label>
            <input name="name" type="text" required value={form.name} onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-lg border border-gc-stone-200 text-sm text-gc-stone-800 placeholder:text-gc-stone-400 focus:outline-none focus:border-gc-green-500 transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gc-stone-500 mb-1.5">Email *</label>
            <input name="email" type="email" required value={form.email} onChange={handleChange}
              placeholder="john@example.com"
              className="w-full px-4 py-3 rounded-lg border border-gc-stone-200 text-sm text-gc-stone-800 placeholder:text-gc-stone-400 focus:outline-none focus:border-gc-green-500 transition-colors" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gc-stone-500 mb-1.5">Phone</label>
            <input name="phone" type="tel" value={form.phone} onChange={handleChange}
              placeholder="+234 812 345 6789"
              className="w-full px-4 py-3 rounded-lg border border-gc-stone-200 text-sm text-gc-stone-800 placeholder:text-gc-stone-400 focus:outline-none focus:border-gc-green-500 transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gc-stone-500 mb-1.5">Department *</label>
            <select name="department" required value={form.department} onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gc-stone-200 text-sm text-gc-stone-800 focus:outline-none focus:border-gc-green-500 transition-colors bg-white">
              <option value="">Select department</option>
              {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gc-stone-500 mb-1.5">Message *</label>
          <textarea name="message" required rows={5} value={form.message} onChange={handleChange}
            placeholder="Tell us about your enquiry…"
            className="w-full px-4 py-3 rounded-lg border border-gc-stone-200 text-sm text-gc-stone-800 placeholder:text-gc-stone-400 focus:outline-none focus:border-gc-green-500 transition-colors resize-none" />
        </div>

        <button type="submit" disabled={status === "sending"}
          className="w-full flex items-center justify-center gap-2 bg-gc-green-500 hover:bg-gc-green-900 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold uppercase tracking-widest px-6 py-3.5 rounded-lg transition-colors duration-300">
          {status === "sending" ? (
            <><Loader size={16} className="animate-spin" /> Sending…</>
          ) : (
            <><Send size={15} /> Send Message</>
          )}
        </button>

        <p className="text-center text-xs text-gc-stone-400">
          We'll never share your information.
        </p>
      </form>
    </Fade>
  );
}

/* ─── Office Hours ───────────────────────────────────────── */
function OfficeHours() {
  return (
    <Fade className="bg-white rounded-2xl p-6 border border-gc-stone-100">
      <div className="w-11 h-11 rounded-xl bg-gc-green-200 text-gc-green-500 flex items-center justify-center mb-4">
        <Clock size={20} />
      </div>
      <h3 className="font-display font-medium text-gc-stone-800 text-lg mb-4">Office Hours</h3>
      <ul className="space-y-3">
        {HOURS.map(({ day, time }) => (
          <li key={day} className="flex justify-between text-sm">
            <span className="text-gc-stone-600">{day}</span>
            <span className="text-gc-stone-400">{time}</span>
          </li>
        ))}
      </ul>
    </Fade>
  );
}

/* ─── Social Links ───────────────────────────────────────── */
function SocialLinks() {
  return (
    <Fade className="bg-white rounded-2xl p-6 border border-gc-stone-100">
      <h3 className="font-display font-medium text-gc-stone-800 text-lg mb-4">Connect With Us</h3>
      <div className="flex gap-3">
        {SOCIALS.map(({ label, icon, href }) => (
          <a key={label} href={href} aria-label={label}
            className="w-10 h-10 rounded-full bg-gc-stone-100 flex items-center justify-center text-gc-stone-500 hover:bg-gc-green-500 hover:text-white transition-all duration-300">
            {icon}
          </a>
        ))}
      </div>
    </Fade>
  );
}

/* ─── Map ────────────────────────────────────────────────── */
function MapSection() {
  return (
    <section className="py-20 bg-gc-stone-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Fade className="text-center mb-10">
          <p className="eyebrow mb-3">Find Us</p>
          <h2 className="text-3xl sm:text-4xl font-display font-light text-gc-stone-800">
            Visit our <em className="not-italic text-gc-green-500">estate.</em>
          </h2>
        </Fade>
        <Fade delay={150} className="rounded-2xl overflow-hidden shadow-xl">
          <iframe
            title="Gartner Callaway Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.917102378747!2d3.3597!3d6.5244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b1b2b2b2b2b%3A0x2b2b2b2b2b2b2b2b!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1234567890!5m2!1sen!2sng"
            width="100%" height="420" style={{ border: 0 }}
            allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          />
        </Fade>
      </div>
    </section>
  );
}

/* ─── FAQ ────────────────────────────────────────────────── */
function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Fade className="text-center mb-14">
          <p className="eyebrow mb-3">FAQs</p>
          <h2 className="text-4xl sm:text-5xl font-display font-light text-gc-stone-800">
            Frequently asked<br />
            <em className="not-italic text-gc-green-500">questions.</em>
          </h2>
        </Fade>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq, i) => (
            <Fade key={i} delay={i * 80} className="border border-gc-stone-100 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex justify-between items-center px-6 py-4 text-left hover:bg-gc-stone-100 transition-colors">
                <span className="font-display font-medium text-gc-stone-800">{faq.q}</span>
                <span className={`text-gc-stone-400 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}>▼</span>
              </button>
              <div className={`px-6 overflow-hidden transition-all duration-300 ${open === i ? "max-h-40 pb-4" : "max-h-0"}`}>
                <p className="text-sm text-gc-stone-500 leading-relaxed">{faq.a}</p>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Page ───────────────────────────────────────────────── */
export default function ContactPage() {
  return (
    <>
      <Hero />

      {/* Info Cards */}
      <section className="py-20 bg-gc-stone-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
            {CONTACT_INFO.map((card, i) => (
              <InfoCard key={card.title} card={card} delay={i * 80} />
            ))}
          </div>

          {/* Form + Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
            <div className="flex flex-col gap-5">
              <OfficeHours />
              <SocialLinks />
            </div>
          </div>
        </div>
      </section>

      <MapSection />
      <FAQ />
    </>
  );
}