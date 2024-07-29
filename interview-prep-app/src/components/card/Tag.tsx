"use client";

import React, { useEffect, useState } from "react";
import { CardTagData } from "@/types/data-types";

/**
 * Tag component to render a tag
 * @param param0
 * @returns
 */

export const Tag = ({ tag }: { tag: CardTagData }) => {
  return (
    <div className='tag'>
      <span>{tag}</span>
    </div>
  );
};
