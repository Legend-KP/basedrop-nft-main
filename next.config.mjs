/** @type {import('next').NextConfig} */
const nextConfig = {
  // Silence warnings
  // https://github.com/WalletConnect/walletconnect-monorepo/issues/1908
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  images: {
    domains: [],
    unoptimized: true
  },
  async rewrites() {
    return [
      {
        source: '/token/:path*',
        destination: '/api/metadata'
      }
    ];
  },
  experimental: {
    esmExternals: "loose"
  }
};

export default nextConfig;
