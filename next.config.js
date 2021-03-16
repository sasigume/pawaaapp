const path = require('path')
module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.node = {
        fs: 'empty'
      };
    }
    return config;
  },
  env: {
    STORYBLOK_PREVIEW_TOKEN: process.env.STORYBLOK_PREVIEW_TOKEN,
    STORYBLOK_PUBLIC_TOKEN: process.env.STORYBLOK_PUBLIC_TOKEN,
    STORYBLOK_PREVIEW_SECRET: process.env.STORYBLOK_PREVIEW_SECRET,
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
    CONTENTFUL_PREVIEW_ACCESS_TOKEN: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
    CONTENTFUL_PREVIEW_SECRET: process.env.CONTENTFUL_PREVIEW_SECRET,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSEGING_SENDER_ID: process.env.FIREBASE_MESSEGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    PART_OF_GCP_CREDENTIAL: process.env.PART_OF_GCP_CREDENTIAL,
    HTTPS_URL: process.env.HTTPS_URL,
    TWITTER_SECRET: process.env.TWITTER_SECRET,
    TWITTER_BEARER: process.env.TWITTER_BEARER,
    API_URL: process.env.API_URL,
    REVALIDATE: process.env.REVALIDATE,
    GOOGLE_AD_CLIENT: process.env.GOOGLE_AD_CLIENT,
    ENABLE_AD: process.env.ENABLE_AD,
    PAGINATION: process.env.PAGINATION,
    TOTAL_PAGINATION: process.env.TOTAL_PAGINATION,
    ADSENSE_AUTH_ID: process.env.ADSENSE_AUTH_ID
  },
  images: {
    domains: ['localhost', 'pbs.twimg.com', 'images.ctfassets.net']
  }
}