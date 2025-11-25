import api from "./axios";

export async function shareContent(contentId: string) {
  const res = await api.post("/link/share", { contentId, share: true });
  return res.data.link;
}

export async function unshareContent(contentId: string) {
  const res = await api.post("/link/share", { contentId, share: false });
  return res.data;
}
