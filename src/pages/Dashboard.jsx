import StockSang from "../components/StockSang.jsx";
import InfoItem from "../components/InfoItem.jsx";
import { BiSolidDownload } from "react-icons/bi";
import EvolutionDon from "../components/EvolutionDon.jsx";
import Today from "../components/Today.jsx";
import { useEffect, useState, useContext } from "react";
import { db } from "../firebase-config.js";
import { collection, getDocs } from "firebase/firestore";
import { AuthContext } from "../utils/Context.jsx";

export default function Dashboard() {
  const [donneurs, setDonneurs] = useState(0);
  const [dons, setDons] = useState(0);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const donneursCollectionRef = collection(db, "users");
    const donsCollectionRef = collection(db, "dons", user.email, "data");
    const getData = async () => {
      const DonneursData = await getDocs(donneursCollectionRef);
      const DonsData = await getDocs(donsCollectionRef);
      setDonneurs(DonneursData.docs.length);
      setDons(DonsData.docs.reduce((acc, doc) => acc + doc.data().quantite, 0));
    };
    getData();
  }, [user]);

  return (
    <div className="bg-slate-200 w-4/5 flex flex-row p-1 gap-1">
      <div className="w-3/5 h-full flex flex-col items-center justify-center">
        <StockSang />
      </div>
      <div className="w-2/5 h-full flex flex-col gap-1">
        <div className="h-1/6 rounded-xl flex flex-row items-center justify-center gap-1">
          <InfoItem title="Donneurs" chiffre={`+ ${donneurs}`} />
          <InfoItem title="Dons" chiffre={`+ ${dons}`} />
        </div>
        <div className="h-1/4 bg-slate-100 rounded-xl">
          <Today />
        </div>
        <div className="h-1/2 bg-gradient-to-t from-slate-400 to-slate-200 p-4 rounded-xl text-center">
          <EvolutionDon />
        </div>
        <div className="h-1/12">
          <button className="w-full rounded-md ring-2 ring-red-600 bg-gradient-to-b from-red-600 to-slate-200 py-2 flex items-center justify-center gap-2 text-red-600 hover:text-white">
            <BiSolidDownload size={20} /> Telecharger ce rapport en PDF
          </button>
        </div>
      </div>
    </div>
  );
}
