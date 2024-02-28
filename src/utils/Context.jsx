import { createContext, useEffect, useState, useContext } from "react";
import { db } from "../firebase-config.js";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase-config.js";

export const LimitContext = createContext();
export const AuthContext = createContext();

export const LimitProvider = ({ children }) => {
  const [limite, setLimite] = useState(0);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const limiteDocRef = doc(db, "limite", user.email);
    const getLimite = async () => {
      const data = await getDoc(limiteDocRef);
      setLimite(data.data().limite);
    };
    getLimite();
  }, [user]);

  async function updateLimite(newLimite) {
    setLimite(newLimite);
    const limiteDocumentRef = doc(db, "limite", user.email);
    await updateDoc(limiteDocumentRef, { limite: parseInt(newLimite) });
  }

  return (
    <LimitContext.Provider value={{ limite, updateLimite }}>
      {children}
    </LimitContext.Provider>
  );
};

export const AuthProvider = ({ children }) => {
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
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
