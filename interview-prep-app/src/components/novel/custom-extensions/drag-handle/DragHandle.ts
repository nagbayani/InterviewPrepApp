import React, {
  useState,
  useEffect,
  useCallback,
  ReactNode,
  useRef,
  useLayoutEffect,
} from "react";
import { Editor, Range, Extension } from "@tiptap/core";
import { NodeSelection, Plugin } from "@tiptap/pm/state";

import Suggestion from "@tiptap/suggestion";
import { ReactRenderer } from "@tiptap/react";
import { useCompletion } from "ai/react";
import tippy from "tippy.js";

import LoadingCircle from "@/components/ui/icons/loading-circle";
import { toast } from "sonner";
import va from "@vercel/analytics";
import Magic from "@/components/ui/icons/magic";
import { suggestionItems } from "../suggestion-items";
import { Node as ProseMirrorNode } from "@tiptap/core";

const DragHandle = Extension.create({
  name: "dragHandle",

  addProseMirrorPlugins() {
    function blockPosAtCoords(coords, view) {
      const pos = view.posAtCoords(coords);
      let node = view.domAtPos(pos.pos);

      node = node.node;

      while (node && node.parentNode) {
        if (node.parentNode?.classList?.contains("ProseMirror")) {
          // todo
          break;
        }

        node = node.parentNode;
      }

      if (node && node.nodeType === 1) {
        const desc = view.docView.nearestDesc(node, true);

        if (!(!desc || desc === view.docView)) {
          return desc.posBefore;
        }
      }
      return null;
    }

    function dragStart(e, view) {
      view.composing = true;

      if (!e.dataTransfer) {
        return;
      }

      const coords = { left: e.clientX + 50, top: e.clientY };
      const pos = blockPosAtCoords(coords, view);

      if (pos != null) {
        view.dispatch(
          view.state.tr.setSelection(NodeSelection.create(view.state.doc, pos))
        );

        const slice = view.state.selection.content();

        // console.log({
        //   from: view.nodeDOM(view.state.selection.from),
        //   to: view.nodeDOM(view.state.selection.to),
        // })
        const { dom, text } = serializeForClipboard(view, slice);

        e.dataTransfer.clearData();
        e.dataTransfer.setData("text/html", dom.innerHTML);
        e.dataTransfer.setData("text/plain", text);

        const el = document.querySelector(".ProseMirror-selectednode");

        e.dataTransfer?.setDragImage(el, 0, 0);
        view.dragging = { slice, move: true };
      }
    }
  },
});
