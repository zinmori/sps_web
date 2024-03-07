import { IoIosLogOut } from "react-icons/io";
import { useContext } from "react";
import { AuthContext } from "../utils/AuthContext.jsx";

export default function Footer() {
  const { logout } = useContext(AuthContext);
  return (
    <div className="flex flex-col items-center border-t my-auto pt-4 w-full">
      <button
        className="flex flex-row justify-center p-2 gap-2 w-4/5 bg-red-700 hover:bg-red-600 rounded-md"
        onClick={logout}
      >
        <IoIosLogOut size={30} color="white" />
        <h1 className="font-bold text-white font-sans">Se Déconnecter</h1>
      </button>
    </div>
  );
}
