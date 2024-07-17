import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { auth } from "../../../../auth";

const Interviews = async () => {
  const session = await auth();
  if (!session) {
    return redirect("/login");
  }

  if (session?.user) {
    return (
      <div className='dashboard-wrapper p-8 '>
        <h1 className='ml-[0] '>
          Dashboard - Welcome Back {session?.user.name}
        </h1>
        <h1 style={{ fontSize: "var(--step-1)" }}>Interviews</h1>
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
