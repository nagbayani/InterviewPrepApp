/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Plus } from "lucide-react";

import React, { useMemo } from "react";
import { NodeViewWrapper, NodeViewProps, NodeViewContent } from "@tiptap/react";
import { useEditor } from "novel";
import { GripVertical } from "lucide-react";

import "../../../../styles/prosemirror.css";

export const DBlockNodeView: React.FC<NodeViewProps> = ({
  node,
  getPos,
  editor,
}) => {
  console.log("node", node);
  const isTable = useMemo(() => {
    const { content } = node.content as any;

    return content[0].type.name === "table";
  }, [node.content]);

  const createNodeAfter = () => {
    const pos = getPos() + node.nodeSize;

    editor!.commands.insertContentAt(pos, {
      type: "dBlock",
      content: [
        {
          type: "paragraph",
        },
      ],
    });
  };

  return (
    <NodeViewWrapper as='div' className='flex gap-2 group w-full relative'>
      <section
        className='flex  mr-2 pt-[2px] gap-1'
        aria-label='left-menu'
        contentEditable={false}
      >
        <button
          className='d-block-button group-hover:opacity-100'
          onClick={createNodeAfter}
        >
          {/* <i className='i-mdi-plus' /> */}
          <Plus className='custom-icon-color' />
        </button>
        <div
          className='d-block-button group-hover:opacity-100'
          contentEditable={false}
          draggable='true'
          data-drag-handle
          aria-label='Drag handle'
          role='button'
        >
          {/* <i className='i-ic-baseline-drag-indicator' /> */}
          {/* <i className='drag-handle' /> */}
          <i className='drag-handle h-full'>
            <GripVertical className='custom-icon-color' />
          </i>
        </div>
      </section>

      <NodeViewContent
        className={`node-view-content w-full ${isTable ? "ml-6" : ""}`}
      />
    </NodeViewWrapper>
  );
};
