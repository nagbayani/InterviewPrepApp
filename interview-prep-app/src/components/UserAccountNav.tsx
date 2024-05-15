"use client";
import React from "react";
import { Button } from "./ui/button";
import { logout } from "@/actions/logout";

// 2:49:34
const UserAccountNav = () => {
  return (
    <div>
      <Button onClick={() => logout()} variant='destructive'>
        Sign out
      </Button>
    </div>
  );
};

export default UserAccountNav;
// callbackUrl: `${window.location.origin}/login`,
