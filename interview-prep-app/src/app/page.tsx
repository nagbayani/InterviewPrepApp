import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
export default function Home() {
  return (
    <main className='flex w-full h-full items-center justify-center '>
      <h1>Please login to see admin</h1>
      <Link className={buttonVariants()} href='/admin'>
        Open my Admin
      </Link>
    </main>
  );
}
