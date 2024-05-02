import React from "react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

const Interviews = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/login");
  }

  if (session?.user) {
    return (
      <div className='dashboard-wrapper'>
        <h1 className='ml-[0]'>
          Dashboard - Welcome Back {session?.user.username}
        </h1>
        <h1>Hi Interviews! </h1>
      </div>
    );
  }
  return (
    <h2 className='items-center text-2xl mt-[50px]'>
      Please Login to see this admin page
      <Link href='/login'>
        <Button>Login</Button>
      </Link>
    </h2>
  );
};

export default Interviews;
