import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { EditorState, Transaction } from "@tiptap/pm/state";

import { NodeComponent } from "./NodeComponent";

export default Node.create({
  name: "customNode",
  group: "block",
  content: "inline*",
  // content: "block+",
  draggable: true,
  selectable: true,
  // atom: true,

  parseHTML() {
    return [
      {
        tag: `div[data-type='custom-node']`,
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

  // addCommands() {
  //   return {
  //     deleteCustomNode:
  //       () =>
  //       ({
  //         state,
  //         dispatch,
  //       }: {
  //         state: EditorState;
  //         dispatch: Transaction;
  //       }) => {
  //         const { selection } = state;
  //         if (
  //           selection instanceof NodeSelection &&
  //           selection.head === "customNode"
  //         ) {
  //           const tr = state.tr.delete(selection.from, selection.to);
  //           dispatch(tr);
  //           return true;
  //         }
  //         return false;
  //       },
  //   };
  // },

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
