import React from "react";
import { redirect } from "next/navigation";
import DecksTab from "@/containers/dashboard/DecksTab";
import { auth } from "../../../../auth";
import { Session } from "next-auth";
import { cookies } from "next/headers";

const getData = async (cookieHeader: string) => {
  // fetch data using api route
  try {
    const res = await fetch(`${process.env.AUTH_URL}/api/decks`, {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
    });
    const data = await res.json();
    // console.log("In Page, Decks Data: ", data);
    return data;
  } catch (error) {
    console.log(error, "Something Went Wrong retrieving Decks.");
  }
};

const Decks = async () => {
  // retrieve session, if user, pass userID
  const session = await auth();

  // console.log("DECK 1", data.decks[0].title);
  if (session) {
    const cookieStore = cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");
    // console.log("Cookie Header", cookieHeader);
    // console.log(cookieStore, "Cookie Store");

    const data = await getData(cookieHeader);
    console.log("DATA", data);

    return (
      <div className='dashboard-wrapper'>
        <h1 className='ml-[0]'>
          Dashboard - Welcome Back {session?.user.name}{" "}
        </h1>
        <h1>Hi this is a list of all your Decks</h1>
        {data.decks.map((deck: any) => {
          return (
            <div key={deck.id}>
              <h2>{deck.title}</h2>
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <div className='dashboard-wrapper'>
      <h1 className='ml-[0]'>Decks List - you must sign in.</h1>
    </div>
  );
};
export default Decks;
