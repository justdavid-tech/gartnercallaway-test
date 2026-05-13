// src/lib/sanity.js
// ─────────────────────────────────────────────────────────────────────────────
// SETUP INSTRUCTIONS:
//   1. Run:  npm install @sanity/client @sanity/image-url
//   2. Replace YOUR_PROJECT_ID with your actual Sanity project ID
//      (find it at: https://sanity.io/manage → your project → Settings → API)
//   3. Replace YOUR_DATASET if it's not "production"
//   4. Create a .env file in your project root with:
//        VITE_SANITY_PROJECT_ID=your_project_id
//        VITE_SANITY_DATASET=production
// ─────────────────────────────────────────────────────────────────────────────

import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

// ── Client ──────────────────────────────────────────────────────────────────
export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'amn9rvy4',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true,   // `true` for fast cached reads; `false` for real-time
  apiVersion: '2024-01-01',
});

// ── Image URL builder ────────────────────────────────────────────────────────
const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source) {
  return builder.image(source);
}

// ─────────────────────────────────────────────────────────────────────────────
// GROQ QUERIES
// ─────────────────────────────────────────────────────────────────────────────

// Fields reused across queries
const POST_FIELDS = `
  _id,
  title,
  slug,
  excerpt,
  category,
  readTime,
  publishedAt,
  featured,
  coverImage { asset, alt, hotspot },
  author { name, role, photo }
`;

// ── Media Query (Images & Videos) ──────────────────────────────────────────
export const GET_ALL_MEDIA_QUERY = `
  *[_type == "media"] | order(publishedAt desc) {
    _id,
    title,
    type,
    image { asset, alt, hotspot },
    videoUrl,
    category,
    description,
    publishedAt
  }
`;

// ── Homepage preview: latest 3 articles ─────────────────────────────────────
export const LATEST_POSTS_QUERY = `
  *[_type == "post"] | order(publishedAt desc) [0..2] {
    ${POST_FIELDS}
  }
`;

// ── Insights page: all articles (optionally filtered by category) ────────────
export const ALL_POSTS_QUERY = `
  *[_type == "post"] | order(publishedAt desc) {
    ${POST_FIELDS}
  }
`;

// ── Insights page: filter by category ───────────────────────────────────────
export const POSTS_BY_CATEGORY_QUERY = `
  *[_type == "post" && category == $category] | order(publishedAt desc) {
    ${POST_FIELDS}
  }
`;

// ── Single article page: fetch by slug ───────────────────────────────────────
export const POST_BY_SLUG_QUERY = `
  *[_type == "post" && slug.current == $slug][0] {
    ${POST_FIELDS},
    body,
    seo
  }
`;

// ── Featured article for hero spotlight ──────────────────────────────────────
export const FEATURED_POST_QUERY = `
  *[_type == "post" && featured == true] | order(publishedAt desc) [0] {
    ${POST_FIELDS}
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// FETCH HELPERS
// ─────────────────────────────────────────────────────────────────────────────

export async function getLatestPosts() {
  return sanityClient.fetch(LATEST_POSTS_QUERY);
}

export async function getAllPosts() {
  return sanityClient.fetch(ALL_POSTS_QUERY);
}

export async function getPostsByCategory(category) {
  return sanityClient.fetch(POSTS_BY_CATEGORY_QUERY, { category });
}

export async function getPostBySlug(slug) {
  return sanityClient.fetch(POST_BY_SLUG_QUERY, { slug });
}

export async function getFeaturedPost() {
  return sanityClient.fetch(FEATURED_POST_QUERY);
}

export async function getAllMedia() {
  return sanityClient.fetch(GET_ALL_MEDIA_QUERY);
}