"use client";
import { Editor, Range } from "@tiptap/core";

import Suggestion, { SuggestionOptions } from "@tiptap/suggestion";

interface SlashItem {
  title: string;
  command: (params: { editor: Editor; range: Range }) => void;
  shortcut: string;
  type: string;
  desc: string;
}

const SlashItems: Partial<SlashItem>[] = [
  {
    title: "Heading 1",
    command: ({ editor, range }) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode("heading", { level: 1 })
        .run();
    },
    shortcut: "#",
  },


];

const getSuggestionItems = (query: string) => {
  return [
    {
      title: "Heading",
      attrs: {
        "data-test-id": "insert-heading1",
      },
      command: ({ editor }: { editor: Editor }) => {
        const selection = editor.view.state.selection;
        const from = selection.$from.posAtIndex(0);
        const to = selection.$from.posAtIndex(1);
        editor
          .chain()
          .focus()
          .deleteRange({ from, to })
          .setNode("heading", { level: 1 })
          .run();
      },
    },
    {
      title: "Subheading",
      attrs: {
        "data-test-id": "insert-heading2",
      },
      command: ({ editor }: { editor: Editor }) => {
        const selection = editor.view.state.selection;
        const from = selection.$from.posAtIndex(0);
        const to = selection.$from.posAtIndex(1);
        editor
          .chain()
          .focus()
          .deleteRange({ from, to })
          .setNode("heading", { level: 2 })
          .run();
      },
    },
    {
      title: "Small Subheading",
      attrs: {
        "data-test-id": "insert-heading3",
      },
      command: ({ editor }: { editor: Editor }) => {
        const selection = editor.view.state.selection;
        const from = selection.$from.posAtIndex(0);
        const to = selection.$from.posAtIndex(1);
        editor
          .chain()
          .focus()
          .deleteRange({ from, to })
          .setNode("heading", { level: 3 })
          .run();
      },
    },
    {
      title: "Quote",
      attrs: {
        "data-test-id": "insert-quote",
      },
      command: ({ editor, range }: { editor: Editor; range: Range }) => {
        const selection = editor.view.state.selection;
        const from = selection.$from.posAtIndex(0);
        const to = selection.$from.posAtIndex(1);
        editor.chain().focus().deleteRange({ from, to }).setBlockquote().run();
      },
    },
    {
      title: "Bullet List",
      attrs: {
        "data-test-id": "insert-bullet-list",
      },
      command: ({ editor, range }: { editor: Editor; range: Range }) => {
        const selection = editor.view.state.selection;
        const from = selection.$from.posAtIndex(0);
        const to = selection.$from.posAtIndex(1);
        editor
          .chain()
          .focus()
          .deleteRange({ from, to })
          .toggleBulletList()
          .run();
      },
    },
    {
      title: "Numbered List",
      attrs: {
        "data-test-id": "insert-ordered-list",
      },
      command: ({ editor, range }: { editor: Editor; range: Range }) => {
        const selection = editor.view.state.selection;
        const from = selection.$from.posAtIndex(0);
        const to = selection.$from.posAtIndex(1);
        editor
          .chain()
          .focus()
          .deleteRange({ from, to })
          .toggleOrderedList()
          .run();
      },
    },
    {
      title: "Code Block",
      attrs: {
        "data-test-id": "insert-code",
      },
      command: ({ editor, range }: { editor: Editor; range: Range }) => {
        const selection = editor.view.state.selection;
        const from = selection.$from.posAtIndex(0);
        const to = selection.$from.posAtIndex(1);
        editor.chain().focus().deleteRange({ from, to }).setCodeBlock().run();
      },
    },
    // {
    //   title: "Callout",
    //   attrs: {
    //     "data-test-id": "insert-callout",
    //   },
    //   command: ({ editor, range }: { editor: Editor; range: Range }) => {
    //     const selection = editor.view.state.selection;
    //     const from = selection.$from.posAtIndex(0);
    //     const to = selection.$from.posAtIndex(1);
    //     editor.chain().focus().deleteRange({ from, to }).setCallout().run();
    //   },
    // },
    {
      title: "Image",
      attrs: {
        "data-test-id": "insert-image",
      },
      command: ({ editor, range }: { editor: Editor; range: Range }) => {
        const selection = editor.view.state.selection;
        const from = selection.$from.posAtIndex(0);
        const to = selection.$from.posAtIndex(1);
        editor
          .chain()
          .focus()
          .deleteRange({ from, to })
          .insertContentAt(from, { type: "imagePlaceholder" })
          .run();
      },
    },
    {
      title: "Video",
      attrs: {
        "data-test-id": "insert-video",
      },
      command: ({ editor, range }: { editor: Editor; range: Range }) => {
        const selection = editor.view.state.selection;
        const from = selection.$from.posAtIndex(0);
        const to = selection.$from.posAtIndex(1);
        editor
          .chain()
          .focus()
          .deleteRange({ from, to })
          .insertContentAt(from, { type: "videoPlaceholder" })
          .run();
      },
    },
  ]
    .filter((item) => item.title.toLowerCase().startsWith(query.toLowerCase()))
    .slice(0, 10);
};

export default getSuggestionItems;
