import { db } from "../firebase-config.js";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Today() {
  const [entree, setEntree] = useState([]);
  const [sortie, setSortie] = useState([]);
  const [stock, setStock] = useState([]);

  useEffect(() => {
    const stockCollectionRef = collection(
      db,
      "stock",
      "afagnan@gmail.com",
      "banque"
    );
    const entreeCollectionRef = collection(db, "dons");
    const sortieCollectionRef = collection(db, "sorties");

    const getData = async () => {
      const stockData = await getDocs(stockCollectionRef);
      const entreeData = await getDocs(entreeCollectionRef);
      const sortieData = await getDocs(sortieCollectionRef);
      setStock(stockData.docs.map((doc) => ({ ...doc.data() })));
      setEntree(entreeData.docs.map((doc) => ({ ...doc.data() })));
      setSortie(sortieData.docs.map((doc) => ({ ...doc.data() })));
    };
    getData();
  }, []);

  const entreeToday = entree.reduce((acc, don) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayString = today.toDateString();
    const seconds = don.date.seconds;
    if (new Date(seconds * 1000).toDateString() === todayString) {
      acc += don.quantite;
    }
    return acc;
  }, 0);

  const sortieToday = sortie.reduce((acc, sortie) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayString = today.toDateString();
    const seconds = sortie.date.seconds;
    if (new Date(seconds * 1000).toDateString() === todayString) {
      acc += sortie.quantite;
    }
    return acc;
  }, 0);

  const restantToday = stock.reduce((acc, item) => {
    acc += item.quantite;
    return acc;
  }, 0);

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="uppercase text-2xl text-center border-b-2 border-red-600 p-2 m-3 w-2/5">
        Ajourd'hui
      </p>
      <p className="font-bold">
        Entrée : <span className="text-red-600 px-4">{entreeToday}</span>
      </p>
      <p className="font-bold">
        Sortie : <span className="text-red-600 px-4">{sortieToday}</span>
      </p>
      <p className="font-bold">
        Restant : <span className="text-red-600 px-4">{restantToday}</span>
      </p>
    </div>
  );
}
