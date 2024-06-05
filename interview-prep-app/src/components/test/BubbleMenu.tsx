import { BubbleMenu } from "@tiptap/react";
import { Selection } from "@tiptap/pm/state";
import { useState, useEffect } from "react";
import SelectionMenu from "./SelectionMenu";
import { Editor } from "@tiptap/react";
import { RefObject } from "react";

type SelectionMenuType = "link" | null;

export interface BubbleMenuProps {
  editor: Editor;
  containerRef: RefObject<HTMLDivElement>;
}
export const BubbleMenuReact = ({ editor, containerRef }: BubbleMenuProps) => {
  const [selectionType, setSelectionType] = useState<SelectionMenuType>(null);
  useEffect(() => {
    if (selectionType !== "link") setSelectionType(null);
  }, []);
  if (!editor || !containerRef.current) return null;
  return (
    <BubbleMenu
      pluginKey='bubbleMenu'
      editor={editor}
      className='bubble-menu'
      tippyOptions={{
        appendTo: containerRef.current,
      }}
    >
      <SelectionMenu
        editor={editor}
        selectionType={selectionType}
        setSelectionType={setSelectionType}
      />
    </BubbleMenu>
  );
};
