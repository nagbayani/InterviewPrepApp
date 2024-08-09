import React from "react";
// import Sidebar from "../../containers/sidebar-section/Sidebar";
import DashboardLayout from "@/containers/sidebar-section/dashboard-layout";
import Navbar from "@/components/Navbar";
import "../../styles/dashboard.css";
import { auth } from "../../../auth";
import { fetchAllDecks } from "@/utils/fetch";
import { cookies } from "next/headers";
import { useDeckStore, useCardStore } from "@/_store";

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Access cookie store to verify user session
 * @returns
 */
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
  console.log("DECKS in Layout", decks);
  const user = data?.session?.user;

  return (
    <div className='dashboard-container'>
      <Navbar />
      {/* <div className='main-inner-wrapper flex h-full w-full'>
        <Sidebar user={user} />
        <main className='dashboard-content'>{children}</main>
      </div> */}
      <DashboardLayout>{children}</DashboardLayout>
    </div>
  );
}
