"use client";
/**
 * Client component to render a card that is mapped out in "interview-prep-app/src/app/(dashboard)/decks/[deckId]/page.tsx"
 *  - This is a button that will open a modal when clicked
 */
import { useModal } from "@/containers/modal/ModalContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DeckData, CardData } from "@/types/CardData";

export const DeckCard = ({
  card,
  deckId,
}: {
  card: CardData;
  deckId: string;
}) => {
  const router = useRouter();
  const { openModal } = useModal();

  // push, should be intercepted by @modal route and open the modal
  const handleOpenModal = () => {
    openModal(card.id, card.deckId);
    router.push(`/decks/${deckId}/c/${card.id}`);
  };

  return (
    <Button variant='outline' onClick={handleOpenModal}>
      {card.question}
    </Button>
  );
};
