import { NodeViewWrapper, NodeViewProps, NodeViewContent } from "@tiptap/react";
import React from "react";
import { RxDragHandleDots2 } from "react-icons/rx";
import { GoPlus } from "react-icons/go";

// Pass in TipTap's NodeViewProps - destruct {node, getPos, editor}
export const DragBlock: React.FC<NodeViewProps> = ({
  node,
  getPos,
  editor,
}) => {
  // create a node after current position
  const addNode = () => {
    // get current position
    const pos = getPos() + node.nodeSize;

    // editor command to insert at pos
    editor.commands.insertContentAt(pos, {
      type: "dragBlock",
      content: [
        {
          type: "paragraph",
        },
      ],
    });
  };

  return (
    <NodeViewWrapper as='div' className='flex gap-2 group relative'>
      {/* Left menu */}
      <section
        className='flex mt-2 pt-[2px] gap-1'
        contentEditable='false'
        aria-label='left menu'
      >
        {/* + button to add node after */}
        <button
          className='drag-add-button group-hover:opacity-100'
          onClick={addNode}
          contentEditable={false}
        >
          <GoPlus />
        </button>

        {/* Drag handle */}
        <div
          className='drag-handle group-hover:opacity-100'
          contentEditable={false}
          draggable='true'
          data-drag-handle
          aria-label='Drag handle'
          role='button'
        >
          <RxDragHandleDots2 />
        </div>
      </section>
      <NodeViewContent className='drag-block-content w-full' />
    </NodeViewWrapper>
  );
};
