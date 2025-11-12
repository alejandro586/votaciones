// src/App.jsx
import { Routes, Route } from "react-router-dom";

import Welcome from "./pages/Welcome";
import DniRegister from "./pages/DniRegister";
import VoterSelection from "./pages/VoterSelection";
import Presidents from "./pages/Presidents";
import RoundTable from "./pages/RoundTable";
import Mayors from "./pages/Mayors";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/dni" element={<DniRegister />} />
        <Route path="/seleccion" element={<VoterSelection />} />
        <Route path="/presidentes" element={<Presidents />} />
        <Route path="/mesa-redonda" element={<RoundTable />} />
        <Route path="/alcaldes" element={<Mayors />} />
      </Routes>
    </div>
  );
}

export default App;