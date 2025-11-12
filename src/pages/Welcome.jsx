// src/pages/Welcome.jsx
import { useNavigate } from "react-router-dom";
import urnaImg from "../assets/images/urna.png";
import logoVoto from "../assets/images/votodigital-logo.png";
import elcomercioLogo from "../assets/images/elcomercio.png";
import belaundeImg from "../assets/images/belaunde.jpg";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* ==== ESTILOS DENTRO DEL ARCHIVO ==== */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;900&family=Roboto:wght@400;500;700&display=swap');

        /* ---------- HERO (NO TOCADO) ---------- */
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background: linear-gradient(to bottom, #f0f9ff, #ffffff);
          text-align: center;
          gap: 2.5rem;
        }
        .images-container { display: flex; flex-direction: column; align-items: center; gap: 2rem; }
        .urna-img { width: 100%; max-width: 16rem; height: auto; filter: drop-shadow(0 12px 30px rgba(0,0,0,.15)); background: transparent !important; }
        .logo-voto { width: 100%; max-width: 22rem; height: auto; filter: drop-shadow(0 8px 25px rgba(0,0,0,.12)); background: transparent !important; }

        .description {
          font-size: 1.1rem;
          color: #374151;
          max-width: 800px;
          line-height: 1.9;
          margin: 0 auto;
          font-family: 'Roboto', sans-serif;
        }
        @media (min-width: 768px) { .description { font-size: 1.2rem; } }
        .description strong { color: #1d4ed8; font-weight: 600; }

        /* ---------- SECCIÓN NOTICIAS (MEJORADA) ---------- */
        .section-news { 
          padding: 6rem 1.5rem; 
          background: white; 
        }

        /* BLOQUE 1: El Comercio – imagen IZQUIERDA, texto DERECHA */
        .row-left {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto 6rem;
          align-items: center;
        }
        @media (min-width: 768px) {
          .row-left {
            flex-direction: row;
            align-items: center;
            gap: 4rem;
          }
        }

        .img-left { 
          width: 100%; 
          max-width: 15rem; 
          filter: drop-shadow(0 6px 12px rgba(0,0,0,.12));
          border-radius: 1rem;
        }

        .text-right {
          flex: 1;
          font-size: 1.2rem;
          color: #374151;
          line-height: 1.9;
          text-align: center;
        }
        @media (min-width: 768px) {
          .text-right { 
            text-align: left; 
            font-size: 1.25rem;
          }
        }
        .text-right strong { 
          color: #1e40af; 
          font-weight: 700;
        }

        /* BLOQUE 2: Belaúnde – texto IZQUIERDA, imagen DERECHA */
        .row-right {
          display: flex;
          flex-direction: column-reverse;
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto 6rem;
          align-items: center;
        }
        @media (min-width: 768px) {
          .row-right {
            flex-direction: row;
            align-items: center;
            gap: 4rem;
          }
        }

        .text-left {
          flex: 1;
          font-size: 1.2rem;
          color: #374151;
          line-height: 1.9;
          text-align: center;
          font-style: italic;
        }
        @media (min-width: 768px) {
          .text-left { 
            text-align: left; 
            font-size: 1.25rem;
          }
        }
        .text-left span {
          display: block;
          margin-top: 0.8rem;
          color: #1d4ed8;
          font-weight: 700;
          font-style: normal;
          font-size: 1.1rem;
        }

        .img-right {
          width: 100%;
          max-width: 28rem;
          border-radius: 1.5rem;
          overflow: hidden;
          box-shadow: 0 12px 35px rgba(0,0,0,.18);
        }
        .img-right img { 
          width: 100%; 
          height: 22rem; 
          object-fit: cover; 
          display: block;
        }

        /* BOTÓN CENTRADO */
        .btn-center {
          text-align: center;
          margin-top: 3rem;
        }
        .btn-vote {
          display: inline-flex;
          align-items: center;
          gap: .8rem;
          padding: 1.4rem 3.2rem;
          font-size: 1.3rem;
          font-weight: 700;
          font-family: 'Montserrat', sans-serif;
          color: white;
          background: linear-gradient(to right, #3b82f6, #1d4ed8);
          border: none;
          border-radius: 9999px;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(59,130,246,.35);
          transition: all .3s ease;
        }
        .btn-vote:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(59,130,246,.45);
        }
        .btn-vote svg { width: 1.6rem; height: 1.6rem; }
      `}</style>

      {/* ==== HERO (100% SIN CAMBIOS) ==== */}
      <section className="hero">
        <div className="images-container">
          <img src={urnaImg} alt="Urna electrónica" className="urna-img" />
          <img src={logoVoto} alt="VotoDigital" className="logo-voto" />
        </div>

        <p className="description">
          VotoDigital es una app web <strong>simple, segura y moderna</strong> para
          votaciones digitales. Elige, vota, ve resultados en tiempo real.
          Con perfil, ayuda, admin y contacto — todo fluye sin complicaciones.
        </p>
      </section>

      {/* ==== SECCIÓN NOTICIAS (MEJORADA Y LIMPIA) ==== */}
      <section className="section-news">

        {/* BLOQUE 1: El Comercio – imagen IZQUIERDA */}
        <div className="row-left">
          <img src={elcomercioLogo} alt="El Comercio" className="img-left" />
          <div className="text-right">
            Las <strong>últimas noticias de nuestro Perú</strong>, para esta época de elecciones.
            Información fresca y verificada sobre candidatos y propuestas que definirán el futuro.
          </div>
        </div>

        {/* BLOQUE 2: Belaúnde – texto IZQUIERDA, imagen DERECHA (sin cita) */}
        <div className="row-right">
          <div className="text-left">
            El mejor en vivo para saber cómo están yendo las votaciones.
            <span>¿Quién va ganando? Aquí lo ves al instante.</span>
          </div>
          <div className="img-right">
            <img src={belaundeImg} alt="Candidato en vivo" />
            {/* CITA ELIMINADA */}
          </div>
        </div>

        {/* BOTÓN CENTRADO */}
        <div className="btn-center">
          <button className="btn-vote" onClick={() => navigate("/dni")}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            INICIAR VOTACIÓN
          </button>
        </div>
      </section>
    </div>
  );
}