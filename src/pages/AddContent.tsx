import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { Navbar } from "../components/Navbar";

export default function AddContent() {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [type, setType] = useState<"text" | "image" | "video">("text");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await api.post("/content", {
        title,
        link: link || undefined,
        type,
        tags: tags.split(",").map(tag => tag.trim()).filter(Boolean)
      });
      
      alert("✅ Content added successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Error adding content:", err);
      alert("❌ Failed to add content");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar />
      
      <div className="max-w-2xl mx-auto p-6 mt-10">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6">Add New Content</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Title *</label>
              <input
                type="text"
                placeholder="My awesome article"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Content Type *</label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "text", emoji: "📝", label: "Text/Article" },
                  { value: "image", emoji: "🖼️", label: "Image" },
                  { value: "video", emoji: "🎥", label: "Video" }
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setType(option.value as any)}
                    className={`p-4 rounded-lg border-2 transition ${
                      type === option.value
                        ? "border-blue-500 bg-blue-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="text-3xl mb-2">{option.emoji}</div>
                    <div className="text-sm font-medium">{option.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Link/URL {type !== "text" && "*"}
              </label>
              <input
                type="url"
                placeholder={
                  type === "text" ? "https://article-link.com (optional)" :
                  type === "image" ? "https://image-url.com/image.jpg" :
                  "https://youtube.com/watch?v=..."
                }
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required={type !== "text"}
              />
              <p className="text-xs text-slate-500 mt-1">
                {type === "text" && "Add a reference link (optional)"}
                {type === "image" && "Direct URL to the image file"}
                {type === "video" && "YouTube, Vimeo, or direct video URL"}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tags</label>
              <input
                type="text"
                placeholder="coding, tutorial, javascript (comma separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-700 disabled:opacity-50 font-medium"
              >
                {loading ? "Adding..." : "Add Content"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="px-6 border rounded-lg hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}