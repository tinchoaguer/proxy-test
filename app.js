const express = require('express');
const morgan = require("morgan");
const cors = require("cors");
const { createProxyMiddleware } = require('http-proxy-middleware');

// Create Express Server
const app = express();

// Configuration
const PORT = process.env.PORT || 3000;
const API_SERVICE_URL = "https://sandbox.plaid.com";

app.use(cors({
  origin: '*' // that will for all like  https / http 
}))

app.use(morgan('dev'));

app.use('/plaid-link', createProxyMiddleware({
   target: API_SERVICE_URL,
   changeOrigin: true,
   pathRewrite: {
       [`^/plaid-link`]: '',
   },
   onProxyRes: function (proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
  }
}));

app.get('/', (req, res) => {
    res.send('Hello from Node.js!')
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

