"use client";
import React, { useState, useEffect } from "react";
import "../../styles/sidebar.css";
import SideLink from "./sideLink/sideLink";
import WorkLink from "./workspaceLink/workLink";
import { usePathname } from "next/navigation";

import { AiOutlineHome } from "react-icons/ai";
import { SiContentstack } from "react-icons/si";
import { PiIdentificationCard } from "react-icons/pi";
import { FaRegUserCircle } from "react-icons/fa";
import { TbCards } from "react-icons/tb";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Button } from "@/components/ui/button";

import { Session } from "next-auth";
import UserAccountNav from "@/components/UserAccountNav";
import { useDeckStore } from "@/_store/index";
import { Ellipsis } from "lucide-react";

const sideItems = [
  {
    name: "Home",
    path: "/home",
    icon: <AiOutlineHome color='#f1f1f1' size={20} />,
  },
  {
    name: "Decks",
    path: "/decks",
    icon: <SiContentstack color='#f1f1f1' size={20} />,
  },
  {
    name: "Interviews",
    path: "/interviews",
    icon: <PiIdentificationCard color='#f1f1f1' />,
  },
];

interface SidebarProps {
  user: Session["user"] | null | undefined;
}

const Sidebar = ({ user }: SidebarProps) => {
  const { decks: decksData, setDecks } = useDeckStore((state) => ({
    decks: state.decks,
    setDecks: state.setDecks,
  }));

  const [username, setUsername] = useState<string>("");
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  useEffect(() => {
    setUsername(user?.name || "");
  }, [user]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`sidebar-container ${
        isCollapsed ? "collapsed w-[90px] " : ""
      }`}
    >
      <Button
        onClick={toggleSidebar}
        variant='default'
        size='icon'
        className='justify-center'
      >
        {isCollapsed ? (
          <FiChevronRight color='#f1f1f1' />
        ) : (
          <FiChevronLeft color='#f1f1f1' />
        )}
      </Button>

      {/* <div className={`sideitem-container ${isCollapsed ? "collapsed" : ""}`}>
        <FaRegUserCircle color='#f1f1f1' /> {!isCollapsed && username}
      </div> */}

      {/* Main Side Links -- Home, Decks, Interviews */}
      <ul className={`sidebar-list  ${isCollapsed ? "collapsed" : ""}`}>
        {sideItems.map((item) => (
          <li key={item.name} className='mx-auto my-2'>
            <SideLink key={item.name} item={item} isCollapsed={isCollapsed} />
          </li>
        ))}
      </ul>

      {/* Workspace Links -- Decks */}
      <ul className={`sidebar-list  ${isCollapsed ? "collapsed" : ""}`}>
        {/* <strong
          className={`workspace-header ${isCollapsed ? "collapsed" : ""}`}
        >
          {!isCollapsed ? "Workspace" : <Ellipsis />}
        </strong> */}
        {Object.values(decksData).map((deck) => (
          <li key={deck.id}>
            <WorkLink
              key={deck.title}
              item={{ name: deck.title, path: `/decks/${deck.id}` }}
              isCollapsed={isCollapsed}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
