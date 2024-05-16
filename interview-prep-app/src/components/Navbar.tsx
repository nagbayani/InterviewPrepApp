import Link from "next/link";
import { getServerSession } from "next-auth";
import { buttonVariants } from "./ui/button";
import { auth } from "../../auth";
import { authOptions } from "@/lib/testAuth";
import UserAccountNav from "./UserAccountNav";
const Navbar = async () => {
  const session = await auth();
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
