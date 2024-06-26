import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Entree from "./pages/Entree.jsx";
import Sortie from "./pages/Sortie.jsx";
import Givers from "./pages/Givers.jsx";
import Rapport from "./pages/Rapport.jsx";
import Urgence from "./pages/Urgence.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Login from "./pages/Login.jsx";
import { useContext } from "react";
import { UrgenceProvider } from "./utils/UrgenceContext.jsx";
import { AuthContext } from "./utils/AuthContext.jsx";
import { StockProvider } from "./utils/StockContext.jsx";

function isMobileDevice() {
  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}
function App() {
  const { user } = useContext(AuthContext);
  const isMobile = isMobileDevice();
  if (isMobile) {
    return (
      <div className="flex flex-col h-screen font-semibold items-center justify-center text-center">
        <h1>Ce site n'est pas disponible sur les appareils mobiles.</h1>
        <p>Veuillez utiliser un ordinateur pour accéder à ce site.</p>
      </div>
    );
  }
  return (
    <main className="flex h-screen">
      {user ? (
        <StockProvider>
          <UrgenceProvider>
            <Router>
              <Sidebar />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/entree" element={<Entree />} />
                <Route path="/sortie" element={<Sortie />} />
                <Route path="/donneurs" element={<Givers />} />
                <Route path="/rapport" element={<Rapport />} />
                <Route path="/urgence" element={<Urgence />} />
                <Route path="/*" element={<Dashboard />} />
              </Routes>
            </Router>
          </UrgenceProvider>
        </StockProvider>
      ) : (
        <Login />
      )}
    </main>
  );
}

export default App;
