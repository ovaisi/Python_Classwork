export default ({ env }) => ({
  host:   env('HOST', '0.0.0.0'),
  port:   env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    // Ping Next.js revalidation endpoint on content publish/update
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
