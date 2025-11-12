// src/pages/Mayors.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoVoto from "../assets/images/votodigital-logo.png";

// === CANDIDATOS POR DISTRITO (IMÁGENES EN PUBLIC/IMAGES) ===
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
  "Mi Perú": [  // ¡Nuevo distrito agregado!
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
    setTimeout(() => navigate("/seleccion"), 1500);
  };

  const total = options.reduce((s, o) => s + o.votes, 0);
  const getPercent = (v) => (total > 0 ? Math.round((v / total) * 100) : 0);

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Roboto', system-ui, sans-serif" }}>
      {/* ==== ESTILOS DENTRO DEL ARCHIVO ==== */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;900&family=Roboto:wght@400;500;700&display=swap');

        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 3rem 1.5rem;
          background: linear-gradient(to bottom, #f0f9ff, #ffffff);
          gap: 2.5rem;
          text-align: center;
        }

        /* BOTÓN VOLVER */
        .back-btn {
          align-self: flex-start;
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          font-size: 1.1rem;
          color: #ca8a04;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem 1rem;
          border-radius: 0.75rem;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .back-btn:hover {
          background: #fefce8;
          transform: translateX(-4px);
        }
        .back-btn svg { width: 1.3rem; height: 1.3rem; }

        /* TÍTULO */
        .title {
          font-family: 'Montserrat', sans-serif;
          font-weight: 900;
          font-size: 2.6rem;
          color: #1e293b;
          background: linear-gradient(to right, #ca8a04, #facc15);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0;
        }
        .subtitle {
          font-size: 1.1rem;
          color: #64748b;
          margin-top: 0.5rem;
          font-weight: 500;
        }

        /* TARJETAS DE CANDIDATOS */
        .candidates {
          display: flex;
          flex-direction: column;
          gap: 1.8rem;
          max-width: 700px;
          width: 100%;
        }

        .candidate-card {
          background: white;
          padding: 1.8rem;
          border-radius: 1.8rem;
          box-shadow: 0 12px 35px rgba(0,0,0,0.12);
          border: 2px solid transparent;
          transition: all 0.4s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .candidate-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(135deg, rgba(202,138,4,0.05), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .candidate-card:hover::before { opacity: 1; }

        .candidate-card.selected {
          border-color: #ca8a04;
          background: #fffbeb;
          box-shadow: 0 16px 40px rgba(202,138,4,0.2);
        }
        .candidate-card.disabled {
          opacity: 0.75;
          cursor: not-allowed;
          filter: grayscale(70%);
        }

        .candidate-content {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .candidate-photo {
          width: 5rem;
          height: 5rem;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid #e5e7eb;
          box-shadow: 0 6px 16px rgba(0,0,0,0.1);
          transition: border 0.3s ease;
        }
        .candidate-card.selected .candidate-photo {
          border-color: #ca8a04;
        }

        .candidate-info {
          flex: 1;
          text-align: left;
        }
        .candidate-name {
          font-family: 'Montserrat', sans-serif;
          font-weight: 900;
          font-size: 1.4rem;
          color: #1e293b;
          margin: 0 0 0.3rem;
        }
        .candidate-party {
          font-size: 1rem;
          color: #64748b;
          font-weight: 500;
        }

        .candidate-radio {
          width: 1.5rem;
          height: 1.5rem;
          accent-color: #ca8a04;
          cursor: pointer;
        }
        .candidate-card.disabled .candidate-radio {
          cursor: not-allowed;
        }

        .candidate-votes {
          font-weight: 700;
          font-size: 1.1rem;
          color: #92400e;
          min-width: 70px;
          text-align: right;
        }

        /* RESULTADOS */
        .results {
          background: white;
          padding: 2rem;
          border-radius: 1.8rem;
          box-shadow: 0 12px 35px rgba(0,0,0,0.12);
          max-width: 700px;
          width: 100%;
          margin-top: 1.5rem;
        }
        .result-bar {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .result-label {
          width: 160px;
          font-size: 0.95rem;
          color: #374151;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .bar-container {
          flex: 1;
          height: 1.2rem;
          background: #e5e7eb;
          border-radius: 9999px;
          overflow: hidden;
        }
        .bar-fill {
          height: 100%;
          background: linear-gradient(to right, #ca8a04, #facc15);
          border-radius: 9999px;
          transition: width 0.6s ease;
        }
        .bar-percent {
          width: 50px;
          text-align: right;
          font-weight: 700;
          color: #92400e;
          font-size: 1rem;
        }

        /* BOTÓN VOTAR */
        .vote-section {
          margin-top: 2.5rem;
        }
        .total-votes {
          font-size: 1.3rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 1.5rem;
        }
        .btn-vote {
          padding: 1.2rem 3rem;
          font-size: 1.3rem;
          font-weight: 700;
          font-family: 'Montserrat', sans-serif;
          color: white;
          background: linear-gradient(to right, #facc15, #ca8a04);
          border: none;
          border-radius: 9999px;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(202,138,4,0.35);
          transition: all 0.3s ease;
        }
        .btn-vote:disabled {
          background: #9ca3af;
          cursor: not-allowed;
          box-shadow: none;
        }
        .btn-vote:hover:not(:disabled) {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(202,138,4,0.45);
        }

        .success-message {
          font-family: 'Montserrat', sans-serif;
          font-weight: 900;
          font-size: 1.8rem;
          color: #ca8a04;
          margin-top: 1.5rem;
        }

        /* LOGO FINAL */
        .logo-footer {
          margin-top: 2rem;
          width: 100%;
          max-width: 14rem;
          filter: drop-shadow(0 6px 18px rgba(0,0,0,0.1));
        }
      `}</style>

      <div className="container">

        {/* VOLVER */}
        <button onClick={() => navigate("/seleccion")} className="back-btn">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver
        </button>

        {/* TÍTULO */}
        <div>
          <h3 className="title">Alcaldes de {distrito}</h3>
          <p className="subtitle">Solo candidatos de tu zona</p>
        </div>

        {/* CANDIDATOS */}
        <div className="candidates">
          {options.map((opt) => {
            const percent = getPercent(opt.votes);
            const isSelected = selected === opt.id;
            return (
              <label
                key={opt.id}
                className={`candidate-card ${isSelected ? "selected" : ""} ${hasVoted ? "disabled" : ""}`}
              >
                <div className="candidate-content">
                  <input
                    type="radio"
                    name="mayor"
                    checked={isSelected}
                    onChange={() => !hasVoted && setSelected(opt.id)}
                    disabled={hasVoted}
                    className="candidate-radio"
                  />
                  <img src={opt.image} alt={opt.name} className="candidate-photo" />
                  <div className="candidate-info">
                    <p className="candidate-name">{opt.name}</p>
                    <p className="candidate-party">{opt.party}</p>
                  </div>
                  {hasVoted && <span className="candidate-votes">{opt.votes} votos</span>}
                </div>
              </label>
            );
          })}
        </div>

        {/* RESULTADOS */}
        {hasVoted && (
          <div className="results">
            {options.map((opt) => {
              const percent = getPercent(opt.votes);
              return (
                <div key={opt.id} className="result-bar">
                  <span className="result-label">{opt.name}:</span>
                  <div className="bar-container">
                    <div className="bar-fill" style={{ width: `${percent}%` }} />
                  </div>
                  <span className="bar-percent">{percent}%</span>
                </div>
              );
            })}
          </div>
        )}

        {/* VOTAR */}
        <div className="vote-section">
          <p className="total-votes">Total: {total} votos</p>
          {!hasVoted ? (
            <button
              onClick={handleVote}
              disabled={!selected}
              className="btn-vote"
            >
              Votar
            </button>
          ) : (
            <p className="success-message">¡Voto registrado!</p>
          )}
        </div>

        {/* LOGO */}
        <img src={logoVoto} alt="VotoDigital" className="logo-footer" />

      </div>
    </div>
  );
}