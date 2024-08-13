"use client";

import React, { useState, useEffect } from "react";
import DeckLink from "./DeckLink";
import { useDeckStore } from "@/_store/index";
import { Button, buttonVariants } from "@/components/ui/button";
import { DeckData } from "@/types/data-types";
import "../../styles/deck/deck-wrapper.css";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
interface Props {
  decks: DeckData[];
}

import { AddDeckModal } from "../modal/add-deck-modal";

const DeckWrapper = ({ decks }: { decks: any }) => {
  // Zustand store:  State Management for Decks
  const {
    decks: decksData,
    addDeck,
    setDecks,
  } = useDeckStore((state) => ({
    decks: state.decks,
    addDeck: state.addDeck,
    setDecks: state.setDecks,
  }));

  // Client show form state when User wants to add a new deck
  const [showForm, setShowForm] = useState(false);
  const [newDeckTitle, setNewDeckTitle] = useState("");
  const [loading, setLoading] = useState(false);

  // Update Zustand store with deck data from database
  useEffect(() => {
    setDecks(decks);
  }, [decks, setDecks]);

  /**
   * Handles deck form title input changes
   * @param e
   */
  const handleDeckForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewDeckTitle(value);
  };

  /**
   * Submits the new deck to the database, updates state with new deck.
   * If deck title is empty, do not submit.
   */
  const submitAddDeck = async () => {
    if (newDeckTitle.trim() === "") {
      console.log("Deck title is empty.");
      setShowForm(false);
    } else {
      try {
        setLoading(true);
        const response = await fetch(`/api/decks`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: newDeckTitle,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const newDeck: DeckData = data.deck;

          // Add deck to Zustand store
          addDeck(newDeck);
        }
      } catch {
        console.error("Error adding deck.");
      } finally {
        setLoading(false);
        setNewDeckTitle("");
        setShowForm(false);
      }
    }
  };
  /**
   * COLORS:
   *
   * #DBF9F0
   *
   */

  return (
    <section className='deck-wrapper-container'>
      <h1 style={{ fontSize: "var(--step-2)" }}>Decks</h1>

      <div className='flex justify-center gap-4'>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className=' w-[250px] rounded-md m-auto text-center place-self-center bg-[#642eff] px-0 py-2 hover:bg-black text-white  transition-colors duration-300 ease-in-out flex items-center justify-center'>
              Filter
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => console.log("Send")}>
              Send
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AddDeckModal />
      </div>
      <ul className='decks-list h-full gap-4'>
        {/* <li className='add-wrapper'></li> */}
        {Object.values(decksData)
          .reverse()
          .map((deck: any) => {
            return (
              <li key={deck.id}>
                <DeckLink
                  id={deck.id}
                  title={deck.title}
                  path={`/decks/${deck.id}`}
                />
              </li>
            );
          })}
      </ul>
    </section>
  );
};

export default DeckWrapper;
