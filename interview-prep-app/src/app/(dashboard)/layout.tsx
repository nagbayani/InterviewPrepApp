import React from "react";
import Sidebar from "../../containers/sidebar-section/Sidebar";
// import Navbar from "@/components/Navbar";
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
    // console.log(decksData, "Decks Data in Layout");
    const userData = {
      decksData,
      session,
    };
    // return decksData;
    return userData;
  }
  return null;
};

export default async function Layout({ children }: LayoutProps) {
  const data = await authCheck();
  const decks = data?.decksData.decks;
  const user = data?.session?.user;
  // console.log(decks, "DECKS in Layout");
  return (
    <div className='dashboard-container'>
      <div className='sidebar-menu'>
        <Sidebar decks={decks} user={user} />
      </div>
      <main className='dashboard-content'>{children}</main>
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
