import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import AutoSlider from "../components/newslider";
import { getAllMedia } from "../lib/sanity";
import YoutubeSection from "../components/youtubeFeed"

/* ─────────────────────────────────────────────
   Animation Hook
───────────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

/* ─────────────────────────────────────────────
   Fade Animation
───────────────────────────────────────────── */
function Fade({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(35px)",
        transition: `all 0.8s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Hero Section
───────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-gc-green-900 py-32 sm:py-40">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1920&q=80"
          alt="Agriculture"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-gc-green-900/70 to-gc-green-900" />

      {/* Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gc-green-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Fade>
          <p className="uppercase tracking-[0.3em] text-xs font-semibold text-gc-green-400 mb-6">
            Public Relations & Gallery
          </p>

          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-display font-semibold text-white leading-[1.05] tracking-tight mb-6">
            Stories Through
            <br />
            <em className="italic text-gc-green-400">
              Imagery.
            </em>
          </h1>

          <p className="max-w-3xl mx-auto text-white text-lg sm:text-xl leading-relaxed">
            Explore Gartner Callaway through our visual gallery, showcasing agricultural innovations,
            hydroponic systems, sustainability initiatives, and impact-driven
            stories shaping the future of African agriculture.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <a
              href="#images"
              className="inline-flex items-center gap-2 bg-gc-green-400 hover:bg-gc-green-500 text-gc-green-900 hover:text-white font-semibold text-xs uppercase tracking-widest px-8 py-4 rounded-sm transition-all duration-300 hover:gap-3"
            >
              View Images
              <ArrowRight size={15} />
            </a>
          </div>
        </Fade>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Image Grid
───────────────────────────────────────────── */
function ImageGrid({ images }) {
  const [selectedImg, setSelectedImg] = useState(null);

  if (!images?.length) return null;

  return (
    <section id="images" className="relative py-24 bg-white overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">

        <Fade className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-black leading-tight">
            Public
            <em className="italic text-gc-green-400">  Relations</em>
          </h2>
        </Fade>
      </div>

      <AutoSlider images={images} />
    </section>
  );
}


/* ─────────────────────────────────────────────
   CTA Section
───────────────────────────────────────────── */
function CTA() {
  return (
    <section className="py-28 bg-gc-green-900 relative overflow-hidden">

      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, #4a8a5b 0%, transparent 60%), radial-gradient(circle at 80% 50%, #ffffff 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">

        <Fade>
          <p className="uppercase tracking-[0.3em] text-[15.5px] font-semibold text-gc-green-400 mb-6">
            Work With Gartner Callaway
          </p>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-display font-semibold text-white leading-tight mb-6">
            Building the future
            <br />
            <em
              className="italic text-gc-green-400">
              of agriculture
            </em>
          </h2>

          <p className="max-w-2xl mx-auto text-white text-lg leading-relaxed mb-10">
            From hydroponics and sustainability systems to institutional
            agricultural development, Gartner Callaway continues to engineer
            scalable solutions for modern farming.
          </p>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-gc-green-400 hover:bg-gc-green-500 text-white hover:text-white font-semibold text-xs uppercase tracking-widest px-10 py-4 rounded-sm transition-all duration-300 hover:gap-4"
          >
            Start a Conversation
            <ArrowRight size={16} />
          </Link>
        </Fade>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Main Page
───────────────────────────────────────────── */
export default function VideosPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const mediaItems = await getAllMedia();
        const sanityImages = mediaItems.filter(m => m.type === 'image');
        setImages(sanityImages);
      } catch (err) {
        console.error("Sanity fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Hero />

      {loading ? (
        <div className="py-20 flex justify-center items-center bg-[#294b33]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gc-green-400"></div>
        </div>
      ) : (
        <ImageGrid images={images} />
      )}
      <YoutubeSection />

      <CTA />
    </>
  );
}