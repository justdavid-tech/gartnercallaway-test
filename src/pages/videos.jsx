import React, { useEffect, useRef, useState } from "react";
import { Play, ArrowRight, Share2, X, Check, Camera, Maximize2 } from "lucide-react";
import { Link } from "react-router-dom";
import { getAllMedia, urlFor } from "../lib/sanity";

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
   Video Data
───────────────────────────────────────────── */
/* 
const HARDCODED_VIDEOS = [
  {
    id: "d_hU4F375rc",
    title: "Why I left Oil and Gas Sector For Farming",
    category: "Hydroponics",
  },
  {
    id: "jSBBhkDA78Q",
    title: "Growing Food With Hydroponics",
    category: "Food Innovation",
  },
  {
    id: "Y5Zi55FiRGQ",
    title: "Financial Literacy Initiative",
    category: "Community Impact",
  },
  {
    id: "ncIS_y82GaE",
    title: "Young Nigerian Adopts Hydroponics Methods In Lekki",
    category: "Hydroponics",
  },
  {
    id: "k3vXbTKOg0c",
    title: "Young Nigerian Adopts Hydroponics Methods In Lekki Part 2",
    category: "Hydroponics",
  },
  {
    id: "q2potVGV6a4",
    title: "Young Nigerian Adopts Hydroponics Methods In Lekki Part 3",
    category: "Hydroponics",
  },
    {
    id: "zaWjtoV2-O0",
    title: "Focus on Hydroponics Part 3",
    category: "Hydroponics",
  },
    {
    id: "0FKkjTCu948",
    title: "Growing Food with Hydroponics in Nigeria",
    category: "Hydroponics",
  },
    {
    id: "Rx9s34yH784",
    title: "Financial Literacy Talk for Small Holders Farmers",
    category: "Financy",
  },
    {
    id: "XBuq1iEv2no",
    title: "A View Of What Hydroponice Farming Looks Like",
    category: "Hydroponics",
  },
    {
    id: "9mmD3OyIw30",
    title: "AIICO Documentary",
    category: "Partnership",
  },
    {
    id: "8jFeiqotAAQ",
    title: "Union Bank Documentary",
    category: "Partnership",
  }
];
*/
const HARDCODED_VIDEOS = [];

/* ── Helpers ── */
function getYouTubeId(url) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
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
            Media & Documentaries
          </p>

          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-display font-semibold text-white leading-[1.05] tracking-tight mb-6">
            Stories Through
            <br />
            <em className="italic text-gc-green-400">
              Moving Visuals.
            </em>
          </h1>

          <p className="max-w-3xl mx-auto text-white text-lg sm:text-xl leading-relaxed">
            Explore Gartner Callaway documentaries, agricultural innovations,
            hydroponic systems, sustainability initiatives, and impact-driven
            stories shaping the future of African agriculture.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <a
              href="#videos"
              className="inline-flex items-center gap-2 bg-gc-green-400 hover:bg-gc-green-500 text-gc-green-900 hover:text-white font-semibold text-xs uppercase tracking-widest px-8 py-4 rounded-sm transition-all duration-300 hover:gap-3"
            >
              Watch Videos
              <ArrowRight size={15} />
            </a>

            <Link
              to="#images"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-white/60 text-white hover:text-white font-medium text-xs uppercase tracking-widest px-8 py-4 rounded-sm transition-all duration-300"
            >
              View Images
            </Link>
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
          {/* <p className="uppercase tracking-[0.3em] text-[14.5px] font-semibold text-gc-green-500 mb-4">
            Visual Gallery
          </p> */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-black leading-tight">
            Visual
            <em className="italic text-gc-green-400">  Gallery</em>
          </h2>
        </Fade>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, index) => (
            <Fade key={img._id} delay={index * 50} className="group cursor-pointer" onClick={() => setSelectedImg(img)}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 shadow-xl bg-black/20">
                <img 
                  src={urlFor(img.image).width(800).url()} 
                  alt={img.image?.alt || img.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Maximize2 className="text-white w-8 h-8" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-[10px] uppercase tracking-widest text-gc-green-400 font-bold mb-1 block">
                    {img.category || "Gallery"}
                  </span>
                  <h3 className="text-white text-lg font-medium">{img.title}</h3>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setSelectedImg(null)}
        >
          <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
            <X size={32} />
          </button>
          <div className="max-w-5xl w-full max-h-[85vh] relative" onClick={e => e.stopPropagation()}>
            <img 
              src={urlFor(selectedImg.image).width(1600).url()} 
              alt={selectedImg.title}
              className="w-full h-full object-contain rounded-lg shadow-2xl"
            />
            <div className="mt-6 text-center">
              <h3 className="text-white text-2xl font-display font-light">{selectedImg.title}</h3>
              {selectedImg.description && <p className="text-white/60 mt-2 max-w-2xl mx-auto">{selectedImg.description}</p>}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ─────────────────────────────────────────────
   Video Grid
───────────────────────────────────────────── */
function VideoGrid({ videos, onShare }) {
  if (!videos?.length) return null;

  return (
    <section
      id="videos"
      className="relative py-24 bg-[#294b33] overflow-hidden"
    >
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <Fade className="text-center mb-16">
          <p className="uppercase tracking-[0.3em] text-[14.5px] font-semibold text-gc-green-400 mb-4">
            Featured Library
          </p>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold text-white leading-tight">
            Watch Our Latest
            <br />
            <em className="italic text-gc-green-400">
              Documentaries & Insights.
            </em>
          </h2>
        </Fade>

        {/* Video Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {videos.map((video, index) => (
            <Fade
              key={(video.id || video._id) + index}
              delay={index * 80}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/20 backdrop-blur-sm shadow-2xl">

                {/* Video */}
                <div className="relative w-full pt-[56.25%] overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id || getYouTubeId(video.videoUrl)}?rel=0`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>

                {/* Content */}
                <div className="p-6 bg-gradient-to-b from-white/[0.03] to-transparent">

                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-gc-green-400 font-semibold">
                      <Play size={12} />
                      {video.category}
                    </span>

                    <button
                      onClick={() => onShare(video.id || getYouTubeId(video.videoUrl))}
                      className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white hover:text-gc-green-400 transition-all duration-300"
                      title="Share Video"
                    >
                      <Share2 size={16} />
                    </button>
                  </div>

                  <h3 className="text-white text-2xl font-display font-medium leading-snug group-hover:text-gc-green-400 transition-colors duration-300">
                    {video.title}
                  </h3>

                </div>
              </div>
            </Fade>
          ))}

        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Toast Notification Component
───────────────────────────────────────────── */
function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[200] animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center gap-2 bg-gc-green-400 text-gc-green-900 px-4 py-3 rounded-lg shadow-lg">
        <Check size={18} />
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
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
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [ytNextPageToken, setYtNextPageToken] = useState(null);
  const [shareVideo, setShareVideo] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const fetchYouTubeVideos = async (pageToken = "") => {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    const channelId = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;
    
    console.log("[YouTube VideosPage Debug] API Key exists:", !!apiKey);
    console.log("[YouTube VideosPage Debug] Channel ID:", channelId);

    if (!apiKey || !channelId) {
      console.warn("[YouTube VideosPage Debug] Missing credentials.");
      return { items: [], nextToken: null };
    }

    try {
      const uploadsPlaylistId = channelId.trim().replace(/^UC/, 'UU');
      // Using 6 per page for a nice 2-column or 3-column grid
      const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=6&playlistId=${uploadsPlaylistId}&key=${apiKey.trim()}${pageToken ? `&pageToken=${pageToken}` : ""}`;
      const res = await fetch(url);
      const data = await res.json();
      
      if (data.error) {
        console.error("[YouTube VideosPage Debug] API Error:", data.error);
        return { items: [], nextToken: null };
      }

      console.log("[YouTube VideosPage Debug] Received items:", data.items?.length);

      const items = (data.items || []).map(item => ({
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        category: "YouTube Upload",
        publishedAt: item.snippet.publishedAt
      }));

      return { items, nextToken: data.nextPageToken || null };
    } catch (err) {
      console.error("[YouTube VideosPage Debug] Fetch Error:", err);
      return { items: [], nextToken: null };
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const mediaItems = await getAllMedia();
        
        // Filter images
        const sanityImages = mediaItems.filter(m => m.type === 'image');
        setImages(sanityImages);

        // Filter sanity videos
        const sanityVideos = mediaItems.filter(m => m.type === 'video');
        
        // Fetch first page of YouTube videos
        const { items: ytItems, nextToken } = await fetchYouTubeVideos();
        setYtNextPageToken(nextToken);

        // Merge all sources
        const combinedVideos = [...sanityVideos, ...ytItems, ...HARDCODED_VIDEOS];
        
        // Remove duplicates and keep latest first
        const uniqueVideos = [];
        const seenIds = new Set();
        
        combinedVideos.forEach(v => {
          const vidId = v.id || getYouTubeId(v.videoUrl);
          if (vidId && !seenIds.has(vidId)) {
            uniqueVideos.push(v);
            seenIds.add(vidId);
          }
        });

        setVideos(uniqueVideos);
      } catch (err) {
        console.error("Sanity fetch error:", err);
        setVideos(HARDCODED_VIDEOS);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleLoadMore = async () => {
    if (!ytNextPageToken || loadingMore) return;
    setLoadingMore(true);
    
    const { items, nextToken } = await fetchYouTubeVideos(ytNextPageToken);
    
    setVideos(prev => {
      const combined = [...prev, ...items];
      const unique = [];
      const seen = new Set();
      combined.forEach(v => {
        const id = v.id || getYouTubeId(v.videoUrl);
        if (id && !seen.has(id)) {
          unique.push(v);
          seen.add(id);
        }
      });
      return unique;
    });
    
    setYtNextPageToken(nextToken);
    setLoadingMore(false);
  };

  const handleCopyLink = (videoId) => {
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    navigator.clipboard.writeText(videoUrl);
    setToastMessage("Link copied to clipboard!");
    setShowToast(true);
  };

  return (
    <>
      <Hero />
      
      {loading ? (
        <div className="py-20 flex justify-center items-center bg-[#294b33]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gc-green-400"></div>
        </div>
      ) : (
        <>
          <ImageGrid images={images} />
          
          {/* Wrapped VideoGrid to include pagination button */}
          <div className="bg-[#294b33] pb-24">
            <VideoGrid videos={videos} onShare={setShareVideo} />
            
            {ytNextPageToken && (
              <div className="container mx-auto px-4 flex justify-center mt-12">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="inline-flex items-center gap-3 border border-gc-green-400/30 hover:border-gc-green-400 text-gc-green-400 hover:text-white font-semibold text-xs uppercase tracking-[0.2em] px-12 py-5 rounded-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {loadingMore ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-current"></div>
                  ) : (
                    <>
                      Load More Videos
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </>
      )}

      <CTA />


      {/* Share Modal */}
      {shareVideo && (
        <div
          onClick={() => setShareVideo(null)}
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center px-4 transition-all duration-300"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-[#111827] border border-white/10 rounded-2xl p-8 relative shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={() => setShareVideo(null)}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <h3 className="text-white text-2xl font-display font-light mb-6">
              Share <span className="text-gc-green-400">Video</span>
            </h3>

            <div className="bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-sm text-white/50 break-all mb-8 font-mono">
              {`https://www.youtube.com/watch?v=${shareVideo}`}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <a
                href={`https://wa.me/?text=https://www.youtube.com/watch?v=${shareVideo}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-green-600/10 hover:bg-green-600 border border-green-600/20 hover:border-green-600 text-green-500 hover:text-white text-xs uppercase tracking-widest font-semibold transition-all duration-300"
              >
                WhatsApp
              </a>

              <a
                href={`https://twitter.com/intent/tweet?url=https://www.youtube.com/watch?v=${shareVideo}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white border border-white/10 hover:border-white text-white/70 hover:text-black text-xs uppercase tracking-widest font-semibold transition-all duration-300"
              >
                X (Twitter)
              </a>

              <button
                onClick={() => handleCopyLink(shareVideo)}
                className="col-span-2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gc-green-400/10 hover:bg-gc-green-400 border border-gc-green-400/20 hover:border-gc-green-400 text-gc-green-400 hover:text-gc-green-900 text-xs uppercase tracking-widest font-semibold transition-all duration-300"
              >
                Copy Direct Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <Toast message={toastMessage} onClose={() => setShowToast(false)} />
      )}
    </>
  );
}