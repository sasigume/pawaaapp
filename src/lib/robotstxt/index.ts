import fs from "fs"
import { SITE_FULL_URL } from "../constants"

const publishRobotsTxt = async () => {

  const PATH = './public/robots.txt'
  const text = `Sitemap: ${SITE_FULL_URL}/sitemap.xml`
  fs.writeFileSync(PATH, text)
  console.log('Updated robots.txt for production')
}

export default publishRobotsTxt