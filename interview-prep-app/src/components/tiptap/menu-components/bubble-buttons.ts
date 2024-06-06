import { Editor } from "@tiptap/react";
import React from "react";
import { ImBold, ImItalic } from "react-icons/im";
import { IconType } from "react-icons/lib";

interface BubbleMenuButtons {
  tooltip: string;
  action: (editor: Editor) => boolean;
  isActive: (editor: Editor) => boolean;
  icon: IconType;
}

export const BubbleButtons: BubbleMenuButtons[] = [
  {
    tooltip: "Bold",
    action: (editor: Editor) => editor.chain().focus().toggleBold().run(),
    isActive: (editor: Editor) => editor.isActive("bold"),
    icon: ImBold,
  },
  {
    tooltip: "Italic",
    action: (editor: Editor) => editor.chain().focus().toggleItalic().run(),
    isActive: (editor: Editor) => editor.isActive("italic"),
    icon: ImItalic,
  },
  // Text
  // Heading 1,2,3
  // Numbered list
  // Bullet list

];
