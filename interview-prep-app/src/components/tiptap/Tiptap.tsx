"use client";
import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import NodeExtension from "./NodeExtension";
import { EditorState } from "@tiptap/pm/state";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import Dropcursor from "@tiptap/extension-dropcursor";
import { useState } from "react";
// import { EditorState } from "@tiptap/pm/state";

const Tiptap = () => {
  const [isEdit, setEdit] = useState(true);
  const editor = useEditor({
    extensions: [Document, Text, Dropcursor, NodeExtension],
    content: `<div data-type="custom-node">Editable content here</div>
    `,
    onCreate({ editor }) {
      // Ensure the initial content structure only contains custom nodes
      if (editor && !editor.isDestroyed) {
        editor.commands.setContent(
          '<div data-type="custom-node">Editable content here</div>'
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

  if (!editor) {
    return null;
  }

  return (
    <div>
      <EditorContent editor={editor} />
      <>
        {isEdit ? <button onClick={handleDestroy}>Destroy Editor</button> : ""}
      </>
    </div>
  );
};

export default Tiptap;

// draggable
