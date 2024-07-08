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
import { Button } from "../ui/button";
import { DeckData } from "@/types/data-types";

import { useCardStore } from "@/_store/index";
import { getDecksByUserId } from "@/data/decks";

import { ChooseDeckMenu } from "./ChooseDeckMenu";

interface Props {
  handleDeleteCard: () => void;
  user: string;
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
const MoveCardMenu = ({ handleDeleteCard }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='w-8 h-8 bg-inherit px-0 py-0 hover:bg-gray-300 text-white font-bold rounded-lg transition-colors duration-300 ease-in-out flex items-center justify-center'>
        <Ellipsis size={20} className='text-black' />
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
              <ChooseDeckMenu />
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
