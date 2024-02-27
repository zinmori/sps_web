import "../assets/Rentre.jpg";
import "../assets/Rgeneral.jpg";
import "../assets/Rurgence.jpg";
import "../assets/Rsortie.jpg";
import {  } from "../assets/account.png";
export default function Rapport() {
  return (
    <div className="text-center bg-black-200 w-4/5">
      <div className="grid grid-cols-2 gap-4">
          <img src="../assets/account.png" alt="" className="w-full h-auto" />
          <img src="Rentre.jpg" alt="" className="w-full h-auto" />
          <img src="Rsortie.jpg" alt="" className="w-full h-auto" />
          <img src="Rurgence.jpg" alt="" className="w-full h-auto" />
        </div>
      <div className="flex flex-col justify-end items-center bg-black-200 w-full h-screen">
        <p className="text-white text-2xl bg-black p-2 w-full">COPYRIGHT 2023 - 2024</p>
      </div>
    </div>
  );
}
