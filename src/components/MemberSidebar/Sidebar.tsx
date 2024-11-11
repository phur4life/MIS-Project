// // import Link from "next/link";
// // import { Items } from "./Items"; // Make sure Items is capitalized as it's a React component
// // import { doLogout } from "@/app/actions";
// // const MemberSidebar = () => {
// //   const menuItems = [
// //     { name: "Dashboard", link: "/member/dashboard", icon: "🏠" },
// //     { name: "Inventory", link: "/member/inventory", icon: "📦" },
// //     { name: "Activity", link: "/member/activity", icon: "📊" },
// //     { name: "Services", link: "/member/service", icon: "🛠" },
// //   ];

// //   const bottomMenuItems = [
// //     { name: "Setting", link: "/member/setting", icon: "⚙️" },
// //     { name: "Logout", link: "/", icon: "🚪" },
// //   ];

// //   return (
// //     <div className="h-auto w-53  text-secondary fixed flex flex-col justify-between text-sm ">
// //       <ul className="mt-5">
// //         {menuItems.map((item) => (
// //           <li key={item.name} className="p-4 hover:bg-primary hover:rounded-lg ">
// //             {item.name ==="Logout"?(
// //               <button onClick={()=>doLogout}>
// //                 <Items text={item.name} icon={item.icon}/>
// //               </button>
// //             ):
// //             <Link href={item.link}>
// //               <Items text={item.name} icon={item.icon} />
// //             </Link>}
// //           </li>
// //         ))}
// //       </ul>
// //       <ul className="mt-5">
// //         {bottomMenuItems.map((item) => (
// //           <li key={item.name} className="p-4 hover:bg-primary hover:rounded-lg">
// //             <Link href={item.link}>
// //               <Items text={item.name} icon={item.icon} />
// //             </Link>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default MemberSidebar;

// import Link from "next/link";
// import { Items } from "./Items"; // Make sure Items is capitalized as it's a React component
// import { doLogout } from "@/app/actions";
// import { useRouter } from "next/navigation"; // for determining the active link

// const MemberSidebar = () => {
//   const router = useRouter(); // useRouter hook to access current route

//   const menuItems = [
//     { name: "Dashboard", link: "/member/dashboard", icon: "🏠" },
//     { name: "Inventory", link: "/member/inventory", icon: "📦" },
//     { name: "Activity", link: "/member/activity", icon: "📊" },
//     { name: "Services", link: "/member/service", icon: "🛠" },
//   ];

//   const bottomMenuItems = [
//     { name: "Setting", link: "/member/setting", icon: "⚙️" },
//     { name: "Logout", link: "/", icon: "🚪" },
//   ];

//   return (
//     <div className="h-auto w-53 text-secondary fixed flex flex-col justify-between text-sm">
//       <ul className="mt-5">
//         {menuItems.map((item) => (
//           <li
//             key={item.name}
//             className={`p-4 hover:bg-primary hover:rounded-lg transition duration-300 ease-in-out ${
//               router.pathname === item.link ? "bg-primary text-white" : ""
//             }`}
//           >
//             {item.name === "Logout" ? (
//               <button onClick={() => doLogout()}>
//                 <Items text={item.name} icon={item.icon} />
//               </button>
//             ) : (
//               <Link href={item.link}>
//                 <Items text={item.name} icon={item.icon} />
//               </Link>
//             )}
//           </li>
//         ))}
//       </ul>
//       <ul className="mt-5">
//         {bottomMenuItems.map((item) => (
//           <li
//             key={item.name}
//             className={`p-4 hover:bg-primary hover:rounded-lg transition duration-300 ease-in-out ${
//               router.pathname === item.link ? "bg-primary text-white" : ""
//             }`}
//           >
//             <Link href={item.link}>
//               <Items text={item.name} icon={item.icon} />
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MemberSidebar;

import Link from "next/link";
import { Items } from "./Items"; // Make sure Items is capitalized as it's a React component
import { doLogout } from "@/app/actions";
import { useRouter } from "next/navigation"; // for determining the active link

const MemberSidebar = () => {
  const router = useRouter(); // useRouter hook to access current route

  const menuItems = [
    { name: "Dashboard", link: "/member/dashboard", icon: "🏠" },
    { name: "Inventory", link: "/member/inventory", icon: "📦" },
    { name: "Activity", link: "/member/activity", icon: "📊" },
    { name: "Services", link: "/member/service", icon: "🛠" },
  ];

  const bottomMenuItems = [
    { name: "Setting", link: "/member/setting", icon: "⚙️" },
    { name: "Logout", link: "/", icon: "🚪" },
  ];

  return (
    <div className="h-auto w-53 text-secondary fixed flex flex-col justify-between text-sm">
      <ul className="mt-5">
        {menuItems.map((item) => (
          <li
            key={item.name}
            className={`p-4 hover:bg-primary hover:rounded-lg transition duration-300 ease-in-out ${
              router.pathname === item.link ? "bg-primary text-white" : ""
            }`}
          >
            {item.name === "Logout" ? (
              <button onClick={() => doLogout()}>
                <Items text={item.name} icon={item.icon} />
              </button>
            ) : (
            <Link href={item.link}>
              <Items text={item.name} icon={item.icon} />
              </Link>
            )}
          </li>
        ))}
      </ul>
      <ul className="mt-5">
        {bottomMenuItems.map((item) => (
          <li
            key={item.name}
            className={`p-4 hover:bg-primary hover:rounded-lg transition duration-300 ease-in-out ${
              router.pathname === item.link ? "bg-primary text-white" : ""
            }`}
          >
            <Link href={item.link}>
              <Items text={item.name} icon={item.icon} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemberSidebar;
