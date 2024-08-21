"use client";

import React, { useEffect, useState } from "react";
import { TagData } from "@/types/data-types";
import { TangentIcon } from "lucide-react";
import { tagColors } from "@/lib/colors/tag-colors";

/**
 * Tag component to render a tag
 * @param param0
 * @returns
 */

const Tag = ({ tag }: { tag: TagData }) => {
  const selectedColor = tagColors.find((c) => c.textColor === tag.color);

  return (
    <div
      className='tag px-2 py-1 rounded-full'
      style={{
        borderRadius: "25px",
        backgroundColor: selectedColor?.backgroundColor,
        borderColor: selectedColor?.borderColor,
        color: selectedColor?.textColor,
        borderWidth: "1px",
        borderStyle: "solid",
        fontSize: "var(--step--7)",
      }}
    >
      <span>{tag.name}</span>
    </div>
  );
};

export default Tag;
