"use client";

import React, { useState } from "react";
import "../../styles/deck/deckLink.css";
import { usePathname } from "next/navigation";
import { CardInput } from "@/components/ui/cardinput";
import { useDeckStore } from "@/_store";
import DeckLinkMenu from "./DeckLinkMenu";

interface DeckLinkProps {
  id: string;
  title: string;
  path: string;
  thumbnail: string;
  description: string;
}

/**
 * Rendered Individual decks in /decks page
 * @param param0
 * @returns
 */
const DeckLink = ({
  id,
  title,
  path,
  thumbnail,
  description,
}: DeckLinkProps) => {
  const {
    decks: decksData,
    updateDeck,
    deleteDeck,
  } = useDeckStore((state) => ({
    decks: state.decks,
    updateDeck: state.updateDeck,
    deleteDeck: state.deleteDeck,
  }));

  const pathname = usePathname();

  const [titleEditing, setTitleEdit] = useState(false);
  const [titleValue, setTitleValue] = useState(title);
  const [lastNonEmptyTitle, setLastNonEmptyTitle] = useState(title);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTitleValue(value);
    if (value.trim() !== "") {
      setLastNonEmptyTitle(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "Return") {
      e.preventDefault();
      handleInputBlur();
    }
  };

  const handleInputBlur = async () => {
    if (titleValue.trim() === "") {
      setTitleValue(lastNonEmptyTitle);
    } else {
      setLastNonEmptyTitle(titleValue);

      // Update the database
      try {
        const response = await fetch(`/api/decks/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ deckId: id, title: titleValue }),
        });

        if (response.ok) {
          updateDeck(id, { title: titleValue });
        }
      } catch (error) {
        // Revert to the last known good state
        setTitleValue(title);
        console.error(error);
        alert("Failed to update the title. Please try again.");
      }
    }

    setTitleEdit(false);
  };

  const handleDeleteDeck = async () => {
    try {
      const response = await fetch(`/api/decks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Remove the deck from Zustand store
        deleteDeck(id);
      } else {
        console.error("Failed to delete the deck.");
        alert("Failed to delete the deck. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting the deck:", error);
      alert("Error deleting the deck. Please try again.");
    }
  };

  return (
    <div
      className={`decklink-container ${
        pathname === path && "decklink-container"
      }`}
    >
      <div className='self-end'>
        <DeckLinkMenu path={path} onDelete={handleDeleteDeck} />
      </div>
      <div className='flex gap-2 justify-between items-center'>
        <div className='flex gap-2 items-center'>
          <div
            className='decklink-thumbnail'
            style={{ backgroundImage: thumbnail }}
          ></div>
          <h1 id='decklink-title'>{title}</h1>
        </div>
      </div>

      <div className='decklink-description w-full h-full min-h-[100px]'>
        <p>{description}</p>
        {/* last opened  */}
      </div>
    </div>
  );
};

export default DeckLink;

{
  /* {titleEditing ? (
  <>
    <CardInput
      onBlur={handleInputBlur}
      onChange={handleChange}
      value={titleValue}
      onKeyDown={handleKeyDown}
    />
  </>
) : (
  <>
    <span onClick={() => setTitleEdit(true)}>{titleValue}</span>
  </>
)} */
}
