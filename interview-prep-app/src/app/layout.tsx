import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";

import Provider from "@/components/Provider";

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
        <Provider>
          <main className='flex flex-col overflow-visible'>
            {children}
            <Toaster />
          </main>
        </Provider>
      </body>
    </html>
  );
}
