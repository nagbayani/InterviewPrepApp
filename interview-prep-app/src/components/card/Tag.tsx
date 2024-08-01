"use client";

import React, { useEffect, useState } from "react";
import { TagData } from "@/types/data-types";
import { TangentIcon } from "lucide-react";

/**
 * Tag component to render a tag
 * @param param0
 * @returns
 */

const Tag = ({ tag }: { tag: TagData }) => {
  return (
    <div
      className='tag px-2 py-1 bg-gray-200 text-xs rounded-full'
      style={{ borderRadius: "25px" , backgroundColor: tag.color }}
    >
      <span>{tag.name}</span>
    </div>
  );
};

export default Tag;
