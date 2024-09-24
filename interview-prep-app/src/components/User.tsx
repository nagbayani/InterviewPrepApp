"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
const User = () => {
  const { data: session, status } = useSession();
  return (
    <div className='flex flex-col gap-2 justify-center items-center'>
      {status === "loading" && <p>Loading...</p>}
      {status === "unauthenticated" && (
        <button onClick={() => signIn()}>Sign In</button>
      )}
      {status === "authenticated" && (
        <button onClick={() => signOut()}>Sign Out</button>
      )}
      <span>{JSON.stringify(session)}</span>
      <pre>{status}</pre>
    </div>
  );
};

export default User;
