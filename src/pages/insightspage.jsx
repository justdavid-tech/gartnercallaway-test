import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts, urlFor } from '../lib/sanity';

/* ─── Data ───────────────────────────────────────────────── */
const CATEGORY_LABELS = {
  all:                          'All Articles',
  'regenerative-agriculture':   'Regenerative Agriculture',
  'precision-farming':          'Precision Farming',
  'farm-infrastructure':        'Farm Infrastructure',
  'institutional-partnerships': 'Institutional Partnerships',
  'export-readiness':           'Export Readiness',
  'case-studies':               'Case Studies',
  'industry-news':              'Industry News',
  'gc-updates':                 'GC Updates',
};

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

/* ─── Article Card ───────────────────────────────────────── */
function ArticleCard({ post, index }) {
  const label    = CATEGORY_LABELS[post.category] || post.category;
  const imageUrl = post.coverImage?.asset
    ? urlFor(post.coverImage).width(700).height(420).fit('crop').auto('format').url()
    : 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=700&q=80';

  return (
    <Link
      to={`/insights/${post.slug.current}`}
      className="gc-ip-card"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Image */}
      <div className="gc-ip-img-wrap">
        <img src={imageUrl} alt={post.coverImage?.alt || post.title} className="gc-ip-img" />
        <div className="gc-ip-img-veil" />

        {/* Category */}
        {post.category && (
          <span className="gc-ip-cat">
            <span className="gc-ip-cat-dot" />
            {label}
          </span>
        )}

        {/* Read time pill */}
        {post.readTime && (
          <span className="gc-ip-time">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
            {post.readTime} min
          </span>
        )}
      </div>

      {/* Body */}
      <div className="gc-ip-body">
        <p className="gc-ip-date">{formatDate(post.publishedAt)}</p>

        <h3 className="gc-ip-title">{post.title}</h3>

        {post.excerpt && (
          <p className="gc-ip-excerpt">{post.excerpt}</p>
        )}

        <div className="gc-ip-rule" />

        <div className="gc-ip-footer">
          {/* Author */}
          <div className="gc-ip-author">
            {post.author?.photo?.asset ? (
              <img src={urlFor(post.author.photo).width(40).height(40).fit('crop').url()} alt={post.author.name} className="gc-ip-avatar" />
            ) : (
              <div className="gc-ip-avatar gc-ip-avatar-fb">{post.author?.name?.[0] ?? 'G'}</div>
            )}
            <div>
              <p className="gc-ip-author-name">{post.author?.name ?? 'Gartner Callaway'}</p>
              <p className="gc-ip-author-role">{post.author?.role ?? 'Editorial'}</p>
            </div>
          </div>

          <span className="gc-ip-read-more">
            Read
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ─── Skeleton ───────────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="gc-ip-card" style={{ pointerEvents: 'none' }}>
      <div style={{ height: 220, background: 'linear-gradient(90deg,#1a3321 25%,#243d2b 50%,#1a3321 75%)', backgroundSize: '200% 100%', animation: 'gc-ip-shimmer 1.5s infinite' }} />
      <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[40, 75, 100, 65].map((w, i) => (
          <div key={i} className="gc-ip-skel" style={{ height: i === 1 ? 20 : 13, width: `${w}%` }} />
        ))}
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────── */
export default function InsightsPage() {
  const [allPosts,    setAllPosts]    = useState([]);
  const [activeTab,   setActiveTab]   = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(null);

  useEffect(() => {
    getAllPosts()
      .then(setAllPosts)
      .catch(() => setError('Could not load articles. Please try again later.'))
      .finally(() => setLoading(false));
  }, []);

  // SEO
  useEffect(() => {
    document.title = 'Insights | Gartner Callaway';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', 'Agricultural insights, regenerative farming guides, precision agriculture updates, and GC case studies from Gartner Callaway.');
  }, []);

  const categories = ['all', ...Array.from(new Set(allPosts.map(p => p.category).filter(Boolean)))];

  const filtered = allPosts.filter(p => {
    const matchCat    = activeTab === 'all' || p.category === activeTab;
    const matchSearch = !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      <style>{`
        /* ── Tokens ── */
        .gc-ip-root { font-family: "DM Sans", system-ui, sans-serif; }

        /* ── Shimmer ── */
        @keyframes gc-ip-shimmer { 0% { background-position:200% 0; } 100% { background-position:-200% 0; } }
        .gc-ip-skel {
          background: linear-gradient(90deg,#1a3321 25%,#243d2b 50%,#1a3321 75%);
          background-size: 200% 100%;
          animation: gc-ip-shimmer 1.5s infinite;
          border-radius: 3px;
        }

        /* ── Card entrance ── */
        @keyframes gc-ip-fadeup { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        .gc-ip-card { animation: gc-ip-fadeup 0.65s ease both; }

        /* ── Hero ── */
        .gc-ip-hero {
          position: relative;
          min-height: 440px;
          display: flex; flex-direction: column; justify-content: flex-end;
          background: #0e1f14; overflow: hidden;
        }
        .gc-ip-hero-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%; object-fit: cover; object-position: center 35%;
          filter: saturate(1.2) brightness(0.25);
        }
        .gc-ip-hero-veil {
          position: absolute; inset: 0;
          background:
            linear-gradient(to top, #0e1f14 0%, transparent 55%),
            linear-gradient(to right, rgba(14,31,20,.9) 0%, transparent 70%);
        }
        .gc-ip-grain {
          position: absolute; inset: 0; opacity: .032;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 128px; pointer-events: none;
        }
        .gc-ip-hero-inner {
          position: relative; z-index: 2;
          max-width: 1280px; margin: 0 auto; width: 100%;
          padding: 130px 24px 56px;
        }

        /* ── Hero eyebrow ── */
        .gc-ip-eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 9px; font-weight: 500; letter-spacing: .22em; text-transform: uppercase;
          color: #7fb38d; margin-bottom: 20px;
        }
        .gc-ip-eyebrow-rule { display: block; width: 24px; height: 1px; background: #7fb38d; }

        /* ── Hero headline ── */
        .gc-ip-hero-h1 {
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: clamp(42px, 6vw, 80px);
          font-weight: 300; line-height: 1.04;
          letter-spacing: -.02em; color: #fff;
          margin-bottom: 18px; max-width: 14ch;
        }
        .gc-ip-hero-h1 em { font-style: italic; color: #7fb38d; }

        /* ── Hero sub ── */
        .gc-ip-hero-sub {
          font-size: clamp(13px,1.4vw,16px); font-weight: 300; line-height: 1.78;
          color: rgba(255,255,255,.55); max-width: 500px;
        }

        /* ── Filter bar ── */
        .gc-ip-bar {
          position: sticky; top: 70px; z-index: 40;
          background: rgba(255,255,255,.96);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid #e8e8e6;
        }
        .gc-ip-bar-inner {
          max-width: 1280px; margin: 0 auto;
          padding: 14px 24px;
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px; flex-wrap: wrap;
        }

        /* ── Tabs ── */
        .gc-ip-tabs { display: flex; gap: 5px; flex-wrap: wrap; }
        .gc-ip-tab {
          font-family: "DM Sans", system-ui, sans-serif;
          font-size: 9px; font-weight: 500; letter-spacing: .16em; text-transform: uppercase;
          padding: 7px 16px; border-radius: 2px;
          border: 1px solid #e8e8e6; background: #fff;
          color: #787870; cursor: pointer; white-space: nowrap;
          transition: background .2s, color .2s, border-color .2s;
        }
        .gc-ip-tab:hover   { background: #f4f4f2; color: #1a3321; border-color: #d0d0ce; }
        .gc-ip-tab.active  { background: #1a3321; color: #7fb38d; border-color: #1a3321; }

        /* ── Search ── */
        .gc-ip-search {
          display: flex; align-items: center; gap: 9px;
          background: #f4f4f2; border: 1px solid #e8e8e6; border-radius: 2px;
          padding: 9px 14px; min-width: 220px; max-width: 300px;
          transition: border-color .2s;
        }
        .gc-ip-search:focus-within { border-color: #4a8a5b; background: #fff; }
        .gc-ip-search input {
          flex: 1; border: none; outline: none; background: transparent;
          font-family: "DM Sans", system-ui, sans-serif;
          font-size: 13px; color: #2c2c2a;
        }
        .gc-ip-search input::placeholder { color: #b0b0a8; }
        .gc-ip-search-icon { color: #b0b0a8; flex-shrink: 0; }
        .gc-ip-search-clear { color: #b0b0a8; background: none; border: none; cursor: pointer; padding: 0; line-height: 1; transition: color .2s; }
        .gc-ip-search-clear:hover { color: #4a8a5b; }

        /* ── Grid wrapper ── */
        .gc-ip-grid-wrap {
          background: #f4f4f2;
          min-height: 60vh;
        }
        .gc-ip-grid-inner {
          max-width: 1280px; margin: 0 auto;
          padding: 56px 24px 80px;
        }

        /* ── Results count ── */
        .gc-ip-count {
          font-size: 9px; font-weight: 500; letter-spacing: .18em; text-transform: uppercase;
          color: #b0b0a8; margin-bottom: 28px;
          display: flex; align-items: center; gap: 8px;
        }
        .gc-ip-count-rule { flex: 1; height: 1px; background: #e0e0de; }

        /* ── Card ── */
        .gc-ip-card {
          display: flex; flex-direction: column;
          background: #fff; border-radius: 4px;
          border: 1px solid #e8e8e6;
          overflow: hidden; text-decoration: none; color: inherit;
          transition: transform .35s ease, box-shadow .35s ease, border-color .35s ease;
        }
        .gc-ip-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 48px rgba(14,31,20,.10);
          border-color: #c8dece;
        }

        /* ── Card image ── */
        .gc-ip-img-wrap { position: relative; height: 220px; overflow: hidden; flex-shrink: 0; }
        .gc-ip-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .6s ease; }
        .gc-ip-card:hover .gc-ip-img { transform: scale(1.05); }
        .gc-ip-img-veil {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(14,31,20,.55) 100%);
        }

        /* ── Category tag ── */
        .gc-ip-cat {
          position: absolute; bottom: 12px; left: 12px;
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 8.5px; font-weight: 500; letter-spacing: .2em; text-transform: uppercase;
          color: #7fb38d;
          background: rgba(14,31,20,.75); backdrop-filter: blur(6px);
          padding: 4px 10px; border-radius: 2px;
        }
        .gc-ip-cat-dot { width: 4px; height: 4px; border-radius: 50%; background: #7fb38d; flex-shrink: 0; }

        /* ── Read time ── */
        .gc-ip-time {
          position: absolute; top: 12px; right: 12px;
          display: inline-flex; align-items: center; gap: 4px;
          font-size: 9px; letter-spacing: .1em;
          color: rgba(255,255,255,.6);
          background: rgba(14,31,20,.55); backdrop-filter: blur(6px);
          padding: 3px 8px; border-radius: 2px;
        }

        /* ── Card body ── */
        .gc-ip-body { padding: 22px; display: flex; flex-direction: column; gap: 10px; flex: 1; }

        .gc-ip-date { font-size: 10px; color: #b0b0a8; letter-spacing: .1em; }

        .gc-ip-title {
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: clamp(18px, 2vw, 22px); font-weight: 300;
          line-height: 1.25; color: #1a3321;
          letter-spacing: -.01em;
          transition: color .2s;
        }
        .gc-ip-card:hover .gc-ip-title { color: #4a8a5b; }

        .gc-ip-excerpt { font-size: 13px; color: #787870; line-height: 1.7; flex: 1; }

        .gc-ip-rule { height: 1px; background: linear-gradient(90deg, #e8e8e6, transparent); margin-top: 4px; }

        /* ── Card footer ── */
        .gc-ip-footer { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding-top: 4px; }
        .gc-ip-author { display: flex; align-items: center; gap: 9px; }
        .gc-ip-avatar {
          width: 32px; height: 32px; border-radius: 50%; object-fit: cover;
          border: 1.5px solid rgba(74,138,91,.25); flex-shrink: 0;
        }
        .gc-ip-avatar-fb {
          width: 32px; height: 32px; border-radius: 50%;
          background: #1a3321; color: #7fb38d;
          display: flex; align-items: center; justify-content: center;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: 16px; font-weight: 300; flex-shrink: 0;
        }
        .gc-ip-author-name { font-size: 11px; font-weight: 500; color: #2c2c2a; }
        .gc-ip-author-role { font-size: 9.5px; color: #b0b0a8; }

        .gc-ip-read-more {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 9px; font-weight: 500; letter-spacing: .16em; text-transform: uppercase;
          color: #4a8a5b; transition: gap .2s, color .2s;
        }
        .gc-ip-card:hover .gc-ip-read-more { gap: 8px; color: #1a3321; }

        /* ── Empty / Error states ── */
        .gc-ip-state {
          text-align: center; padding: 80px 24px;
          border: 1px solid #e8e8e6; background: #fff; border-radius: 4px;
        }
        .gc-ip-state-title {
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: 36px; font-weight: 300; color: #1a3321; margin-bottom: 10px;
        }
        .gc-ip-state-sub { font-size: 13px; color: #b0b0a8; }

        /* ── Footer CTA ── */
        .gc-ip-footer-wrap {
          background: #0e1f14;
          padding: 48px 24px; text-align: center;
        }
        .gc-ip-footer-link {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 9px; font-weight: 500; letter-spacing: .2em; text-transform: uppercase;
          color: rgba(127,179,141,.5); text-decoration: none;
          transition: color .25s;
        }
        .gc-ip-footer-link:hover { color: #7fb38d; }
        .gc-ip-footer-rule { display: block; width: 20px; height: 1px; background: currentColor; }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .gc-ip-bar-inner { flex-direction: column; align-items: stretch; }
          .gc-ip-search    { max-width: 100%; }
        }
      `}</style>

      <div className="gc-ip-root">

        {/* ── Hero ── */}
        <div className="gc-ip-hero">
          <img
            src="https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1800&q=80"
            alt="Gartner Callaway Insights"
            className="gc-ip-hero-img"
          />
          <div className="gc-ip-hero-veil" />
          <div className="gc-ip-grain" />

          <div className="gc-ip-hero-inner">
            <div className="gc-ip-eyebrow">
              <span className="gc-ip-eyebrow-rule" />
              GC Insights
            </div>

            <h1 className="gc-ip-hero-h1">
              Knowledge from<br />
              the <em>field.</em>
            </h1>

            <p className="gc-ip-hero-sub">
              Regenerative agriculture insights, precision farming guides,
              case studies, and industry news — from the team building
              Nigeria's most integrated farm systems.
            </p>
          </div>
        </div>

        {/* ── Filter bar ── */}
        <div className="gc-ip-bar">
          <div className="gc-ip-bar-inner">
            <div className="gc-ip-tabs">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`gc-ip-tab ${activeTab === cat ? 'active' : ''}`}
                >
                  {CATEGORY_LABELS[cat] || cat}
                </button>
              ))}
            </div>

            <div className="gc-ip-search">
              <svg className="gc-ip-search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search articles…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button className="gc-ip-search-clear" onClick={() => setSearchQuery('')}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Articles grid ── */}
        <div className="gc-ip-grid-wrap">
          <div className="gc-ip-grid-inner">

            {/* Results count */}
            {!loading && !error && (
              <div className="gc-ip-count">
                {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
                {activeTab !== 'all' && ` · ${CATEGORY_LABELS[activeTab]}`}
                {searchQuery && ` · "${searchQuery}"`}
                <span className="gc-ip-count-rule" />
              </div>
            )}

            {/* Skeletons */}
            {loading && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
                {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            )}

            {/* Error */}
            {error && !loading && (
              <div className="gc-ip-state">
                <p className="gc-ip-state-title">Something went wrong.</p>
                <p className="gc-ip-state-sub">{error}</p>
              </div>
            )}

            {/* Empty */}
            {!loading && !error && filtered.length === 0 && (
              <div className="gc-ip-state">
                <p className="gc-ip-state-title">
                  {allPosts.length === 0 ? 'Articles coming soon.' : 'No articles found.'}
                </p>
                <p className="gc-ip-state-sub">
                  {allPosts.length === 0
                    ? 'Our editorial team is preparing the first articles. Check back soon.'
                    : 'Try a different category or search term.'}
                </p>
              </div>
            )}

            {/* Articles */}
            {!loading && !error && filtered.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
                {filtered.map((post, i) => (
                  <ArticleCard key={post._id} post={post} index={i} />
                ))}
              </div>
            )}

          </div>
        </div>

        {/* ── Footer CTA ── */}
        <div className="gc-ip-footer-wrap">
          <Link to="/" className="gc-ip-footer-link">
            <span className="gc-ip-footer-rule" />
            Back to Homepage
          </Link>
        </div>

      </div>
    </>
  );
}