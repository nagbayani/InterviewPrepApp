import { Editor } from "@tiptap/react";
import { useState } from "react";
import Tippy from "@tippyjs/react";
import "../../../../../styles/text-editor/bubbleMenu.css";
import { items } from "../selectors/node-items";
import { Button } from "@/components/ui/button";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Popover } from "@radix-ui/react-popover";

import {
  Check,
  CheckSquare,
  ChevronDown,
  Code,
  Heading1,
  Heading2,
  Heading3,
  ListOrdered,
  TextIcon,
  TextQuote,
  type LucideIcon,
} from "lucide-react";

interface NodeTypeDropdownProps {
  editor: Editor;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NodeTypeDropdown: React.FC<NodeTypeDropdownProps> = ({
  editor,
  open,
  onOpenChange,
}) => {
  // const [isOpen, setIsOpen] = useState(false);

  const activeItem = items.filter((item) => item.isActive(editor)).pop() ?? {
    name: "Multiple",
  };

  const handleCommand = (command: (editor: Editor) => void) => {
    const { from, to } = editor.state.selection;
    console.log("Command", command);
    console.log("From:", from, "To:", to);
    const nodes: { node: any; pos: number }[] = [];
    editor.state.doc.nodesBetween(from, to, (node, pos) => {
      nodes.push({ node, pos });
    });

    console.log("Selected Nodes", nodes);
    command(editor);
    onOpenChange(false);
  };

  // console.log("Active Item", activeItem);

  return (
    <Popover modal={true} open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger
        asChild
        className='gap-2 rounded-none border-none hover:bg-accent focus:ring-0'
      >
        <Button size='sm' variant='ghost' className='gap-2'>
          <span className='whitespace-nowrap text-sm'>{activeItem.name}</span>
          <ChevronDown className='h-4 w-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent sideOffset={5} align='start' className='w-48 p-1'>
        {items.map((item) => (
          <div
            key={item.name}
            onClick={() => {
              // item.command(editor);
              // onOpenChange(false);
              handleCommand(item.command);
            }}
            className='flex cursor-pointer items-center justify-between rounded-sm px-2 py-1 text-sm hover:bg-accent'
          >
            <div className='flex items-center space-x-2'>
              <div className='rounded-sm border p-1'>
                <item.icon className='h-3 w-3' />
              </div>
              <span>{item.name}</span>
            </div>
            {activeItem.name === item.name && <Check className='h-4 w-4' />}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};
