// src/pages/admin/panel_de_superadmin.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

export default function PanelDeSuperAdmin() {
  const [loadingData, setLoadingData] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [training, setTraining] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState({});
  const navigate = useNavigate();

  // === CARGAR TODOS LOS VOTOS POR TIPO Y DISTRITO ===
  const loadVotesByTypeAndDistrict = () => {
    const keys = Object.keys(localStorage).filter(k => 
      k.includes("presidentes_voted_") || 
      k.includes("mesa_voted_") || 
      k.includes("alcaldes_voted_")
    );

    const porTipo = { Presidente: {}, "Mesa Directiva": {}, Alcaldes: {} };
    const totales = { validos: 0, nulos: 0, invalidos: 0 };

    keys.forEach(key => {
      const voto = JSON.parse(localStorage.getItem(key) || "{}");
      if (!voto.distrito) return;

      const tipo = key.includes("presidentes") ? "Presidente" :
                   key.includes("mesa") ? "Mesa Directiva" : "Alcaldes";

      const distrito = voto.distrito;

      if (!porTipo[tipo][distrito]) {
        porTipo[tipo][distrito] = { validos: 0, nulos: 0, invalidos: 0, candidatos: {} };
      }

      const esNulo = voto.voto === null || voto.voto === "";
      const esInvalido = voto.voto === "invalido";

      if (esNulo) {
        porTipo[tipo][distrito].nulos++;
        totales.nulos++;
      } else if (esInvalido) {
        porTipo[tipo][distrito].invalidos++;
        totales.invalidos++;
      } else {
        porTipo[tipo][distrito].validos++;
        totales.validos++;
        const candidato = voto.voto;
        porTipo[tipo][distrito].candidatos[candidato] = 
          (porTipo[tipo][distrito].candidatos[candidato] || 0) + 1;
      }
    });

    setResults({ porTipo, totales });
  };

  useEffect(() => {
    loadVotesByTypeAndDistrict();
  }, []);

  const { porTipo = {}, totales = {} } = results;

  const simulateDataLoad = () => {
    setLoadingData(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoadingData(false);
          loadVotesByTypeAndDistrict();
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const simulateTraining = () => {
    setTraining(true);
    setProgress(0);
    let i = 0;
    const steps = ["Inicializando...", "Cargando datos...", "Entrenando...", "¡Listo!"];
    const interval = setInterval(() => {
      if (i >= steps.length) {
        clearInterval(interval);
        setTraining(false);
        setProgress(100);
      } else {
        setProgress((i / steps.length) * 100);
        i++;
      }
    }, 800);
  };

  const resetAllVotes = () => {
    Object.keys(localStorage).forEach(key => {
      if (key.includes("_voted_")) localStorage.removeItem(key);
    });
    setDeleting(false);
    loadVotesByTypeAndDistrict();
  };

  const logout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("adminRol");
    navigate("/");
  };

  const COLORS = ['#3b82f6', '#22c55e', '#ef4444', '#f59e0b', '#8b5cf6'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white p-8 rounded-3xl shadow-2xl border-4 border-red-600 mb-8">
          <h1 className="text-4xl font-montserrat font-black text-red-600 text-center mb-2">
            Panel de Super Admin
          </h1>
          <p className="text-center text-gray-600">Control total del sistema electoral</p>
        </div>

        {/* RESUMEN NACIONAL */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl shadow-xl border-2 border-indigo-200 mb-8">
          <h2 className="text-2xl font-montserrat font-black text-indigo-700 mb-4">Resumen Nacional</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-3xl font-bold text-green-600">{totales.validos}</p>
              <p className="text-sm text-gray-600">Votos Válidos</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-3xl font-bold text-yellow-600">{totales.nulos}</p>
              <p className="text-sm text-gray-600">Votos Nulos</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow">
              <p className="text-3xl font-bold text-red-600">{totales.invalidos}</p>
              <p className="text-sm text-gray-600">Votos Inválidos</p>
            </div>
          </div>
        </div>

        {/* POR TIPO Y DISTRITO */}
        {Object.entries(porTipo).map(([tipo, distritos]) => (
          <div key={tipo} className="bg-white p-6 rounded-2xl shadow-xl border-2 border-blue-100 mb-8">
            <h3 className="text-xl font-montserrat font-bold text-blue-600 mb-4">{tipo} - Por Distrito</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(distritos).map(([distrito, stats]) => (
                <div key={distrito} className="bg-gray-50 p-4 rounded-xl border">
                  <h4 className="font-bold text-lg">{distrito}</h4>
                  <div className="text-sm space-y-1 mt-2">
                    <p><strong className="text-green-600">{stats.validos}</strong> válidos</p>
                    <p><strong className="text-yellow-600">{stats.nulos}</strong> nulos</p>
                    <p><strong className="text-red-600">{stats.invalidos}</strong> inválidos</p>
                  </div>
                  {Object.entries(stats.candidatos || {}).length > 0 && (
                    <div className="mt-3 text-xs">
                      <p className="font-semibold">Candidatos:</p>
                      {Object.entries(stats.candidatos).map(([c, v]) => (
                        <p key={c}>• {c}: <strong>{v}</strong></p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* SIMULACIONES */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-blue-100">
            <h3 className="text-xl font-montserrat font-bold text-blue-600 mb-4">Carga de Datos</h3>
            <button onClick={simulateDataLoad} disabled={loadingData} className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50">
              {loadingData ? "Cargando..." : "Simular Carga"}
            </button>
            {loadingData && (
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div className="bg-blue-600 h-4 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">{progress}%</p>
              </div>
            )}
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-purple-100">
            <h3 className="text-xl font-montserrat font-bold text-purple-600 mb-4">Entrenamiento</h3>
            <button onClick={simulateTraining} disabled={training} className="px-6 py-2 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 disabled:opacity-50">
              {training ? "Entrenando..." : "Iniciar"}
            </button>
            {training && (
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div className="bg-purple-600 h-4 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">{Math.round(progress)}%</p>
              </div>
            )}
          </div>
        </div>

        {/* ELIMINACIÓN */}
        <div className="bg-red-50 p-6 rounded-2xl shadow-xl border-2 border-red-300 mb-8">
          <h3 className="text-xl font-montserrat font-bold text-red-600 mb-4">Eliminación</h3>
          <button onClick={() => setDeleting(true)} className="px-6 py-2 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700">
            Eliminar Todos los Votos
          </button>
          {deleting && (
            <div className="mt-4">
              <p className="text-red-700 font-bold">¿Seguro? Irreversible.</p>
              <div className="flex gap-2 mt-2">
                <button onClick={resetAllVotes} className="px-4 py-2 bg-red-800 text-white rounded-xl text-sm font-bold hover:bg-red-900">
                  Sí, eliminar
                </button>
                <button onClick={() => setDeleting(false)} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-xl text-sm font-bold hover:bg-gray-400">
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>

        {/* GRÁFICO PRESIDENTE */}
        <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-green-100">
          <h3 className="text-xl font-montserrat font-bold text-green-600 mb-4">Presidente - Votos por Distrito</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={Object.entries(porTipo.Presidente || {}).map(([d, s]) => ({ distrito: d, votos: s.validos }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="distrito" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="votos" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <button onClick={logout} className="mt-8 w-full py-3 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-900 transition-all">
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}