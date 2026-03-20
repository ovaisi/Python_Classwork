/**
 * Middleware: revalidate-nextjs
 *
 * After any content publish/update in Strapi, this fires a
 * POST to Next.js /api/revalidate so pages update instantly
 * without a full redeploy (ISR on-demand revalidation).
 */

export default () => {
  return async (ctx, next) => {
    await next();

    // Only trigger on successful write operations
    const isWrite = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(ctx.method);
    const isSuccess = ctx.status >= 200 && ctx.status < 300;

    if (!isWrite || !isSuccess) return;

    const nextjsUrl   = process.env.NEXTJS_URL          || 'http://localhost:3000';
    const revalidateToken = process.env.REVALIDATE_SECRET || '';

    // Map Strapi routes to Next.js paths to revalidate
    const pathMap: Record<string, string[]> = {
      '/api/blog-posts':   ['/blog', '/'],
      '/api/case-studies': ['/case-studies', '/'],
      '/api/services':     ['/services', '/'],
      '/api/testimonials': ['/'],
    };

    const matchedPaths = Object.entries(pathMap).find(([route]) =>
      ctx.url.startsWith(route)
    )?.[1];

    if (!matchedPaths) return;

    // Fire-and-forget revalidation — don't block the Strapi response
    Promise.all(
      matchedPaths.map((path) =>
        fetch(`${nextjsUrl}/api/revalidate`, {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({ path, secret: revalidateToken }),
        }).catch((err) =>
          console.warn(`[revalidate] Failed to ping Next.js for ${path}:`, err.message)
        )
      )
    );
  };
};
