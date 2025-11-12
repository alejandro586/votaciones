// src/pages/VoterSelection.jsx
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import presidenteIcon from "../assets/images/presidente.png";
import mesaIcon from "../assets/images/mesa.png";
import alcaldeIcon from "../assets/images/alcalde.png";
import logoVoto from "../assets/images/votodigital-logo.png";

export default function VoterSelection() {
  const navigate = useNavigate();
  const dni = localStorage.getItem("userDni") || "Invitado";
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");

  const hasVoted = (key) => localStorage.getItem(`${key}_voted_${dni}`) === "true";
  const allVoted = hasVoted("presidentes") && hasVoted("mesa") && hasVoted("alcaldes");

  // Redirigir a Bienvenida después de 3 segundos
  useEffect(() => {
    if (allVoted) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [allVoted, navigate]);

  return (
    <div style={{ minHeight: "100vh", fontFamily: "'Roboto', system-ui, sans-serif" }}>
      {/* ==== ESTILOS DENTRO DEL ARCHIVO (CONSISTENTE) ==== */}
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

        /* HEADER: Usuario */
        .header-card {
          background: white;
          padding: 2rem;
          border-radius: 1.5rem;
          box-shadow: 0 12px 35px rgba(0,0,0,0.12);
          max-width: 420px;
          width: 100%;
          border: 1px solid #e0e7ff;
        }
        .header-title {
          font-family: 'Montserrat', sans-serif;
          font-weight: 900;
          font-size: 2.2rem;
          color: #1e293b;
          margin: 0 0 0.5rem;
        }
        .header-dni {
          font-size: 1.3rem;
          color: #475569;
          font-weight: 600;
        }
        .header-info {
          font-size: 1.1rem;
          color: #64748b;
          margin-top: 0.5rem;
        }

        /* MENSAJE FINAL */
        .success-banner {
          background: linear-gradient(to right, #d1fae5, #a7f3d0);
          color: #065f46;
          padding: 1.5rem 2rem;
          border-radius: 1.5rem;
          border: 2px solid #6ee7b7;
          font-weight: 700;
          font-size: 1.3rem;
          max-width: 600px;
          box-shadow: 0 8px 25px rgba(34,197,94,0.2);
        }
        .success-banner small {
          display: block;
          margin-top: 0.5rem;
          font-size: 1rem;
          opacity: 0.9;
        }

        /* TÍTULO PRINCIPAL */
        .main-title {
          font-family: 'Montserrat', sans-serif;
          font-weight: 900;
          font-size: 2.8rem;
          color: #1e293b;
          background: linear-gradient(to right, #1d4ed8, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0;
        }

        /* GRID DE OPCIONES */
        .options-grid {
          display: grid;
          gap: 2.5rem;
          max-width: 1000px;
          width: 100%;
        }
        @media (min-width: 768px) {
          .options-grid { grid-template-columns: repeat(3, 1fr); }
        }

        .option-card {
          background: white;
          padding: 2.5rem 1.5rem;
          border-radius: 1.8rem;
          box-shadow: 0 12px 35px rgba(0,0,0,0.12);
          transition: all 0.4s ease;
          cursor: pointer;
          border: 2px solid transparent;
          position: relative;
          overflow: hidden;
        }
        .option-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0));
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .option-card:hover::before { opacity: 1; }

        .option-card:disabled {
          opacity: 0.75;
          cursor: not-allowed;
          filter: grayscale(80%);
        }
        .option-card:disabled::after {
          content: 'Votado';
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%) rotate(-15deg);
          font-size: 2.5rem;
          font-weight: 900;
          color: #dc2626;
          background: rgba(255,255,255,0.9);
          padding: 1rem 2rem;
          border-radius: 1rem;
          pointer-events: none;
          z-index: 10;
          font-family: 'Montserrat', sans-serif;
        }

        .option-icon {
          width: 6.5rem;
          height: 6.5rem;
          margin: 0 auto 1.5rem;
          filter: drop-shadow(0 6px 15px rgba(0,0,0,0.15));
          transition: transform 0.3s ease;
        }
        .option-card:hover .option-icon { transform: scale(1.1); }

        .option-title {
          font-family: 'Montserrat', sans-serif;
          font-weight: 900;
          font-size: 1.8rem;
          margin: 0;
          transition: color 0.3s ease;
        }

        /* COLORES ESPECÍFICOS */
        .presidentes { border-top: 6px solid #dc2626; }
        .presidentes:hover { border-color: #dc2626; box-shadow: 0 16px 40px rgba(220,38,38,0.25); }
        .presidentes .option-title { color: #dc2626; }

        .mesa { border-top: 6px solid #16a34a; }
        .mesa:hover { border-color: #16a34a; box-shadow: 0 16px 40px rgba(22,163,74,0.25); }
        .mesa .option-title { color: #16a34a; }

        .alcaldes { border-top: 6px solid #ca8a04; }
        .alcaldes:hover { border-color: #ca8a04; box-shadow: 0 16px 40px rgba(202,138,4,0.25); }
        .alcaldes .option-title { color: #ca8a04; }

        /* LOGO FINAL */
        .logo-footer {
          margin-top: 1rem;
          width: 100%;
          max-width: 14rem;
          filter: drop-shadow(0 6px 18px rgba(0,0,0,0.1));
        }
      `}</style>

      <div className="container">

        {/* HEADER: Bienvenida al usuario */}
        <div className="header-card">
          <h2 className="header-title">Bienvenido</h2>
          <p className="header-dni">DNI: <strong>{dni}</strong></p>
          <p className="header-info">{userData.nombre} • {userData.distrito}, {userData.provincia}</p>
        </div>

        {/* MENSAJE DE COMPLETADO */}
        {allVoted && (
          <div className="success-banner">
            ¡Has completado todas tus votaciones!
            <small>Redirigiendo en 3 segundos...</small>
          </div>
        )}

        {/* TÍTULO */}
        <h1 className="main-title">Elige tu votación</h1>

        {/* GRID DE OPCIONES */}
        <div className="options-grid">

          {/* PRESIDENTES */}
          <button
            onClick={() => !hasVoted("presidentes") && navigate("/presidentes")}
            disabled={hasVoted("presidentes")}
            className="option-card presidentes"
          >
            <img src={presidenteIcon} alt="Presidentes" className="option-icon" />
            <p className="option-title">PRESIDENTES</p>
          </button>

          {/* MESA REDONDA */}
          <button
            onClick={() => !hasVoted("mesa") && navigate("/mesa-redonda")}
            disabled={hasVoted("mesa")}
            className="option-card mesa"
          >
            <img src={mesaIcon} alt="Mesa Redonda" className="option-icon" />
            <p className="option-title">MESA REDONDA</p>
          </button>

          {/* ALCALDES */}
          <button
            onClick={() => !hasVoted("alcaldes") && navigate("/alcaldes")}
            disabled={hasVoted("alcaldes")}
            className="option-card alcaldes"
          >
            <img src={alcaldeIcon} alt="Alcaldes" className="option-icon" />
            <p className="option-title">ALCALDES</p>
          </button>

        </div>

        {/* LOGO FINAL */}
        <img src={logoVoto} alt="VotoDigital" className="logo-footer" />

      </div>
    </div>
  );
}