//const path = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
module.exports = withBundleAnalyzer({
  // add slash for Twitter card
  trailingSlash: true,
  /*webpack: (config, { isServer }) => {
    if (!isServer) {
      config.node = {
        fs: 'empty',
      };
    }
    return config;
  },*/
  env: {
    CONTENTFUL_PREVIEW_SECRET: process.env.CONTENTFUL_PREVIEW_SECRET,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSEGING_SENDER_ID: process.env.FIREBASE_MESSEGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    HTTPS_URL: process.env.HTTPS_URL,
    TWITTER_SECRET: process.env.TWITTER_SECRET,
    TWITTER_BEARER: process.env.TWITTER_BEARER,
    API_URL: process.env.API_URL,
    REVALIDATE_HOME: process.env.REVALIDATE_HOME,
    REVALIDATE_SINGLE: process.env.REVALIDATE_SINGLE,
    REVALIDATE_ARCHIVE: process.env.REVALIDATE_ARCHIVE,
    REVALIDATE_RSSSITEMAP: process.env.REVALIDATE_RSSSITEMAP,
    GOOGLE_AD_CLIENT: process.env.GOOGLE_AD_CLIENT,
    ENABLE_AD: process.env.ENABLE_AD,
    PAGINATION: process.env.PAGINATION,
    TOTAL_PAGINATION: process.env.TOTAL_PAGINATION,
    ADSENSE_AUTH_ID: process.env.ADSENSE_AUTH_ID,
    GTM_ID: process.env.GTM_ID,
    VERCEL_GIT_REPO_OWNER: process.env.VERCEL_GIT_REPO_OWNER,
    VERCEL_GIT_REPO_SLUG: process.env.VERCEL_GIT_REPO_SLUG,
    VERCEL_GIT_COMMIT_SHA: process.env.VERCEL_GIT_COMMIT_SHA,
    VERCEL_GIT_COMMIT_MESSAGE: process.env.VERCEL_GIT_COMMIT_MESSAGE,
    VERCEL_URL: process.env.VERCEL_URL,
    NAPOANCOM_NEST_URL: process.env.NAPOANCOM_NEST_URL,
    NAPOANCOM_NEST_URL_STATING: process.env.NAPOANCOM_NEST_URL_STATING,
    NAPOANCOM_NEST_SECRET: process.env.NAPOANCOM_NEST_SECRET,
    NAPOANCOM_NEST_LIMIT: process.env.NAPOANCOM_NEST_LIMIT,
    FUNCTION_AUTH: process.env.FUNCTION_AUTH,
    AD_DELAY: process.env.AD_DELAY,
  },
  images: {
    domains: ['localhost', 'static.wikia.nocookie.net', 'pbs.twimg.com', 'images.ctfassets.net'],
  },
  future: {
    webpack5: true,
  },
});
