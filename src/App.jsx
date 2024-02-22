import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Entree from "./pages/Entree.jsx";
import Sortie from "./pages/Sortie.jsx";
import Givers from "./pages/Givers.jsx";
import Report from "./pages/Report.jsx";
import Urgence from "./pages/Urgence.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Login from "./pages/Login.jsx";

function App() {
  return (
    <main className="flex h-screen">
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/entree" element={<Entree />} />
          <Route path="/sortie" element={<Sortie />} />
          <Route path="/donneurs" element={<Givers />} />
          <Route path="/report" element={<Report />} />
          <Route path="/urgence" element={<Urgence />} />
        </Routes>
      </Router>
    </main>
  );
}

export default App;
