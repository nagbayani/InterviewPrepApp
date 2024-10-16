"use client";

import Link from "next/link";
import { Ellipsis, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { getMenuList } from "@/lib/sidebar-list";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CollapseMenuButton } from "./collapse-menu";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { DeckData } from "@/types/data-types";
import { Tag } from "lucide-react";
import Thumbnail from "../decks-page/thumbnails/Thumbnail";
import { useDeckStore } from "@/_store/index";

interface MenuProps {
  isOpen: boolean | undefined;
  // decks: Record<string, DeckData>;
}
/**
 * Maps out all menu items in Sidebar
 * @param param0
 * @returns
 */
export function Menu({ isOpen }: MenuProps) {
  const { decks: decksData } = useDeckStore((state) => ({
    decks: state.decks,
  }));
  const pathname = usePathname();
  const menuList = getMenuList(pathname, decksData);

  // console.log("DECKS in Menu", decksData);
  return (
    <ScrollArea className='[&>div>div[style]]:!block'>
      <nav className='mt-8 h-full w-full'>
        <ul className='flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-2'>
          {/* Maps out labels for the sidebar items */}
          {menuList.map(({ groupLabel, menus }, index) => (
            <li className={cn("w-full", groupLabel ? "pt-5" : "")} key={index}>
              {(isOpen && groupLabel) || isOpen === undefined ? (
                <p className='text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate'>
                  {groupLabel}
                </p>
              ) : !isOpen && isOpen !== undefined && groupLabel ? (
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger className='w-full'>
                      <div className='w-full flex justify-center items-center'>
                        <Ellipsis className='h-5 w-5' />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side='right'>
                      <p>{groupLabel}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <p className='pb-2'></p>
              )}

              {/* Map out Sidebar Menus */}
              {menus.map(
                (
                  { href, label, icon: Icon, active, submenus, thumbnailStyle },
                  index
                ) =>
                  submenus.length === 0 ? (
                    <div className='w-full' key={index}>
                      <TooltipProvider disableHoverableContent>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            <Button
                              variant={active ? "secondary" : "ghost"}
                              className={cn(
                                "h-10 mb-1",
                                isOpen
                                  ? "w-full justify-start"
                                  : "w-full flex justify-center items-center"
                              )}
                              asChild
                            >
                              <Link href={href}>
                                <span
                                  className={cn(isOpen === false ? "" : "mr-4")}
                                >
                                  {/* (If) Static menus have icons & no thumbnails
                                      (Else) Dynamic menus [DeckId - Deck links] have thumbnails
                                   */}
                                  {Icon ? (
                                    <Icon size={18} className='mx-auto' />
                                  ) : thumbnailStyle ? (
                                    <Thumbnail gradientStyle={thumbnailStyle} />
                                  ) : null}
                                </span>
                                {isOpen && (
                                  <p
                                    className={cn(
                                      "max-w-[200px] truncate",
                                      "translate-x-0 opacity-100"
                                    )}
                                  >
                                    {label}
                                  </p>
                                )}
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          {isOpen === false && (
                            <TooltipContent side='right'>
                              {label}
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ) : (
                    <div className='w-full' key={index}>
                      <CollapseMenuButton
                        icon={Icon || Tag}
                        label={label}
                        active={active}
                        submenus={submenus}
                        isOpen={isOpen}
                      />
                    </div>
                  )
              )}
            </li>
          ))}
          <li className='w-full grow flex items-end'>
            <TooltipProvider disableHoverableContent>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => {}}
                    variant='outline'
                    className='w-full justify-center h-10 mt-5'
                  >
                    <span className={cn(isOpen === false ? "" : "mr-4")}>
                      <LogOut size={18} />
                    </span>
                    <p
                      className={cn(
                        "whitespace-nowrap",
                        isOpen === false ? "opacity-0 hidden" : "opacity-100"
                      )}
                    >
                      Sign out
                    </p>
                  </Button>
                </TooltipTrigger>
                {isOpen === false && (
                  <TooltipContent side='right'>Sign out</TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </li>
        </ul>
      </nav>
    </ScrollArea>
  );
}
