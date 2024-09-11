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
import gradients from "@/lib/colors/thumbnail-gradients";

import { AddDeckModal } from "../modal/add-deck-modal";

/**
 * Wrapper for /decks page that holds all rendered decks.
 * @param param0
 * @returns
 */
const DecksWrapper = ({ decks }: { decks: any }) => {
  // Zustand store:  State Management for Decks
  const {
    decks: decksData,
    setDecks,
    unassignedDeck,
  } = useDeckStore((state) => ({
    decks: state.decks,
    addDeck: state.addDeck,
    setDecks: state.setDecks,
    unassignedDeck: state.unassignedDeck,
  }));

  const [loading, setLoading] = useState(false);

  // Update Zustand store with deck data from database
  // useEffect(() => {
  //   setDecks(decks);
  //   console.log("Decks in DecksWrapper: ", decksData);
  // }, [decks, setDecks]);

  /**
   * COLORS:
   *
   * #DBF9F0
   *
   */

  return (
    <section className='deck-wrapper-container h-100vh overflow-x-scroll'>
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

        {/* Add Deck Button Menu */}
        <AddDeckModal />
      </div>
      <ul className='decks-list gap-4 p-16'>
        {Object.values(decksData)
          // .reverse()
          .map((deck: DeckData) => {
            // Find the matching gradient style based on the thumbnail
            const matchedGradient = gradients.find(
              (gradient) => gradient.name === deck.thumbnail
            );

            // Extract the style or use a default background if not found
            const gradientStyle = matchedGradient
              ? matchedGradient.style
              : "linear-gradient(to right, #e66465, #9198e5)"; // Default gradient

            // Check if this is the unassigned deck
            if (unassignedDeck && deck.id === unassignedDeck.id) {
              console.log("Unassigned Deck: ", unassignedDeck);
              return (
                <li key={deck.id}>
                  <DeckLink
                    id={deck.id}
                    title={unassignedDeck.title}
                    path={`/decks/unassigned`} // Path to unassigned deck
                    thumbnail={gradientStyle}
                    description={unassignedDeck.description || ""}
                  />
                </li>
              );
            }

            // Otherwise return the normal deck
            return (
              <li key={deck.id}>
                <DeckLink
                  id={deck.id}
                  title={deck.title}
                  path={`/decks/${deck.id}`}
                  thumbnail={gradientStyle}
                  description={deck.description || ""}
                />
              </li>
            );
          })}
      </ul>
    </section>
  );
};

export default DecksWrapper;
