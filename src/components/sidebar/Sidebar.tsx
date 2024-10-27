import Link from "next/link";
import { Items } from "./Items"; // Make sure Items is capitalized as it's a React component
import { doLogout } from "@/app/actions";
const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", link: "/", icon: "🏠" },
    { name: "Inventory", link: "/inventory", icon: "📦" },
    { name: "Member", link: "/member", icon: "👤" },
    { name: "Activity", link: "/activity", icon: "📊" },
    { name: "Services", link: "/service", icon: "🛠" },
  ];

  const bottomMenuItems = [
    { name: "Setting", link: "/setting", icon: "⚙️" },
    { name: "Logout", link: "/", icon: "🚪" },
  ];

  return (
    <div className="h-auto w-53  text-secondary fixed flex flex-col justify-between text-sm ">
      <ul className="mt-5">
        {menuItems.map((item) => (
          <li key={item.name} className="p-4 hover:bg-primary hover:rounded-lg ">
            {item.name ==="Logout"?(
              <button onClick={()=>doLogout}>
                <Items text={item.name} icon={item.icon}/>
              </button>
            ):
            <Link href={item.link}>
              <Items text={item.name} icon={item.icon} />
            </Link>}
          </li>
        ))}
      </ul>
      <ul className="mt-5">
        {bottomMenuItems.map((item) => (
          <li key={item.name} className="p-4 hover:bg-primary hover:rounded-lg">
            <Link href={item.link}>
              <Items text={item.name} icon={item.icon} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
