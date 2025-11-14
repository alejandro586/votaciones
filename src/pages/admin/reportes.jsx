// src/pages/admin/reportes.jsx
import { useState } from "react";
import { Download, FileText } from "lucide-react";

export default function Reportes() {
  const generarCSV = () => {
    const datos = JSON.parse(localStorage.getItem('votacionesGlobales') || '{}');
    let csv = "Categoría,Candidato,Distrito,Votos\n";
    
    Object.entries(datos.presidentes).forEach(([c, v]) => {
      csv += `Presidente,${c},Nacional,${v}\n`;
    });
    Object.entries(datos.mesaRedonda).forEach(([c, v]) => {
      csv += `Mesa,${c},Nacional,${v}\n`;
    });
    Object.entries(datos.alcaldes).forEach(([dist, cands]) => {
      Object.entries(cands).forEach(([c, v]) => {
        csv += `Alcalde,${c},${dist},${v}\n`;
      });
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resultados_electorales.csv';
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Generar Reportes</h1>

        <div className="grid md:grid-cols-2 gap-6">
          <button 
            onClick={generarCSV}
            className="bg-gradient-to-br from-green-600 to-emerald-700 p-8 rounded-2xl hover:scale-105 transition-all text-white"
          >
            <Download className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-bold">Exportar CSV</h3>
            <p className="text-sm opacity-80 mt-2">Descarga resultados completos</p>
          </button>

          <button className="bg-gradient-to-br from-blue-600 to-cyan-700 p-8 rounded-2xl hover:scale-105 transition-all text-white opacity-50 cursor-not-allowed">
            <FileText className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-bold">Generar PDF</h3>
            <p className="text-sm opacity-80 mt-2">Próximamente...</p>
          </button>
        </div>
      </div>
    </div>
  );
}