// src/pages/admin/configuracion.jsx
import { useState } from "react";
import { Save, AlertCircle } from "lucide-react";

export default function Configuracion() {
  const [config, setConfig] = useState({
    titulo: "Elecciones 2025",
    fecha: "2025-11-13",
    horaInicio: "08:00",
    horaFin: "17:00",
  });

  const guardar = () => {
    localStorage.setItem("configSistema", JSON.stringify(config));
    alert("Configuración guardada");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Configuración del Sistema</h1>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Título de la Elección</label>
            <input
              type="text"
              value={config.titulo}
              onChange={(e) => setConfig({ ...config, titulo: e.target.value })}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">Fecha</label>
            <input
              type="date"
              value={config.fecha}
              onChange={(e) => setConfig({ ...config, fecha: e.target.value })}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Hora Inicio</label>
              <input
                type="time"
                value={config.horaInicio}
                onChange={(e) => setConfig({ ...config, horaInicio: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Hora Fin</label>
              <input
                type="time"
                value={config.horaFin}
                onChange={(e) => setConfig({ ...config, horaFin: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white"
              />
            </div>
          </div>

          <button
            onClick={guardar}
            className="w-full mt-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-pink-700 flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            Guardar Configuración
          </button>
        </div>
      </div>
    </div>
  );
}