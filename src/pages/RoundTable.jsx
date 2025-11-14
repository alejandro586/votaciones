// src/pages/RoundTable.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import accionImg from "../assets/images/accion-popular.png";
import appImg from "../assets/images/app.png";
import renovacionImg from "../assets/images/renovacion.png";
import logoVoto from "../assets/images/votodigital-logo.png";
import { guardarVoto } from '../utils/votacionUtils'; // ← NUEVO

export default function RoundTable() {
  const navigate = useNavigate();
  const dni = localStorage.getItem("userDni");

  const [options, setOptions] = useState([
    { id: 4, name: "Acción Popular", image: accionImg, votes: 0 },
    { id: 5, name: "Alianza para el Progreso", image: appImg, votes: 0 },
    { id: 6, name: "Renovación Popular", image: renovacionImg, votes: 0 },
  ]);

  const [selected, setSelected] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  const voteKey = `mesa_voted_${dni}`;
  const dataKey = `mesa_votes_${dni}`;

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

    // ← NUEVO: GUARDA EN GLOBAL
    const selectedOption = options.find(o => o.id === selected);
    guardarVoto('mesaRedonda', selectedOption.name);

    setTimeout(() => navigate("/seleccion"), 1500);
  };

  const total = options.reduce((s, o) => s + o.votes, 0);
  const getPercent = (v) => (total > 0 ? Math.round((v / total) * 100) : 0);

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Roboto', system-ui, sans-serif" }}>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;900&family=Roboto:wght@400;500;700&display=swap');

        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 3rem 1rem;
          background: linear-gradient(to bottom, #f0f9ff, #e0f2fe);
        }

        .title {
          font-family: 'Montserrat', sans-serif;
          font-size: 2.5rem;
          font-weight: 900;
          color: #1e40af;
          text-align: center;
          margin-bottom: 2rem;
        }

        .candidates-grid {
          display: grid;
          gap: 1.5rem;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          max-width: 800px;
          width: 100%;
        }

        .candidate-card {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          cursor: pointer;
          text-align: center;
        }

        .candidate-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }

        .candidate-card.selected {
          border: 3px solid #3b82f6;
          box-shadow: 0 0 0 4px rgba(59,130,246,0.2);
        }

        .candidate-card.disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .candidate-logo {
          width: 80px;
          height: 80px;
          object-fit: contain;
          margin: 0 auto 1rem;
        }

        .candidate-name {
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          font-size: 1.1rem;
          color: #1f2937;
        }

        .candidate-votes {
          display: block;
          margin-top: 0.5rem;
          font-size: 0.9rem;
          color: #6b7280;
          font-weight: 600;
        }

        .results {
          margin-top: 2rem;
          width: 100%;
          max-width: 600px;
        }

        .result-bar {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 0.75rem;
        }

        .result-label {
          min-width: 180px;
          font-weight: 600;
          color: #374151;
        }

        .bar-container {
          flex: 1;
          height: 24px;
          background: #e5e7eb;
          border-radius: 9999px;
          overflow: hidden;
        }

        .bar-fill {
          height: 100%;
          background: linear-gradient(to right, #10b981, #059669);
          transition: width 0.5s ease;
        }

        .bar-percent {
          min-width: 40px;
          text-align: right;
          font-weight: bold;
          color: #059669;
        }

        .vote-section {
          margin-top: 2rem;
          text-align: center;
        }

        .total-votes {
          font-size: 1.1rem;
          color: #4b5563;
          margin-bottom: 1rem;
        }

        .btn-vote {
          background: linear-gradient(to right, #10b981, #059669);
          color: white;
          font-weight: bold;
          padding: 0.75rem 2rem;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(16,185,129,0.3);
        }

        .btn-vote:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(16,185,129,0.4);
        }

        .btn-vote:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .success-message {
          font-size: 1.5rem;
          font-weight: bold;
          color: #059669;
          animation: fadeIn 0.5s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .logo-footer {
          width: 120px;
          margin-top: 3rem;
          opacity: 0.8;
        }
      `}</style>

      <div className="container">
        <h1 className="title">Mesa Directiva</h1>

        <div className="candidates-grid">
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
                    name="mesa"
                    checked={isSelected}
                    onChange={() => !hasVoted && setSelected(opt.id)}
                    disabled={hasVoted}
                    className="candidate-radio"
                  />
                  <img src={opt.image} alt={opt.name} className="candidate-logo" />
                  <p className="candidate-name">{opt.name}</p>
                  {hasVoted && <span className="candidate-votes">{opt.votes} votos</span>}
                </div>
              </label>
            );
          })}
        </div>

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

        <img src={logoVoto} alt="VotoDigital" className="logo-footer" />
      </div>
    </div>
  );
}