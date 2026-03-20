export default ({ env }) => ({
  // Slugify plugin — auto-generates URL slugs from titles
  slugify: {
    enabled: true,
    config: {
      contentTypes: {
        'blog-post': {
          field: 'slug',
          references: 'title',
        },
        'case-study': {
          field: 'slug',
          references: 'title',
        },
      },
    },
  },

  // Upload — local disk storage on VPS
  upload: {
    config: {
      provider:       'local',
      providerOptions: {
        sizeLimit: 10 * 1024 * 1024, // 10 MB
      },
      actionOptions: {
        upload:       {},
        uploadStream: {},
        delete:       {},
      },
    },
  },
});
