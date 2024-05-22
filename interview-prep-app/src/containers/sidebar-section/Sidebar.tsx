"use client";
import React from "react";

import "../../styles/sidebar.css";
import SideLink from "./sideLink/sideLink";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const sideItems = [
  { name: "Home", path: "/home" },
  { name: "Decks", path: "/decks" },
  { name: "Interviews", path: "/interviews" },
];

interface Deck {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
}

interface DecksList {
  decks: Deck[];
}

// usePathname to get current path
// useSearchParams to get current search params

const Sidebar = ({ decks }: DecksList) => {
  // get user information
  // retrieve list of decks, show decks
  // retrieve session, if user, pass userID
  const [deckList, setDeckList] = useState<Deck[]>(decks);

  useEffect(() => {
    if (Array.isArray(decks)) {
      setDeckList(decks);
    } else {
      console.error("Expected 'decks' to be an array, but received:", decks);
      setDeckList([]);
    }
  }, [decks]);

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

      <ul>
        Workspace
        {deckList?.map((deck) => (
          <li key={deck.id}>
            <SideLink
              key={deck.title}
              item={{ name: deck.title, path: `/decks/${deck.id}` }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
