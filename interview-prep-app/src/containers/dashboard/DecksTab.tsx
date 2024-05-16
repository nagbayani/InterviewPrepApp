"use client";
import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { useSession } from "next-auth/react";

interface DeckData {
  id: string;
  title: string;
}

interface Decks {
  decks: DeckData[];
}

const DecksTab = ({ decks }: Decks) => {
  const [userDecks, setDecks] = useState([decks]);

  // if (session) {
  //   // fetch all decks
  //   const userDecks = await fetch("/api/decks", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   if (userDecks.ok) {
  //     const decksData = await userDecks.json();
  //     setDecks(decksData);
  //   }
  // }

  return (
    <div>
      {/* {userDecks.length > 0 ? (
        <div>
          {userDecks.map((deck: DeckData) => (
            <div key={deck.id}>{deck.title}</div>
          ))}
        </div>
      ) : (
        <p>No decks available.</p>
      )} */}
      hi
    </div>
  );
};

export default DecksTab;
