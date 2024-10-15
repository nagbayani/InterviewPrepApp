"use client";
import React from "react";
import { LayoutGrid, LogOut, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { logout } from "@/actions/logout";
import { Session } from "next-auth";
import Link from "next/link";
import "@/styles/sidebar.css";

// 2:49:34

// Interface for user session data
interface User {
  user: Session["user"] | null | undefined;
}

const UserAccountNav = ({ user }: User) => {
  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant='outline'
                className='relative h-8 w-8 rounded-full'
              >
                <Avatar className='h-8 w-8'>
                  <AvatarImage src={user?.image || "#"} alt='Avatar' />
                  <AvatarFallback className='bg-transparent'>
                    {user?.name?.[0] || "?"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side='bottom'>Profile</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent className='w-56' align='end' forceMount>
        {user ? (
          <>
            <DropdownMenuLabel className='font-normal'>
              <div className='flex flex-col space-y-1'>
                <p className='text-sm font-medium leading-none'>{user.name}</p>
                <p className='text-xs leading-none text-muted-foreground'>
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className='hover:cursor-pointer' asChild>
                <Link href='/home' className='flex items-center'>
                  <LayoutGrid className='w-4 h-4 mr-3 text-muted-foreground' />
                  Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className='hover:cursor-pointer' asChild>
                <Link href='/narrative' className='flex items-center'>
                  <UserIcon className='w-4 h-4 mr-3 text-muted-foreground' />
                  Account
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className='hover:cursor-pointer'
              onClick={() => logout()} // Logout function
            >
              <LogOut className='w-4 h-4 mr-3 text-muted-foreground' />
              Sign out
            </DropdownMenuItem>
          </>
        ) : (
          // Display sign in button if user is not logged in
          <DropdownMenuItem asChild>
            <Link href='/login'>
              <Button variant='outline' className='w-full'>
                Sign in
              </Button>
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
// callbackUrl: `${window.location.origin}/login`,
