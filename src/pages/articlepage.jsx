import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PortableText } from '@portabletext/react';
import { getPostBySlug, urlFor } from '../lib/sanity';

const SITE_URL  = 'https://gartnercallaway-testing.vercel.app';
const SITE_NAME = 'Gartner Callaway';
const FALLBACK_IMAGE = `${SITE_URL}/assets/logo`;

/* ─── SEO injector ───────────────────────────────────────── */
function useSeoHead(post) {
  useEffect(() => {
    if (!post) return;
    const slug    = post.slug?.current ?? '';
    const pageUrl = `${SITE_URL}/insights/${slug}`;
    const title   = `${post.title} | ${SITE_NAME}`;
    const desc    = post.excerpt || `Read ${post.title} on Gartner Callaway Insights.`;
    const imgUrl  = post.coverImage?.asset
      ? urlFor(post.coverImage).width(1200).height(630).fit('crop').auto('format').url()
      : FALLBACK_IMAGE;
    const author  = post.author?.name ?? 'Gartner Callaway';
    const pubDate = post.publishedAt ? new Date(post.publishedAt).toISOString() : new Date().toISOString();
    const modDate = post._updatedAt  ? new Date(post._updatedAt).toISOString()  : pubDate;

    const prevTitle  = document.title;
    document.title   = title;
    const injected   = [];

    const setMeta = (attr, attrVal, content) => {
      let el = document.querySelector(`meta[${attr}="${attrVal}"]`);
      const isNew = !el;
      if (isNew) { el = document.createElement('meta'); el.setAttribute(attr, attrVal); document.head.appendChild(el); injected.push(el); }
      el.setAttribute('content', content);
    };

    let canonical = document.querySelector('link[rel="canonical"]');
    const prevCanonical = canonical?.href;
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); injected.push(canonical); }
    canonical.href = pageUrl;

    setMeta('name',     'description',              desc);
    setMeta('name',     'author',                   author);
    setMeta('property', 'og:type',                  'article');
    setMeta('property', 'og:url',                   pageUrl);
    setMeta('property', 'og:title',                 post.title);
    setMeta('property', 'og:description',           desc);
    setMeta('property', 'og:image',                 imgUrl);
    setMeta('property', 'article:published_time',   pubDate);
    setMeta('property', 'article:modified_time',    modDate);
    setMeta('property', 'article:author',           author);
    setMeta('name',     'twitter:card',             'summary_large_image');
    setMeta('name',     'twitter:title',            post.title);
    setMeta('name',     'twitter:description',      desc);
    setMeta('name',     'twitter:image',            imgUrl);

    const jsonLd = {
      '@context': 'https://schema.org', '@type': 'Article',
      headline: post.title, description: desc, image: imgUrl,
      datePublished: pubDate, dateModified: modDate, url: pageUrl,
      author: { '@type': 'Person', name: author, worksFor: { '@type': 'Organization', name: SITE_NAME } },
      publisher: { '@type': 'Organization', name: SITE_NAME, logo: { '@type': 'ImageObject', url: `${SITE_URL}/assets/logo` } },
      mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
      ...(post.readTime ? { timeRequired: `PT${post.readTime}M` } : {}),
    };
    const ldScript = document.createElement('script');
    ldScript.type = 'application/ld+json';
    ldScript.textContent = JSON.stringify(jsonLd);
    ldScript.id = '__article-ld-json__';
    document.head.appendChild(ldScript);

    return () => {
      document.title = prevTitle;
      if (prevCanonical) canonical.href = prevCanonical;
      injected.forEach(el => el.parentNode?.removeChild(el));
      ldScript.parentNode?.removeChild(ldScript);
    };
  }, [post]);
}

/* ─── Data ───────────────────────────────────────────────── */
const CATEGORY_LABELS = {
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
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

/* ─── Portable Text components ───────────────────────────── */
const ptComponents = {
  block: {
    normal:     ({ children }) => <p className="gc-art-p">{children}</p>,
    h2:         ({ children }) => <h2 className="gc-art-h2">{children}</h2>,
    h3:         ({ children }) => <h3 className="gc-art-h3">{children}</h3>,
    h4:         ({ children }) => <h4 className="gc-art-h4">{children}</h4>,
    blockquote: ({ children }) => <blockquote className="gc-art-bq">{children}</blockquote>,
  },
  marks: {
    strong: ({ children }) => <strong className="gc-art-strong">{children}</strong>,
    em:     ({ children }) => <em style={{ fontStyle: 'italic' }}>{children}</em>,
    link:   ({ value, children }) => (
      <a href={value.href} target={value.blank ? '_blank' : '_self'} rel="noopener noreferrer" className="gc-art-link">
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => (
      <figure className="gc-art-figure">
        <img src={urlFor(value).width(900).auto('format').url()} alt={value.alt || ''} className="gc-art-img" />
        {value.caption && <figcaption className="gc-art-caption">{value.caption}</figcaption>}
      </figure>
    ),
  },
};

/* ─── Skeleton ───────────────────────────────────────────── */
function Skeleton() {
  return (
    <div>
      <div style={{ background: '#0e1f14', height: 480 }} />
      <div style={{ maxWidth: 780, margin: '0 auto', padding: '56px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        {[70, 50, 100, 100, 80, 100, 90, 60].map((w, i) => (
          <div key={i} className="gc-art-skel" style={{ height: i < 2 ? 32 : 16, width: `${w}%` }} />
        ))}
      </div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────── */
export default function ArticlePage() {
  const { slug } = useParams();
  const [post,    setPost]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const [copied,  setCopied]  = useState(false);

  useSeoHead(post);

  useEffect(() => {
    window.scrollTo(0, 0);
    getPostBySlug(slug)
      .then(data => { if (!data) setError('Article not found.'); else setPost(data); })
      .catch(() => setError('Could not load this article. Please try again.'))
      .finally(() => setLoading(false));
  }, [slug]);

  function handleShare() {
    navigator.clipboard.writeText(window.location.href)
      .then(() => { setCopied(true); setTimeout(() => setCopied(false), 2500); })
      .catch(err => console.error('Copy failed:', err));
  }

  return (
    <>
      <style>{`
        /* ── Fonts ── */
        .gc-art-root { font-family: "DM Sans", system-ui, sans-serif; }

        /* ── Skeleton ── */
        @keyframes gc-shimmer { 0% { background-position:200% 0; } 100% { background-position:-200% 0; } }
        .gc-art-skel {
          background: linear-gradient(90deg,#1a3321 25%,#243d2b 50%,#1a3321 75%);
          background-size: 200% 100%;
          animation: gc-shimmer 1.5s infinite;
          border-radius: 4px;
        }

        /* ── Hero ── */
        .gc-art-hero {
          position: relative;
          min-height: 520px;
          display: flex; flex-direction: column; justify-content: flex-end;
          background: #0e1f14;
          overflow: hidden;
        }
        .gc-art-hero-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%; object-fit: cover;
          filter: saturate(1.2) brightness(0.28);
          transform: scale(1.02);
        }
        .gc-art-hero-veil {
          position: absolute; inset: 0;
          background:
            linear-gradient(to top, #0e1f14 0%, transparent 55%),
            linear-gradient(to right, rgba(14,31,20,.85) 0%, transparent 65%);
        }
        .gc-art-grain {
          position: absolute; inset: 0; opacity: .032;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 128px; pointer-events: none;
        }
        .gc-art-hero-inner {
          position: relative; z-index: 2;
          max-width: 900px; margin: 0 auto; width: 100%;
          padding: 140px 24px 56px;
        }

        /* ── Back link ── */
        .gc-art-back {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 9px; font-weight: 500; letter-spacing: .22em; text-transform: uppercase;
          color: rgba(127,179,141,.7); text-decoration: none;
          margin-bottom: 28px;
          transition: color .2s;
        }
        .gc-art-back:hover { color: #7fb38d; }
        .gc-art-back-rule { display: block; width: 20px; height: 1px; background: currentColor; }

        /* ── Category pill ── */
        .gc-art-cat {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 9px; font-weight: 500; letter-spacing: .22em; text-transform: uppercase;
          color: #7fb38d; margin-bottom: 20px;
        }
        .gc-art-cat-dot { width: 5px; height: 5px; border-radius: 50%; background: #7fb38d; flex-shrink: 0; }

        /* ── Headline ── */
        .gc-art-title {
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: clamp(36px, 5.5vw, 72px);
          font-weight: 600; line-height: 1.05;
          letter-spacing: -.02em; color: #fff;
          margin-bottom: 28px; max-width: 16ch;
        }
        .gc-art-title em { font-style: italic; color: #7fb38d; }

        /* ── Meta row ── */
        .gc-art-meta {
          display: flex; align-items: center; flex-wrap: wrap; gap: 16px;
        }
        .gc-art-meta-divider { width: 1px; height: 24px; background: rgba(255,255,255,.12); }
        .gc-art-meta-txt { font-size: 11px; color: rgba(255,255,255,.42); display: flex; align-items: center; gap: 5px; }
        .gc-art-meta-author-name { font-size: 12px; font-weight: 500; color: rgba(255,255,255,.8); }
        .gc-art-meta-author-role { font-size: 10px; color: rgba(255,255,255,.38); }
        .gc-art-avatar {
          width: 38px; height: 38px; border-radius: 50%; object-fit: cover;
          border: 1.5px solid rgba(127,179,141,.4);
        }
        .gc-art-avatar-fb {
          width: 38px; height: 38px; border-radius: 50%;
          background: #4a8a5b; color: #fff;
          display: flex; align-items: center; justify-content: center;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: 18px; font-weight: 300;
          border: 1.5px solid rgba(127,179,141,.4);
          flex-shrink: 0;
        }

        /* ── Share button (hero) ── */
        .gc-art-share-btn {
          margin-left: auto;
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 9px; font-weight: 500; letter-spacing: .18em; text-transform: uppercase;
          color: rgba(255,255,255,.5);
          background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.12);
          padding: 7px 14px; border-radius: 2px; cursor: pointer;
          transition: all .2s;
        }
        .gc-art-share-btn:hover { background: rgba(127,179,141,.12); border-color: rgba(127,179,141,.3); color: #7fb38d; }
        .gc-art-share-btn.copied { color: #7fb38d; border-color: #7fb38d; background: rgba(127,179,141,.08); }

        /* ── Progress bar ── */
        .gc-art-progress {
          position: sticky; top: 0; left: 0; right: 0;
          height: 2px; background: rgba(14,31,20,.6);
          z-index: 50; backdrop-filter: blur(4px);
        }
        .gc-art-progress-fill {
          height: 100%; background: linear-gradient(to right, #4a8a5b, #7fb38d);
          transition: width .1s linear;
        }

        /* ── Body wrapper ── */
        .gc-art-body-wrap {
          background: #fff;
          padding: 72px 24px;
        }
        .gc-art-body-inner { max-width: 780px; margin: 0 auto; }

        /* ── Excerpt lead ── */
        .gc-art-excerpt {
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: clamp(18px, 2.2vw, 22px);
          font-weight: 300; font-style: italic;
          line-height: 1.75; color: #000;
          border-left: 2px solid #4a8a5b;
          padding-left: 24px;
          margin-bottom: 48px;
        }

        /* ── Portable text ── */
        .gc-art-p  { font-size: 17px; line-height: 1.9; color: #374151; margin-bottom: 1.6rem; }
        .gc-art-h2 {
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: clamp(26px, 3vw, 36px); font-weight: 300; font-style: italic;
          color: #000; margin: 3rem 0 1.2rem;
          border-left: 2px solid #7fb38d; padding-left: 20px;
          line-height: 1.2;
        }
        .gc-art-h3 {
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: clamp(20px, 2.2vw, 26px); font-weight: 400;
          color: #1; margin: 2.5rem 0 .9rem;
          letter-spacing: -.01em;
        }
        .gc-art-h4 {
          font-size: 15px; font-weight: 600; text-transform: uppercase;
          letter-spacing: .12em; color: #4a8a5b; margin: 2rem 0 .6rem;
        }
        .gc-art-bq {
          border-left: 2px solid #4a8a5b;
          background: #f7faf8;
          padding: 22px 28px; margin: 2.5rem 0;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-style: italic; font-size: 20px; font-weight: 300;
          color: #2c2c2a; line-height: 1.75;
        }
        .gc-art-strong { font-weight: 600; color: #1a3321; }
        .gc-art-link { color: #4a8a5b; text-decoration: underline; text-underline-offset: 3px; transition: color .2s; }
        .gc-art-link:hover { color: #1a3321; }
        .gc-art-figure { margin: 3rem 0; }
        .gc-art-img { width: 100%; height: auto; display: block; border-radius: 4px; }
        .gc-art-caption { text-align: center; font-size: 12px; color: #9CA3AF; margin-top: 10px; font-style: italic; }

        /* ── Divider ── */
        .gc-art-divider { width: 40px; height: 1px; background: #7fb38d; margin: 48px 0; }

        /* ── Author card ── */
        .gc-art-author {
          display: flex; align-items: center; gap: 18px;
          background: #f4f4f2; border: 1px solid #e8e8e6;
          padding: 24px; border-radius: 4px;
          margin-top: 56px;
        }
        .gc-art-author-avatar {
          width: 60px; height: 60px; border-radius: 50%; object-fit: cover;
          border: 2px solid rgba(74,138,91,.25); flex-shrink: 0;
        }
        .gc-art-author-avatar-fb {
          width: 60px; height: 60px; border-radius: 50%;
          background: #1a3321; color: #7fb38d;
          display: flex; align-items: center; justify-content: center;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: 26px; font-weight: 300; flex-shrink: 0;
        }
        .gc-art-author-name {
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: 22px; font-weight: 300; color: #000; margin-bottom: 2px;
        }
        .gc-art-author-role { font-size: 11px; color: #4a8a5b; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; }
        .gc-art-author-org  { font-size: 12px; color: #000; margin-top: 4px; }

        /* ── Share bottom ── */
        .gc-art-share-wrap {
          margin-top: 56px; padding: 36px;
          border: 1px solid #e8e8e6; border-radius: 4px;
          display: flex; flex-direction: column; align-items: center; gap: 16px;
          text-align: center; background: #f9f9f8;
        }
        .gc-art-share-label {
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: 22px; font-weight: 300; color: #1a3321;
        }
        .gc-art-share-sub { font-size: 13px; color: #9CA3AF; }
        .gc-art-share-bottom-btn {
          display: inline-flex; align-items: center; gap: 9px;
          font-size: 9px; font-weight: 500; letter-spacing: .18em; text-transform: uppercase;
          color: #0e1f14; background: #7fb38d;
          padding: 13px 28px; border: none; border-radius: 2px;
          cursor: pointer; transition: background .25s;
        }
        .gc-art-share-bottom-btn:hover { background: #4a8a5b; color: #fff; }
        .gc-art-share-bottom-btn.copied { background: #4a8a5b; color: #fff; }

        /* ── Back CTA ── */
        .gc-art-back-cta {
          display: inline-flex; align-items: center; gap: 9px;
          font-size: 9px; font-weight: 500; letter-spacing: .18em; text-transform: uppercase;
          color: #fff; background: #1a3321;
          padding: 14px 28px; text-decoration: none; border-radius: 2px;
          transition: background .25s;
        }
        .gc-art-back-cta:hover { background: #4a8a5b; }

        /* ── Error state ── */
        .gc-art-error {
          min-height: 60vh; display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 20px;
          text-align: center; padding: 48px 24px;
          background: #f4f4f2;
        }
        .gc-art-error-title {
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: 40px; font-weight: 300; color: #1a3321;
        }
      `}</style>

      {/* ── Reading progress bar ── */}
      <ReadingProgress />

      <div className="gc-art-root" style={{ paddingTop: 70 }}>

        {loading && <Skeleton />}

        {error && !loading && (
          <div className="gc-art-error">
            <p className="gc-art-error-title">{error}</p>
            <Link to="/insights" className="gc-art-back-cta">
              ← Back to Insights
            </Link>
          </div>
        )}

        {post && !loading && (
          <>
            {/* ── Hero ── */}
            <div className="gc-art-hero">
              {post.coverImage?.asset && (
                <img
                  src={urlFor(post.coverImage).width(1600).height(700).fit('crop').auto('format').url()}
                  alt={post.coverImage.alt || post.title}
                  className="gc-art-hero-img"
                />
              )}
              <div className="gc-art-hero-veil" />
              <div className="gc-art-grain" />

              <div className="gc-art-hero-inner">
                {/* Back */}
                <Link to="/insights" className="gc-art-back">
                  <span className="gc-art-back-rule" />
                  Back to Insights
                </Link>

                {/* Category */}
                {post.category && (
                  <div className="gc-art-cat">
                    <span className="gc-art-cat-dot" />
                    {CATEGORY_LABELS[post.category] || post.category}
                  </div>
                )}

                {/* Title */}
                <h1 className="gc-art-title">{post.title}</h1>

                {/* Meta */}
                <div className="gc-art-meta">
                  {post.author?.photo?.asset ? (
                    <img src={urlFor(post.author.photo).width(80).height(80).fit('crop').url()} alt={post.author.name} className="gc-art-avatar" />
                  ) : (
                    <div className="gc-art-avatar-fb">{post.author?.name?.[0] ?? 'G'}</div>
                  )}
                  <div>
                    <p className="gc-art-meta-author-name">{post.author?.name ?? 'Gartner Callaway'}</p>
                    <p className="gc-art-meta-author-role">{post.author?.role ?? 'Editorial Team'}</p>
                  </div>

                  <div className="gc-art-meta-divider" />
                  <p className="gc-art-meta-txt">{formatDate(post.publishedAt)}</p>

                  {post.readTime && (
                    <>
                      <div className="gc-art-meta-divider" />
                      <p className="gc-art-meta-txt">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                        </svg>
                        {post.readTime} min read
                      </p>
                    </>
                  )}

                  <button className={`gc-art-share-btn ${copied ? 'copied' : ''}`} onClick={handleShare}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      {copied
                        ? <path d="M20 6L9 17l-5-5" />
                        : <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
                      }
                    </svg>
                    {copied ? 'Link Copied' : 'Share'}
                  </button>
                </div>
              </div>
            </div>

            {/* ── Body ── */}
            <div className="gc-art-body-wrap">
              <div className="gc-art-body-inner">

                {/* Excerpt */}
                {post.excerpt && (
                  <p className="gc-art-excerpt">{post.excerpt}</p>
                )}

                {/* Portable Text */}
                {post.body
                  ? <PortableText value={post.body} components={ptComponents} />
                  : <p className="gc-art-p" style={{ color: '#000', fontStyle: 'italic' }}>No content available.</p>
                }

                <div className="gc-art-divider" />

                {/* Author */}
                {post.author && (
                  <div className="gc-art-author">
                    {post.author.photo?.asset ? (
                      <img src={urlFor(post.author.photo).width(80).height(80).fit('crop').url()} alt={post.author.name} className="gc-art-author-avatar" />
                    ) : (
                      <div className="gc-art-author-avatar-fb">{post.author.name?.[0] ?? 'G'}</div>
                    )}
                    <div>
                      <p className="gc-art-author-name">{post.author.name}</p>
                      <p className="gc-art-author-role">{post.author.role}</p>
                      <p className="gc-art-author-org">Gartner Callaway Editorial</p>
                    </div>
                  </div>
                )}

                {/* Share CTA */}
                <div className="gc-art-share-wrap">
                  <p className="gc-art-share-label">Found this valuable?</p>
                  <p className="gc-art-share-sub">Share this article with your network.</p>
                  <button className={`gc-art-share-bottom-btn ${copied ? 'copied' : ''}`} onClick={handleShare}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      {copied ? <path d="M20 6L9 17l-5-5" /> : <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />}
                    </svg>
                    {copied ? 'Link Copied!' : 'Copy Article Link'}
                  </button>
                </div>

                {/* Back */}
                <div style={{ marginTop: 48, display: 'flex', justifyContent: 'center' }}>
                  <Link to="/insights" className="gc-art-back-cta">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back to All Articles
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

/* ─── Reading Progress Bar ───────────────────────────────── */
function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    function onScroll() {
      const el  = document.documentElement;
      const top = el.scrollTop || document.body.scrollTop;
      const h   = el.scrollHeight - el.clientHeight;
      setProgress(h > 0 ? (top / h) * 100 : 0);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="gc-art-progress">
      <div className="gc-art-progress-fill" style={{ width: `${progress}%` }} />
    </div>
  );
}