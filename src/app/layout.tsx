import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dictionary",
  description: "Dictionary where we can search words in english",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="font-serif">
      <body className="min-h-[70vh] md:min-h-[90vh] lg:min-h-screen dark:bg-slate-600">
        {children}
      </body>
    </html>
  );
}
