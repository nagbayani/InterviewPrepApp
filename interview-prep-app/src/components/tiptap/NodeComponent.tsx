"use client";
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";
import React from "react";
import "../../styles/tiptapNode.css";
import { truncateSync } from "fs";

export const NodeComponent = () => {
  return (
    <NodeViewWrapper
      className='react-component-with-content'
      draggable='true'
      data-drag-handle=''
      // contentEditable={false}
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

      <NodeViewContent className='content' contentEditable={true} />
    </NodeViewWrapper>
  );
};
