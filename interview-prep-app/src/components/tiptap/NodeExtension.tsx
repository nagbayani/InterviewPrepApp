import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import { NodeComponent } from "./NodeComponent";

export default Node.create({
  name: "customNode",
  group: "block",
  content: "inline*",
  // content: "block+",
  draggable: true,
  // atom: true,

  parseHTML() {
    return [
      {
        tag: "div[data-type='custom-node']",
      },
    ];
  },

  addKeyboardShortcuts() {
    return {
      "Mod-Enter": () => {
        return this.editor
          .chain()
          .insertContentAt(this.editor.state.selection.head, {
            type: this.type.name,
          })
          .focus()
          .run();
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-type": "custom-node" }),
      0,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(NodeComponent);
  },
});
