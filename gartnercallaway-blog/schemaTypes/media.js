export default {
  name: 'media',
  title: 'Media Gallery',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'type',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      hidden: ({ document }) => document?.type !== 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }
      ]
    },
    {
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube or Vimeo URL',
      hidden: ({ document }) => document?.type !== 'video',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Hydroponics', value: 'Hydroponics' },
          { title: 'Sustainability', value: 'Sustainability' },
          { title: 'Partnership', value: 'Partnership' },
          { title: 'Community', value: 'Community' },
        ],
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      type: 'type',
    },
    prepare({ title, media, type }) {
      return {
        title,
        subtitle: type.toUpperCase(),
        media: media,
      };
    },
  },
};
