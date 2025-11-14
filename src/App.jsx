// src/App.jsx
import { Routes, Route } from "react-router-dom";

// === RUTAS VOTANTE ===
import Welcome from "./pages/Welcome";
import DniRegister from "./pages/DniRegister";
import VoterSelection from "./pages/VoterSelection";
import Presidents from "./pages/Presidents";
import RoundTable from "./pages/RoundTable";
import Mayors from "./pages/Mayors";

// === RUTAS ADMIN ===
import LoginAdmin from "./pages/admin/login"; // Login para admin
import PanelDeSuperAdmin from "./pages/admin/panel_de_superadmin";
import PanelDeAdmin from "./pages/admin/panel_de_admin";
import Electores from "./pages/admin/electores";
import Votaciones from "./pages/admin/votaciones";
import Reportes from "./pages/admin/reportes";
import Configuracion from "./pages/admin/configuracion";

// === LAYOUTS ===
import AdminLayout from "./layouts/AdminLayout";
import ProtectedAdminRoute from "./layouts/ProtectedAdminRoute";

export default function App() {
  return (
    <Routes>
      {/* ===================== */}
      {/* RUTAS VOTANTE */}
      {/* ===================== */}
      <Route path="/" element={<Welcome />} />  // Landing page
      <Route path="/dni" element={<DniRegister />} />  // Registro DNI
      <Route path="/seleccion" element={<VoterSelection />} />  // Selección de voto
      <Route path="/presidentes" element={<Presidents />} />  // Voto presidentes
      <Route path="/mesa-redonda" element={<RoundTable />} />  // Voto mesa
      <Route path="/alcaldes" element={<Mayors />} />  // Voto alcaldes

      {/* ===================== */}
      {/* RUTAS ADMIN */}
      {/* ===================== */}

      {/* LOGIN ADMIN */}
      <Route path="/admin/login" element={<LoginAdmin />} />

      {/* ADMIN NORMAL (SIN SIDEBAR) */}
      <Route path="/admin/normal" element={<PanelDeAdmin />} />

      {/* SUPERADMIN (CON SIDEBAR, PROTEGIDO) */}
      <Route element={<ProtectedAdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/panel" element={<PanelDeSuperAdmin />} />
          <Route path="/admin/electores" element={<Electores />} />
          <Route path="/admin/votaciones" element={<Votaciones />} />
          <Route path="/admin/reportes" element={<Reportes />} />
          <Route path="/admin/configuracion" element={<Configuracion />} />
        </Route>
      </Route>
    </Routes>
  );
}