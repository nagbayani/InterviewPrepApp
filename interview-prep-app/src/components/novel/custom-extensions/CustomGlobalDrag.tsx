import { Node, mergeAttributes } from "@tiptap/core";
import { Plugin, PluginKey } from "prosemirror-state";
import GlobalDragHandle from "tiptap-extension-global-drag-handle";
import { NodeSelection } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";

const CustomGlobalDragHandle = GlobalDragHandle.extend({
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("customGlobalDragHandle"),
        props: {},
      }),
    ];
  },
});

export default CustomGlobalDragHandle;
