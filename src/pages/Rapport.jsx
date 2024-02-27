import RentreImg from "../assets/Rentre.jpg";
import RurgenceImg from "../assets/Rurgence.jpg";
import RsortieImg from "../assets/Rsortie.jpg";
import accountImg from "../assets/account.png";
export default function Rapport() {
  return (
    <div className="text-center bg-black-200 w-4/5 p-24 flex items-center justify-center">
      <div className="grid grid-cols-2 gap-4">
        <img src={accountImg} alt="" className="w-1/2 h-auto" />
        <img src={RentreImg} alt="" className="w-1/2 h-auto" />
        <img src={RsortieImg} alt="" className="w-1/2 h-auto" />
        <img src={RurgenceImg} alt="" className="w-1/2 h-auto" />
      </div>
    </div>
  );
}
