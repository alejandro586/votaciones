// src/pages/admin/votaciones.jsx
import { useEffect, useState } from "react";

export default function Votaciones() {
  const [datos, setDatos] = useState({ presidentes: {}, mesaRedonda: {}, alcaldes: {} });

  useEffect(() => {
    const raw = localStorage.getItem('votacionesGlobales');
    setDatos(raw ? JSON.parse(raw) : datos);
    const interval = setInterval(() => {
      const raw = localStorage.getItem('votacionesGlobales');
      setDatos(raw ? JSON.parse(raw) : datos);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Detalle de Votaciones</h1>

        <div className="grid md:grid-cols-3 gap-6">
          {/* PRESIDENTES */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            <h3 className="text-xl font-bold text-purple-400 mb-4">Presidente</h3>
            {Object.entries(datos.presidentes).map(([c, v]) => (
              <div key={c} className="flex justify-between text-sm mb-2">
                <span>{c}</span>
                <span className="font-bold text-purple-300">{v} votos</span>
              </div>
            ))}
          </div>

          {/* MESA */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            <h3 className="text-xl font-bold text-green-400 mb-4">Mesa Directiva</h3>
            {Object.entries(datos.mesaRedonda).map(([c, v]) => (
              <div key={c} className="flex justify-between text-sm mb-2">
                <span>{c}</span>
                <span className="font-bold text-green-300">{v} votos</span>
              </div>
            ))}
          </div>

          {/* ALCALDES */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
            <h3 className="text-xl font-bold text-pink-400 mb-4">Alcaldes</h3>
            {Object.entries(datos.alcaldes).map(([dist, cands]) => (
              <div key={dist} className="mb-3">
                <p className="font-semibold text-pink-300">{dist}</p>
                {Object.entries(cands).map(([c, v]) => (
                  <div key={c} className="flex justify-between text-xs ml-2">
                    <span>{c}</span>
                    <span>{v}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}