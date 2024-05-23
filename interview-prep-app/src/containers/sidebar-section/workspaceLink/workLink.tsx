"use client";

import Link from "next/link";
import "../../../styles/workLink.css";
import { usePathname } from "next/navigation";

interface Item {
  name: string;
  // icon: React.ReactNode;
  path: string;
}

interface WorkLinkProps {
  item: Item;
}
const WorkLink = ({ item }: WorkLinkProps) => {
  const pathname = usePathname();

  return (
    <Link
      href={item.path}
      className={`worklink-container ${
        pathname === item.path && "worklink-container active"
      }`}
    >
      {/* {item.icon} */}
      {item.name}
    </Link>
  );
};

export default WorkLink;
