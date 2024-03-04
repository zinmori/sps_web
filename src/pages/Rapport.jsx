import entreImg from "../assets/entre.jpg";
import urgenceImg from "../assets/urgence.jpg";
import sortieImg from "../assets/sortie.jpg";
import genImg from "../assets/general.jpg";
import RapportItem from "../components/RapportItem.jsx";

export default function Rapport() {
  return (
    <div className="w-4/5 flex justify-center items-center h-screen bg-slate-200">
      <div className="grid grid-cols-2 gap-8">
        <RapportItem title="Rapport Général" img={genImg} />
        <RapportItem title="Rapport sur les Entrées" img={entreImg} />
        <RapportItem title="Rapport sur les Sorties" img={sortieImg} />
        <RapportItem title="Rapport sur les Urgences" img={urgenceImg} />
      </div>
    </div>
  );
}
