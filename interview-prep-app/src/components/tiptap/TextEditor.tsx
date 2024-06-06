"use client";
import { Editor } from "@tiptap/core";

import { useEditor, EditorContent } from "@tiptap/react";
import Commands from "./extensions/slash-suggestions/Commands";
import { useCallback } from "react";
import { getExtensions } from "./extensions";
import { Content } from "@tiptap/react";
import { CustomBubbleMenu } from "./menu-components/bubble-menu";

const content: Content = {
  type: "doc",
  content: [
    {
      type: "dBlock",
      content: [
        {
          type: "heading",
          attrs: {
            level: 1,
          },
          content: [
            {
              type: "text",
              text: "Start writing an answer.",
            },
          ],
        },
      ],
    },
  ],
};

const editorClass =
  "prose prose-p:my-2 prose-h1:my-2 prose-h2:my-2 prose-h3:my-2 prose-ul:my-2 prose-ol:my-2 max-w-none";

export const TextEditor = () => {
  // const logContent = useCallback((e: Editor) => console.log(e.getJSON()), []);

  const editor = useEditor({
    extensions: getExtensions(),
    content,
    editorProps: {
      attributes: {
        class: `${editorClass} focus:outline-none w-full`,
        spellcheck: "false",
        suppressContentEditableWarning: "true",
      },
    },
    // Add Debounce function to onUpdate: =>
  });

  return (
    editor && (
      <section className='flex flex-col gap-2 w-full justify-center'>
        <EditorContent className='w-full flex justify-center' editor={editor} />

        <CustomBubbleMenu editor={editor} />

        {/* <LinkBubbleMenu editor={editor} /> */}
      </section>
    )
  );
};
