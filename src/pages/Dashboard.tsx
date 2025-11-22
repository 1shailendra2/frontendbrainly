import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import ContentCard from "../components/ContentCard";
import { Navbar } from "../components/Navbar";
import type { Content } from "./Types";

export default function Dashboard() {
  const [contents, setContents] = useState<Content[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await api.get("/content");
        setContents(res.data.contents);
      } catch (err: any) {
        console.error("Error fetching content:", err);
        if (err.response?.status === 401) {
          navigate("/login");
        } else {
          setContents([]);
        }
      }
    };
    fetchContent();
  }, [navigate]);
// Add this function INSIDE your Dashboard component, before the return statement:
const handleShare = async (contentId: string) => {
  try {
    const content = contents.find(c => c._id === contentId);
    
    if (content?.sharedLink) {
      // Unshare
      await api.post("/link/share", { contentId, share: false });
      setContents(prev =>
        prev.map(item =>
          item._id === contentId ? { ...item, sharedLink: undefined } : item
        )
      );
      alert("✅ Content unshared!");
    } else {
      // Share
      const res = await api.post("/link/share", { contentId, share: true });
      const shareableLink = `${window.location.origin}/link/${res.data.link.hash}`;
      
      setContents(prev =>
        prev.map(item =>
          item._id === contentId ? { ...item, sharedLink: shareableLink } : item
        )
      );
      
      navigator.clipboard.writeText(shareableLink);
      alert("✅ Share link copied to clipboard!");
    }
  } catch (err) {
    console.error("Error sharing:", err);
    alert("❌ Failed to share content");
  }
};
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
      <Navbar />
      
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Your Content</h2>
          <p className="text-slate-600">Manage your saved links, notes, and media</p>
        </div>

        {contents.length === 0 ? (
          <div className="text-center mt-20 space-y-4">
            <div className="text-6xl">📭</div>
            <p className="text-slate-500 text-lg">No content yet!</p>
            <button
              onClick={() => navigate("/add-content")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-block"
            >
              Add Your First Item
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contents.map((item) => (
              <ContentCard key={item._id} content={item} onShare={handleShare} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}