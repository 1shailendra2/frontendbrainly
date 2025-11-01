// src/hooks/useContent.ts
import { useEffect, useState } from "react";
import axios from "axios";

export interface ContentItem {
  _id: string;
  title: string;
  description: string;
  sharedLink?: string;
}

export function useContent() {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/content").then(res => {
      setContent(res.data.contents);
      setLoading(false);
    });
  }, []);

  return { content, setContent, loading };
}
