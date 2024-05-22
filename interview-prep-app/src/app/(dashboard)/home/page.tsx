import React from "react";
import HomeBoard from "../../../containers/dashboard/HomeBoard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import "../../../styles/dashboard.css";
import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
// import Layout from "./layout";

const HomePage = async () => {
  const session = await auth();

  if (session?.user) {
    console.log(session, "SESSION HOME");
    return (
      <div className='dashboard-wrapper'>
        <h1 className='ml-[0]'>
          Dashboard - Welcome Back {session?.user.name}{" "}
        </h1>
        <HomeBoard />
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

export default HomePage;
