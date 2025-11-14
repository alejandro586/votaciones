// src/pages/admin/electores.jsx
import { useState, useEffect } from "react";
import { Search, User } from "lucide-react";

export default function Electores() {
  const [electores, setElectores] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const keys = Object.keys(localStorage).filter(k => k.includes("_voted_"));
    const lista = keys.map(key => {
      const voto = JSON.parse(localStorage.getItem(key));
      const dni = key.split("_")[2];
      return { dni, ...voto };
    });
    setElectores(lista);
  }, []);

  const filtrados = electores.filter(e => 
    e.dni.includes(search) || e.distrito?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Electores que Votaron</h1>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-white/60" />
            <input
              type="text"
              placeholder="Buscar por DNI o distrito..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-white placeholder-white/50 outline-none"
            />
          </div>
        </div>

        <div className="grid gap-4">
          {filtrados.map((e, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-lg border border-white/10 p-5 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-lg">{e.dni}</p>
                  <p className="text-white/70">{e.distrito}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-white/60">Votó por:</p>
                <p className="font-semibold">{e.voto || "Nulo"}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}