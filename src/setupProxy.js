/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.REACT_APP_PROXY_API_URL,
      pathRewrite: {
        '^/api': '', // remove the '/api' prefix from the path
      },
      changeOrigin: true,
      onProxyReq: function (proxyReq, req, res) {
        const targetUrl = proxyReq.getHeader('host') + proxyReq.path;
        console.log(
          `[onProxyReq] Intercepted request to ${req.originalUrl}. Forwarded to ${targetUrl}.`
        );
      },
      onError: (err, req, res) => {
        console.error(
          `[onError] Intercepted request to ${req.originalUrl}`,
          err
        );
      },
    })
  );
};
