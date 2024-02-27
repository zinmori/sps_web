import SidebarItem from "./SidebarItem";
import Banner from "./Banner.jsx";
import Footer from "./Footer.jsx";
import { BsBoxArrowInDown, BsBoxArrowUp, BsLayoutWtf } from "react-icons/bs";
import { FaHandHoldingDroplet } from "react-icons/fa6";
import { RiAlarmWarningLine } from "react-icons/ri";
import { IoDocumentTextOutline } from "react-icons/io5";

export default function Sidebar({ logout }) {
  return (
    <aside className="border-r-2 w-1/4 h-screen flex flex-col items-center bg-red-50">
      <Banner />
      <SidebarItem title="Dashboard" icon={BsLayoutWtf} />
      <SidebarItem title="Donneurs" icon={FaHandHoldingDroplet} />
      <SidebarItem title="Entrée" icon={BsBoxArrowInDown} />
      <SidebarItem title="Sortie" icon={BsBoxArrowUp} />
      <SidebarItem title="Urgence" icon={RiAlarmWarningLine} />
      <SidebarItem title="Rapport" icon={IoDocumentTextOutline} />
      <Footer logout={logout} />
    </aside>
  );
}
