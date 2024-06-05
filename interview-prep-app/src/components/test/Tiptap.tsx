"use client";
import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import NodeExtension from "./NodeExtension";
import { EditorState } from "@tiptap/pm/state";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Dropcursor from "@tiptap/extension-dropcursor";
import { Underline } from "@tiptap/extension-underline";
import { Link } from "@tiptap/extension-link";
import { useState } from "react";
import { Button, buttonVariants } from "../ui/button";

// import { EditorState } from "@tiptap/pm/state";

// import custom Document
const Tiptap = () => {
  const [isEdit, setEdit] = useState(true);
  const editor = useEditor({
    extensions: [Document, Text, Dropcursor, NodeExtension],
    content: `
    <div> 
      <div data-type="custom-node">Editable content here</div>
    </div>
    `,

    onCreate({ editor }) {
      // Ensure the initial content structure only contains custom nodes
      if (editor && !editor.isDestroyed) {
        editor.commands.setContent(
          `
          <div> 
            <div data-type="custom-node">Editable content here</div>
          </div>
          `
        );
      }
    },
  });

  const handleDestroy = () => {
    if (editor) {
      editor.destroy();
      setEdit(false);
    }
  };

  // configure IDS for every node
  // pass them ass props

  const handleNodeDelete = () => {
    if (editor) {
      // Deletes a single node
      editor.chain().focus().deleteNode("customNode").run();
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div>
      <EditorContent editor={editor} />
      <>
        {isEdit ? (
          <Button variant='destructive' onClick={handleDestroy}>
            Destroy Editor
          </Button>
        ) : (
          ""
        )}
      </>
    </div>
  );
};

export default Tiptap;

// draggable
