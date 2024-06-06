import { AnyExtension, Editor, Extension } from "@tiptap/core";
import Text from "@tiptap/extension-text";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";
import DropCursor from "@tiptap/extension-dropcursor";
import GapCursor from "@tiptap/extension-gapcursor";
import History from "@tiptap/extension-history";
import HardBreak from "@tiptap/extension-hard-break";
import Heading from "@tiptap/extension-heading";

import { Document } from "./document";
import { DBlock } from "./drag-block";
import { Paragraph } from "./paragraph";
import { TrailingNode } from "./trailing-node";
import { Placeholder } from "./placeholder";

// import { SuperchargedTableExtensions } from "./supercharged-table";
// import { ResizableMedia } from "./resizableMedia";
// import { Link } from "./link";

export const getExtensions = (): AnyExtension[] => {
  return [
    // Necessary Extensions
    Document, // document.ts
    DBlock, // drag-block-node.ts
    Paragraph, // paragraph.ts
    Text,
    DropCursor.configure({
      width: 2,
      class: "notitap-dropcursor",
      color: "skyblue",
    }),
    GapCursor,
    History,
    HardBreak,

    // Marks
    Bold,
    Italic,
    Strike,
    Underline,

    // Nodes
    ListItem,
    BulletList,
    OrderedList,
    Heading.configure({
      levels: [1, 2, 3],
    }),
    TrailingNode, // trailing-node.ts

    // placeholder.ts
    Placeholder.configure({
      placeholder: "Type `/` for commands",
      includeChildren: true,
    }),
  ];
};
