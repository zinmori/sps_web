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
import {
  LimitProvider,
  AuthContext,
  UrgenceProvider,
  StockProvider,
} from "./utils/Context.jsx";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <main className="flex h-screen">
      {user ? (
        <StockProvider>
          <LimitProvider>
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
                </Routes>
              </Router>
            </UrgenceProvider>
          </LimitProvider>
        </StockProvider>
      ) : (
        <Login />
      )}
    </main>
  );
}

export default App;
