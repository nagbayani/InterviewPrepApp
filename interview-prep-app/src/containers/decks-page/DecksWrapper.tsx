"use client";

import React, { useState, useEffect } from "react";
import DeckLink from "./DeckLink";
import { useDeckStore } from "@/_store/index";
import { Button, buttonVariants } from "@/components/ui/button";
import { DeckData } from "@/types/data-types";
import "../../styles/deck/deck-wrapper.css";

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
    <section className='deck-wrapper-container h-100vh '>
      <h1 style={{ fontSize: "var(--step-2)" }}>Decks</h1>

      <div className='flex justify-center gap-4'>
        {/* Add Deck Button Menu */}
        <AddDeckModal />
      </div>

      <ul className='decks-list gap-4 py-4 px-16'>
        {Object.values(decksData)
          .filter((deck: DeckData) => deck.id !== unassignedDeck) // Filter dynamically here
          .map((deck: DeckData) => {
            // Find the matching gradient style based on the thumbnail
            const matchedGradient = gradients.find(
              (gradient) => gradient.name === deck.thumbnail
            );

            // Extract the style or use a default background if not found
            const gradientStyle = matchedGradient
              ? matchedGradient.style
              : "linear-gradient(to right, #e66465, #9198e5)"; // Default gradient

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
        {/* Render Unassigned Deck separately */}
        {unassignedDeck && decksData[unassignedDeck] && (
          // <div className='max-w-[400px] my-4 mx-auto'>
          <DeckLink
            id={decksData[unassignedDeck].id}
            title={decksData[unassignedDeck].title}
            path={`/decks/${decksData[unassignedDeck].id}`}
            thumbnail={
              gradients.find(
                (gradient) =>
                  gradient.name === decksData[unassignedDeck].thumbnail
              )?.style || "linear-gradient(to right, #e66465, #9198e5)"
            }
            description={decksData[unassignedDeck].description || ""}
          />
          // </div>
        )}
      </ul>
    </section>
  );
};

export default DecksWrapper;
