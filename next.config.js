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

  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  
  env: {
    STORYBLOK_PREVIEW_TOKEN: process.env.STORYBLOK_PREVIEW_TOKEN,
    STORYBLOK_PUBLIC_TOKEN: process.env.STORYBLOK_PUBLIC_TOKEN,
    STORYBLOK_PREVIEW_SECRET: process.env.STORYBLOK_PREVIEW_SECRET,
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSEGING_SENDER_ID: process.env.FIREBASE_MESSEGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    PART_OF_GCP_CREDENTIAL: process.env.PART_OF_GCP_CREDENTIAL,
    HTTPS_URL: process.env.HTTPS_URL
  },
  images: {
    domains: ['localhost','pbs.twimg.com']
  }
}