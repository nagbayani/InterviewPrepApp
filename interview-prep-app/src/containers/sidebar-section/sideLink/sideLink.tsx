"use client";

import Link from "next/link";
import "../../../styles/sideLink.css";
import { usePathname } from "next/navigation";

interface Item {
  name: string;
  path: string;
}

interface SideLinkProps {
  item: Item;
}
const SideLink = ({ item }: SideLinkProps) => {
  const pathname = usePathname();

  return (
    <Link
      href={item.path}
      className={`sidelink-container ${
        pathname === item.path && "sidelink-container active"
      }`}
    >
      {/* {item.icon} */}
      {item.name}
    </Link>
  );
};

export default SideLink;
