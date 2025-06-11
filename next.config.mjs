/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.ibb.co'], // Allow images from i.ibb.co
    unoptimized: true, // This helps with static exports if needed
  },
  typescript: {
    ignoreBuildErrors: false, // Keep type checking during build
  },
  eslint: {
    ignoreDuringBuilds: false, // Keep linting during build
  },
  env: {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL || 'https://basedrop-nft.vercel.app',
  },
  // Silence warnings
  // https://github.com/WalletConnect/walletconnect-monorepo/issues/1908
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
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
