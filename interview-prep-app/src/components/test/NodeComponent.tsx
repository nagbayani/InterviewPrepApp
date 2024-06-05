"use client";
import { NodeViewWrapper, NodeViewContent, NodeViewProps } from "@tiptap/react";
import React from "react";
import "../../styles/tiptapNode.css";
import { truncateSync } from "fs";
import { Button, buttonVariants } from "../ui/button";
import { EditorState, Transaction } from "@tiptap/pm/state";

//{ node, editor, getPos }
export const NodeComponent = (props: NodeViewProps) => {
  const deleteNode = () => {
    const thisNodePos = props.getPos();
    console.log(thisNodePos, "NODE POSITION");

    // set selection anchor
    props.editor.commands.setNodeSelection(thisNodePos);

    props.editor.chain().setNodeSelection(thisNodePos).deleteSelection();

    // delete the current selection node
    props.editor.commands.deleteCurrentNode();
  };
  // Each node has a delete button
  return (
    <NodeViewWrapper
      className='react-component-with-content'
      draggable='true'
      selectable='true'
      data-drag-handle=''
    >
      <div
        className='drag-handle'
        contentEditable={false}
        draggable='true'
        data-drag-handle=''
      />
      <span className='label' contentEditable={false}>
        React Component
      </span>

      <Button
        variant='destructive'
        onClick={() => {
          deleteNode();
        }}
      >
        Delete
      </Button>

      <NodeViewContent className='content' contentEditable={true} />
    </NodeViewWrapper>
  );
};
