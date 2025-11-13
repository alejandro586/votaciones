// src/App.jsx
import { Routes, Route } from "react-router-dom";

// PÁGINAS PÚBLICAS
import Welcome from "./pages/Welcome";
import DniRegister from "./pages/DniRegister";
import VoterSelection from "./pages/VoterSelection";
import Presidents from "./pages/Presidents";
import RoundTable from "./pages/RoundTable";
import Mayors from "./pages/Mayors";

// PÁGINAS ADMIN
import Login from "./pages/admin/login";
import PanelDeAdmin from "./pages/admin/panel_de_admin";
import PanelDeSuperAdmin from "./pages/admin/panel_de_superadmin";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* PÚBLICAS */}
        <Route path="/" element={<Welcome />} />
        <Route path="/dni" element={<DniRegister />} />
        <Route path="/seleccion" element={<VoterSelection />} />
        <Route path="/presidentes" element={<Presidents />} />
        <Route path="/mesa-redonda" element={<RoundTable />} />
        <Route path="/alcaldes" element={<Mayors />} />

        {/* ADMIN */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/panel_de_admin" element={<PanelDeAdmin />} />
        <Route path="/admin/panel_de_superadmin" element={<PanelDeSuperAdmin />} />

        {/* POR DEFECTO */}
        <Route path="*" element={<Welcome />} />
      </Routes>
    </div>
  );
}

export default App;