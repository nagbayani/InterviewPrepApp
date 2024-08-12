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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='drop-trigger h-[50%] bg-gray-300 hover:bg-slate-500 rounded-l-0 rounded-tr-0 rounded-br-[12px]  text-white font-bold transition-colors duration-300 ease-in-out flex items-center justify-center w-full'>
        <Ellipsis className='text-black' />
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={5}>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Move to</DropdownMenuSubTrigger>
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
              />
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        <DropdownMenuItem
          onSelect={() => console.log("Delete")}
          className='my-5 p-0'
        >
          <Button variant='destructive' onClick={handleDeleteCard}>
            Delete
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoveCardMenu;
