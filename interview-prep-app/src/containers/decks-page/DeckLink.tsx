"use client";

import React, { useState } from "react";
import "../../styles/deck/deckLink.css";
import { usePathname, useRouter } from "next/navigation";
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
  const { decks, deck, updateDeck, deleteDeck } = useDeckStore((state) => ({
    decks: state.decks,
    updateDeck: state.updateDeck,
    deleteDeck: state.deleteDeck,
    deck: state.decks[id],
  }));

  const pathname = usePathname();
  const router = useRouter();

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

      if (response.status === 200) {
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

  // Format the updatedAt value to "Updated Aug 24, 2024"
  const formattedUpdatedAt = new Date(deck.updatedAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  return (
    <div
      className={`decklink-container ${
        pathname === path && "decklink-container"
      }`}
      onDoubleClick={() => router.push(path)}
    >
      <div className='flex '>
        <div
          className='decklink-thumbnail flex-grow mr-2'
          style={{ backgroundImage: thumbnail }}
        ></div>
        <DeckLinkMenu path={path} onDelete={handleDeleteDeck} />
      </div>
      <div className='flex gap-2 justify-start mt-2 items-center'>
        <h1 id='decklink-title'>{title}</h1>
        {/* <div className='flex gap-2 items-center'>
        </div> */}
      </div>
      <div className='decklink-description gap-4 w-full h-full min-h-[100px]'>
        <p>{description}</p>
        {/* last opened  */}
      </div>
      <p>{`Updated ${formattedUpdatedAt}`}</p> {/* Render the formatted date */}
    </div>
  );
};

export default DeckLink;
