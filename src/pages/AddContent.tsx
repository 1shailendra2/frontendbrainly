import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";

export default function AddContent() {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [type, setType] = useState<"text" | "image" | "video">("text");
  const [tags, setTags] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await api.post("/content", {
        title,
        link,
        type,
        tags: tags.split(",").map(tag => tag.trim()).filter(Boolean)
      });
      
      alert("Content added successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Error adding content:", err);
      alert("Failed to add content");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-xl mx-auto mt-10 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Add New Content</h1>
          <button
            onClick={() => navigate("/dashboard")}
            className="text-slate-600 hover:text-slate-800"
          >
            ← Back
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <Input
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Link (optional)</label>
            <Input
              placeholder="https://..."
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="w-full border rounded p-2"
            >
              <option value="text">Text</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
            <Input
              placeholder="coding, productivity, notes"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full">
            Add Content
          </Button>
        </form>
      </div>
    </div>
  );
}