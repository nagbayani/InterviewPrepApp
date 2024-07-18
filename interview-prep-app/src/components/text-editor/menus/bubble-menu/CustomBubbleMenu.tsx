import { BubbleMenu, Editor } from "@tiptap/react";
import { useState } from "react";
import { generalButtons } from "./selectors/buttons";
import { NodeTypeDropdown } from "./dropdowns/NodeTypeDropdown";
import { ColorTypeDropDown } from "./dropdowns/ColorTypeDropDown";
import "../../../../styles/text-editor/bubbleMenu.css";

interface CustomBubbleMenuProps {
  editor: Editor;
}

export const CustomBubbleMenu: React.FC<CustomBubbleMenuProps> = ({
  editor,
}) => {
  const [openNode, setOpenNode] = useState(false);
  const [openColor, setOpenColor] = useState(false);

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
      <NodeTypeDropdown
        editor={editor}
        open={openNode}
        onOpenChange={setOpenNode}
      />
      {generalButtons.map((btn) => {
        const Icon = btn.icon;

        return (
          <button
            type='button'
            className='bubble-menu-button'
            onClick={() => btn.action(editor)}
            key={btn.tooltip}
          >
            {/* <i className={`${btn.iconClass} scale-150`} /> */}
            <Icon className='scale-50' />
          </button>
        );
      })}
      <ColorTypeDropDown
        editor={editor}
        open={openColor}
        onOpenChange={setOpenColor}
      />
    </BubbleMenu>
  );
};
