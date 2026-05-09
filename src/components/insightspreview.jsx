import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getLatestPosts, urlFor } from '../lib/sanity';

/* ─── Category mapping ───────────────────────────────────────── */
const CATEGORY_LABELS = {
  'regenerative-farming': 'Regenerative Farming',
  'precision-agriculture': 'Precision Agriculture',
  'institutional': 'Institutional',
  'innovation': 'Innovation',
  'vertical-farming': 'Vertical Farming',
  'sustainability': 'Sustainability',
  'case-studies': 'Case Studies',
  'announcements': 'Announcements',
};

/* ─── intersection observer hook ────────────────────────────── */
function useInView(threshold = 0.15) {
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

/* ─── format date ───────────────────────────────────────────── */
function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/* ─── Skeleton Loader Card ──────────────────────────────────── */
function SkeletonCard({ index }) {
  const [ref, vis] = useInView(0.1);
  const delay = index * 80;

  return (
    <div
      ref={ref}
      className="gc-ins-skeleton"
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(30px)",
        transition: `opacity .7s ease ${delay}ms, transform .8s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      <div className="gc-ins-skeleton-img" />
      <div className="gc-ins-skeleton-content">
        <div className="gc-ins-skeleton-line" style={{ width: '40%' }} />
        <div className="gc-ins-skeleton-line" style={{ width: '85%' }} />
        <div className="gc-ins-skeleton-line" style={{ width: '100%' }} />
        <div className="gc-ins-skeleton-line" style={{ width: '70%' }} />
      </div>
    </div>
  );
}

/* ─── Article Card Component ────────────────────────────────── */
function ArticleCard({ post, index, featured = false }) {
  const [ref, vis] = useInView(0.15);
  const delay = index * 100;
  const accent = "#4a8a5b"; // g500
  const categoryLabel = CATEGORY_LABELS[post.category] || post.category || "Insights";

  const imageUrl = post.coverImage?.asset
    ? urlFor(post.coverImage).width(featured ? 800 : 600).height(featured ? 450 : 280).fit('crop').auto('format').url()
    : "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80";

  return (
    <Link
      ref={ref}
      to={`/insights/${post.slug?.current || post.slug}`}
      className={`gc-ins-card ${featured ? 'gc-ins-card-featured' : ''}`}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(36px)",
        transition: `opacity .8s ease ${delay}ms, transform .9s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        textDecoration: "none",
      }}
    >
      {/* Image Section */}
      <div className="gc-ins-img-wrap" style={{ height: featured ? 300 : 220 }}>
        <img 
          src={imageUrl} 
          alt={post.coverImage?.alt || post.title} 
          className="gc-ins-img"
        />
        <div className="gc-ins-img-overlay" />
        
        {/* Category Badge */}
        <span className="gc-ins-cat-badge" style={{ borderColor: accent, color: accent }}>
          {categoryLabel}
        </span>
        
        {/* Featured Badge */}
        {featured && (
          <span className="gc-ins-featured-badge">
            Featured
          </span>
        )}
      </div>

      {/* Content Section */}
      <div className="gc-ins-card-body">
        {/* Meta Row */}
        <div className="gc-ins-meta-row">
          <span className="gc-ins-meta-item">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            {formatDate(post.publishedAt)}
          </span>
          <span className="gc-ins-meta-dot" />
          <span className="gc-ins-meta-item">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {post.readTime || 5} min read
          </span>
        </div>

        {/* Title */}
        <h3 className={`gc-ins-title ${featured ? 'gc-ins-title-featured' : ''}`}>
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="gc-ins-excerpt">{post.excerpt}</p>

        <div className="gc-ins-rule" />

        {/* Footer with Author */}
        <div className="gc-ins-footer">
          <div className="gc-ins-author">
            {post.author?.photo?.asset ? (
              <img
                src={urlFor(post.author.photo).width(40).height(40).fit('crop').url()}
                alt={post.author.name}
                className="gc-ins-author-avatar"
              />
            ) : (
              <div className="gc-ins-author-avatar gc-ins-author-fallback">
                {post.author?.name?.[0] || 'G'}
              </div>
            )}
            <div>
              <p className="gc-ins-author-name">{post.author?.name || 'Gartner Callaway'}</p>
              <p className="gc-ins-author-role">{post.author?.role || 'Team'}</p>
            </div>
          </div>
          <span className="gc-ins-read-more" style={{ color: accent }}>
            Read
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ─── Section Header Component ──────────────────────────────── */
function SectionHeader() {
  const [ref, vis] = useInView(0.3);
  
  return (
    <header
      ref={ref}
      className="gc-ins-header"
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(24px)",
        transition: "opacity .8s ease, transform .9s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <div className="gc-ins-eyebrow">
        <span className="gc-ins-eyebrow-line" aria-hidden="true" />
        Latest Insights
      </div>
      <h2 className="gc-ins-heading">
        Stories from the field.<br />
        <em>Lessons from practice.</em>
      </h2>
      <p className="gc-ins-subhead">
        From regenerative farm design to precision sensing and institutional partnerships 
        our team shares on-the-ground insights, case studies, and the evolving story of 
        modern African agriculture.
      </p>
    </header>
  );
}

/* ─── Main Component ────────────────────────────────────────── */
export default function InsightsPreview() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getLatestPosts()
      .then(setPosts)
      .catch(() => setError('Could not load articles. Please try again later.'))
      .finally(() => setLoading(false));
  }, []);

  const featuredPost = posts.find(p => p.featured) || posts[0];
  const otherPosts = posts.filter(p => p._id !== featuredPost?._id).slice(0, 3);

  return (
    <>
      <style>{`
        /* ── tokens + reset ── */
        .gc-ins-section, .gc-ins-section * { box-sizing: border-box; }
        .gc-ins-section {
          --g900: #0e1f14;
          --g800: #1a3321;
          --g500: #4a8a5b;
          --g400: #7fb38d;
          --g200: #e1f0e5;
          --r400: #e07a5f;
          --stone-100: #f4f4f2;
          --stone-500: #787870;
          --stone-800: #2c2c2a;
          --fd: "Cormorant Garamond", Georgia, serif;
          --fb: "DM Sans", system-ui, sans-serif;
          --ep: cubic-bezier(0.34, 1.56, 0.64, 1);
          --es: cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        /* ── section shell (WHITE BACKGROUND) ── */
        .gc-ins-section {
          background: #ffffff;
          padding: clamp(72px, 10vw, 120px) clamp(20px, 6vw, 96px);
          position: relative;
          overflow: hidden;
          font-family: var(--fb);
        }

        /* decorative backdrop elements - softer for white bg */
        .gc-ins-deco {
          position: absolute;
          top: -200px; right: -200px;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(74,138,91,.03) 0%, transparent 70%);
          pointer-events: none;
        }
        .gc-ins-deco-2 {
          position: absolute;
          bottom: -120px; left: -120px;
          width: 400px; height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(224,122,95,.02) 0%, transparent 70%);
          pointer-events: none;
        }
        
        /* large ghost number watermark - darker for white bg */
        .gc-ins-watermark {
          position: absolute;
          bottom: 20px; right: 20px;
          font-family: var(--fd);
          font-size: clamp(180px, 25vw, 320px);
          font-weight: 300;
          color: rgba(74,138,91,.04);
          line-height: 1;
          pointer-events: none;
          user-select: none;
          letter-spacing: -.04em;
        }

        /* ── header layout (updated for white bg) ── */
        .gc-ins-header {
          max-width: 800px;
          margin: 0 auto clamp(48px, 7vw, 80px);
          text-align: center;
        }
        .gc-ins-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 9.5px; font-weight: 500;
          letter-spacing: .22em; text-transform: uppercase;
          color: var(--r400);
          margin-bottom: clamp(16px, 2vw, 24px);
        }
        .gc-ins-eyebrow-line {
          display: block; width: 28px; height: 1px;
          background: var(--r400); flex-shrink: 0;
        }
        .gc-ins-heading {
          font-family: var(--fd);
          font-size: clamp(34px, 5.5vw, 68px);
          font-weight: 300; line-height: 1.08;
          color: var(--stone-800);
          letter-spacing: -.015em;
          margin: 0 0 clamp(16px, 2vw, 24px);
        }
        .gc-ins-heading em {
          font-style: italic; font-weight: 300;
          color: var(--g500);
        }
        .gc-ins-subhead {
          font-size: clamp(13.5px, 1.4vw, 16px);
          font-weight: 300; line-height: 1.78;
          color: var(--stone-500);
          max-width: 640px; margin: 0 auto;
        }

        /* ── Card Styles (updated for white bg) ── */
        .gc-ins-card {
          display: flex; flex-direction: column;
          background: #ffffff;
          border: 1px solid #e5e5e5;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.4s var(--es), box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .gc-ins-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,.08);
          border-color: var(--g400);
        }

        /* Image */
        .gc-ins-img-wrap { 
          overflow: hidden; 
          position: relative; 
          flex-shrink: 0; 
        }
        .gc-ins-img { 
          width: 100%; 
          height: 100%; 
          object-fit: cover; 
          display: block; 
          transition: transform 0.6s var(--es);
        }
        .gc-ins-card:hover .gc-ins-img { 
          transform: scale(1.05); 
        }
        .gc-ins-img-overlay {
          position: absolute; 
          inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.2) 100%);
          transition: opacity 0.3s;
        }

        /* Badges */
        .gc-ins-cat-badge {
          position: absolute; 
          bottom: 12px; left: 12px;
          font-family: var(--fb);
          font-size: 9px; 
          font-weight: 600; 
          letter-spacing: 0.12em; 
          text-transform: uppercase;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(4px);
          border-left: 2px solid;
          padding: 4px 10px;
          border-radius: 2px;
          color: var(--g500);
        }
        .gc-ins-featured-badge {
          position: absolute; 
          top: 12px; right: 12px;
          font-family: var(--fb);
          font-size: 9px; 
          font-weight: 600;
          letter-spacing: 0.12em; 
          text-transform: uppercase;
          background: var(--g500);
          color: #fff;
          padding: 4px 10px;
          border-radius: 2px;
        }

        /* Card Body */
        .gc-ins-card-body { 
          padding: 22px 24px 24px; 
          display: flex; 
          flex-direction: column; 
          gap: 12px; 
          flex: 1; 
        }
        .gc-ins-meta-row { 
          display: flex; 
          align-items: center; 
          gap: 8px; 
          flex-wrap: wrap;
        }
        .gc-ins-meta-item { 
          display: flex; 
          align-items: center; 
          gap: 5px; 
          font-size: 10.5px; 
          font-weight: 400;
          color: #9ca3af; 
        }
        .gc-ins-meta-dot { 
          width: 3px; 
          height: 3px; 
          border-radius: 50%; 
          background: #d1d5db; 
        }
        .gc-ins-title {
          font-family: var(--fd);
          font-size: 18px;
          font-weight: 400;
          line-height: 1.3;
          color: var(--stone-800);
          letter-spacing: -.01em;
          transition: color 0.2s ease;
        }
        .gc-ins-title-featured {
          font-size: 22px;
        }
        .gc-ins-card:hover .gc-ins-title { 
          color: var(--g500); 
        }
        .gc-ins-excerpt { 
          font-size: 13px; 
          font-weight: 300;
          line-height: 1.65;
          color: #6b7280; 
          flex: 1; 
        }
        .gc-ins-rule { 
          height: 1px; 
          background: linear-gradient(90deg, #e5e7eb, transparent);
        }

        /* Footer */
        .gc-ins-footer { 
          display: flex; 
          align-items: center; 
          justify-content: space-between; 
          gap: 12px; 
        }
        .gc-ins-author { 
          display: flex; 
          align-items: center; 
          gap: 10px; 
        }
        .gc-ins-author-avatar {
          width: 34px; 
          height: 34px; 
          border-radius: 50%; 
          object-fit: cover;
          border: 1.5px solid var(--g200);
        }
        .gc-ins-author-fallback {
          background: var(--g500); 
          color: #fff; 
          display: flex; 
          align-items: center; 
          justify-content: center;
          font-family: var(--fd); 
          font-weight: 500; 
          font-size: 14px;
        }
        .gc-ins-author-name { 
          font-size: 11.5px; 
          font-weight: 500; 
          color: #374151; 
        }
        .gc-ins-author-role { 
          font-size: 9px; 
          font-weight: 400;
          color: #9ca3af; 
        }
        .gc-ins-read-more {
          display: inline-flex; 
          align-items: center; 
          gap: 5px;
          font-family: var(--fb);
          font-size: 10px; 
          font-weight: 600;
          letter-spacing: 0.1em; 
          text-transform: uppercase;
          transition: gap 0.2s ease;
        }
        .gc-ins-card:hover .gc-ins-read-more { 
          gap: 8px; 
        }

        /* Skeleton (updated for white bg) */
        .gc-ins-skeleton {
          background: #ffffff;
          border: 1px solid #f0f0f0;
          overflow: hidden;
        }
        .gc-ins-skeleton-img {
          height: 220px;
          background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
        }
        .gc-ins-skeleton-content {
          padding: 22px 24px 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .gc-ins-skeleton-line {
          height: 12px;
          background: #f3f4f6;
          border-radius: 2px;
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* ── CTA Button (updated for white bg) ── */
        .gc-ins-cta {
          display: inline-flex; 
          align-items: center; 
          gap: 10px;
          font-family: var(--fb);
          font-size: 10px; 
          font-weight: 600;
          letter-spacing: 0.14em; 
          text-transform: uppercase;
          color: var(--g500);
          background: transparent;
          border: 1px solid var(--g200);
          padding: 14px 28px;
          text-decoration: none;
          transition: all 0.3s ease;
          border-radius: 2px;
        }
        .gc-ins-cta:hover {
          background: var(--g500);
          border-color: var(--g500);
          color: #fff;
          gap: 14px;
        }

        /* ── Grid Layouts ── */
        .gc-ins-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 48px;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .gc-ins-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .gc-ins-grid {
            grid-template-columns: 1fr;
          }
          .gc-ins-deco, .gc-ins-deco-2 {
            display: none;
          }
          .gc-ins-watermark {
            display: none;
          }
        }
      `}</style>

      <section className="gc-ins-section" aria-labelledby="insights-heading">
        {/* decorative elements */}
        <div className="gc-ins-deco" aria-hidden="true" />
        <div className="gc-ins-deco-2" aria-hidden="true" />
        <div className="gc-ins-watermark" aria-hidden="true">GC</div>

        {/* header */}
        <SectionHeader />

        {/* Content */}
        <div className="gc-ins-grid">
          {loading && !error && (
            <>
              <SkeletonCard index={0} />
              <SkeletonCard index={1} />
              <SkeletonCard index={2} />
            </>
          )}

          {error && (
            <div style={{ textAlign: 'center', gridColumn: '1/-1', padding: '60px 20px' }}>
              <p style={{ color: '#6b7280', fontSize: '14px' }}>{error}</p>
            </div>
          )}

          {!loading && !error && posts.length === 0 && (
            <div style={{ textAlign: 'center', gridColumn: '1/-1', padding: '60px 20px' }}>
              <p style={{ color: '#9ca3af', fontSize: '14px' }}>Articles coming soon. Check back for insights from our team.</p>
            </div>
          )}

          {!loading && !error && posts.map((post, idx) => (
            <ArticleCard key={post._id || post.id} post={post} index={idx} />
          ))}
        </div>

        {/* Bottom CTA */}
        {!loading && !error && posts.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '56px' }}>
            <Link to="/insights" className="gc-ins-cta">
              View All Articles
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        )}
      </section>
    </>
  );
}