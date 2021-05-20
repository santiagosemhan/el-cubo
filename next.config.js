// const { withPlugins } = require('next-compose-plugins');

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });

// next.js configuration
const nextConfig = {
  env: {
    API_URL: 'https://cms.rtvcplay.co',
    MEDIA_CONTENT_URL: 'https://rtvcplay-v2.s3.amazonaws.com',
    VIDEO_CONTENT_URL: 'https://streaming.rtvc.gov.co/RTVCPlay-vod/smil:[field_asset_id].smil/playlist.m3u8',
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