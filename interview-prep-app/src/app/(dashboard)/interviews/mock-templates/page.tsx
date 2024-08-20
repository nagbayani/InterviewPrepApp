import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { auth } from "../../../../../auth";
import MocksWrapper from "@/containers/mock-templates/MocksWrapper";
import { cookies } from "next/headers";
import { ContentLayout } from "@/containers/layouts/content-layout";

// Fetch Mock Template Data
const getMockTemplates = async (cookieHeader: string) => {
  // fetch data using api route
  try {
    const res = await fetch(`${process.env.AUTH_URL}/api/mock-templates`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
    });
    const data: any = await res.json();
    // console.log("In Page, Decks Data: ", data);
    return data;
  } catch (error) {
    console.log(error, "Something Went Wrong retrieving Decks.");
  }
};

const MockTemplates = async () => {
  const session = await auth();
  if (!session) {
    return redirect("/login");
  }
  if (session) {
    const cookieStore = cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");

    const mocks = await getMockTemplates(cookieHeader);
    return (
      <ContentLayout title={"Mock Templates"}>
        <MocksWrapper mocks={mocks} />
      </ContentLayout>
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

export default MockTemplates;
