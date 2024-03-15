import entreImg from "../assets/entre.jpg";
import urgenceImg from "../assets/urgence.jpg";
import sortieImg from "../assets/sortie.jpg";
import genImg from "../assets/general.jpg";
import RapportItem from "../components/RapportItem.jsx";
import {
  rapportEntreePDF,
  rapportGeneralPDF,
  rapportSortiePDF,
  rapportUrgencePDF,
} from "../utils/rapports.js";
import { useContext } from "react";
import { AuthContext } from "../utils/AuthContext.jsx";

export default function Rapport() {
  const { user } = useContext(AuthContext);
  const email = user.email;

  return (
    <div className="w-4/5 flex justify-center items-center h-screen bg-slate-200">
      <div className="grid grid-cols-2 gap-8">
        <RapportItem
          title="Rapport Général"
          img={genImg}
          onDownload={() => rapportGeneralPDF(email)}
        />
        <RapportItem
          title="Rapport sur les Entrées"
          img={entreImg}
          onDownload={() => rapportEntreePDF(email)}
        />
        <RapportItem
          title="Rapport sur les Sorties"
          img={sortieImg}
          onDownload={() => rapportSortiePDF(email)}
        />
        <RapportItem
          title="Rapport sur les Urgences"
          img={urgenceImg}
          onDownload={() => rapportUrgencePDF(email)}
        />
      </div>
    </div>
  );
}
