"use client";

import React, { useState } from "react";
import "../../styles/deckLink.css";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";

interface DeckLinkProps {
  id: string;
  title: string;
  path: string;
}
const DeckLink = ({ id, title, path }: DeckLinkProps) => {
  const pathname = usePathname();

  return (
    <div
      className={`decklink-container ${
        pathname === path && "decklink-container "
      }`}
    >
      <span>{title}</span>
      <Link href={path}>
        <Button className='float-left bottom-2  m-4'>Go</Button>
      </Link>
    </div>
  );
};

export default DeckLink;
