import fs from "fs"

const publishAdsTxt = async () => {

  const PATH = './public/ads.txt'
  const PATH_DEVELOPINNG = './public/ignore/ads.txt'
  const text = `google.com, ${process.env.GOOGLE_AD_CLIENT}, DIRECT, ${process.env.ADSENSE_AUTH_ID}`
  if (process.env.NODE_ENV == "production" || process.env.NODE_ENV == "test") {
    fs.writeFileSync(PATH, text)
    console.log('Updated ads.txt for production')
  } else {
    fs.writeFileSync(PATH_DEVELOPINNG, text)
    console.log('Updated ads.txt for development')
  }
}

export default publishAdsTxt