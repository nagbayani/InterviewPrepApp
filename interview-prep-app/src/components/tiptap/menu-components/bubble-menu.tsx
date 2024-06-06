import { BubbleMenu, Editor } from "@tiptap/react";
import { BubbleButtons } from "./bubble-buttons";
import React from "react";
import { NodeTypes } from "./selection-menu";

interface CustomBubbleMenuProps {
  editor: Editor;
}

export const CustomBubbleMenu: React.FC<CustomBubbleMenuProps> = ({
  editor,
}) => {
  return (
    <BubbleMenu
      editor={editor}
      className='bubble-menu'
      tippyOptions={{
        duration: 200,
        animation: "shift-toward-subtle",
        moveTransition: "transform 0.2s ease-in-out",
      }}
    >
      <NodeTypes editor={editor} />
      {BubbleButtons.map((btn) => {
        const Icon = btn.icon;
        return (
          <button
            type='button'
            className='bubble-menu-button'
            onClick={() => btn.action(editor)}
            key={btn.tooltip}
          >
            <Icon />
          </button>
        );
      })}
    </BubbleMenu>
  );
};
