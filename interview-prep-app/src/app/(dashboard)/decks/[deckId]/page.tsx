import React from "react";
import { fetchSingleDeck } from "@/utils/fetch";
import { currentUser } from "@/lib/auth";

const DeckIdPage = async ({ params }: { params: { deckId: string } }) => {
  const userSession = await currentUser();
  const deck = await fetchSingleDeck(params.deckId, userSession.cookieHeader);
  console.log(deck, "DATA IN DECKID SERVER COMPONENT");

    // console.log(params.deckId, "PARAMS IN DECKID SERVER COMPONENT");

  return (
    <div className='dashboard-wrapper'>
      <h1>This is the deckpage.</h1>
    </div>
  );
};

export default DeckIdPage;
