import { useContext, useState } from "react";
import { UrgenceContext } from "../utils/UrgenceContext";
import { RiAlarmWarningLine } from "react-icons/ri";
import NavigationButton from "../components/NavigationButton";

export default function Urgence() {
  const { urgences } = useContext(UrgenceContext);
  const [currentPage, setCurrentPage] = useState(0);

  urgences.sort((a, b) => b.date - a.date);

  const itemsPerPage = 5;
  const startIndex = currentPage * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, urgences.length);
  const paginatedUrgences = urgences
    .sort((a, b) => b.date - a.date)
    .slice(startIndex, endIndex);

  function handleNextPage() {
    setCurrentPage((prevPage) =>
      endIndex === urgences.length ? prevPage : prevPage + 1
    );
  }

  function handlePreviousPage() {
    setCurrentPage((prevPage) => (prevPage === 0 ? prevPage : prevPage - 1));
  }

  return (
    <div className="text-center bg-slate-200 w-4/5 flex flex-col items-center justify-center">
      <div className="flex flex-row items-center gap-4 m-2 bg-white rounded-lg p-2">
        <RiAlarmWarningLine size={90} className="text-red-600" />
        <h1 className="text-2xl font-semibold my-4">Urgences Signalées</h1>
      </div>
      <div className="rounded-md bg-white w-4/5 m-auto p-4">
        <table className="table-auto my-4 w-full">
          <thead className="bg-gray-200">
            <tr className="text-center text-gray-700">
              <th className="py-2 px-4">Date de signalement</th>
              <th className="py-2 px-4">Groupe</th>
              <th className="py-2 px-4">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedUrgences.map((urgence, index) => (
              <tr key={index} className="text-gray-800">
                <td className="py-2 px-4">
                  {urgence.date.toLocaleDateString()}
                </td>
                <td className="py-2 px-4">{urgence.groupe}</td>
                <td
                  className={`py-2 px-4 rounded-md ${
                    urgence.satisfait ? "bg-green-600" : "bg-red-600"
                  }`}
                >
                  {urgence.satisfait ? "Satisfait" : "En cours..."}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <NavigationButton
        data={urgences}
        currentPage={currentPage}
        endIndex={endIndex}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
      />
    </div>
  );
}
