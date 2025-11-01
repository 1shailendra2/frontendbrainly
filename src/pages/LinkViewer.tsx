import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // or useRouter for Next.js
import api from "../api/axios";
import { AnimatedWrapper } from "../components/AnimatedWrapper";
import { Navbar } from "../components/Navbar";
import type { Content } from "./Types"; // adjust path if needed

export default function LinkViewer() {
  const { hash } = useParams(); // or useRouter().query.hash in Next.js
  const [content, setContent] = useState<Content | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!hash) return;

    api.get(`/link/${hash}`)
      .then(res => setContent(res.data.content))
      .catch(err => {
        console.error(err);
        setError("Content not found or link is invalid.");
      });
  }, [hash]);

  return (
    <>
      <Navbar />
      <AnimatedWrapper>
        <div className="max-w-2xl mx-auto mt-10 space-y-6">
          {error ? (
            <p className="text-destructive text-center">{error}</p>
          ) : content ? (
            <>
              <h1 className="text-2xl font-bold">{content.title}</h1>
              {content.type && (
                <p className="text-sm text-muted-foreground italic">Type: {content.type}</p>
              )}
              {content.link && (
                <a
                  href={content.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm"
                >
                  Open linked content
                </a>
              )}
              {Array.isArray(content.tags) && content.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {content.tags.map(tag => (
                    <span key={tag} className="bg-accent px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </>
          ) : (
            <p className="text-muted-foreground text-center">Loading content...</p>
          )}
        </div>
      </AnimatedWrapper>
    </>
  );
}
