"use client";
/**
 * Client component to render a card that is mapped out in "interview-prep-app/src/app/(dashboard)/decks/[deckId]/page.tsx"
 *  - This is a button that will open a modal when clicked
 */

import { useModal } from "@/containers/modal/ModalContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CardData } from "@/types/data-types";
import { useCardStore } from "@/_store/index";
import "../../../../styles/deck/deckCard.css";
import { useEffect } from "react";
import { Trash2 } from "lucide-react";
import { PenLine } from "lucide-react";

export const DeckCard = ({
  card,
  deckId,
  index,
}: {
  card: CardData;
  deckId: string;
  index: number;
}) => {
  const router = useRouter();
  const { openModal } = useModal();
  const { cards: cardsData, deleteCard } = useCardStore((state) => ({
    cards: state.cards,
    deleteCard: state.deleteCard,
  }));

  // push, should be intercepted by @modal route and open the modal
  const handleOpenModal = () => {
    openModal(card.id, card.deckId);
    router.push(`/decks/${deckId}/c/${card.id}`);
  };

  const handleDeleteCard = async () => {
    try {
      const response = await fetch(`/api/cards/${card.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        deleteCard(card.id); // Remove card from Zustand store
        console.log("Card deleted from deck.", cardsData);
      }
    } catch {
      console.error("Error deleting card from deck.");
    }
  };

  return (
    <div
      className='deck-card-container justify-self-center flex justify-between '
      style={{ background: "#fefcf6" }}
    >
      <div className='top-dc-wrapper flex justify-between'>
        <div className='left-dc-wrapper'>{index}</div>
        <div className='bottom-dc-wrapper'>
          <Button
            variant='outline'
            onClick={handleOpenModal}
            className='w-[35px] mx-2 p-0'
          >
            <PenLine size={12} />
          </Button>
          <Button
            variant='destructive'
            className='w-[35px] p-0'
            onClick={handleDeleteCard}
          >
            <Trash2 size={12} />
          </Button>
        </div>
      </div>
      <div className='p-4 font-medium'>{card.question}</div>
    </div>
  );
};
