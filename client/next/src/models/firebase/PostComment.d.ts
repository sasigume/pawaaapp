export interface PostComment {
  id: string;
  senderUid: string;
  senderName: string;
  body: string;
  postSlug: string;
  createdAt: any;
  photoURL?: string;
}
