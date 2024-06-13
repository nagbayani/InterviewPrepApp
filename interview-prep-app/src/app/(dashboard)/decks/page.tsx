import React from "react";
import { redirect } from "next/navigation";
import DecksTab from "@/containers/dashboard/DecksTab";
import { auth } from "../../../../auth";
import { Session } from "next-auth";
import { cookies } from "next/headers";
import DeckLink from "@/components/deck-link/DeckLink";
import CardForm from "@/components/forms/card/CardForm";

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

    const data = await getData(cookieHeader);

    // const decks = data.decks.map((deck: any) => {
    //   console.log("DECK", deck.title);
    // });

    return (
      <div className='dashboard-wrapper'>
        <h1 style={{ fontSize: "var(--step-1)", letterSpacing: "-0.05em" }}>
          Decks
        </h1>
        <ul className='h-[100vh] flex flex-row gap-4'>
          {data.decks.map((deck: any) => {
            return (
              <li key={deck.id}>
                <DeckLink
                  id={deck.id}
                  title={deck.title}
                  path={`/decks/${deck.id}`}
                />
              </li>
            );
          })}
        </ul>

        {/* {data.decks.map((deck: any) => {
          return (
            <div key={deck.id}>
              <h2>{deck.title}</h2>
            </div>
          );
        })} */}
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
