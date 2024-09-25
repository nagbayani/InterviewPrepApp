import React from "react";
import { auth } from "../../../../auth";
import "../../../styles/dashboard.css";
import { cookies } from "next/headers";
import DecksWrapper from "@/containers/decks-page/DecksWrapper";
import { ContentLayout } from "@/containers/layouts/content-layout";
import { DeckData } from "@/types/data-types";

const getDeckData = async (cookieHeader: string) => {
  // fetch data using api route
  try {
    const res = await fetch(`${process.env.AUTH_URL}/api/decks`, {
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

const DecksPage = async () => {
  // retrieve session, if user, pass userID
  const session = await auth();

  if (session) {
    const cookieStore = cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");

    const data = await getDeckData(cookieHeader);

    return (
      <ContentLayout title={"Decks"}>
        {/* <section className='dashboard-wrapper'> */}
        <DecksWrapper decks={data.decks} />
        {/* </section> */}
      </ContentLayout>
    );
  }
  return (
    <section className='dashboard-wrapper'>
      <h1 className='ml-[0]'>Decks List - you must sign in.</h1>
    </section>
  );
};
export default DecksPage;
