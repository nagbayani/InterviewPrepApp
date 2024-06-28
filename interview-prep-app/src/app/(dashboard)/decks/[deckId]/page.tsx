import React from "react";
import { fetchSingleDeck } from "@/utils/fetch";
import { currentUser } from "@/lib/auth";
import { DeckDataResponse, CardData } from "@/types/data-types";
import { DeckCard } from "./DeckCard";
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

  const { deck, cards }: DeckDataResponse = response.data;

  if (!cards.length) {
    return <h1>No Cards to Display</h1>;
  }

  return (
    <div className='dashboard-wrapper'>
      {/* {cards.map((card: CardData) => (
        <DeckCard key={card.id} card={card} deckId={deck.id} />
      ))} */}
      {/* Insert Deck here */}
      <Deck deck={deck} cards={cards} />
    </div>
  );
};

export default DeckIdPage;

/**
 *  import { useModal } from "@/containers/modal/ModalContext";
    import { useRouter } from "next/navigation";
    import { Button } from "@/components/ui/button";
 * 
    <Modal key={card.id} data={card}>
    <CardDisplay data={card} />
    </Modal>
 * 
 * 
 */
