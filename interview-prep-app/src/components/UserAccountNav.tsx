"use client";
import React from "react";
import { Button } from "./ui/button";
import { logout } from "@/actions/logout";
import { Session } from "next-auth";
import { buttonVariants } from "./ui/button";
import Link from "next/link";
import "@/styles/sidebar.css";

// 2:49:34

interface User {
  user: Session["user"] | null | undefined;
}
const UserAccountNav = ({ user }: User) => {
  return (
    <>
      {user ? (
        <Button
          onClick={() => logout()}
          variant='destructive'
          className='w-30 justify-self-center'
        >
          Sign out
        </Button>
      ) : (
        <Link href='/login' className={buttonVariants()}>
          Sign in
        </Link>
      )}
    </>
  );
};

export default UserAccountNav;
// callbackUrl: `${window.location.origin}/login`,
