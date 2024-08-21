import { Check, ChevronDown } from "lucide-react";
import { EditorBubbleItem, useEditor } from "novel";
import { TEXT_COLORS, HIGHLIGHT_COLORS } from "../selectors/color-items";
import { Editor } from "@tiptap/core";

import {
  PopoverTrigger,
  Popover,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface ColorSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editor: Editor;
}

/**
 *
 * @param param0
 * @returns Button to select text color
 */
export const ColorTypeDropDown = ({
  open,
  onOpenChange,
  editor,
}: ColorSelectorProps) => {
  const activeColorItem = TEXT_COLORS.find(({ color }) =>
    editor.isActive("textStyle", { color })
  );

  const activeHighlightItem = HIGHLIGHT_COLORS.find(({ color }) =>
    editor.isActive("highlight", { color })
  );
  return (
    <Popover modal={true} open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button size='sm' className='gap-2 rounded-none' variant='ghost'>
          <span
            className='rounded-sm px-1'
            style={{
              color: activeColorItem?.color,
              backgroundColor: activeHighlightItem?.color,
            }}
          >
            A
          </span>
          <ChevronDown className='h-4 w-4' />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        sideOffset={5}
        className='cursor-pointer my-1 flex max-h-80 w-48 flex-col overflow-hidden overflow-y-auto rounded border p-1 shadow-xl '
        align='start'
      >
        <div className='flex flex-col'>
          <div className='my-1 px-2 text-sm font-semibold text-muted-foreground'>
            Color
          </div>
          {TEXT_COLORS.map(({ name, color }, index) => (
            <div
              key={index}
              onClick={() => {
                if (name === "Default") {
                  editor.chain().focus().unsetColor().run(); // Unset the color if "Default" is selected
                } else {
                  // name !== "Default" &&
                  editor
                    .chain()
                    .focus()
                    .clearNodes()
                    .setColor(color || "")
                    .run();
                }
                onOpenChange(false);
              }}
              className='flex cursor-pointer items-center justify-between px-2 py-1 text-sm hover:bg-accent'
            >
              <div className='flex items-center gap-2'>
                <div
                  className='rounded-sm border px-2 py-px font-medium'
                  style={{ color }}
                >
                  A
                </div>
                <span>{name}</span>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className='my-1 px-2 text-sm font-semibold text-muted-foreground'>
            Background
          </div>
          {HIGHLIGHT_COLORS.map(({ name, color }, index) => (
            <div
              key={index}
              onClick={() => {
                if (name === "Default") {
                  editor.chain().focus().unsetHighlight().run(); // Unset the highlight if "Default" is selected
                } else {
                  // name !== "Default" &&
                  // editor.commands.setHighlight({ color });
                  editor
                    .chain()
                    .focus()
                    .clearNodes()
                    .setHighlight({ color })
                    .run();
                }
                onOpenChange(false);
              }}
              className='flex cursor-pointer items-center justify-between px-2 py-1 text-sm hover:bg-accent'
            >
              <div className='flex items-center gap-2'>
                <div
                  className='rounded-sm border px-2 py-px font-medium'
                  style={{ backgroundColor: color }}
                >
                  A
                </div>
                <span>{name}</span>
              </div>
              {editor.isActive("highlight", { color }) && (
                <Check className='h-4 w-4' />
              )}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
