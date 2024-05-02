import React from "react";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  const router = useRouter();

  if (session?.user) {
    router.push("/home");
  } else {
    router.push("/login");
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

export default Dashboard;
