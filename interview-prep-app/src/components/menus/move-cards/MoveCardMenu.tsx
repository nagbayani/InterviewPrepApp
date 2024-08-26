import React, { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send, Trash2 } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Ellipsis } from "lucide-react";
import { Button } from "../../ui/button";
import { DeckData } from "@/types/data-types";

import { useCardStore } from "@/_store/index";
import { getDecksByUserId } from "@/data/decks";

import { ChooseDeckMenu } from "./ChooseDeckMenu";

interface Props {
  handleDeleteCard: () => void;
  user: string;
  cardId: string;
  deckId: string;
  onMoveCard: (cardId: string, newDeckId: string, oldDeckId: string) => void;
}

const labels = [
  "feature",
  "bug",
  "enhancement",
  "documentation",
  "design",
  "question",
  "maintenance",
];

// Need to get the data of all the decks
const MoveCardMenu = ({
  handleDeleteCard,
  onMoveCard,
  cardId,
  deckId,
}: Props) => {
  const [menuState, setMenuState] = useState<"list" | "move">("list");

  const handleBackToMenu = () => {
    setMenuState("list");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='drop-trigger  bg-gray-300 hover:bg-slate-500  text-white font-bold transition-colors duration-300 ease-in-out flex items-center justify-center'>
        <Ellipsis className='text-black' />
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={5} className='gap-2'>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Send size={12} />
            <span className='p-2'>Send</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent sideOffset={5}>
              {/* Trigger a Dropdown Menu that shows all the decks,
                and allow the user to select a deck to move the card to.
                Need to retrieve the deck data.
               */}
              <ChooseDeckMenu
                cardId={cardId}
                onMoveCard={onMoveCard}
                deckId={deckId}
                onBack={handleBackToMenu}
              />
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuItem onSelect={() => console.log("Delete")} className=''>
          <Trash2 size={12} color={"red"} />
          <span className='text-red-500 p-2' onClick={handleDeleteCard}>
            Delete
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoveCardMenu;
