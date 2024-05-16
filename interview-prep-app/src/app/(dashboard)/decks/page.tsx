import React from "react";
import { authOptions } from "@/lib/testAuth";
import { redirect } from "next/navigation";
import DecksTab from "@/containers/dashboard/DecksTab";
import { auth } from "../../../../auth";

interface Deck {
  id: string;
  title: string;
}
interface DecksProps {
  decks: Deck[];
}
const getData = async () => {
  // LOOK AT THIS
  // const   response = await fetch(`/api/decks?userId=${userId}`, {
  // const url = new URL(`${process.env.NEXTAUTH_URL}/api/u-decks`);
  // url.searchParams.append("userId", userId);

  try {
    // const response = await fetch(`${process.env.NEXTAUTH_URL}/api/u-decks`, {
    const response = await fetch(`http://localhost:3000/api/u-decks`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
    } else {
      const data = await response.json();
      console.log("DATA DECKS", data);
      return data.decks;
    }
  } catch (error) {
    console.error("Failed to retrieve decks:", error);
    throw error;
  }
};

const Decks = async () => {
  // const session = await getServerSession(authOptions);
  const session = await auth();

  let decks: Deck[] = [];
  if (session) {
    console.log(session, "Client Session");
    // console.log(session.user.userId.toString(), "Client User");
    const userData = await getData();
    if (userData) {
      console.log("USER DATA", userData);
    } else {
      console.log("NO USER DATA");
    }
  }
  // console.log("JSON USER DATA", JSON.parse(userData.toString()));
  // if (userData) {
  //   console.log("USER DATA", userData);
  // }
  return (
    <div className='dashboard-wrapper'>
      <h1 className='ml-[0]'>
        Dashboard - Welcome Back {session?.user.name}{" "}
      </h1>
      <h1>Hi this is a list of all your Decks</h1>
      <DecksTab decks={decks} />
    </div>
  );
};

export default Decks;
