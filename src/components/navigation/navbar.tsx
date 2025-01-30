"use client";

import { Routes } from "@/models/enums/Routes";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const navigationElements = [
    {
      name: "Dashboard",
      link: Routes.DASHBOARD,
    },
    {
      name: "Rezepte",
      link: Routes.RECIPES_OVERVIEW,
    },
  ];

  const pathname = usePathname();

  return (
    <nav className="bg-primary text-onPrimary py-xs">
      <div className="container mx-auto">
        <div className="flex">
          {navigationElements.map((elem) => (
            <Link
              key={`nav-${elem.name}`}
              href={elem.link}
              className={
                (elem.link === pathname ? "underline " : "") +
                "p-sm mr-lg text-xl"
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
