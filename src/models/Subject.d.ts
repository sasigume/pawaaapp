export interface Subject {
  slug: string;
  uuid: string;
  content: {
    displayName: string;
    picture: {
      filename: string;
    }
    desctiption: string;
  }
}