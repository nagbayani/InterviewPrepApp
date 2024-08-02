"use client";

import Link from "next/link";
import "../../../styles/sidebar.css";
import { usePathname } from "next/navigation";

interface Item {
  name: string;
  icon: React.ReactNode;
  path: string;
}

interface SideLinkProps {
  item: Item;
  isCollapsed: boolean;
}
const SideLink = ({ item, isCollapsed }: SideLinkProps) => {
  const pathname = usePathname();

  return (
    <Link
      href={item.path}
      className={`sidelink-container ${
        pathname === item.path && "sidelink-container active"
      }`}
    >
      {item.icon}
      {!isCollapsed && item.name}
    </Link>
  );
};

export default SideLink;
