import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { Ellipsis } from "lucide-react";
import Link from "next/link";

interface DeckLinkMenuProps {
  path: string;
  onDelete: () => void;
}

const DeckLinkMenu = ({ path, onDelete }: DeckLinkMenuProps) => {
  console.log("Path in DeckLinkMenu: ", path);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='w-8 h-8 bg-inherit px-0 py-0 hover:bg-gray-300 text-white font-bold rounded-sm transition-colors duration-300 ease-in-out flex items-center justify-center'>
        <Ellipsis size={20} className='text-black' />
      </DropdownMenuTrigger>
      <DropdownMenuContent sideOffset={5}>
        <Link href={path}>
          <DropdownMenuItem onSelect={() => console.log("Opened")}>
            Open
          </DropdownMenuItem>
        </Link>

        {/* Only render the Delete option if the deck is not unassigned */}
        {path !== "/decks/unassigned" && (
          <>
            <DropdownMenuItem onSelect={() => console.log("Send")}>
              Send
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={onDelete} className='my-4 text-red-600'>
              Delete
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DeckLinkMenu;
