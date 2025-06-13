/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    
    // Handle worker files
    config.module.rules.push({
      test: /HeartbeatWorker\.js$/,
      type: 'javascript/auto',
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    });

    return config;
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.farcaster.xyz https://*.walletconnect.com https://*.walletconnect.org https://*.coinbase.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https: blob:",
              "connect-src 'self' https: wss:",
              "frame-src 'self' https://*.farcaster.xyz https://*.walletconnect.com https://*.walletconnect.org https://*.coinbase.com",
              "font-src 'self'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "block-all-mixed-content",
              "upgrade-insecure-requests"
            ].join('; ')
          }
        ]
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: '/token/:path*',
        destination: '/api/metadata'
      }
    ];
  }
};

export default nextConfig; 