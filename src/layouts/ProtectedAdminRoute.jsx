// src/layouts/ProtectedAdminRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedAdminRoute() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  return isAdmin ? <Outlet /> : <Navigate to="/" replace />;
}