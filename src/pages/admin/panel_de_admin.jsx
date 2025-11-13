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

  // === DATOS DEL ADMIN LOGUEADO ===
  const adminDistrito = localStorage.getItem("adminDistrito") || "Desconocido";
  const adminNombre = localStorage.getItem("adminNombre") || "Administrador";

  // === CARGAR SOLO VOTOS DE SU DISTRITO ===
  const loadDistrictVotes = () => {
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

      const esNulo = voto.voto === null || voto.voto === "";
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
        const candidato = voto.voto;
        porTipo[tipo][adminDistrito].candidatos[candidato] =
          (porTipo[tipo][adminDistrito].candidatos[candidato] || 0) + 1;
      }
    });

    setResults({ porTipo, totales });
  };

  useEffect(() => {
    loadDistrictVotes();
    // eslint-disable-next-line
  }, []);

  const { porTipo = {}, totales = {} } = results;
  const distritoData = porTipo.Presidente?.[adminDistrito] || {};

  // === SIMULACIÓN DE CARGA ===
  const simulateDataLoad = () => {
    setLoadingData(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoadingData(false);
          loadDistrictVotes();
          return 100;
        }
        return prev + 12;
      });
    }, 180);
  };

  // === SIMULACIÓN DE ENTRENAMIENTO ===
  const simulateTraining = () => {
    setTraining(true);
    setProgress(0);
    let i = 0;
    const steps = [
      `Cargando datos de ${adminDistrito}...`,
      "Entrenando modelo local...",
      "Optimizando resultados...",
      "¡Entrenamiento completado!"
    ];
    const interval = setInterval(() => {
      if (i >= steps.length) {
        clearInterval(interval);
        setTraining(false);
        setProgress(100);
      } else {
        setProgress((i / steps.length) * 100);
        i++;
      }
    }, 750);
  };

  // === CERRAR SESIÓN ===
  const logout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("adminRol");
    localStorage.removeItem("adminNombre");
    localStorage.removeItem("adminDistrito");
    navigate("/");
  };

  const COLORS = ["#3b82f6", "#22c55e", "#ef4444", "#f59e0b", "#8b5cf6"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">

        {/* ENCABEZADO */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-2xl border-4 border-blue-600 mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-montserrat font-black text-blue-600 mb-2">
            Panel de Admin
          </h1>
          <p className="text-lg text-gray-700 font-medium">
            {adminNombre} — <span className="text-blue-600 font-bold">{adminDistrito}</span>
          </p>
          <p className="text-sm text-gray-500 mt-1">Control exclusivo de tu distrito</p>
        </div>

        {/* RESUMEN DEL DISTRITO */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl shadow-xl border-2 border-blue-200 mb-8">
          <h2 className="text-2xl font-montserrat font-black text-blue-700 mb-4">
            Resumen de {adminDistrito}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <p className="text-3xl font-bold text-green-600">{totales.validos}</p>
              <p className="text-sm text-gray-600">Votos Válidos</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <p className="text-3xl font-bold text-yellow-600">{totales.nulos}</p>
              <p className="text-sm text-gray-600">Votos Nulos</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <p className="text-3xl font-bold text-red-600">{totales.invalidos}</p>
              <p className="text-sm text-gray-600">Votos Inválidos</p>
            </div>
          </div>
        </div>

        {/* RESULTADOS POR TIPO */}
        {Object.entries(porTipo).map(([tipo, distritos]) => {
          const stats = distritos[adminDistrito];
          if (!stats || stats.validos + stats.nulos + stats.invalidos === 0) return null;

          return (
            <div key={tipo} className="bg-white p-6 rounded-2xl shadow-xl border-2 border-indigo-100 mb-8">
              <h3 className="text-xl font-montserrat font-bold text-indigo-600 mb-4">
                {tipo} — {adminDistrito}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p><strong className="text-green-600">{stats.validos}</strong> votos válidos</p>
                  <p><strong className="text-yellow-600">{stats.nulos}</strong> votos nulos</p>
                  <p><strong className="text-red-600">{stats.invalidos}</strong> votos inválidos</p>
                </div>
                <div>
                  {Object.keys(stats.candidatos || {}).length > 0 && (
                    <div className="text-sm space-y-1">
                      <p className="font-semibold text-gray-700 mb-1">Candidatos:</p>
                      {Object.entries(stats.candidatos).map(([candidato, votos]) => (
                        <p key={candidato} className="flex justify-between">
                          <span>• {candidato}</span>
                          <strong className="text-blue-600">{votos}</strong>
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* SIMULACIONES */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* CARGA */}
          <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-blue-100">
            <h3 className="text-xl font-montserrat font-bold text-blue-600 mb-4">
              Carga de Datos
            </h3>
            <button
              onClick={simulateDataLoad}
              disabled={loadingData}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 transition-all"
            >
              {loadingData ? "Cargando..." : "Simular Carga"}
            </button>
            {loadingData && (
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-1 text-center">{progress}%</p>
              </div>
            )}
          </div>

          {/* ENTRENAMIENTO */}
          <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-purple-100">
            <h3 className="text-xl font-montserrat font-bold text-purple-600 mb-4">
              Entrenamiento Local
            </h3>
            <button
              onClick={simulateTraining}
              disabled={training}
              className="w-full sm:w-auto px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 disabled:opacity-50 transition-all"
            >
              {training ? "Entrenando..." : "Iniciar Entrenamiento"}
            </button>
            {training && (
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-purple-600 h-4 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-1 text-center">{Math.round(progress)}%</p>
              </div>
            )}
          </div>
        </div>

        {/* GRÁFICO DE DONA */}
        <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-green-100">
          <h3 className="text-xl font-montserrat font-bold text-green-600 mb-4">
            Distribución de Votos Válidos
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: "Presidente", value: porTipo.Presidente?.[adminDistrito]?.validos || 0 },
                  { name: "Mesa Directiva", value: porTipo["Mesa Directiva"]?.[adminDistrito]?.validos || 0 },
                  { name: "Alcaldes", value: porTipo.Alcaldes?.[adminDistrito]?.validos || 0 }
                ].filter(d => d.value > 0)}
                cx="50%"
                cy="50%"
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {[0, 1, 2].map(i => (
                  <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* BOTÓN CERRAR SESIÓN */}
        <button
          onClick={logout}
          className="mt-8 w-full py-4 bg-gray-800 text-white rounded-xl font-bold text-lg hover:bg-gray-900 transition-all shadow-lg"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}