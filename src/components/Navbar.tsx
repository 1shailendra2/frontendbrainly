import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../context/useAuthStore";
import { Home, Plus, LogOut } from "lucide-react";

export function Navbar() {
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🧠</span>
            <h1 className="text-xl font-bold text-slate-800">Second Brain</h1>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-slate-100"
            >
              <Home size={20} />
              <span>Home</span>
            </button>

            <button
              onClick={() => navigate("/add-content")}
              className="flex items-center space-x-1 px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              <Plus size={20} />
              <span>Add Content</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-red-50 text-red-600"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}