"use client";
import React, { useEffect, useState } from "react";
import { useModal } from "@/containers/modal/ModalContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CardData, TagData } from "@/types/data-types";
import { useCardStore, useDeckStore, useTagStore } from "@/_store/index";
import Tag from "./Tag";
import "../../styles/deck/deckCard.css";

import { PenLine } from "lucide-react";
import MoveCardMenu from "@/components/menus/move-cards/MoveCardMenu";

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
  // Access the deckStore and retrieve actions like updateDeck or setDecks
  const { decks, updateDeck } = useDeckStore((state) => ({
    decks: state.decks,
    updateDeck: state.updateDeck,
  }));

  const { cards: cardsData, deleteCard } = useCardStore((state) => ({
    cards: state.cards,
    deleteCard: state.deleteCard,
  }));
  const { tags, cardTags } = useTagStore((state) => ({
    tags: state.tags,
    cardTags: state.cardTags,
  }));

  const [cardTagsList, setCardTagsList] = useState<TagData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // console.log("CardTags updated:", cardTags, card.id, card.question);
    const cardTagIds = cardTags[card.id] ? Object.keys(cardTags[card.id]) : [];
    const updatedCardTagsList = cardTagIds.map((tagId) => tags[tagId]);
    setCardTagsList(updatedCardTagsList);
    setIsLoaded(true);
  }, [cardTags, tags, card.id]);

  // Ensure the tags only render after the data is loaded
  if (!isLoaded) return <div>Loading tags...</div>;

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

        // Update the deck when a card is deleted
        const updatedDeck = {
          ...decks[deckId],
          cards: decks[deckId].cards.filter(
            (deckCard) => deckCard.id !== card.id
          ),
        };
        updateDeck(deckId, updatedDeck);
      }
    } catch {
      console.error("Error deleting card from deck.");
    }
  };

  return (
    <div
      className='flex w-[100%] border-black'
      style={{ background: "#fefcf6", border: "1px solid black" }}
    >
      <div className='flex flex-col justify-between w-full'>
        <div className='flex flex-col'>
          <div className='flex-1 p-2'>
            <div className='flex justify-between'>
              {index}

              <div className='self-end'>
                <MoveCardMenu
                  handleDeleteCard={handleDeleteCard}
                  user={card.authorId}
                  cardId={card.id}
                  deckId={deckId}
                  onMoveCard={onMoveCard}
                />
              </div>
            </div>

            {/* Tags + Card Question */}
            <div className='flex-col px-2'>
              <div className='tags-container my-2 gap-2 flex flex-wrap'>
                {cardTagsList.map((tag) => (
                  <Tag key={tag.id} tag={tag} />
                ))}
              </div>
              <p className=''>{card.question}</p>
            </div>
          </div>
        </div>
        <Button
          variant='editCard'
          onClick={handleOpenModal}
          className=' w-full'
        >
          <span className='px-2'>Write your answer</span>
          <PenLine size={12} />
        </Button>
      </div>
    </div>
  );
};
