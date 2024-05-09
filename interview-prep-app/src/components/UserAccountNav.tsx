"use client";
import React from "react";
import { signOut } from "../../auth";
import { Button } from "./ui/button";

// 2:49:34
const UserAccountNav = () => {
  return (
    <div>
      <Button
        onClick={() =>
          signOut({
            redirect: true,
          })
        }
        variant='destructive'
      >
        Sign out
      </Button>
    </div>
  );
};

export default UserAccountNav;
// callbackUrl: `${window.location.origin}/login`,
