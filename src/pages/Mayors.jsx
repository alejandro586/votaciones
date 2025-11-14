// src/pages/Mayors.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoVoto from "../assets/images/votodigital-logo.png";
import { guardarVoto } from '../utils/votacionUtils'; // ← NUEVO

const alcaldesPorDistrito = {
  "Miraflores": [
    { id: 7, name: "Rafael López Aliaga", party: "Renovación Popular", image: "/images/lopez-aliaga.jpg" },
    { id: 10, name: "Luis Castañeda", party: "Solidaridad Nacional", image: "/images/castaneda.jpg" },
  ],
  "San Isidro": [
    { id: 8, name: "Daniel Urresti", party: "Podemos Perú", image: "/images/urresti.jpg" },
    { id: 11, name: "Augusto Rey", party: "Avanza País", image: "/images/rey.jpg" },
  ],
  "Ate": [
    { id: 9, name: "George Forsyth", party: "Somos Perú", image: "/images/forsyth.jpg" },
    { id: 12, name: "Edde Cuellar", party: "Fuerza Popular", image: "/images/cuellar.jpg" },
  ],
  "La Molina": [
    { id: 13, name: "Álvaro Paz de la Barra", party: "Renovación Popular", image: "/images/paz.jpg" },
  ],
  "Surco": [
    { id: 14, name: "Carlos Bruce", party: "Acción Popular", image: "/images/bruce.jpg" },
  ],
  "Mi Perú": [
    { id: 15, name: "María Vargas", party: "Perú Libre", image: "/images/vargas.jpg" },
    { id: 16, name: "José Quispe", party: "Juntos por el Perú", image: "/images/quispe.jpg" },
  ],
};

export default function Mayors() {
  const navigate = useNavigate();
  const dni = localStorage.getItem("userDni");
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const distrito = userData.distrito || "Desconocido";

  const optionsBase = alcaldesPorDistrito[distrito] || [
    { id: 99, name: "Sin candidatos", party: "—", image: "/images/no-candidate.png" }
  ];

  const [options, setOptions] = useState(optionsBase.map(o => ({ ...o, votes: 0 })));
  const [selected, setSelected] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  const voteKey = `alcaldes_voted_${dni}`;
  const dataKey = `alcaldes_votes_${dni}`;

  useEffect(() => {
    const voted = localStorage.getItem(voteKey);
    if (voted) {
      setHasVoted(true);
      const saved = JSON.parse(localStorage.getItem(dataKey)) || options;
      setOptions(saved);
    }
  }, [voteKey, dataKey]);

  const handleVote = () => {
    if (!selected || hasVoted) return;

    const updated = options.map(opt =>
      opt.id === selected ? { ...opt, votes: opt.votes + 1 } : opt
    );
    setOptions(updated);
    setHasVoted(true);
    localStorage.setItem(voteKey, "true");
    localStorage.setItem(dataKey, JSON.stringify(updated));

    // ← NUEVO: GUARDA EN GLOBAL CON DISTRITO
    const selectedOption = options.find(o => o.id === selected);
    guardarVoto('alcaldes', selectedOption.name, distrito);

    setTimeout(() => navigate("/seleccion"), 1500);
  };

  const total = options.reduce((s, o) => s + o.votes, 0);
  const getPercent = (v) => (total > 0 ? Math.round((v / total) * 100) : 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-montserrat font-bold text-center text-purple-800 mb-8">
          Alcaldía de {distrito}
        </h1>

        <div className="grid gap-6 md:grid-cols-2">
          {options.map((opt) => {
            const isSelected = selected === opt.id;
            return (
              <label
                key={opt.id}
                className={`block cursor-pointer transition-all ${
                  isSelected ? "ring-4 ring-purple-600 scale-105" : ""
                } ${hasVoted ? "opacity-70" : ""}`}
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                  <input
                    type="radio"
                    name="mayor"
                    checked={isSelected}
                    onChange={() => !hasVoted && setSelected(opt.id)}
                    disabled={hasVoted}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-4">
                    <img
                      src={opt.image}
                      alt={opt.name}
                      className="w-20 h-20 rounded-full object-cover border-2 border-purple-200"
                    />
                    <div>
                      <p className="font-montserrat font-bold text-lg text-gray-800">{opt.name}</p>
                      <p className="text-sm text-gray-600">{opt.party}</p>
                    </div>
                  </div>
                  {hasVoted && (
                    <div className="mt-3 text-sm font-semibold text-purple-600">
                      {opt.votes} votos
                    </div>
                  )}
                </div>
              </label>
            );
          })}
        </div>

        {hasVoted && (
          <div className="mt-8 bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-montserrat font-bold mb-4">Resultados</h3>
            {options.map((opt) => {
              const percent = getPercent(opt.votes);
              return (
                <div key={opt.id} className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{opt.name}</span>
                    <span>{percent}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex justify-center mt-8">
          {!hasVoted ? (
            <button
              onClick={handleVote}
              disabled={!selected}
              className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Confirmar Voto
            </button>
          ) : (
            <p className="text-2xl font-bold text-green-600 animate-pulse">
              ¡Voto Registrado!
            </p>
          )}
        </div>

        <img src={logoVoto} alt="VotoDigital" className="w-32 mx-auto mt-10 opacity-80" />
      </div>
    </div>
  );
}