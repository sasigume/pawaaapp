export interface Creator {
  slug: string
  published_at?: string
  content:{
    displayName: string
    picture: {
      filename: string
    }
    description:string
  }
}