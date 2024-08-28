import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Diccionario de palabras",
  description: "Diccionario que permite buscar cualquier palabra",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="font-serif">
      <body className="min-h-screen dark:bg-slate-600">{children}</body>
    </html>
  );
}
