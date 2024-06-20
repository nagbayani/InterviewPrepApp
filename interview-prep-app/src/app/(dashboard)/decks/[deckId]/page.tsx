import React from "react";
import { fetchSingleDeck } from "@/utils/fetch";
import { currentUser } from "@/lib/auth";
// import CardDisplay from "./c/[cardId]/CardDisplay";
// import { Modal } from "@/containers/modal/Modal";
// import { ModalProvider } from "@/containers/modal/ModalContext";
import { DeckData, CardData } from "@/types/CardData";
import { useModal } from "@/containers/modal/ModalContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DeckCard } from "./DeckCard";

interface DeckDataResponse {
  data: DeckData;
}
// Get Data with all Cards Data for this specific Deck
const DeckIdPage = async ({ params }: { params: { deckId: string } }) => {
  const userSession = await currentUser();

  const response: DeckDataResponse = await fetchSingleDeck(
    params.deckId,
    userSession.cookieHeader
  );

  const { deck, cards } = response.data;

  if (!cards.length) {
    return <h1>No Cards to Display</h1>;
  }

  return (
    <div className='dashboard-wrapper'>
      {cards.map((card) => (
        // <Modal key={card.id} data={card}>
        //   <CardDisplay data={card} />
        // </Modal>
        <DeckCard key={card.id} card={card} deckId={deck.id} />
      ))}
    </div>
  );
};

export default DeckIdPage;
