const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://seungho-na-osamhack2021-web-app-with-military-gj95p6xg3qr-5000.githubpreview.dev:5000',
      changeOrigin: true,
    })
  );
};