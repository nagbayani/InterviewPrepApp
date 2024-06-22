"use client";
import React from "react";

import "../../styles/sidebar.css";
import SideLink from "./sideLink/sideLink";
import WorkLink from "./workspaceLink/workLink";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

import { AiOutlineHome } from "react-icons/ai";
import { SiContentstack } from "react-icons/si";
import { PiIdentificationCard } from "react-icons/pi";
import { FaRegUserCircle } from "react-icons/fa";
import { TbCards } from "react-icons/tb";

import { Session } from "next-auth";
import UserAccountNav from "@/components/UserAccountNav";
/*
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    name: string;
  }
    Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
  interface Session {
    user: User & {
      name: string;
    };
    token: {
      name: string;
    };
  }
}
*/

const sideItems = [
  { name: "Home", path: "/home", icon: <AiOutlineHome color='#f1f1f1' /> },
  { name: "Decks", path: "/decks", icon: <SiContentstack color='#f1f1f1' /> },
  {
    name: "Interviews",
    path: "/interviews",
    icon: <PiIdentificationCard color='#f1f1f1' />,
  },
];

interface Deck {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
}
//SidebarProps
interface SidebarProps {
  decks: Deck[];
  user: Session["user"] | null | undefined;
}

const Sidebar = ({ decks, user }: SidebarProps) => {
  // get user information
  // retrieve list of decks, show decks
  // retrieve session, if user, pass userID
  const [deckList, setDeckList] = useState<Deck[]>(decks);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    if (Array.isArray(decks)) {
      setDeckList(decks);
      setUsername(user?.name || "");
    } else {
      console.error("Expected 'decks' to be an array, but received:", decks);
      setDeckList([]);
    }
  }, [decks, user]);

  return (
    <div className='sidebar-container'>
      <div className='sideitem-container'>
        <TbCards color='#f1f1f1' size={40} />
        <span
          style={{
            fontSize: "20px",
            fontWeight: "400",
            letterSpacing: "-0.05em",
          }}
        >
          Smooth Prep
        </span>
      </div>
      <div className='sideitem-container'>
        <FaRegUserCircle color='#f1f1f1' /> {username}
      </div>

      <ul className='sidebar-list'>
        {sideItems.map((item) => (
          <li key={item.name}>
            <SideLink key={item.name} item={item} />
          </li>
        ))}
      </ul>

      <ul>
        <strong className='pl-[10px]'>Workspace</strong>
        {deckList?.map((deck) => (
          <li key={deck.id}>
            <WorkLink
              key={deck.title}
              item={{ name: deck.title, path: `/decks/${deck.id}` }}
            />
          </li>
        ))}
      </ul>
      <div className='sidebar-auth-btn '>
        <UserAccountNav user={user} />
      </div>
    </div>
  );
};

export default Sidebar;
