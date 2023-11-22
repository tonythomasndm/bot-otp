const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/stubs',
    createProxyMiddleware({
      target: 'https://fastsms.su',
      changeOrigin: true,
    })
  );
};
