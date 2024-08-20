"use client";
/**
 * Client component to render a card that is mapped out in "interview-prep-app/src/app/(dashboard)/decks/[deckId]/page.tsx"
 *  - This is a button that will open a modal when clicked
 */

import { useModal } from "@/containers/modal/ModalContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CardData } from "@/types/data-types";
import { useCardStore, useTagStore } from "@/_store/index";
import Tag from "./Tag";
import "../../styles/deck/deckCard.css";

import { PenLine } from "lucide-react";
import MoveCardMenu from "@/components/menus/move-cards/MoveCardMenu";
import { currentUser } from "@/lib/auth";
import { fetchAllDecks } from "@/utils/fetch";

/**
 * On DeckID page, this is a single card that is rendered
 * @param param0
 * @returns
 */
export const DeckCard = ({
  card,
  deckId,
  index,
  onUpdateCard,
  onMoveCard,
}: {
  card: CardData;
  deckId: string;
  index: number;
  onUpdateCard: (cardId: string, newDeckId: string) => void;
  onMoveCard: (cardId: string, newDeckId: string, oldDeckId: string) => void;
}) => {
  const router = useRouter();
  const { openModal } = useModal();
  const { cards: cardsData, deleteCard } = useCardStore((state) => ({
    cards: state.cards,
    deleteCard: state.deleteCard,
  }));
  const { tags, cardTags } = useTagStore((state) => ({
    tags: state.tags,
    cardTags: state.cardTags,
  }));

  // Get the tags for the current card
  const cardTagIds = cardTags[card.id] ? Object.keys(cardTags[card.id]) : [];
  const cardTagsList = cardTagIds.map((tagId) => tags[tagId]);

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
      className='deck-card-container  flex flex-row justify-between border-black'
      style={{ background: "#fefcf6", border: "1px solid black" }}
    >
      <div className='main-dc-wrapper justify-self-start flex justify-between'>
        <div className='left-dc-wrapper m-4'>
          <div className='flex p-2 m-2'>
            {index}
            {/* SHOW TAGS HERE */}
            <div className='tags-container mx-4 gap-2 flex'>
              {cardTagsList.map((tag) => (
                <Tag key={tag.id} tag={tag} />
              ))}
            </div>
          </div>
          <div className='px-4 font-medium'>{card.question}</div>
        </div>
      </div>
      <div className='bottom-dc-wrapper '>
        <Button
          variant='editCard'
          onClick={handleOpenModal}
          className='h-[50%]'
        >
          <PenLine size={12} />
        </Button>
        <MoveCardMenu
          handleDeleteCard={handleDeleteCard}
          user={card.authorId}
          cardId={card.id}
          deckId={deckId}
          onMoveCard={onMoveCard}
        />
      </div>
    </div>
  );
};
