import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios"; // your custom axios instance
import ContentCard from "../components/ContentCard";
import type { Content } from "./Types";

export default function Dashboard() {
  const [contents, setContents] = useState<Content[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await api.get("/content");
        setContents(res.data.contents);
      } catch (err) {
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

  return (
   <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800">🧠 Your Second Brain</h1>
        <button
          onClick={() => navigate("/add-content")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Add Content
        </button>
      </div>

      {contents.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-slate-500 text-lg">No content yet. Add your first item!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contents.map((item) => (
            <ContentCard key={item._id} content={item} />
          ))}
        </div>
      )}
    </div>
  );
}
