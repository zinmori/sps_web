import { Link, useMatch, resolvePath } from "react-router-dom";
import {
  BsBoxArrowInDown,
  BsBoxArrowUp,
  BsLayoutWtf,
  BsDash,
} from "react-icons/bs";
import { FaHandHoldingDroplet } from "react-icons/fa6";
import { RiAlarmWarningLine } from "react-icons/ri";
import { IoDocumentTextOutline } from "react-icons/io5";

export default function SidebarItem({ title }) {
  let Icon;
  switch (title) {
    case "Dashboard":
      Icon = BsLayoutWtf;
      break;
    case "Donneurs":
      Icon = FaHandHoldingDroplet;
      break;
    case "Entrée":
      Icon = BsBoxArrowInDown;
      break;
    case "Sortie":
      Icon = BsBoxArrowUp;
      break;
    case "Urgence":
      Icon = RiAlarmWarningLine;
      break;
    case "Report":
      Icon = IoDocumentTextOutline;
      break;
    default:
      Icon = BsDash;
  }

  const path =
    title === "Dashboard"
      ? "/"
      : title === "Entrée"
      ? "entree"
      : title.toLowerCase();

  const resolvedPath = resolvePath(path);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <Link
      className="m-1 w-4/5"
      to={
        title === "Dashboard"
          ? "/"
          : title === "Entrée"
          ? "entree"
          : title.toLowerCase()
      }
    >
      <button
        className={`flex flex-row items-center gap-4 p-2
       hover:bg-red-300 hover:text-red-700 
       w-full rounded-md ${
         isActive ? "ring-2 ring-red-700 text-red-700" : "text-black"
       } `}
      >
        <p>
          <Icon size={35} />
        </p>
        <p className="font-bold">{title}</p>
      </button>
    </Link>
  );
}
