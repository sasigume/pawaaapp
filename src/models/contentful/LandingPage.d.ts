import {LandingPagePost} from './LandingPagePost'

interface Screenshot {
  url: string
}

export interface LandingPage {
  title: string
  slug: string
  description: string
  topImage: Screenshot
  message: string
  md: string
  postsCollection? : LandingPagePost[]
  screenshotsCollection?: Screenshot[]
}