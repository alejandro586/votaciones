// src/pages/admin/login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import adminsDB from "./adminsDB";  // ← IMPORTA

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const admin = adminsDB[email];

    if (!admin) {
      setError("Email no registrado como administrador");
      setLoading(false);
      return;
    }

    if (admin.password !== password) {
      setError("Contraseña incorrecta");
      setLoading(false);
      return;
    }

    // === GUARDAR DISTRITO Y ROL ===
    localStorage.setItem("isAdmin", "true");
    localStorage.setItem("adminRol", admin.rol);
    localStorage.setItem("adminNombre", admin.nombre);
    localStorage.setItem("adminDistrito", admin.distrito); // ← DISTRITO

    setTimeout(() => {
      if (admin.rol === "superadmin") {
        navigate("/admin/panel");
      } else {
        navigate("/admin/normal"); // ← MISMO PANEL, FILTRA POR DISTRITO
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-center">
        <h1 className="text-3xl font-montserrat font-black text-red-600 mb-2">Panel Admin</h1>
        <p className="text-lg text-gray-600 mb-8">Acceso por distrito</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@distrito.com"
            className="w-full p-3 border-2 border-gray-300 rounded-xl text-center focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200 transition-all"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="w-full p-3 border-2 border-gray-300 rounded-xl text-center focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200 transition-all"
            required
          />

          {error && <p className="text-red-500 font-medium bg-red-50 p-2 roundedXl">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 text-white bg-red-600 rounded-xl font-montserrat font-bold text-lg hover:bg-red-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-75"
          >
            {loading ? "Verificando..." : "Ingresar"}
          </button>
        </form>

        <div className="mt-6 text-xs text-gray-500 space-y-1">
          <p><strong>Super Admin:</strong> admin@central.com / super2025</p>
          <p><strong>Miraflores:</strong> admin@miraflores.com / mira2025</p>
          <p><strong>San Isidro:</strong> admin@sanisidro.com / sani2025</p>
        </div>
      </div>
    </div>
  );
}