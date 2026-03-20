/**
 * PM2 Ecosystem File
 *
 * Manages both Next.js and Strapi as persistent processes on the VPS.
 *
 * Commands:
 *   pm2 start ecosystem.config.js          # Start both apps
 *   pm2 stop all                           # Stop all
 *   pm2 restart all                        # Restart all
 *   pm2 logs                               # Stream all logs
 *   pm2 logs nextjs                        # Stream Next.js logs only
 *   pm2 logs strapi                        # Stream Strapi logs only
 *   pm2 monit                              # Live dashboard (CPU/memory)
 *   pm2 save                               # Save process list
 *   pm2 startup                            # Auto-start on VPS reboot
 */

module.exports = {
  apps: [
    // ── Next.js Frontend ───────────────────────────────────────────────────
    {
      name:         'nextjs',
      cwd:          '/var/www/powerbi/nextjs',
      script:       'node_modules/.bin/next',
      args:         'start',
      instances:    2,               // 2 workers for 4-core VPS
      exec_mode:    'cluster',       // Load-balance between workers
      max_memory_restart: '1G',      // Restart if RAM exceeds 1GB per worker

      env: {
        NODE_ENV:           'production',
        PORT:               3000,
        STRAPI_URL:         'http://localhost:1337',
        // Load remaining vars from /var/www/powerbi/nextjs/.env.local
      },

      // Logs
      out_file:   '/var/log/pm2/nextjs-out.log',
      error_file: '/var/log/pm2/nextjs-err.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',

      // Auto-restart on crash with exponential backoff
      autorestart:    true,
      restart_delay:  5000,
      max_restarts:   10,
      min_uptime:     '10s',

      // Zero-downtime reload
      wait_ready:     true,
      listen_timeout: 10000,
      kill_timeout:   5000,
    },

    // ── Strapi CMS ─────────────────────────────────────────────────────────
    {
      name:         'strapi',
      cwd:          '/var/www/powerbi/strapi',
      script:       'node_modules/.bin/strapi',
      args:         'start',
      instances:    1,               // Strapi is single-instance (not cluster-safe)
      exec_mode:    'fork',
      max_memory_restart: '1500M',   // Strapi uses more RAM than Next.js

      env: {
        NODE_ENV:           'production',
        // Load remaining vars from /var/www/powerbi/strapi/.env
      },

      // Logs
      out_file:   '/var/log/pm2/strapi-out.log',
      error_file: '/var/log/pm2/strapi-err.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',

      autorestart:    true,
      restart_delay:  10000,         // Strapi takes longer to boot
      max_restarts:   5,
      min_uptime:     '30s',
    },
  ],
};
