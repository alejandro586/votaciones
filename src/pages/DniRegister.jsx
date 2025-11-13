// src/pages/DniRegister.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dniCardImg from "../assets/images/dni-card.png";
import urnaImg from "../assets/images/urna.png";
import logoVoto from "../assets/images/votodigital-logo.png";

// === BASE DE DATOS DE VOTANTES POR DISTRITO ===
const votantesDB = {
  // MIRAFLORES
  "12345678": { nombre: "Juan Pérez", edad: 34, distrito: "Miraflores", provincia: "Lima" },
  "87654321": { nombre: "María López", edad: 28, distrito: "Miraflores", provincia: "Lima" },

  // SAN ISIDRO
  "11223344": { nombre: "Carlos Mendoza", edad: 45, distrito: "San Isidro", provincia: "Lima" },

  // ATE
  "99887766": { nombre: "Ana Torres", edad: 39, distrito: "Ate", provincia: "Lima" },

  // SURCO
  "56789012": { nombre: "Luis Ramírez", edad: 52, distrito: "Surco", provincia: "Lima" },

  // === SOLO ESTE ES ADMIN ===
  "60432205": { 
    nombre: "Segundo Cerdán", 
    edad: 20, 
    distrito: "Central", 
    provincia: "Lima",
    isAdmin: true,
    rol: "superadmin"
  },
};

export default function DniRegister() {
  const [dni, setDni] = useState("");
  const [error, setError] = useState("");
  const [voter, setVoter] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentDni = localStorage.getItem("userDni");
    if (currentDni && dni === currentDni) {
      const hasVoted = 
        localStorage.getItem(`presidentes_voted_${currentDni}`) &&
        localStorage.getItem(`mesa_voted_${currentDni}`) &&
        localStorage.getItem(`alcaldes_voted_${currentDni}`);
      if (hasVoted) {
        setError("Este usuario ya votó. No puede votar nuevamente.");
        setVoter(null);
        setTimeout(() => navigate("/"), 3000);
      }
    }
  }, [dni, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = votantesDB[dni];

    const hasVoted = 
      localStorage.getItem(`presidentes_voted_${dni}`) &&
      localStorage.getItem(`mesa_voted_${dni}`) &&
      localStorage.getItem(`alcaldes_voted_${dni}`);

    if (dni.length === 8 && found) {
      setVoter(found);
      setError("");
      localStorage.setItem("userDni", dni);
      localStorage.setItem("userData", JSON.stringify(found));

      if (dni === "60432205") {
        setTimeout(() => navigate("/admin/login"), 2000);
      }
    } else if (hasVoted) {
      setError("Este usuario ya votó. No puede votar nuevamente.");
      setVoter(null);
      setTimeout(() => navigate("/"), 3000);
    } else {
      setError("DNI no encontrado o inválido");
      setVoter(null);
    }
  };

  const goToVote = () => {
    if (voter && dni !== "60432205") {
      navigate("/seleccion");
    }
  };

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Roboto', system-ui, sans-serif" }}>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;900&family=Roboto:wght@400;500;700&display=swap');

        .container {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          min-height: 100vh; padding: 3rem 1.5rem; background: #f8faff; gap: 3rem; text-align: center;
        }
        @media (min-width: 768px) { .container { flex-direction: row; gap: 5rem; padding: 4rem 6rem; } }

        .form-section { flex: 1; max-width: 500px; display: flex; flex-direction: column; align-items: center; }
        @media (min-width: 768px) { .form-section { align-items: flex-start; } }

        .title { font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 2.8rem; color: #1e293b; margin: 0 0 1rem; }
        .subtitle { font-size: 1.15rem; color: #475569; margin-bottom: 2.5rem; max-width: 420px; }

        .input-dni {
          width: 100%; max-width: 380px; padding: 1.2rem 1.3rem; font-size: 1.3rem;
          font-family: 'Courier New', monospace; text-align: center; border: 2px solid #e2e8f0;
          border-radius: 1rem; outline: none; background: white; box-shadow: 0 6px 16px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
        }
        .input-dni:focus { border-color: #3b82f6; box-shadow: 0 0 0 5px rgba(59,130,246,0.18); }

        .btn-validate {
          width: 100%; max-width: 380px; padding: 1.1rem 2rem; font-size: 1.2rem; font-weight: 700;
          font-family: 'Montserrat', sans-serif; color: white; background: linear-gradient(to right, #3b82f6, #1d4ed8);
          border: none; border-radius: 9999px; cursor: pointer; box-shadow: 0 8px 25px rgba(59,130,246,0.35);
          transition: all 0.3s ease; margin-top: 1rem;
        }
        .btn-validate:hover { transform: translateY(-3px); box-shadow: 0 14px 40px rgba(59,130,246,0.45); }

        .error { background: #fee2e2; color: #b91c1c; padding: 1rem 1.5rem; border-radius: 1rem; border: 1px solid #fecaca; font-weight: 600; margin-top: 1.5rem; max-width: 380px; }

        .voter-card {
          background: white; padding: 2rem; border-radius: 1.5rem; box-shadow: 0 12px 40px rgba(0,0,0,0.12);
          max-width: 380px; margin: 2rem auto 0; text-align: center;
          border: 2px solid ${dni === "60432205" ? '#dc2626' : '#bbf7d0'};
        }
        .voter-name { font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 1.6rem; color: ${dni === "60432205" ? '#dc2626' : '#166534'}; margin-bottom: 1rem; }
        .voter-info { font-size: 1.1rem; color: #374151; line-height: 1.8; }
        .voter-info strong { color: #1e40af; }

        .btn-vote {
          width: 100%; max-width: 380px; padding: 1rem 2rem; font-size: 1.2rem; font-weight: 700;
          font-family: 'Montserrat', sans-serif; color: white;
          background: ${dni === "60432205" ? 'linear-gradient(to right, #dc2626, #b91c1c)' : 'linear-gradient(to right, #22c55e, #16a34a)'};
          border: none; border-radius: 9999px; cursor: pointer;
          box-shadow: 0 8px 25px rgba(${dni === "60432205" ? '220,38,38' : '34,197,94'},0.35);
          transition: all 0.3s ease; margin-top: 1.5rem;
        }
        .btn-vote:hover { transform: translateY(-3px); box-shadow: 0 14px 40px rgba(${dni === "60432205" ? '220,38,38' : '34,197,94'},0.45); }

        .admin-notice { font-size: 0.9rem; color: #dc2626; font-weight: 600; margin-top: 0.75rem; }

        .images-section { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2rem; max-width: 500px; }
        .dni-card, .urna-vote, .logo-voto { width: 100%; max-width: 20rem; filter: drop-shadow(0 12px 30px rgba(0,0,0,0.12)); }
      `}</style>

      <div className="container">
        <div className="form-section">
          <h1 className="title">Registro de votante</h1>
          <p className="subtitle">Ingrese su número de DNI para continuar.</p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={dni}
              onChange={(e) => setDni(e.target.value.replace(/\D/g, "").slice(0, 8))}
              placeholder="12345678"
              className="input-dni"
              maxLength={8}
              required
            />
            <button type="submit" className="btn-validate">
              Validar DNI
            </button>
          </form>

          {error && (
            <div className="error">
              <p>{error}</p>
              {error.includes("ya votó") && <small>Redirigiendo en 3 segundos...</small>}
            </div>
          )}

          {voter && (
            <div className="voter-card">
              <div className="voter-name">{voter.nombre}</div>
              <div className="voter-info">
                <p>Edad: <strong>{voter.edad} años</strong></p>
                <p>Distrito: <strong>{voter.distrito}</strong></p>
              </div>

              {dni === "60432205" ? (
                <>
                  <p className="admin-notice">Acceso de administrador detectado...</p>
                  <p className="admin-notice">Redirigiendo al panel de control</p>
                </>
              ) : (
                <button onClick={goToVote} className="btn-vote">
                  Iniciar Votación
                </button>
              )}
            </div>
          )}
        </div>

        <div className="images-section">
          <img src={dniCardImg} alt="DNI Perú" className="dni-card" />
          <img src={urnaImg} alt="Urna electoral" className="urna-vote" />
          <img src={logoVoto} alt="VotoDigital" className="logo-voto" />
        </div>
      </div>
    </div>
  );
}