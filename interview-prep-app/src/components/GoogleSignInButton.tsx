"use client";

import { FC, ReactNode } from "react";
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "../../auth";
import { DEFAULT_LOGIN_REDIRECT } from "../../routes";
import { useSearchParams } from "next/navigation";

interface GoogleSignInButtonProps {
  children: ReactNode;
}
const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children }) => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  // const loginWithGoogle = () => console.log("login with google");

  const onClick = (provider: "Google" | "Github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT || callbackUrl,
    });
  };

  return (
    <Button onClick={() => onClick("Google")} className='w-full'>
      {children}
      <FcGoogle className='h-5 w-5' />
    </Button>
  );
};

export default GoogleSignInButton;
