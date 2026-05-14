import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play, ExternalLink } from "lucide-react";

const API_KEY    = import.meta.env.VITE_YOUTUBE_API_KEY;
const CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;
const MAX_RESULTS = 20;

/* ─── Helpers ────────────────────────────────────────────── */
function timeAgo(iso) {
  const diff = (Date.now() - new Date(iso)) / 1000;
  if (diff < 3600)   return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400)  return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function fmtCount(n) {
  if (!n) return "—";
  n = parseInt(n, 10);
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

/* ─── Skeleton ───────────────────────────────────────────── */
function Skeleton({ className = "" }) {
  return (
    <div className={`gc-yt-skel ${className}`} />
  );
}

/* ─── Featured Player ────────────────────────────────────── */
function FeaturedPlayer({ video }) {
  const [playing, setPlaying] = useState(false);

  if (!video) return (
    <div className="gc-yt-featured-shell">
      <Skeleton className="w-full h-full" />
    </div>
  );

  return (
    <div className="gc-yt-featured-shell">
      {playing ? (
        <iframe
          className="gc-yt-iframe"
          src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <div className="gc-yt-poster" onClick={() => setPlaying(true)}>
          <img
            src={video.thumbnail?.maxres?.url || video.thumbnail?.high?.url || video.thumbnail?.medium?.url}
            alt={video.title}
            className="gc-yt-poster-img"
          />
          <div className="gc-yt-poster-veil" />

          {/* Play button */}
          <button className="gc-yt-play-btn" aria-label="Play video">
            <Play size={28} fill="currentColor" />
          </button>

          {/* Meta overlay */}
          <div className="gc-yt-poster-meta">
            <div className="gc-yt-poster-channel">
              <span className="gc-yt-poster-channel-dot" />
              Gartner Callaway
            </div>
            <h2 className="gc-yt-poster-title">{video.title}</h2>
            <div className="gc-yt-poster-stats">
              <span>{fmtCount(video.viewCount)} views</span>
              <span className="gc-yt-meta-sep">·</span>
              <span>{timeAgo(video.publishedAt)}</span>
            </div>
          </div>

          {/* Watch on YouTube */}
          <a
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="gc-yt-watch-yt"
            onClick={e => e.stopPropagation()}
          >
            <svg viewBox="0 0 90 20" width="72" height="16" fill="white" aria-hidden="true">
              <path d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 2.24288e-07 14.285 0 14.285 0C14.285 0 5.35042 2.24288e-07 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C2.24288e-07 5.35042 0 10 0 10C0 10 2.24288e-07 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z" fill="#FF0000"/>
              <path d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z" fill="white"/>
            </svg>
            <span>Watch on YouTube</span>
          </a>
        </div>
      )}
    </div>
  );
}

/* ─── Video Card ─────────────────────────────────────────── */
function VideoCard({ video, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`gc-yt-card ${isActive ? "active" : ""}`}
      aria-label={`Play ${video.title}`}
    >
      <div className="gc-yt-card-thumb">
        <img
          src={video.thumbnail?.medium?.url || video.thumbnail?.high?.url}
          alt={video.title}
          className="gc-yt-card-img"
          loading="lazy"
        />
        <div className="gc-yt-card-overlay">
          <Play size={16} fill="currentColor" className="gc-yt-card-play" />
        </div>
        {isActive && <div className="gc-yt-card-active-bar" />}
      </div>
      <div className="gc-yt-card-body">
        <p className="gc-yt-card-title">{video.title}</p>
        <p className="gc-yt-card-meta">
          {fmtCount(video.viewCount)} views
          <span className="gc-yt-meta-sep">·</span>
          {timeAgo(video.publishedAt)}
        </p>
      </div>
    </button>
  );
}

/* ─── Main Component ─────────────────────────────────────── */
export default function YouTubeFeed() {
  const [videos,   setVideos]   = useState([]);
  const [active,   setActive]   = useState(0);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);
  const railRef                 = useRef(null);

  /* ── Fetch channel videos ── */
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        // 1. Search for videos by channel ID (works without a playlist)
        const searchRes  = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=${MAX_RESULTS}&order=date&type=video&key=${API_KEY}`
        );
        const searchData = await searchRes.json();

        if (searchData.error) throw new Error(searchData.error.message);
        if (!searchData.items?.length) throw new Error("No videos found on this channel yet.");

        const ids = searchData.items.map(i => i.id.videoId).join(",");

        // 2. Get full video details (stats + thumbnails)
        const vidRes  = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${ids}&key=${API_KEY}`
        );
        const vidData = await vidRes.json();

        const formatted = vidData.items.map(v => ({
          id:          v.id,
          title:       v.snippet.title,
          publishedAt: v.snippet.publishedAt,
          thumbnail:   v.snippet.thumbnails,
          viewCount:   v.statistics?.viewCount,
          likeCount:   v.statistics?.likeCount,
        }));

        setVideos(formatted);
      } catch (err) {
        setError(err.message || "Failed to load videos.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  /* ── Rail scroll helpers ── */
  function scrollRail(dir) {
    if (!railRef.current) return;
    railRef.current.scrollBy({ left: dir * 280, behavior: "smooth" });
  }

  function handleCardClick(i) {
    setActive(i);
    // Scroll the selected card into view in the rail
    const cards = railRef.current?.querySelectorAll(".gc-yt-card");
    cards?.[i]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }

  return (
    <>
      <style>{`
        /* ── Skeleton ── */
        @keyframes gc-yt-shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .gc-yt-skel {
          background: linear-gradient(90deg, #1a3321 25%, #243d2b 50%, #1a3321 75%);
          background-size: 200% 100%;
          animation: gc-yt-shimmer 1.5s infinite;
          border-radius: 4px;
        }

        /* ── Section wrapper ── */
        .gc-yt-section {
          background: #0e1f14;
          padding: clamp(60px, 10vw, 120px) 0;
          font-family: "Montserrat", sans-serif;
        }

        .gc-yt-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 clamp(20px, 5vw, 60px);
        }

        /* ── Header ── */
        .gc-yt-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 48px;
          flex-wrap: wrap;
        }
        .gc-yt-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: .3em;
          text-transform: uppercase;
          color: #7fb38d;
          margin-bottom: 12px;
        }
        .gc-yt-eyebrow-rule {
          display: block;
          width: 30px;
          height: 1.5px;
          background: #7fb38d;
        }
        .gc-yt-heading {
          font-size: clamp(32px, 5vw, 56px);
          font-weight: 700;
          color: #fff;
          line-height: 1.1;
          letter-spacing: -.03em;
        }
        .gc-yt-heading em {
          font-style: italic;
          color: #7fb38d;
          font-weight: 400;
        }
        .gc-yt-yt-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: #fff;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.15);
          padding: 12px 24px;
          border-radius: 4px;
          transition: all 0.3s ease;
          white-space: nowrap;
        }
        .gc-yt-yt-link:hover { 
          background: #7fb38d; 
          color: #0e1f14;
          border-color: #7fb38d;
          transform: translateY(-2px);
        }

        /* ── Featured player ── */
        .gc-yt-featured-shell {
          position: relative;
          width: 100%;
          aspect-ratio: 16/9;
          background: #000;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        .gc-yt-iframe {
          width: 100%;
          height: 100%;
          border: none;
          display: block;
        }
        .gc-yt-poster {
          position: absolute;
          inset: 0;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .gc-yt-poster-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: brightness(.7);
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .gc-yt-poster:hover .gc-yt-poster-img { transform: scale(1.05); }
        
        .gc-yt-poster-veil {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(14,31,20,0.9) 0%, transparent 60%);
        }

        .gc-yt-play-btn {
          position: absolute;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: #7fb38d;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0e1f14;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 3;
          box-shadow: 0 0 0 0 rgba(127,179,141,0.4);
        }
        .gc-yt-poster:hover .gc-yt-play-btn {
          transform: scale(1.1);
          box-shadow: 0 0 0 15px rgba(127,179,141,0.2);
        }

        .gc-yt-poster-meta {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: clamp(20px, 4vw, 40px);
          z-index: 3;
        }
        .gc-yt-poster-title {
          font-size: clamp(20px, 3vw, 32px);
          font-weight: 700;
          color: #fff;
          line-height: 1.2;
          margin-bottom: 12px;
          max-width: 85%;
          text-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }
        .gc-yt-poster-stats {
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.8);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* ── Layout grid ── */
        .gc-yt-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }
        @media (min-width: 1024px) {
          .gc-yt-grid {
            grid-template-columns: 1fr 380px;
            gap: 40px;
          }
        }

        /* ── Rail / Slider ── */
        .gc-yt-rail-wrap {
          position: relative;
          min-width: 0; /* Fix flex overflow */
        }
        .gc-yt-rail-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .gc-yt-rail-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .15em;
          text-transform: uppercase;
          color: #fff;
        }
        .gc-yt-rail-nav {
          display: flex;
          gap: 8px;
        }
        .gc-yt-nav-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,.2);
          background: transparent;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .gc-yt-nav-btn:hover {
          background: #7fb38d;
          border-color: #7fb38d;
          color: #0e1f14;
        }

        .gc-yt-rail {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-height: 600px;
          overflow-y: auto;
          padding-right: 8px;
          scrollbar-width: thin;
          scrollbar-color: #7fb38d rgba(255,255,255,0.05);
        }

        /* Horizontal Slider for Mobile */
        @media (max-width: 1023px) {
          .gc-yt-rail {
            flex-direction: row;
            max-height: none;
            overflow-x: auto;
            overflow-y: hidden;
            padding: 10px 0 20px;
            gap: 16px;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
          }
          .gc-yt-rail::-webkit-scrollbar { height: 4px; }
        }

        /* ── Video card ── */
        .gc-yt-card {
          display: flex;
          align-items: center;
          gap: 16px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 12px;
          cursor: pointer;
          text-align: left;
          width: 100%;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          flex-shrink: 0;
          scroll-snap-align: start;
        }
        @media (max-width: 1023px) {
          .gc-yt-card { width: 280px; flex-direction: column; align-items: flex-start; }
        }
        
        .gc-yt-card:hover { 
          background: rgba(255,255,255,0.07); 
          border-color: rgba(255,255,255,0.2);
          transform: translateX(4px);
        }
        @media (max-width: 1023px) {
          .gc-yt-card:hover { transform: translateY(-4px); }
        }

        .gc-yt-card.active { 
          background: rgba(127,179,141,0.1); 
          border-color: #7fb38d; 
          box-shadow: 0 10px 20px -5px rgba(0,0,0,0.3);
        }

        .gc-yt-card-thumb {
          position: relative;
          flex-shrink: 0;
          width: 120px;
          aspect-ratio: 16/9;
          border-radius: 8px;
          overflow: hidden;
        }
        @media (max-width: 1023px) {
          .gc-yt-card-thumb { width: 100%; }
        }
        
        .gc-yt-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .gc-yt-card-body { flex: 1; min-width: 0; }
        .gc-yt-card-title {
          font-size: 14px;
          font-weight: 600;
          color: #fff; /* Pure white */
          line-height: 1.4;
          margin-bottom: 6px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .gc-yt-card-meta {
          font-size: 11px;
          font-weight: 500;
          color: rgba(255,255,255,0.6); /* High contrast silver */
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .gc-yt-state {
          text-align: center;
          padding: 100px 24px;
          color: #fff;
          font-weight: 500;
        }

        .gc-yt-count {
          font-size: 12px;
          font-weight: 600;
          color: #7fb38d;
          letter-spacing: .05em;
          padding: 12px 0 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .gc-yt-count-line { flex: 1; height: 1px; background: rgba(255,255,255,0.1); }
      `}</style>

      <section className="gc-yt-section">
        <div className="gc-yt-container">

          {/* Header */}
          <div className="gc-yt-header">
            <div>
              <div className="gc-yt-eyebrow">
                <span className="gc-yt-eyebrow-rule" />
                Latest Stories
              </div>
              <h2 className="gc-yt-heading">
                Gartner Callaway<br />
                <em>Video Journal.</em>
              </h2>
            </div>
            <a
              href={`https://www.youtube.com/channel/${CHANNEL_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="gc-yt-yt-link"
            >
              <ExternalLink size={14} />
              YouTube Channel
            </a>
          </div>

          {/* Error */}
          {error && <div className="gc-yt-state">{error}</div>}

          {/* Loading */}
          {loading && !error && (
            <div className="gc-yt-grid">
              <Skeleton className="w-full aspect-video rounded-xl" />
              <div className="flex flex-col gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full rounded-xl" />
                ))}
              </div>
            </div>
          )}

          {/* Content */}
          {!loading && !error && videos.length > 0 && (
            <div className="gc-yt-grid">

              {/* Featured Player */}
              <div>
                <FeaturedPlayer video={videos[active]} />
                <div className="gc-yt-count">
                  <span>NOW PLAYING {active + 1} / {videos.length}</span>
                  <div className="gc-yt-count-line" />
                </div>
              </div>

              {/* Slider / Rail */}
              <div className="gc-yt-rail-wrap">
                <div className="gc-yt-rail-header">
                  <span className="gc-yt-rail-label">Up Next</span>
                  <div className="gc-yt-rail-nav">
                    <button className="gc-yt-nav-btn" onClick={() => scrollRail(-1)} aria-label="Previous">
                      <ChevronLeft size={18} />
                    </button>
                    <button className="gc-yt-nav-btn" onClick={() => scrollRail(1)} aria-label="Next">
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>

                <div className="gc-yt-rail" ref={railRef}>
                  {videos.map((v, i) => (
                    <VideoCard
                      key={v.id}
                      video={v}
                      isActive={i === active}
                      onClick={() => handleCardClick(i)}
                    />
                  ))}
                </div>
              </div>

            </div>
          )}

          {!loading && !error && videos.length === 0 && (
            <div className="gc-yt-state">No videos found.</div>
          )}

        </div>
      </section>
    </>
  );
}