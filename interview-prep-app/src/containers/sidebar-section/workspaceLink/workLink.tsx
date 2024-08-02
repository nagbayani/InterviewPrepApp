"use client";

import Link from "next/link";
import "../../../styles/sidebar.css";
import { usePathname } from "next/navigation";

interface Item {
  name: string;
  // icon: React.ReactNode;
  path: string;
}

interface WorkLinkProps {
  item: Item;
  isCollapsed: boolean;
}
const WorkLink = ({ item, isCollapsed }: WorkLinkProps) => {
  const pathname = usePathname();

  return (
    <Link
      href={item.path}
      className={`worklink-container ${
        pathname === item.path && "worklink-container active"
      }`}
    >
      {/* {item.icon} */}
      <div className='collapsed-icon-placeholder' />
      {!isCollapsed && item.name}
    </Link>
  );
};

export default WorkLink;
