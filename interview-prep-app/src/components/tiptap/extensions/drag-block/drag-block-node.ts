"use client";

import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { EditorState } from "@tiptap/pm/state";
import { DragBlock } from "./DragBlock";

export interface DragBlockOptions {
  HTMLAttributes: Record<string, any>;
}

/**
 * Declare to add new commands to the Command interface, for setDragBlock() in custom node "dragBlock"
 */
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    dragBlock: {
      /**
       * Toggle a drag block
       */
      setDragBlock: (position?: number) => ReturnType;
    };
  }
}

export const DBlock = Node.create<DragBlockOptions>({
  name: "dragBlock",

  priority: 1000,

  group: "dragBlock",

  content: "block",

  draggable: true,

  selectable: false,

  inline: false,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-type="drag-block"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-type": "drag-block" }),
      0,
    ];
  },

  addCommands() {
    return {
      /**
       * Inserts a block node of type `DBlock` at the specified position.
       * If the position is not specified, it inserts the block at the current cursor position.
       *
       * @param {number} position - The position where the block should be inserted.
       * @returns {function} A command function that takes the editor state and chain.
       */
      setDragBlock:
        (position: number) =>
        ({ state, chain }: { state: EditorState; chain: any }) => {
          const {
            selection: { from },
          } = state;

          // Determine the position where the block should be inserted.
          // If position is not provided, use the current cursor position.
          const pos =
            position !== undefined || position !== null ? from : position;

          return chain()
            .insertContentAt(pos, {
              type: this.name,
              content: [
                {
                  type: "paragraph",
                },
              ],
            })
            .focus(pos + 2) // Move focus to the newly inserted block.
            .run(); // Execute the command chain.
        },
    } as any;
  },

  addNodeView() {
    return ReactNodeViewRenderer(DragBlock);
  },

  addKeyboardShortcuts() {
    return {
      /**
       *
       * @returns command inserts block node of type 'dBlock' at current position / specified position
       */
      "Mod-Alt-0": () => this.editor.commands.setDragBlock(),

      /**
       * Keyboard shortcut Enter: Custom behavior when the Enter key is pressed.
       * Specifically, when within a node of type dBlock.
       * @param Editor instance
       * @returns
       */
      Enter: ({ editor }) => {
        // Extract selection and document information from the editor state
        const {
          selection: { $head, from, to },
          doc,
        } = editor.state;

        // Get the parent node of the current selection
        const parent = $head.node($head.depth - 1);

        // If the parent node is not of type dragBlock, do nothing
        if (parent.type.name !== "dragBlock") return false;

        let currentActiveNodeTo = -1;

        // Iterate over document descendants to find the current active node's ending position
        doc.descendants((node, pos) => {
          if (currentActiveNodeTo !== -1) return false;
          // Skip nodes of the same type as this.name
          if (node.type.name === this.name) return;

          const [nodeFrom, nodeTo] = [pos, pos + node.nodeSize];

          // If the current selection is within this node, set currentActiveNodeTo
          if (nodeFrom <= from && to <= nodeTo) currentActiveNodeTo = nodeTo;

          return false;
        });

        // Extract content from the document within the range from `from` to `currentActiveNodeTo`
        const content = doc.slice(from, currentActiveNodeTo)?.toJSON().content;

        // Insert the extracted content at the specified range
        return editor
          .chain()
          .insertContentAt(
            { from, to: currentActiveNodeTo },
            {
              type: this.name,
              content,
            }
          )
          .focus(from + 4) // Move focus to the newly inserted block
          .run(); // Execute the command chain
      },
    };
  },
});
