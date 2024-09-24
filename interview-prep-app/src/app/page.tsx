import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import User from "@/components/User";
import { auth } from "../../auth";
import { signIn, signOut, useSession } from "next-auth/react";

export default async function Home() {
  const session = await auth();
  // const { data, status } = useSession();

  return (
    <main className='flex  flex-col w-full h-full items-center justify-center '>
      <h1>Please login to see admin</h1>
      {/* <Link className={buttonVariants()} href='/home'>
        Open my Admin
      </Link> */}
      <h2>Client Session</h2>
      <User />
      <h2>Server Session</h2>
      {JSON.stringify(session)}
    </main>
  );
}
