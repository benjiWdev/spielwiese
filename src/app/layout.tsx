import type { Metadata } from "next";
import "@/styles/globals.css";
import NavBar from "@/components/navigation/navbar";

export const metadata: Metadata = {
  title: "Cooklet",
  description: "Rezepte speichern leicht gemacht!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>
        <NavBar />
        <main className="container mx-auto px-xs">{children}</main>
      </body>
    </html>
  );
}
