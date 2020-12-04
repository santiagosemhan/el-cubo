// const { withPlugins } = require('next-compose-plugins');

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });

// next.js configuration
const nextConfig = {
  env: {
    API_URL: 'https://play-rtvcplay-cms.rtvc.gov.co',
    MEDIA_CONTENT_URL: 'https://rtvcplay-media-content.s3.amazonaws.com',
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // deviceSizes: [320, 375, 420, 768, 1024, 1200, 1600],
    // domains: ['domain.com'],
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
