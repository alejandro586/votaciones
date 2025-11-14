// src/layouts/AdminLayout.jsx
import { useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { 
  Home, Users, Vote, FileText, Settings, LogOut, ChevronRight
} from 'lucide-react';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/admin/panel" },
    { icon: Users, label: "Electores", path: "/admin/electores" },
    { icon: Vote, label: "Votaciones", path: "/admin/votaciones" },
    { icon: FileText, label: "Reportes", path: "/admin/reportes" },
    { icon: Settings, label: "Configuración", path: "/admin/configuracion" },
  ];

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white flex">
      {/* === SIDEBAR === */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 bg-black/30 backdrop-blur-xl border-r border-white/10 p-4 flex flex-col`}>
        <div className="flex items-center justify-between mb-8">
          <div className={`flex items-center gap-3 ${!sidebarOpen && 'justify-center'}`}>
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center font-bold text-xl">
              V
            </div>
            {sidebarOpen && <span className="text-xl font-bold">VotoDigital</span>}
          </div>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white/60 hover:text-white">
            <ChevronRight className={`w-5 h-5 transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item, i) => (
            <button 
              key={i} 
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                location.pathname === item.path ? 'bg-white/20 border border-white/30' : 'hover:bg-white/10'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <button onClick={logout} className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-red-500/20 text-red-400">
          <LogOut className="w-5 h-5" />
          {sidebarOpen && <span>Salir</span>}
        </button>
      </div>

      {/* === CONTENIDO DINÁMICO === */}
      <div className="flex-1 p-6 overflow-auto">
        <Outlet /> {/* Aquí se renderiza la página actual */}
      </div>
    </div>
  );
}