import React from "react";
import { fetchSingleDeck, fetchAllDecks } from "@/utils/fetch";
import { currentUser } from "@/lib/auth";
import { DeckDataResponse, CardData, DeckData } from "@/types/data-types";
import { DeckCard } from "./Card";
import Deck from "@/components/deck-link/Deck";
interface Response {
  data: DeckDataResponse;
}
// Get Data with all Cards Data for this specific Deck
const DeckIdPage = async ({ params }: { params: { deckId: string } }) => {
  const userSession = await currentUser();

  const response: Response = await fetchSingleDeck(
    params.deckId,
    userSession.cookieHeader
  );

  const decksResponse = await fetchAllDecks(userSession.cookieHeader);
  const decks = decksResponse.decks;

  const { deck, cards }: DeckDataResponse = response.data;

  return (
    <div className='dashboard-wrapper'>
      {/* Pass data response to Deck client component */}
      <Deck deck={deck} cards={cards} decks={decks} />
    </div>
  );
};

export default DeckIdPage;
