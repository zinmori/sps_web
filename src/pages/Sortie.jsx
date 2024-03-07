import { useContext, useEffect, useState } from "react";
import InputForm from "../components/InputForm.jsx";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase-config.js";
import { UrgenceContext } from "../utils/UrgenceContext.jsx";
import { StockContext } from "../utils/StockContext.jsx";
import { AuthContext } from "../utils/AuthContext.jsx";
import NavigationButton from "../components/NavigationButton.jsx";

export default function Sortie() {
  const [sorties, setSorties] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [groupe, setGroupe] = useState("A+");
  const [quantite, setQuantite] = useState("");
  const [hopital, setHopital] = useState("CHU Campus");
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const { user } = useContext(AuthContext);
  const { updateStock } = useContext(StockContext);
  const { checkAndAddUrgence } = useContext(UrgenceContext);

  useEffect(() => {
    async function fetchSorties() {
      const sortieCollectionRef = collection(db, "sorties", user.email, "data");
      const sortieSnapshot = await getDocs(sortieCollectionRef);
      const sortieList = sortieSnapshot.docs.map((doc) => {
        const seconds = doc.data().date.seconds;
        return {
          ...doc.data(),
          date: new Date(seconds * 1000),
        };
      });
      setSorties(sortieList);
    }
    fetchSorties();
  }, [user]);

  async function addSortie() {
    if (groupe === "" || quantite === "") {
      console.log(groupe, quantite, hopital, date);
      setError(true);
      return;
    }
    setError(false);
    const sortieCollectionRef = collection(db, "sorties", user.email, "data");
    const newSortie = {
      date: new Date(date),
      groupe: groupe,
      quantite: parseInt(quantite),
      hopital: hopital,
    };
    await addDoc(sortieCollectionRef, newSortie);
    setQuantite("");
    setSorties([newSortie, ...sorties]);
    const newQuantite = await updateStock(groupe, -parseInt(quantite));
    await checkAndAddUrgence(groupe, newQuantite);
  }

  const itemsPerPage = 5;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, sorties.length);
  const paginatedEntrees = sorties
    .sort((a, b) => b.date - a.date)
    .slice(startIndex, endIndex);

  function handleNextPage() {
    setCurrentPage((prevPage) =>
      endIndex === sorties.length ? prevPage : prevPage + 1
    );
  }

  function handlePreviousPage() {
    setCurrentPage((prevPage) => (prevPage === 0 ? prevPage : prevPage - 1));
  }

  return (
    <div className="text-center bg-slate-200 w-4/5 flex flex-col items-center">
      <InputForm>
        <input
          type="date"
          className="rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-600"
          placeholder="Date..."
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <select
          className="rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-600"
          value={groupe}
          onChange={(e) => setGroupe(e.target.value)}
        >
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>
        <input
          type="number"
          className="rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-600"
          placeholder="Quantite..."
          value={quantite}
          onChange={(e) => setQuantite(e.target.value)}
        />
        <select
          className="rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-600"
          value={hopital}
          onChange={(e) => setHopital(e.target.value)}
        >
          <option value="CHU Campus">CHU Campus</option>
          <option value="CHU Tokoin">CHU Tokoin</option>
          <option value="Hopital de Bè">Hopital de Bè</option>
          <option value="Hopital Saint Jean de Dieu">
            Hopital Saint Jean de Dieu
          </option>
          <option value="CHU Kara">CHU Kara</option>
        </select>
        <button
          onClick={addSortie}
          className="bg-red-400 hover:bg-red-600 text-white rounded-md w-28 p-2"
        >
          Ajouter
        </button>
        {error && (
          <p className="text-red-600 font-light">
            Veuillez remplir tous les champs.
          </p>
        )}
      </InputForm>
      <div className="w-4/5 bg-white mx-4 p-4 rounded-md">
        <table className="w-full table-auto">
          <thead className="bg-gray-200">
            <tr className="text-center text-gray-700">
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Groupe</th>
              <th className="py-2 px-4">Quantité</th>
              <th className="py-2 px-4">Hôpital</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedEntrees.map((sortie, index) => (
              <tr key={index} className="text-gray-800">
                <td className="py-2 px-4">
                  {sortie.date.toLocaleDateString()}
                </td>
                <td className="py-2 px-4">{sortie.groupe}</td>
                <td className="py-2 px-4">{sortie.quantite}</td>
                <td className="py-2 px-4">{sortie.hopital}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <NavigationButton
        currentPage={currentPage}
        data={sorties}
        endIndex={endIndex}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
      />
    </div>
  );
}
