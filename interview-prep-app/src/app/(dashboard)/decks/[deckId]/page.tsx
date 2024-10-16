import React from "react";
import { fetchSingleDeck, fetchAllDecks } from "@/utils/fetch";
import { currentUser } from "@/lib/auth";
import { DeckDataResponse, CardData, DeckData } from "@/types/data-types";
import { DeckCard } from "../../../../components/card/Card";
import Deck from "@/containers/decks-page/deckId/Deck";
import HydrateStore from "@/_store/HydrateDeckId";
import { ContentLayout } from "@/containers/layouts/content-layout";

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
  // fetch response contains its deck information with pertaining cards for that deckId
  const { deck, cards, tags, cardTags }: DeckDataResponse = response.data;

  // console.log("CARDTAGS", cardTags);
  return (
    <ContentLayout title={deck.title}>
      {/* Pass data response to Deck client component */}
      <Deck deckDb={deck} />
      {/* <Deck deck={deck} cards={cards} decks={decks} tags={tags} /> */}

      {/* rename this for a single deck store */}
      <HydrateStore
        // decks={decks}
        tags={tags}
        cardTags={cardTags}
      />
    </ContentLayout>
  );
};

export default DeckIdPage;
