import React from "react";
import Sidebar from "../../containers/sidebar-section/Sidebar";
import Navbar from "@/components/Navbar";
import "../../styles/dashboard.css";
import { auth } from "../../../auth";
import { fetchAllDecks } from "@/utils/fetch";
import { cookies } from "next/headers";

interface LayoutProps {
  children: React.ReactNode;
}

const authCheck = async () => {
  const session = await auth();
  if (session) {
    const cookieStore = cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");
    const decksData = await fetchAllDecks(cookieHeader);
    console.log(decksData, "Decks Data in Layout");
    return decksData;
  }
  return null;
};

export default async function Layout({ children }: LayoutProps) {
  const data = await authCheck();
  const decks = data?.decks;
  console.log(decks, "DECKS in Layout");
  return (
    <div className='dashboard-container'>
      <div className='sidebar-menu'>
        <Sidebar decks={decks} />
      </div>

      <main className='dashboard-content'>
        <Navbar />
        {children}
      </main>
    </div>
  );
}

// Sidebar should be outside
// Navbar should be outside
//inner children are the 3 links (Board, Decks, Interviews)
/*
  <div className='w-full h-full flex flex-col items-center'>
        <Navbar />
        <div className='pt-16'>
          <h1 className='ml-[160px]'>
            Dashboard - Welcome Back {session?.user.username}{" "}
          </h1>
          <Sidebar />
*/
