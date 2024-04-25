import Link from "next/link";
import { getServerSession } from "next-auth";
import { buttonVariants } from "../ui/button";

import { authOptions } from "@/lib/auth";
import UserAccountNav from "../user-nav/UserAccountNav";
const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className='w-full h-[50px] fixed top-0 border-b-[2px] bg-slate-200 border-black'>
      <div className='flex flex-row items-center justify-center'>
        {session?.user ? (
          <UserAccountNav />
        ) : (
          <Link href='/login' className={buttonVariants()}>
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
