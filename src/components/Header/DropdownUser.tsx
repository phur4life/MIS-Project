"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ClickOutside from "../ClickOutside";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null); // Allow user to be User or null
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      if (!session?.user) {
        router.push("/");
      } else {
        setUser(session.user as User); // Cast session.user to User if necessary
      }
    };

    fetchSession();
  }, [router]);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        onClick={toggleDropdown}
        className="flex items-center gap-4"
        href="#"
      >
        <span className="h-12 w-12 rounded-full">
          <Image
            width={112}
            height={112}
            src={user?.image || "/images/logo/logo.png"} // Fallback image if user.image is null
            alt={user?.name || "User"}
            className="overflow-hidden rounded-full"
          />
        </span>

        <span className="flex items-center gap-2 font-medium text-dark dark:text-dark-6">
          <span className="hidden lg:block">{user ? user.name : "User"}</span>{" "}
          {/* Updated to use dynamic user name */}
          <svg
            className={`fill-current duration-200 ease-in ${
              dropdownOpen && "rotate-180"
            }`}
            width="20"
            height="20"
            viewBox="0 0 20 2"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.6921 7.09327C3.91674 6.83119 4.3113 6.80084 4.57338 7.02548L9.99997 11.6768L15.4266 7.02548C15.6886 6.80084 16.0832 6.83119 16.3078 7.09327C16.5325 7.35535 16.5021 7.74991 16.24 7.97455L10.4067 12.9745C10.1727 13.1752 9.82728 13.1752 9.59322 12.9745L3.75989 7.97455C3.49781 7.74991 3.46746 7.35535 3.6921 7.09327Z"
            />
          </svg>
        </span>
      </Link>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-7.5 flex w-[280px] flex-col rounded-lg border-[0.5px] border-stroke bg-white shadow-default dark:border-dark-3 dark:bg-gray-dark">
          <div className="flex items-center gap-2.5 px-5 pb-5.5 pt-3.5">
            <span className="relative block h-12 w-12 rounded-full">
              <Image
                width={112}
                height={112}
                src={user?.image || "/images/logo/logo.png"} // Corrected src path
                alt="User"
                className="overflow-hidden rounded-full"
              />
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green dark:border-gray-dark"></span>
            </span>

            <span className="block">
              <span className="block font-medium text-dark dark:text-dark">
                {user ? user.name : "User"}
              </span>{" "}
              {/* Updated to use dynamic user name */}
              <span className="block font-sm text-dark-5 dark:text-white-6">
                {user ? user.email : "email@example.com"}
              </span>{" "}
              {/* Updated to use dynamic user email */}
            </span>
          </div>
          <ul className="flex flex-col gap-1 border-y-[0.5px] border-stroke p-2.5 dark:border-dark-3">
            <li>
              <Link
                href="/admin/profile"
                className="flex w-full items-center gap-2.5 rounded-[7px] p-2.5 text-sm font-medium text-dark-4 duration-300 ease-in-out hover:bg-gray-2 hover:text-dark dark:text-dark-6 dark:hover:bg-dark-3 dark:hover:text-white lg:text-base"
              >
                {/* SVG icon for profile */}
                <svg
                  className="fill-current"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.99998 0.9375C7.03246 0.9375 5.43748 2.53249 5.43748 4.5C5.43748 6.46751 7.03246 8.0625 8.99998 8.0625C10.9675 8.0625 12.5625 6.46751 12.5625 4.5C12.5625 2.53249 10.9675 0.9375 8.99998 0.9375ZM6.56248 4.5C6.56248 3.15381 7.65378 2.0625 8.99998 2.0625C10.3462 2.0625 11.4375 3.15381 11.4375 4.5C11.4375 5.84619 10.3462 6.9375 8.99998 6.9375C7.65378 6.9375 6.56248 5.84619 6.56248 4.5Z"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.99998 9.1875C7.26482 9.1875 5.66617 9.58191 4.48157 10.2483C3.31459 10.9047 2.43748 11.8995 2.43748 13.125L2.43743 13.2015C2.43658 14.0729 2.43552 15.1665 3.39479 15.9477C3.86689 16.3321 4.52734 16.6055 5.41964 16.7861C6.31442 16.9672 7.48065 17.0625 8.99998 17.0625C10.5193 17.0625 11.6855 16.9672 12.5803 16.7861C13.4726 16.6055 14.1331 16.3321 14.6052 15.9477C15.5644 15.1665 15.5634 14.0729 15.5625 13.2015L15.5625 13.125C15.5625 11.8995 14.6854 10.9047 13.5184 10.2483C12.3338 9.58191 10.7351 9.1875 8.99998 9.1875ZM3.56248 13.125C3.56248 12.4865 4.02851 11.7939 5.03311 11.2288C6.02008 10.6736 7.42143 10.3125 8.99998 10.3125C10.5785 10.3125 11.9799 10.6736 12.9668 11.2288C13.9715 11.7939 14.4375 12.4865 14.4375 13.125L14.4375 13.2015C14.4385 13.7784 14.4386 14.3059 13.9467 14.6828C13.6145 14.9735 13.0553 15.1477 12.3525 15.3057C11.7005 15.4561 10.6512 15.5853 8.99998 15.5853C7.34873 15.5853 6.29941 15.4561 5.64748 15.3057C4.94466 15.1477 4.38547 14.9735 4.05329 14.6828C3.56142 14.3059 3.56145 13.7784 3.56248 13.2015L3.56248 13.125Z"
                  />
                </svg>
                Profile
              </Link>
            </li>
            <li>
              <Link
                href="/admin/settings"
                className="flex w-full items-center gap-2.5 rounded-[7px] p-2.5 text-sm font-medium text-dark-4 duration-300 ease-in-out hover:bg-gray-2 hover:text-dark dark:text-dark-6 dark:hover:bg-dark-3 dark:hover:text-white lg:text-base"
              >
                {/* SVG icon for settings */}
                <svg
                  className="fill-current"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9 0.9375C8.485 0.9375 8 1.4225 8 1.9375V16.0625C8 16.5775 8.485 17.0625 9 17.0625C9.515 17.0625 10 16.5775 10 16.0625V1.9375C10 1.4225 9.515 0.9375 9 0.9375ZM0.9375 9C0.9375 8.485 1.4225 8 1.9375 8H16.0625C16.5775 8 17.0625 8.485 17.0625 9C17.0625 9.515 16.5775 10 16.0625 10H1.9375C1.4225 10 0.9375 9.515 0.9375 9Z"
                  />
                </svg>
                Settings
              </Link>
            </li>
            <li>
              <Link
                href="/logout"
                className="flex w-full items-center gap-2.5 rounded-[7px] p-2.5 text-sm font-medium text-dark-4 duration-300 ease-in-out hover:bg-gray-2 hover:text-dark dark:text-dark-6 dark:hover:bg-dark-3 dark:hover:text-white lg:text-base"
              >
                {/* SVG icon for logout */}
                <svg
                  className="fill-current"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.99998 0.9375C8.485 0.9375 8 1.4225 8 1.9375V7H7.5C6.57 7 5.75488 7.47391 5.25493 8.25455L0.9375 13.4375C0.632477 13.7461 0.4375 14.182 0.4375 14.625C0.4375 15.068 0.632477 15.5039 0.9375 15.8125C1.24252 16.1211 1.67827 16.3125 2.125 16.3125H10.5625C10.6775 16.3125 10.7867 16.2866 10.8858 16.2384C10.895 16.2678 10.9062 16.2977 10.9062 16.3125C10.9062 16.8275 10.4212 17.3125 9.90625 17.3125H2.125C1.29593 17.3125 0.5625 16.5791 0.5625 15.75C0.5625 15.167 0.781257 14.6224 1.12476 14.1787L5.4375 9H8V14.0625C8 14.5775 8.485 15.0625 8.99998 15.0625C9.515 15.0625 10 14.5775 10 14.0625V1.9375C10 1.4225 9.515 0.9375 8.99998 0.9375ZM10.5625 9C10.9626 9 11.3568 8.96682 11.7344 8.90625C12.1479 8.83955 12.4764 8.68382 12.75 8.4375C13.1571 8.06866 13.5 7.52695 13.5 6.9375C13.5 6.53212 13.3132 6.1737 12.9025 5.93858C12.9472 5.68735 12.9375 5.4425 12.9375 5.1875C12.9375 4.50789 13.1137 3.86881 13.4062 3.3125C13.1979 2.87826 12.8035 2.5625 12.3125 2.5625C11.5688 2.5625 11 3.12832 11 3.875V6.5625C10.485 6.875 10.063 7.25 10.063 7.875C10.063 8.5 10.485 8.875 11 9H10.5625Z"
                  />
                </svg>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      )}
    </ClickOutside>
  );
};

export default DropdownUser;
