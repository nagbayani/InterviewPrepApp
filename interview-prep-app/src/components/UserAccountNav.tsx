"use client";
import React from "react";
import { Button } from "./ui/button";
import { logout } from "@/actions/logout";
import { Session } from "next-auth";
import { buttonVariants } from "./ui/button";
import Link from "next/link";

// 2:49:34

interface User {
  user: Session["user"] | null | undefined;
}
const UserAccountNav = ({ user }: User) => {
  return (
    <div>
      {user ? (
        <Button onClick={() => logout()} variant='destructive'>
          Sign out
        </Button>
      ) : (
        <Link href='/login' className={buttonVariants()}>
          Sign in
        </Link>
      )}
    </div>
  );
};

export default UserAccountNav;
// callbackUrl: `${window.location.origin}/login`,
