import {
  TiptapImage,
  TiptapLink,
  UpdatedImage,
  TaskList,
  TaskItem,
  HorizontalRule,
  StarterKit,
  Placeholder,
  AIHighlight,
  // GlobalDragHandle,
} from "novel/extensions";
import AutoJoiner from "tiptap-extension-auto-joiner"; // optional
import SlashCommand from "./custom-extensions/slash-command";

import { DBlock } from "./custom-extensions/drag-block";
import { Paragraph } from "./custom-extensions/paragraph";
import { Document } from "./custom-extensions/document";
import { TrailingNode } from "./custom-extensions/trailing-node";
import CustomGlobalDrag from "./custom-extensions/CustomGlobalDrag";

import { UploadImagesPlugin } from "novel/plugins";

import { cx } from "class-variance-authority";
// import { HTMLAttributeAnchorTarget } from "react";
// import { Html } from "next/document";

const aiHighlight = AIHighlight;
const placeholder = Placeholder;

const document = Document;
const paragraph = Paragraph;
const dBlock = DBlock;
const trailingNode = TrailingNode;

const tiptapLink = TiptapLink.configure({
  HTMLAttributes: {
    class: cx(
      "text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer"
    ),
  },
});

const tiptapImage = TiptapImage.extend({
  addProseMirrorPlugins() {
    return [
      UploadImagesPlugin({
        imageClass: cx("opacity-40 rounded-lg border border-stone-200"),
      }),
    ];
  },
}).configure({
  allowBase64: true,
  HTMLAttributes: {
    class: cx("rounded-lg border border-muted"),
  },
});

const updatedImage = UpdatedImage.configure({
  HTMLAttributes: {
    class: cx("rounded-lg border border-muted"),
  },
});

const taskList = TaskList.configure({
  HTMLAttributes: {
    class: cx("not-prose pl-2 "),
  },
});
const taskItem = TaskItem.configure({
  HTMLAttributes: {
    class: cx("flex gap-2 items-start my-4"),
  },
  nested: true,
});

const horizontalRule = HorizontalRule.configure({
  HTMLAttributes: {
    class: cx("mt-4 mb-6 border-t border-muted-foreground"),
  },
});

const starterKit = StarterKit.configure({
  bulletList: {
    HTMLAttributes: {
      class: cx("list-disc list-outside leading-3 -mt-2"),
      size: "4xl, 3xl, 2xl",
    },
  },
  orderedList: {
    HTMLAttributes: {
      class: cx("list-decimal list-outside leading-3 -mt-2"),
    },
  },
  listItem: {
    HTMLAttributes: {
      class: cx("leading-normal -mb-2"),
    },
  },
  blockquote: {
    HTMLAttributes: {
      class: cx("border-l-4 border-primary"),
    },
  },
  codeBlock: {
    HTMLAttributes: {
      class: cx(
        "rounded-md bg-muted text-muted-foreground border p-5 font-mono font-medium"
      ),
    },
  },
  code: {
    HTMLAttributes: {
      class: cx("rounded-md bg-muted  px-1.5 py-1 font-mono font-medium"),
      spellcheck: "false",
    },
  },
  // horizontalRule: true,
  // dropcursor: {
  //   color: "#DBEAFE",
  //   width: 4,
  // },
  // gapcursor: false,
});

// const globalDragHandle = GlobalDragHandle.configure({
//   dragHandleWidth: 20, // default

//   // The scrollTreshold specifies how close the user must drag an element to the edge of the lower/upper screen for automatic
//   // scrolling to take place. For example, scrollTreshold = 100 means that scrolling starts automatically when the user drags an
//   // element to a position that is max. 99px away from the edge of the screen
//   // You can set this to 0 to prevent auto scrolling caused by this extension
//   // scrollTreshold: 100, // default
//   scrollTreshold: 100,
//   HtmlAttributes: {
//     class: cx("drag-handle"),
//   },
// });

const autoJoiner = AutoJoiner.configure({
  elementsToJoin: ["bulletList", "orderedList"], // default
});

export const defaultExtensions = [
  document,
  paragraph,
  dBlock,
  // trailingNode,
  // globalDragHandle,
  // CustomGlobalDrag,
  starterKit,
  placeholder,
  tiptapLink,
  tiptapImage,
  updatedImage,
  taskList,
  taskItem,
  horizontalRule,
  aiHighlight,
  autoJoiner,
  SlashCommand,
];
