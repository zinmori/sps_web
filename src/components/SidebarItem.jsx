import { Link, useMatch, resolvePath } from "react-router-dom";

export default function SidebarItem({ title, icon }) {
  const Icon = icon;
  let path = title.toLowerCase();
  if (title === "Dashboard") path = "/";
  if (title === "Entrée") path = "/entree";

  const resolvedPath = resolvePath(path);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <Link className="m-1 w-4/5" to={path}>
      <button
        className={`flex flex-row items-center gap-4 p-2
       hover:bg-red-100 hover:text-red-700 
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
