"use client";

import React, { useState } from "react";
import "../../styles/deck/deckLink.css";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { CardInput } from "@/components/ui/cardinput";
import { useDeckStore } from "@/_store";

interface DeckLinkProps {
  id: string;
  title: string;
  path: string;
  thumbnail: string;
}

/**
 * Rendered Individual decks in /decks page
 * @param param0
 * @returns
 */
const DeckLink = ({ id, title, path, thumbnail }: DeckLinkProps) => {
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
      <div className='w-full flex justify-between'>
        {titleEditing ? (
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
        )}

        <DropdownMenu>
          <DropdownMenuTrigger className='w-8 h-8 bg-inherit px-0 py-0 hover:bg-gray-300 text-white font-bold rounded-lg transition-colors duration-300 ease-in-out flex items-center justify-center'>
            <Ellipsis size={20} className='text-black' />
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={5}>
            <Link href={path}>
              <DropdownMenuItem onSelect={() => console.log("Opened")}>
                Open
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem onSelect={() => console.log("Send")}>
              Send
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={handleDeleteDeck}
              className='my-4 text-red-600'
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div
        className='deck-preview mx-auto'
        style={{ backgroundImage: thumbnail }}
      ></div>
    </div>
  );
};

export default DeckLink;
