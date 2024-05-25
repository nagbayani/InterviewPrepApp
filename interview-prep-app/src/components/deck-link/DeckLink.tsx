"use client";

import React, { useState } from "react";
import "../../styles/deckLink.css";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface DeckLinkProps {
  id: string;
  title: string;
  path: string;
}
const DeckLink = ({ id, title, path }: DeckLinkProps) => {
  const pathname = usePathname();

  return (
    <Link
      href={path}
      className={`decklink-container ${
        pathname === path && "decklink-container "
      }`}
    >
      <strong>{title}</strong>
    </Link>
  );
};

export default DeckLink;
