import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Interview Prep App",
  description: "Made by Nathan Agbayani",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <main className='h-screen flex flex-col justify-center items-center'>
          <Navbar />
          {children}
        </main>
      </body>{" "}
    </html>
  );
}
