import { Link } from "react-router-dom";
import {
  BsBoxArrowInDown,
  BsBoxArrowUp,
  BsLayoutWtf,
  BsDash,
} from "react-icons/bs";
import { FaHandHoldingHeart } from "react-icons/fa";
import { RiAlarmWarningLine } from "react-icons/ri";

export default function SidebarItem({ title }) {
  let icon;
  switch (title) {
    case "Dashboard":
      icon = <BsLayoutWtf size={30} />;
      break;
    case "Donneurs":
      icon = <FaHandHoldingHeart size={30} />;
      break;
    case "Entrée":
      icon = <BsBoxArrowInDown size={30} />;
      break;
    case "Sortie":
      icon = <BsBoxArrowUp size={30} />;
      break;
    case "Urgence":
      icon = <RiAlarmWarningLine size={30} />;
      break;
    default:
      icon = <BsDash size={30} />;
  }
  return (
    <div className="flex flex-row items-center gap-2 m-2 p-2 bg-stone-400 text-white w-4/5 rounded-md">
      {icon}
      <Link
        className="m-2"
        to={title === "Dashboard" ? "/" : title.toLowerCase()}
      >
        {title}
      </Link>
    </div>
  );
}
