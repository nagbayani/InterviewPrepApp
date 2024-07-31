"use client";

import React, { useEffect, useState } from "react";
import { TagData } from "@/types/data-types";
import { TangentIcon } from "lucide-react";

/**
 * Tag component to render a tag
 * @param param0
 * @returns
 */

export const Tag = ({ tag }: { tag: TagData }) => {
  return (
    <div className='tag'>
      <span>{tag.name}</span>
    </div>
  );
};
