import SidebarItem from "./SidebarItem";
import Banner from "./Banner.jsx";
import Footer from "./Footer.jsx";

export default function Sidebar() {
  return (
    <aside className="border-r-2 w-1/4 h-screen flex flex-col items-center">
      <Banner />
      <SidebarItem title="Dashboard" />
      <SidebarItem title="Donneurs" />
      <SidebarItem title="Entrée" />
      <SidebarItem title="Sortie" />
      <SidebarItem title="Urgence" />
      <SidebarItem title="Report" />
      <Footer />
    </aside>
  );
}
