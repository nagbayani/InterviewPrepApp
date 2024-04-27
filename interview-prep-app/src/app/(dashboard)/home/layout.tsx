import React from "react";
import Sidebar from "../../../containers/sidebar-section/Sidebar";
import Navbar from "@/components/Navbar";
import "../../../styles/dashboard.css";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className='dashboard-container'>
      <div className='sidebar-menu'>
        <Sidebar />
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
