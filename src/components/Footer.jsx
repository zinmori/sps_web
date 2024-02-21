import { IoIosLogOut } from "react-icons/io";

export default function Footer() {
  return (
    <div className="flex flex-col items-center border-t my-auto py-4 w-full">
      <button className="flex flex-row items-center p-2 gap-4 w-3/5 bg-red-700 hover:bg-red-600 rounded-md">
        <IoIosLogOut size={30} color="white" />
        <h1 className="font-bold text-white font-sans">Se Déconnecter</h1>
      </button>
    </div>
  );
}
