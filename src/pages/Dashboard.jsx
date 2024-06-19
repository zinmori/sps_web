import StockSang from "../components/StockSang.jsx";
import InfoItem from "../components/InfoItem.jsx";
import EvolutionDon from "../components/EvolutionDon.jsx";
import Today from "../components/Today.jsx";
import { useEffect, useState, useContext } from "react";
import { db } from "../firebase-config.js";
import { collection, getDocs } from "firebase/firestore";
import { AuthContext } from "../utils/AuthContext.jsx";

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
      setDons(DonsData.docs.length);
    };
    getData();
  }, [user]);

  return (
    <div className="bg-slate-200 w-4/5 flex flex-row p-1 gap-1">
      <div className="w-3/5 h-full flex flex-col items-center justify-center">
        <StockSang />
      </div>
      <div className="w-2/5 h-full flex flex-col gap-1">
        <div className="h-1/4 rounded-xl flex flex-row items-center justify-center gap-1">
          <InfoItem title="Donneurs" chiffre={`+ ${donneurs}`} />
          <InfoItem title="Dons" chiffre={`+ ${dons}`} />
        </div>
        <div className="h-1/4 bg-slate-100 rounded-xl">
          <Today />
        </div>
        <div className="h-1/2 p-4 rounded-xl text-center">
          <EvolutionDon />
        </div>
      </div>
    </div>
  );
}
