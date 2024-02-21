import { IoIosLogOut } from "react-icons/io";

export default function Footer() {
  return (
    <div className="flex flex-row items-center p-2 mb-1 mt-4 gap-2 w-3/5 border-b bg-red-700 rounded-md">
      <IoIosLogOut size={30} color="white" />
      <h1 className="font-bold text-white font-sans">Se Déconnecter</h1>
    </div>
  );
}
