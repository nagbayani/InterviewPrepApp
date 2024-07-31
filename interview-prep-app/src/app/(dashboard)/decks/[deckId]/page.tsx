import React from "react";
import { fetchSingleDeck, fetchAllDecks } from "@/utils/fetch";
import { currentUser } from "@/lib/auth";
import { DeckDataResponse, CardData, DeckData } from "@/types/data-types";
import { DeckCard } from "../../../../components/card/Card";
import Deck from "@/components/deck-link/Deck";
import HydrateStore from "@/_store/HydrateStore";
interface Response {
  data: DeckDataResponse;
}
// Get Data with all Cards Data for this specific Deck
const DeckIdPage = async ({ params }: { params: { deckId: string } }) => {
  const userSession = await currentUser();

  // fetch response for a single deck
  const response: Response = await fetchSingleDeck(
    params.deckId,
    userSession.cookieHeader
  );

  // fetch all decks to hydrate store
  const decksResponse = await fetchAllDecks(userSession.cookieHeader);
  const decks = decksResponse.decks;

  // fetch response contains its deck information with pertaining cards for that deckId
  const { deck, cards, tags, cardTags }: DeckDataResponse = response.data;

  // console.log("CARDTAGS", cardTags);
  return (
    <div className='dashboard-wrapper'>
      {/* Pass data response to Deck client component */}
      <Deck deck={deck} cards={cards} decks={decks} tags={tags} />
      {/* Need to set tags in store */}
      <HydrateStore
        decks={decks}
        cards={cards}
        tags={tags}
        cardTags={cardTags}
      />
    </div>
  );
};

export default DeckIdPage;
