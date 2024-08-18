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
import gradients from "./colors/thumbnail-gradients";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon | null;
  thumbnailStyle?: string | null; // For Dynamic Deck Thumbnail
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
          submenus: [
            {
              href: "/interviews/mock-templates",
              label: "Mock Templates",
              active: pathname.includes("/interviews/mock-templates"),
            },
            {
              href: "/interviews/job-roles", // Or whatever name you prefer
              label: "Job Positions",
              active: pathname.includes("/interviews/job-roles"),
            },
          ],
        },
      ],
    },
  ];

  // Convert decksData from Record<string, DeckData> to an array of DeckData
  const workspaceMenus: Menu[] = Object.values(decksData).map((deck) => {
    const gradient = gradients.find((g) => g.name === deck.thumbnail);

    return {
      href: `/decks/${deck.id}`,
      label: deck.title,
      active: pathname.includes(`/decks/${deck.id}`),
      icon: gradient ? null : Tag, // Use Tag icon if no thumbnail
      thumbnailStyle: gradient ? gradient.style : undefined, // Use gradient style if found
      submenus: [],
    };
  });

  return [
    ...staticMenus,
    {
      groupLabel: "Workspace",
      menus: workspaceMenus,
    },
  ];
}
