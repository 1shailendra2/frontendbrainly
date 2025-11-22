export interface Content {
  _id: string;
  title: string;
  link?: string;
  type: "text" | "image" | "video";
  tags?: string[];
  userId: string;
  sharedLink?: string;
  createdAt?: string;
}