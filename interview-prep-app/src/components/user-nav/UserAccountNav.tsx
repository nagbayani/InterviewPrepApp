"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

const UserAccountNav = () => {
  return (
    <div>
      <Button
        onClick={() =>
          signOut({
            redirect: true,
            callbackUrl: `${window.location.origin}/login`,
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
