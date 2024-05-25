import React from "react";
import { fetchSingleDeck } from "@/utils/fetch";
import { currentUser } from "@/lib/auth";

import DeckWrapper from "@/containers/workspace-deck-section/DeckWrapper";

interface DeckData {
  deck: {
    id: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    authorId: string;
  };
  cards: {
    id: string;
    createdAt: string;
    updatedAt: string;
    question: string;
    answer: string;
    category: string;
    authorId: string;
    deckId: string;
  }[];
}

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
  console.log(deck, "DECK IN DECKID SERVER COMPONENT");
  console.log(cards, "CARDS IN DECKID SERVER COMPONENT");

  // console.log(params.deckId, "PARAMS IN DECKID SERVER COMPONENT");

  return (
    <div className='dashboard-wrapper'>
      <DeckWrapper deck={deck} cards={cards} />
    </div>
  );
};

export default DeckIdPage;
