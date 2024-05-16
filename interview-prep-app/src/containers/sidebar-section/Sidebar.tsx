"use client";
import React from "react";

import "../../styles/sidebar.css";
import SideLink from "./sideLink/sideLink";

const sideItems = [
  { name: "Home", path: "/home" },
  { name: "Decks", path: "/decks" },
  { name: "Interviews", path: "/interviews" },
];

const Sidebar = () => {
  // get user information
  // retrieve list of decks, show decks
  return (
    <div className='sidebar-container'>
      {/* <Link href='/home' passHref>
        <span>Home</span>
      </Link>
      <Link href='/decks' passHref>
        <span>Decks</span>
      </Link> */}
      <ul className='sidebar-list'>
        {sideItems.map((item) => (
          <li key={item.name}>
            <SideLink key={item.name} item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
