"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const navigationElements = [
    {
      name: "Dashboard",
      link: "/",
    },
    {
      name: "Rezepte",
      link: "/recipes",
    },
  ];

  const pathname = usePathname();

  return (
    <nav className="bg-primary text-onPrimary py-sm">
      <div className="container mx-auto">
        <div className="flex">
          {navigationElements.map((elem) => (
            <Link
              key={`nav-${elem.name}`}
              href={elem.link}
              className={
                (elem.link === pathname ? "underline " : "") + "p-xs mr-lg"
              }
            >
              {elem.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
