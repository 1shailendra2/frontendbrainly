import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AddContent from "./pages/AddContent";
import SharedView from "./pages/SharedView";
export default function App(){
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />}/>
      <Route path = "/login" element={<Login/>} />
      <Route path = "/signup" element={<Signup/>} />
      <Route path = "/dashboard" element={<Dashboard/>} />
      <Route path = "/add-content" element={<AddContent/>} />
      <Route path = "/shared/:hash" element={<SharedView/>} />
    </Routes>
  )

}