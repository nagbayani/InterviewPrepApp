import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
} from "lucide-react";
import { DeckData } from "@/types/data-types";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};
export function getMenuList(
  pathname: string,
  decksData: Record<string, DeckData> = {}
): Group[] {
  const staticMenus: Group[] = [
    {
      groupLabel: "",
      menus: [
        {
          href: "/home",
          label: "Home",
          active: pathname.includes("/home"),
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "/decks",
          label: "Decks",
          active: pathname.includes("/decks"),
          icon: SquarePen,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "",
      menus: [
        {
          href: "/interviews",
          label: "Interviews",
          active: pathname.includes("/interviews"),
          icon: Bookmark,
          submenus: [],
        },
      ],
    },
  ];

  // Convert decksData from Record<string, DeckData> to an array of DeckData
  const workspaceMenus: Menu[] = Object.values(decksData).map((deck) => ({
    href: `/decks/${deck.id}`,
    label: deck.title,
    active: pathname.includes(`/decks/${deck.id}`),
    icon: Tag, // Use an appropriate icon for decks
    submenus: [],
  }));

  return [
    ...staticMenus,
    {
      groupLabel: "Workspace",
      menus: workspaceMenus,
    },
  ];
}
