// src/pages/admin/panel_de_superadmin.jsx (AHORA SIN SIDEBAR)
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { RefreshCw, Trash2, Cpu, TrendingUp, AlertCircle } from 'lucide-react';

export default function PanelDeSuperAdmin() {
  const [datosGlobales, setDatosGlobales] = useState({ presidentes: {}, mesaRedonda: {}, alcaldes: {} });
  const [results, setResults] = useState({ porTipo: {}, totales: {} });
  const [loadingData, setLoadingData] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [training, setTraining] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  // === TIEMPO REAL ===
  useEffect(() => {
    const actualizar = () => {
      const raw = localStorage.getItem('votacionesGlobales');
      const parsed = raw ? JSON.parse(raw) : { presidentes: {}, mesaRedonda: {}, alcaldes: {} };
      setDatosGlobales(parsed);
    };
    actualizar();
    window.addEventListener('storage', actualizar);
    const interval = setInterval(actualizar, 1000);
    return () => { window.removeEventListener('storage', actualizar); clearInterval(interval); };
  }, []);

  // === CARGA DETALLADA ===
  const loadVotesByTypeAndDistrict = () => {
    setLoadingData(true);
    const keys = Object.keys(localStorage).filter(k => 
      k.includes("presidentes_voted_") || k.includes("mesa_voted_") || k.includes("alcaldes_voted_")
    );
    const porTipo = { Presidente: {}, "Mesa Directiva": {}, Alcaldes: {} };
    const totales = { validos: 0, nulos: 0, invalidos: 0 };

    keys.forEach(key => {
      const voto = JSON.parse(localStorage.getItem(key) || "{}");
      if (!voto.distrito) return;
      const tipo = key.includes("presidentes") ? "Presidente" :
                   key.includes("mesa") ? "Mesa Directiva" : "Alcaldes";
      const distrito = voto.distrito;
      if (!porTipo[tipo][distrito]) porTipo[tipo][distrito] = { validos: 0, nulos: 0, invalidos: 0, candidatos: {} };

      const esNulo = !voto.voto; const esInvalido = voto.voto === "invalido";
      if (esNulo) { porTipo[tipo][distrito].nulos++; totales.nulos++; }
      else if (esInvalido) { porTipo[tipo][distrito].invalidos++; totales.invalidos++; }
      else {
        porTipo[tipo][distrito].validos++; totales.validos++;
        porTipo[tipo][distrito].candidatos[voto.voto] = (porTipo[tipo][distrito].candidatos[voto.voto] || 0) + 1;
      }
    });
    setResults({ porTipo, totales });
    setLoadingData(false);
  };

  useEffect(() => { loadVotesByTypeAndDistrict(); }, []);

  // === ENTRENAMIENTO ===
  const startTraining = () => {
    setTraining(true); setProgress(0);
    const interval = setInterval(() => {
      setProgress(p => { if (p >= 100) { clearInterval(interval); setTraining(false); return 100; } return p + 5; });
    }, 200);
  };

  // === RESET ===
  const resetAllVotes = () => {
    localStorage.removeItem('votacionesGlobales');
    Object.keys(localStorage).forEach(k => { if (k.includes('_voted_') || k.includes('_votes_')) localStorage.removeItem(k); });
    setDatosGlobales({ presidentes: {}, mesaRedonda: {}, alcaldes: {} });
    setResults({ porTipo: {}, totales: {} });
    setDeleting(false);
  };

  const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
  const porTipo = results.porTipo || {};
  const totales = results.totales || {};

  const totalVotos = totales.validos + totales.nulos + totales.invalidos;
  const participacion = totalVotos > 0 ? Math.round((totales.validos / totalVotos) * 100) : 0;

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Panel de Control Electoral
          </h1>
          <p className="text-white/60">Monitoreo en tiempo real</p>
        </div>
        <button onClick={loadVotesByTypeAndDistrict} className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20">
          <RefreshCw className={`w-4 h-4 ${loadingData ? 'animate-spin' : ''}`} />
          Actualizar
        </button>
      </div>

      {/* === KPIS, GRÁFICOS, ACCIONES === */}
      {/* (Todo el contenido que tenías antes, SIN el sidebar) */}
      {/* ... (pega aquí el contenido del dashboard) ... */}
      
      {/* Ejemplo rápido de KPIS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/60 text-sm">Participación</span>
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-3xl font-bold">{participacion}%</div>
          <div className="mt-2 w-full bg-white/10 rounded-full h-2">
            <div className="bg-gradient-to-r from-green-400 to-emerald-400 h-2 rounded-full" style={{ width: `${participacion}%` }} />
          </div>
        </div>
        {/* ... otros KPIs ... */}
      </div>

      {/* ... resto del dashboard ... */}

      {deleting && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-red-900 to-rose-900 p-8 rounded-2xl border border-red-500">
            <h3 className="text-xl font-bold mb-4">¿Eliminar todos los votos?</h3>
            <div className="flex gap-3">
              <button onClick={resetAllVotes} className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-bold">Sí</button>
              <button onClick={() => setDeleting(false)} className="px-6 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-bold">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}