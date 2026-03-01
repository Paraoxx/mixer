import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AppLayout } from "./components/AppLayout"
import { Home } from "./pages/Home"
import { Gallery } from "./pages/Gallery"
import { AdminPanel } from "./pages/AdminPanel"

function App() {
  const [isAdminView, setIsAdminView] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (isAdminView && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-anime-bg flex justify-center items-center p-4 relative overflow-hidden font-sans">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

        <div className="w-full max-w-md bg-black border-2 border-red-600 shadow-[8px_8px_0_#dc2626] p-8 relative z-10 transform -skew-x-2">
          <h1 className="text-3xl font-black text-white italic uppercase tracking-tighter text-center mb-8">
            Acesso Restrito
          </h1>

          <div className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="Senha de Acesso"
              className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-3 focus:outline-none focus:border-red-600 focus:shadow-[4px_4px_0_#dc2626] transition-all"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (e.target.value === 'admin123') setIsAuthenticated(true);
                  else alert('Senha incorreta!');
                }
              }}
              id="adminPwdInput"
            />

            <button
              className="w-full bg-red-600 text-black hover:bg-white hover:text-red-600 px-6 py-4 font-black uppercase tracking-widest text-lg border-2 border-black hover:border-red-600 transition-all shadow-[4px_4px_0_#fff]"
              onClick={() => {
                const pwd = document.getElementById('adminPwdInput').value;
                if (pwd === 'admin123') setIsAuthenticated(true);
                else alert('Senha incorreta!');
              }}
            >
              ENTRAR
            </button>

            <button
              onClick={() => setIsAdminView(false)}
              className="mt-4 text-gray-500 hover:text-white font-bold uppercase tracking-widest text-xs transition-colors text-center"
            >
              Voltar ao Site da Forma Comum
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isAdminView && isAuthenticated) {
    return <AdminPanel onExit={() => { setIsAdminView(false); setIsAuthenticated(false); }} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout onAdminClick={() => setIsAdminView(true)} />}>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Gallery />} />
          <Route path="/categories" element={<div className="p-8 text-2xl font-bold">Categories Placeholder</div>} />
          <Route path="/settings" element={<div className="p-8 text-2xl font-bold">Settings Placeholder</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
