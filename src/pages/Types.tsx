export type Content = {
  _id: string;
  title: string;
  type?: "text" | "image" | "video";
  link?: string;
  tags?: string[];
};
