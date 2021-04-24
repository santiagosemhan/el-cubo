// const { withPlugins } = require('next-compose-plugins');

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });

// next.js configuration
const nextConfig = {
  env: {
    API_URL: 'https://play-cms.rtvc.dev',
    MEDIA_CONTENT_URL: 'https://rtvcplay-v2.s3.amazonaws.com',
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    deviceSizes: [320, 375, 420, 768, 1024, 1200, 1600],
    domains: ['rtvcplay-v2.s3.amazonaws.com'],
  },
  crossOrigin: 'anonymous',
  webpack: (config) => {
    config.resolve.modules.push(__dirname);

    config.resolve.alias = {
      ...config.resolve.alias,
    };
    return config;
  },
};

module.exports = nextConfig;
// module.exports = withPlugins([withBundleAnalyzer], nextConfig);