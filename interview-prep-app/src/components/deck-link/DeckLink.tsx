"use client";

import React, { useState } from "react";
import "../../styles/deck/deckLink.css";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowUpRight } from "lucide-react";
import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown";
import { CardInput } from "../ui/cardinput";
import { CardLabel } from "../ui/label";

import { useDeckStore } from "@/_store";

interface DeckLinkProps {
  id: string;
  title: string;
  path: string;
}
const DeckLink = ({ id, title, path }: DeckLinkProps) => {
  const { decks: decksData, updateDeck } = useDeckStore((state) => ({
    decks: state.decks,
    updateDeck: state.updateDeck,
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
        console.log("Deck State", decksData[id]);
        const response = await fetch(`/api/decks/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ deckId: id, title: titleValue, decksData }),
        });
        console.log("Current response.body", response.body);

        if (response.ok) {
          console.log("Title Updated in Database", id, titleValue);
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
  return (
    <div
      className={`decklink-container ${
        pathname === path && "decklink-container "
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
              onSelect={() => console.log("Delete")}
              className='my-4'
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className='deck-preview mx-auto'></div>
    </div>
  );
};

export default DeckLink;
