// src/pages/admin/panel_de_admin.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

export default function PanelDeAdmin() {
  const [loadingData, setLoadingData] = useState(false);
  const [training, setTraining] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState({ porTipo: {}, totales: {} });
  const navigate = useNavigate();

  // === DATOS DEL ADMIN ===
  const adminDistrito = localStorage.getItem("adminDistrito") || "Desconocido";
  const adminNombre = localStorage.getItem("adminNombre") || "Administrador";

  // === CARGAR VOTOS DEL DISTRITO ===
  const loadDistrictVotes = () => {
    setLoadingData(true);
    const keys = Object.keys(localStorage).filter(k =>
      k.includes("presidentes_voted_") ||
      k.includes("mesa_voted_") ||
      k.includes("alcaldes_voted_")
    );

    const porTipo = { Presidente: {}, "Mesa Directiva": {}, Alcaldes: {} };
    const totales = { validos: 0, nulos: 0, invalidos: 0 };

    keys.forEach(key => {
      const voto = JSON.parse(localStorage.getItem(key) || "{}");
      if (voto.distrito !== adminDistrito) return;

      const tipo = key.includes("presidentes") ? "Presidente" :
                   key.includes("mesa") ? "Mesa Directiva" : "Alcaldes";

      if (!porTipo[tipo][adminDistrito]) {
        porTipo[tipo][adminDistrito] = { validos: 0, nulos: 0, invalidos: 0, candidatos: {} };
      }

      const esNulo = !voto.voto;
      const esInvalido = voto.voto === "invalido";

      if (esNulo) {
        porTipo[tipo][adminDistrito].nulos++;
        totales.nulos++;
      } else if (esInvalido) {
        porTipo[tipo][adminDistrito].invalidos++;
        totales.invalidos++;
      } else {
        porTipo[tipo][adminDistrito].validos++;
        totales.validos++;
        porTipo[tipo][adminDistrito].candidatos[voto.voto] =
          (porTipo[tipo][adminDistrito].candidatos[voto.voto] || 0) + 1;
      }
    });

    setResults({ porTipo, totales });
    setLoadingData(false);
  };

  useEffect(() => {
    loadDistrictVotes();
    const interval = setInterval(loadDistrictVotes, 5000); // Auto-refresh
    return () => clearInterval(interval);
  }, []);

  // === ENTRENAMIENTO SIMULADO ===
  const startTraining = () => {
    setTraining(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTraining(false);
          return 100;
        }
        return p + 10;
      });
    }, 300);
  };

  // === LOGOUT ===
  const logout = () => {
    localStorage.removeItem("adminDistrito");
    localStorage.removeItem("adminNombre");
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b'];
  const porTipo = results.porTipo[adminDistrito] || {};
  const totales = results.totales;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-indigo-800 mb-2">
          Panel de Admin - {adminDistrito}
        </h1>
        <p className="text-gray-600">Bienvenido, <strong>{adminNombre}</strong></p>
      </div>

      {/* ACCIONES */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="font-bold text-lg mb-3">Actualizar Datos</h3>
          <button
            onClick={loadDistrictVotes}
            disabled={loadingData}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50"
          >
            {loadingData ? "Cargando..." : "Refrescar"}
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="font-bold text-lg mb-3">Entrenamiento IA</h3>
          <button
            onClick={startTraining}
            disabled={training}
            className="w-full py-3 bg-amber-600 text-white rounded-xl font-bold hover:bg-amber-700 disabled:opacity-50"
          >
            {training ? "Entrenando..." : "Iniciar"}
          </button>
          {training && (
            <div className="mt-4">
              <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-amber-600 h-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-center mt-2 text-sm font-medium">{progress}%</p>
            </div>
          )}
        </div>
      </div>

      {/* GRÁFICOS */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 mb-8">
        {/* BARRAS */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="font-bold text-xl mb-4 text-indigo-700">Votos Válidos por Tipo</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
              { name: "Presidente", votos: porTipo.validos || 0 },
              { name: "Mesa", votos: porTipo["Mesa Directiva"]?.validos || 0 },
              { name: "Alcalde", votos: porTipo.Alcaldes?.validos || 0 }
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="votos" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* DONA */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="font-bold text-xl mb-4 text-green-700">Calidad de Votos</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: "Válidos", value: totales.validos },
                  { name: "Nulos", value: totales.nulos },
                  { name: "Inválidos", value: totales.invalidos }
                ].filter(d => d.value > 0)}
                cx="50%" cy="50%" outerRadius={100} dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {[0, 1, 2].map(i => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* LOGOUT */}
      <div className="max-w-6xl mx-auto text-center">
        <button
          onClick={logout}
          className="px-8 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}