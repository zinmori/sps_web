import { FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Urgence() {
  const [urgences, setUrgences] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const urgencesData = localStorage.getItem("urgences");
    if (urgencesData) {
      setUrgences(JSON.parse(urgencesData));
    }
  }, []);

  const handleUrgenceSignalée = () => {
    const groupeSanguin = document.getElementById("gs").value;
    if (!groupeSanguin) {
      setErrorMessage("Veuillez choisir un groupe sanguin");
      return;
    }
    setErrorMessage("");

    const date = new Date().toLocaleDateString();
    const nouvelleUrgence = {
      date,
      groupeSanguin,
      statut: "Non satisfait",
    };
    const nouvellesUrgences = [...urgences, nouvelleUrgence];
    setUrgences(nouvellesUrgences);
    localStorage.setItem("urgences", JSON.stringify(nouvellesUrgences));
  };

  const handleStatutSatisfait = (index) => {
    const nouvellesUrgences = [...urgences];
    nouvellesUrgences[index].statut = "Satisfait";
    setUrgences(nouvellesUrgences);
    localStorage.setItem("urgences", JSON.stringify(nouvellesUrgences));
  };

  return (
    <div className="text-center bg-slate-200 w-4/5">
      <br />
      <br />
      <div className="flex justify-center">
        <div className="mb-8 mx-4">
          <select
            id="gs"
            name="gs"
            defaultValue=""
            className="mt-1 block w-full py-2 px-3 border border-white bg-white rounded-xl"
          >
            <option value="" disabled>
              Groupe Sanguin
            </option>
            <option value="O plus">O+</option>
            <option value="O moins">O-</option>
            <option value="A plus">A+</option>
            <option value="A moins">A-</option>
            <option value="B plus">B+</option>
            <option value="B moins">B-</option>
            <option value="AB plus">AB+</option>
            <option value="AB moins">AB-</option>
          </select>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
        <button
          onClick={handleUrgenceSignalée}
          className="border border-red-500 rounded-full px-1 py-2 flex items-center justify-center text-red-500 bg-white"
        >
          <FaPlus className="mr-2" />
          Signaler une urgence
        </button>
      </div>
      <div>
        <h2>Urgences signalées :</h2>
        <table className="border-collapse border border-gray-400 w-full">
          <thead>
            <tr>
              <th className="border border-gray-400 px-4 py-2">
                Date de signalement
              </th>
              <th className="border border-gray-400 px-4 py-2">
                Groupe Sanguin
              </th>
              <th className="border border-gray-400 px-4 py-2">Statut</th>
              <th className="border border-gray-400 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {urgences.map((urgence, index) => (
              <tr key={index}>
                <td className="border border-gray-400 px-4 py-2">
                  {urgence.date}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {urgence.groupeSanguin}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {urgence.statut}
                </td>
                <td className="border border-gray-400 px-4 py-2">
                  {urgence.statut === "Non satisfait" && (
                    <button onClick={() => handleStatutSatisfait(index)}>
                      Marquer comme satisfait
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
