import StockSang from "../components/StockSang.jsx";
import InfoItem from "../components/InfoItem.jsx";
import { BiSolidDownload } from "react-icons/bi";
import EvolutionDon from "../components/EvolutionDon.jsx";

export default function Dashboard() {
  return (
    <div className="bg-slate-200 w-4/5 flex flex-row p-1 gap-1">
      <div className="w-3/5 h-full flex flex-col items-center justify-center">
        <StockSang />
      </div>
      <div className="w-2/5 h-full flex flex-col gap-1">
        <div className="h-1/6 rounded-xl flex flex-row items-center justify-center gap-1">
          <InfoItem title="Donneurs" chiffre="+ 5123" />
          <InfoItem title="Dons" chiffre="+ 7865" />
        </div>
        <div className="h-1/4 bg-slate-100 rounded-xl flex flex-col items-center justify-center">
          <p className="uppercase text-2xl text-center border-b-2 border-red-600 p-2 w-2/5">
            Ajourd'hui
          </p>
          <p className="font-bold">
            Entrée : <span className="text-red-600 px-4">145</span>
          </p>
          <p className="font-bold">
            Sortie : <span className="text-red-600 px-4">67</span>
          </p>
          <p className="font-bold">
            Restant : <span className="text-red-600 px-4">456</span>
          </p>
        </div>
        <div className="h-1/2 bg-gradient-to-t from-slate-400 to-slate-200 p-4 rounded-xl text-center">
          <EvolutionDon />
        </div>
        <div className="h-1/12">
          <button className="w-full rounded-md ring-2 ring-red-600 bg-white py-2 flex items-center justify-center gap-2 text-red-600 hover:bg-red-600 hover:text-white">
            <BiSolidDownload size={20} /> Telecharger ce rapport en PDF
          </button>
        </div>
      </div>
    </div>
  );
}
