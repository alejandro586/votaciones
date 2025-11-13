// src/pages/Presidents.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const candidatos = [
  { id: 1, nombre: "Keiko Fujimori", partido: "Fuerza Popular", imagen: "keiko.jpg" },
  { id: 2, nombre: "Pedro Castillo", partido: "Perú Libre", imagen: "castillo.jpg" },
  { id: 3, nombre: "Hernando de Soto", partido: "Avanza País", imagen: "desoto.jpg" },
  { id: 4, nombre: "Yonhy Lescano", partido: "Acción Popular", imagen: "lescano.jpg" },
];

export default function Presidents() {
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const dni = localStorage.getItem("userDni");
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const distrito = userData.distrito || "Desconocido";

  // === VERIFICAR SI YA VOTÓ PRESIDENTE ===
  useEffect(() => {
    const voted = localStorage.getItem(`presidentes_voted_${dni}`);
    if (voted) {
      setError("Ya votaste por Presidente. Redirigiendo...");
      setTimeout(() => navigate("/mesa-redonda"), 2000);
    }
  }, [dni, navigate]);

  const handleVote = () => {
    if (!selected) {
      setError("Debes seleccionar un candidato");
      return;
    }

    const voto = {
      tipo: "Presidente",
      candidato: selected.nombre,
      partido: selected.partido,
      voto: selected.nombre,
      distrito: distrito,
      timestamp: new Date().toISOString()
    };

    localStorage.setItem(`presidentes_voted_${dni}`, JSON.stringify(voto));
    setConfirmed(true);

    setTimeout(() => {
      navigate("/mesa-redonda");
    }, 3000);
  };

  const goBack = () => {
    navigate("/seleccion");
  };

  if (confirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-md">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-montserrat font-bold text-green-600 mb-2">¡Voto Registrado!</h2>
          <p className="text-gray-600">Has votado por:</p>
          <p className="text-xl font-bold text-blue-600 mt-1">{selected?.nombre}</p>
          <p className="text-sm text-gray-500 mt-3">Redirigiendo a Mesa Directiva...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-montserrat font-black text-blue-600 mb-2">
            Elección Presidencial
          </h1>
          <p className="text-lg text-gray-600">
            Distrito: <strong>{distrito}</strong> | DNI: <strong>{dni}</strong>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl mb-6 text-center">
            {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {candidatos.map((candidato) => (
            <div
              key={candidato.id}
              onClick={() => setSelected(candidato)}
              className={`bg-white p-6 rounded-2xl shadow-xl cursor-pointer transition-all border-4 ${
                selected?.id === candidato.id
                  ? "border-blue-600 shadow-2xl scale-105"
                  : "border-gray-200 hover:border-blue-300 hover:shadow-lg"
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24 bg-gray-200 border-2 border-dashed rounded-xl flex items-center justify-center">
                  <span className="text-xs text-gray-500">Foto</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-montserrat font-bold text-gray-800">
                    {candidato.nombre}
                  </h3>
                  <p className="text-sm text-gray-600">{candidato.partido}</p>
                </div>
                {selected?.id === candidato.id && (
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-10">
          <button
            onClick={goBack}
            className="px-8 py-3 bg-gray-600 text-white rounded-xl font-bold hover:bg-gray-700 transition-all"
          >
            Volver
          </button>
          <button
            onClick={handleVote}
            disabled={!selected}
            className="px-8 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Confirmar Voto
          </button>
        </div>
      </div>
    </div>
  );
}