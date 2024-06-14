import React from "react";
import { fetchSingleDeck } from "@/utils/fetch";
import { currentUser } from "@/lib/auth";
import CardDisplay from "./c/[cardId]/CardDisplay";
import type { CardData } from "@/types/CardData";

import DeckWrapper from "@/containers/workspace-deck-section/DeckWrapper";
import { DeckData } from "@/types/CardData";

interface DeckWrapperProps {
  data: DeckData;
}
// Get Data with all Cards Data for this specific Deck
const DeckIdPage = async ({ params }: { params: { deckId: string } }) => {
  const userSession = await currentUser();

  const data: DeckWrapperProps = await fetchSingleDeck(
    params.deckId,
    userSession.cookieHeader
  );

  const { deck, cards } = data.data;

  if (!cards.length) {
    return <h1>No Cards to Display</h1>;
  }

  // console.log(deck, "DECK IN DECKID SERVER COMPONENT");
  // console.log(cards, "CARDS IN DECKID SERVER COMPONENT");
  // console.log(params.deckId, "PARAMS IN DECKID SERVER COMPONENT");

  return (
    <div className='dashboard-wrapper'>
      {/* <DeckWrapper deck={deck} cards={cards} /> */}
      {cards.map((card) => {
        return <CardDisplay key={card.id} data={card} />;
      })}
    </div>
  );
};

export default DeckIdPage;
