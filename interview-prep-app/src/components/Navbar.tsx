import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { auth } from "../../auth";
import UserAccountNav from "./UserAccountNav";
import { TbCards } from "react-icons/tb";

const Navbar = async () => {
  const session = await auth();

  return (
    <div
      className='w-full h-[50px] border-b-[1px] border-black'
      style={{ backgroundColor: "#292929" }}
    >
      <div className='container flex justify-between items-center h-full'>
        <div className='flex items-center mr-4 px-8'>
          <Link
            href='/home'
            className='flex items-center p-4 gap-4 text-lg font-semibold'
          >
            <TbCards size={40} color='white' />
            <span
              style={{
                fontSize: "20px",
                fontWeight: "400",
                WebkitTextFillColor: "white",
              }}
            >
              Interfluent
            </span>{" "}
          </Link>
        </div>
        <div className='flex items-center px-8'>
          {session?.user ? (
            <UserAccountNav user={session.user} />
          ) : (
            <Link href='/login' className={buttonVariants()}>
              Sign in
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
