import { createContext, useEffect, useState } from "react";
import { db } from "../firebase-config.js";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";

export const LimitContext = createContext();

export const LimitProvider = ({ children }) => {
  const [limite, setLimite] = useState(0);

  useEffect(() => {
    const limiteCollectionRef = collection(db, "limite");
    const getLimite = async () => {
      const data = await getDocs(limiteCollectionRef);
      setLimite(data.docs[0].data().limite);
    };
    getLimite();
  }, []);

  async function updateLimite(newLimite) {
    const limiteDocumentRef = doc(db, "limite/1");
    await updateDoc(limiteDocumentRef, { limite: parseInt(newLimite) });
    setLimite(newLimite);
  }

  return (
    <LimitContext.Provider value={{ limite, updateLimite }}>
      {children}
    </LimitContext.Provider>
  );
};
