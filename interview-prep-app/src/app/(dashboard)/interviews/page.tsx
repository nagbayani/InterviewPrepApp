import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { auth } from "../../../../auth";

// Card Imports:
import CardForm from "@/components/forms/card/CardForm";
import EditorWrapper from "@/components/novel/Editor-wrapper";

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
        <h1 style={{ fontSize: "var(--step-1)", letterSpacing: "-0.05em" }}>
          Interviews
        </h1>
        <CardForm />
        <EditorWrapper />
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
