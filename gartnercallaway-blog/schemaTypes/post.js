// sanity/schemas/post.js
// This is your Article/Insight schema for Sanity Studio.
// Every field here becomes a form input in your Sanity dashboard.

export default {
  name: 'post',
  title: 'Insights & Articles',
  type: 'document',
  

  fields: [
    // ── TITLE ──────────────────────────────────────────
    {
      name: 'title',
      title: 'Article Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(10).max(100),
    },

    // ── SLUG (auto-generated from title) ───────────────
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      description: 'Auto-generated from title. This becomes the page URL e.g. /insights/your-article-title',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },

    // ── COVER IMAGE ────────────────────────────────────
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true, // allows focal point selection
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for accessibility and SEO',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    },

    // ── CATEGORY / TAG ─────────────────────────────────
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
      { title: 'Regenerative Farming', value: 'regenerative-farming' },
      { title: 'Precision Agriculture', value: 'precision-agriculture' },
      { title: 'Farm Design & Build', value: 'farm-design-build' },
      { title: 'Sustainability', value: 'sustainability' },
      { title: 'Agricultural Innovation', value: 'agricultural-innovation' },
],
      },
      validation: (Rule) => Rule.required(),
    },

    // ── EXCERPT / SUMMARY ──────────────────────────────
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'A short summary shown on article cards and search results (max 200 characters)',
      validation: (Rule) => Rule.required().max(400),
    },

    // ── AUTHOR ─────────────────────────────────────────
    {
      name: 'author',
      title: 'Author',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Full Name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'role',
          title: 'Job Title / Role',
          type: 'string',
        },
        {
          name: 'photo',
          title: 'Author Photo',
          type: 'image',
          options: { hotspot: true },
        },
      ],
    },

    // ── ESTIMATED READ TIME ────────────────────────────
    {
      name: 'readTime',
      title: 'Estimated Read Time (minutes)',
      type: 'number',
      description: 'How many minutes does it take to read this article?',
      validation: (Rule) => Rule.required().min(1).max(60),
    },

    // ── PUBLISHED DATE ─────────────────────────────────
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    },

    // ── FEATURED FLAG ──────────────────────────────────
    {
      name: 'featured',
      title: 'Feature this article?',
      type: 'boolean',
      description: 'Featured articles appear larger on the homepage insights section',
      initialValue: false,
    },

    // ── RICH TEXT BODY (Portable Text) ─────────────────
    {
      name: 'body',
      title: 'Article Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Heading 4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Underline', value: 'underline' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  { name: 'href', type: 'url', title: 'URL' },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Open in new tab',
                    initialValue: true,
                  },
                ],
              },
            ],
          },
        },
        // Inline images inside the article body
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alt Text' },
            { name: 'caption', type: 'string', title: 'Caption' },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    },

    // ── SEO ────────────────────────────────────────────
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      options: { collapsible: true, collapsed: true },
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Defaults to article title if left blank',
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 2,
          description: 'Defaults to excerpt if left blank',
        },
      ],
    },
  ],

  // ── Preview in Sanity Studio list ─────────────────────
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'coverImage',
      category: 'category',
    },
    prepare({ title, author, media, category }) {
      return {
        title,
        subtitle: `${category ?? 'Uncategorised'} · By ${author ?? 'Unknown'}`,
        media,
      };
    },
  },

  // ── Ordering in Studio ────────────────────────────────
  orderings: [
    {
      title: 'Newest First',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Oldest First',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
  ],
};