import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase-config.js";
import Dashboard from "./pages/Dashboard.jsx";
import Entree from "./pages/Entree.jsx";
import Sortie from "./pages/Sortie.jsx";
import Givers from "./pages/Givers.jsx";
import Rapport from "./pages/Rapport.jsx";
import Urgence from "./pages/Urgence.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Login from "./pages/Login.jsx";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  async function login(email, password) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function logout() {
    await signOut(auth);
  }

  return (
    <main className="flex h-screen">
      {user ? (
        <>
          <Router>
            <Sidebar logout={logout} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/entree" element={<Entree />} />
              <Route path="/sortie" element={<Sortie />} />
              <Route path="/donneurs" element={<Givers />} />
              <Route path="/rapport" element={<Rapport />} />
              <Route path="/urgence" element={<Urgence />} />
            </Routes>
          </Router>
        </>
      ) : (
        <Login login={login} />
      )}
    </main>
  );
}

export default App;
