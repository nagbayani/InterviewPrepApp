"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import getSuggestionItems from "./extensions/slash-suggestions/Items";
import Commands from "./extensions/slash-suggestions/Commands";

const TextEditor = () => {
  const editor = useEditor({
    extensions : [
      Commands.configure({
        suggestion: {
          items: getSuggestionItems,

        }
      })
    ]

  });
};
