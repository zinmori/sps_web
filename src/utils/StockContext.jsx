import { useState, useContext, useEffect, createContext } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config.js";
import { AuthContext } from "./AuthContext.jsx";

export const StockContext = createContext();

export const StockProvider = ({ children }) => {
  const [stock, setStock] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function fetchStock() {
      const stockCollectionRef = collection(db, "stock", user.email, "banque");
      const stockSnapshot = await getDocs(stockCollectionRef);
      const stockList = stockSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setStock(stockList);
    }
    fetchStock();
  }, [user]);

  async function updateStock(groupe, quantite) {
    const stockCollectionRef = collection(db, "stock", user.email, "banque");
    const stockRef = doc(stockCollectionRef, groupe);
    const old = stock.find((item) => item.groupe === groupe);
    console.log(old.quantite, "Updating stock...");
    const newQuantite = old.quantite + quantite;
    if (newQuantite < 0) {
      return "error";
    }
    await updateDoc(stockRef, { quantite: newQuantite });
    setStock((prevStock) =>
      prevStock.map((item) =>
        item.groupe === groupe ? { ...item, quantite: newQuantite } : item
      )
    );
    console.log(newQuantite, "Stock updated.");
    return newQuantite;
  }

  return (
    <StockContext.Provider value={{ stock, updateStock }}>
      {children}
    </StockContext.Provider>
  );
};
