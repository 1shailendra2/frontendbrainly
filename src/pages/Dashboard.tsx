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
        navigate("/login"); // fallback if token is invalid
      }
    };
    fetchContent();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-linear-gradient-to-br from-slate-50 to-slate-100 p-6">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">🧠 Your Second Brain</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contents.map((item) => (
          <ContentCard key={item._id} content={item} />
        ))}
      </div>
    </div>
  );
}
