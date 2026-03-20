export default {
  register({ strapi }) {
    // Register custom middleware after Strapi boots
    strapi.server.use(async (ctx, next) => {
      await next();
    });
  },

  async bootstrap({ strapi }) {
    // Set public read permissions for all content types on first run
    // This avoids having to manually click "Public" role in the admin UI
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (!publicRole) return;

    const contentTypes = [
      'api::blog-post.blog-post',
      'api::case-study.case-study',
      'api::service.service',
      'api::testimonial.testimonial',
    ];

    const actions = ['find', 'findOne'];

    for (const contentType of contentTypes) {
      for (const action of actions) {
        const permissionExists = await strapi
          .query('plugin::users-permissions.permission')
          .findOne({
            where: {
              action:     `${contentType}.${action}`,
              role:       publicRole.id,
            },
          });

        if (!permissionExists) {
          await strapi.query('plugin::users-permissions.permission').create({
            data: {
              action:   `${contentType}.${action}`,
              role:     publicRole.id,
              enabled:  true,
            },
          });
          strapi.log.info(`[bootstrap] Enabled public ${action} for ${contentType}`);
        }
      }
    }
  },
};
