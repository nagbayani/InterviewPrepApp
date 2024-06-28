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
import { useEffect } from "react";

export const DeckCard = ({
  card,
  deckId,
}: {
  card: CardData;
  deckId: string;
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
      className='justify-self-center flex justify-between w-[400px] p-4 rounded-lg'
      style={{ background: "#fefcf6" }}
    >
      <div>{card.question}</div>
      <div className='flex justify-evenly'>
        <Button
          variant='outline'
          onClick={handleOpenModal}
          className='w-[40px] mx-2'
        >
          EDIT
        </Button>
        <Button
          variant='destructive'
          className='w-[40px]'
          onClick={handleDeleteCard}
        >
          DELETE
        </Button>
      </div>
    </div>
  );
};
