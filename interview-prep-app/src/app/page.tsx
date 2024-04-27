import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import User from "@/components/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main className='flex  flex-col w-full h-full items-center justify-center '>
      <h1>Please login to see admin</h1>
      <Link className={buttonVariants()} href='/home'>
        Open my Admin
      </Link>
      <h2>Client Session</h2>
      <User />
      <h2>Server Session</h2>
      {JSON.stringify(session)}
    </main>
  );
}
