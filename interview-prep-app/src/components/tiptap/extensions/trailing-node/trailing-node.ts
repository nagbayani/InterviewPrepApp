/**
 *
 * The extension ensures that a specific type of node (e.g., a paragraph) is always present at the end of the document, unless certain node types are already at the end. This behavior helps maintain a better user experience by ensuring there's always an editable area at the end of the document.
 */

import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "prosemirror-state";
import { Node as ProseMirrorNode, NodeType } from "prosemirror-model";

/**
 * @property `node` - The type of node to insert at the end (e.g.,  "paragraph").
 *
 * @property `notAfter` - An array of node types after which the trailing node should not be added.
 */
export interface TrailingNodeOptions {
  node: string;
  notAfter: string[];
}

// Checks Node Type
function nodeEqualsType({
  types,
  node,
}: {
  types: NodeType | NodeType[];
  node: ProseMirrorNode;
}): boolean {
  return (
    (Array.isArray(types) && types.includes(node.type)) || node.type === types
  );
}

export const TrailingNode = Extension.create<TrailingNodeOptions>({
  name: "trailingNode",

  addOptions() {
    return {
      node: "paragraph",
      notAfter: ["paragraph"],
    };
  },

  addProseMirrorPlugins() {
    const plugin = new PluginKey(this.name);

    // Filters nodes based on the notAfter option to determine which nodes should prevent the trailing node from being added.
    const disabledNodes = Object.entries(this.editor.schema.nodes)
      .map(([, value]) => value)
      .filter((node) => this.options.notAfter.includes(node.name));

    return [
      new Plugin({
        key: plugin,

        /**
         * Runs after each transaction to potentially insert the
         * trailing node.
         *
         *  - Checks if a trailing node should be inserted at the end of the document.
         *  - Inserts the specified node type at the end position if the conditions are met.
         * */

        appendTransaction: (_, __, state) => {
          const { doc, tr, schema } = state;

          const shouldInsertNodeAtEnd = plugin.getState(state);

          const endPosition = doc.content.size;

          const type = schema.nodes[this.options.node];

          if (!shouldInsertNodeAtEnd) return;

          // eslint-disable-next-line consistent-return
          return tr.insert(endPosition, type.create());
        },
        state: {
          // Check the last node of the document
          init: (_, state) => {
            const lastNode = state.tr.doc.lastChild;

            // return !nodeEqualsType({ node: lastNode, types: disabledNodes });

            return lastNode
              ? !nodeEqualsType({ node: lastNode, types: disabledNodes })
              : true;
          },
          // Update plugin state after every transaction, determines if last node is changed
          apply: (tr, value) => {
            if (!tr.docChanged) return value;

            const lastNode = (tr.doc.lastChild?.content as any)?.content?.[0];

            return !nodeEqualsType({ node: lastNode, types: disabledNodes });
          },
        },
      }),
    ];
  },
});
