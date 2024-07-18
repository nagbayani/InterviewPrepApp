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
  const [isOpen, setIsOpen] = useState(false);

  const activeItem = items.filter((item) => item.isActive(editor)).pop() ?? {
    name: "Multiple",
  };

  // const buttonText = () => {
  //   if (editor.isActive("heading", { level: 1 })) {
  //     return "Heading 1";
  //   }
  //   if (editor.isActive("heading", { level: 2 })) {
  //     return "Heading 2";
  //   }
  //   if (editor.isActive("heading", { level: 3 })) {
  //     return "Heading 3";
  //   }
  //   if (editor.isActive("orderedList")) {
  //     return "Numbered list";
  //   }
  //   if (editor.isActive("bulletList")) {
  //     return "Bulleted list";
  //   }

  //   return "Normal text";
  // };

  // const isOnlyParagraph =
  //   !editor.isActive("bulletList") &&
  //   !editor.isActive("orderedList") &&
  //   !editor.isActive("heading");

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
              item.command(editor);
              onOpenChange(false);
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
// <Tippy
//   appendTo={document.body}
//   trigger='click'
//   interactive
//   animation='shift-toward-subtle'
//   placement='bottom-start'
//   content={
//     <div className='absolute flex flex-col px-2 py-1 bg-white w-52 z-50'>
//       <div className='py-1 ml-2 text-xs text-gray-500 uppercase'>
//         Turn into
//       </div>
//     </div>
//   }
// >
//   <button
//     type='button'
//     className='flex items-center justify-between w-28 bubble-menu-button cursor-pointer'
//     onClick={() => setIsOpen(!isOpen)}
//   >
//     <span className='truncate'>{buttonText()}</span>
//     <i className='i-mdi-chevron-down' />
//   </button>
// </Tippy>

// <button
//             type='button'
//             className='flex items-center justify-between node-type-dropdown-button'
//             onClick={() => editor.chain().focus().setParagraph().run()}
//           >
//             <div className='flex items-center align-middle'>
//               {/* <img src='/editor/text.png' width='24' height='24' alt='Text' /> */}
//               <span className='ml-1'>Text</span>
//             </div>
//             {isOnlyParagraph && <i className='i-mdi-check' />}
//           </button>
//           <button
//             type='button'
//             className='flex items-center justify-between node-type-dropdown-button'
//             onClick={() =>
//               editor.chain().focus().toggleHeading({ level: 1 }).run()
//             }
//           >
//             <div className='flex items-center align-middle'>
//               {/* <img
//                 src='/editor/header.png'
//                 width='24'
//                 height='24'
//                 alt='Heading 1'
//               /> */}
//               <span className='ml-1'>Heading 1</span>
//             </div>
//             {editor.isActive("heading", { level: 1 }) && (
//               <i className='i-mdi-check' />
//             )}
//           </button>
//           <button
//             type='button'
//             className='flex items-center justify-between node-type-dropdown-button'
//             onClick={() =>
//               editor.chain().focus().toggleHeading({ level: 2 }).run()
//             }
//           >
//             <div className='flex items-center align-middle'>
//               {/* <img
//                 src='/editor/header2.png'
//                 width='24'
//                 height='24'
//                 alt='Heading 2'
//               /> */}
//               <span className='ml-1'>Heading 2</span>
//             </div>
//             {editor.isActive("heading", { level: 2 }) && (
//               <i className='i-mdi-check' />
//             )}
//           </button>
//           <button
//             type='button'
//             className='flex items-center justify-between node-type-dropdown-button'
//             onClick={() =>
//               editor.chain().focus().toggleHeading({ level: 3 }).run()
//             }
//           >
//             <div className='flex items-center align-middle'>
//               {/* <img
//                 src='/editor/header3.png'
//                 width='24'
//                 height='24'
//                 alt='Heading 3'
//               /> */}
//               <span className='ml-1'>Heading 3</span>
//             </div>
//             {editor.isActive("heading", { level: 3 }) && (
//               <i className='i-mdi-check' />
//             )}
//           </button>
//           <button
//             type='button'
//             className='flex items-center justify-between node-type-dropdown-button'
//             onClick={() => editor.chain().focus().toggleOrderedList().run()}
//           >
//             <div className='flex items-center align-middle'>
//               {/* <img
//                 src='/editor/numbered-list.png'
//                 width='24'
//                 height='24'
//                 alt='Numbered List'
//               /> */}
//               <span className='ml-1'>Numbered list</span>
//             </div>
//             {editor.isActive("orderedList") && <i className='i-mdi-check' />}
//           </button>
//           <button
//             type='button'
//             className='flex items-center justify-between node-type-dropdown-button'
//             onClick={() => editor.chain().focus().toggleBulletList().run()}
//           >
//             <div className='flex items-center align-middle'>
//               {/* <img
//                 src='/editor/numbered-list.png'
//                 width='24'
//                 height='24'
//                 alt='Bulleted List'
//               /> */}
//               <span className='ml-1'>Bulleted list</span>
//             </div>
//             {editor.isActive("bulletList") && <i className='i-mdi-check' />}
//           </button>
