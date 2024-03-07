import { useContext, useEffect, useState } from "react";
import InputForm from "../components/InputForm.jsx";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase-config.js";
import { AuthContext } from "../utils/AuthContext.jsx";
import NavigationButton from "../components/NavigationButton.jsx";
import { UrgenceContext } from "../utils/UrgenceContext.jsx";
import { StockContext } from "../utils/StockContext.jsx";

export default function Entree() {
  const [entrees, setEntrees] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [groupe, setGroupe] = useState("A+");
  const [quantite, setQuantite] = useState("");
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const { user } = useContext(AuthContext);
  const { updateStock } = useContext(StockContext);
  const { checkAndDelUrgence } = useContext(UrgenceContext);

  useEffect(() => {
    async function fetchEntrees() {
      const entreeCollectionRef = collection(db, "dons", user.email, "data");
      const entreeSnapshot = await getDocs(entreeCollectionRef);
      const entreeList = entreeSnapshot.docs.map((doc) => {
        const seconds = doc.data().date.seconds;
        return {
          ...doc.data(),
          date: new Date(seconds * 1000),
        };
      });
      setEntrees(entreeList);
    }
    fetchEntrees();
  }, [user]);

  async function addEntree() {
    const entreeCollectionRef = collection(db, "dons", user.email, "data");
    if (groupe === "" || quantite === "" || quantite.includes("-")) {
      setError("Veuillez fournir des valeurs valides.");
      return;
    }
    const newEntree = {
      date: new Date(date),
      groupe: groupe,
      quantite: parseInt(quantite),
    };
    const newQuantite = await updateStock(groupe, parseInt(quantite));
    if (newQuantite === "error") {
      setError("Operation impossible. Stock insuffisant.");
      return;
    }
    setError("");
    setQuantite("");
    await addDoc(entreeCollectionRef, newEntree);
    setEntrees([newEntree, ...entrees]);
    await checkAndDelUrgence(groupe, newQuantite);
  }

  const itemsPerPage = 5;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, entrees.length);
  const paginatedEntrees = entrees
    .sort((a, b) => b.date - a.date)
    .slice(startIndex, endIndex);

  function handleNextPage() {
    setCurrentPage((prevPage) =>
      endIndex === entrees.length ? prevPage : prevPage + 1
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
          defaultValue={"A+"}
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
        <button
          onClick={addEntree}
          className="bg-red-400 hover:bg-red-600 text-white rounded-md w-28 p-2"
        >
          Ajouter
        </button>
        {error.length !== 0 && (
          <p className="text-red-600 font-light">{error}</p>
        )}
      </InputForm>
      <div className="w-4/5 bg-white mx-4 p-4 rounded-md">
        <table className="w-full table-auto">
          <thead className="bg-gray-200">
            <tr className="text-center text-gray-700">
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Groupe</th>
              <th className="py-2 px-4">Quantité</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedEntrees.map((entree, index) => (
              <tr key={index} className="text-gray-800">
                <td className="py-2 px-4">
                  {entree.date.toLocaleDateString()}
                </td>
                <td className="py-2 px-4">{entree.groupe}</td>
                <td className="py-2 px-4">{entree.quantite}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <NavigationButton
        currentPage={currentPage}
        data={entrees}
        endIndex={endIndex}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
      />
    </div>
  );
}
