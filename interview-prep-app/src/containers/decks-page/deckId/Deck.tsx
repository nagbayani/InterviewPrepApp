"use client";
import React, { useState, useEffect } from "react";
import { DeckDataResponse, CardData } from "@/types/data-types";
import { DeckCard } from "@/components/card/Card";
import { CardInput } from "@/components/ui/cardinput";
import DeckIcon from "../thumbnails/DeckIcon";
import { useCardStore, useDeckStore } from "@/_store/index";
import { fetchAllCards, moveCardPUT } from "@/utils/fetch";
import { toast } from "@/components/ui/use-toast";
// Styles & Icons
import "../../../styles/deck/deck-wrapper.css";
import { Button, buttonVariants } from "@/components/ui/button";
import { LuPlus } from "react-icons/lu";
import { Send, SlidersHorizontal } from "lucide-react";
import { AddCardModal } from "@/containers/modal/add-card-modal";
import { DeckData } from "@/types/data-types";
import EditDeckMenu from "./EditDeckMenu";

import { Card, CardContent } from "@/components/ui/card";

interface DeckProps {
  deckDb: DeckData;
}

/**
 *
 * [deckId] page Deck Client Component that holds all rendered cards, and will add new cards.
 *
 */
const Deck = ({ deckDb }: DeckProps) => {
  // retrieve list of cards
  const {
    cards: cardsData,
    addCard,
    updateCard,
    deleteCard,
    setCards,
  } = useCardStore((state) => ({
    cards: state.cards,
    addCard: state.addCard,
    updateCard: state.updateCard,
    deleteCard: state.deleteCard,
    setCards: state.setCards,
  }));

  const deck = useDeckStore((state) => state.decks[deckDb.id]);

  const { decks: decksData, updateDeck } = useDeckStore((state) => ({
    decks: state.decks,
    updateDeck: state.updateDeck,
  }));

  // const deckInStore = decksData[deckDb.id];

  const handleCardUpdate = (cardId: string, newDeckId: string) => {
    updateCard(cardId, { deckId: newDeckId });

    // Update the deck by replacing the updated card in the deck's card list
    const updatedCards = deck.cards.map((card) =>
      card.id === cardId ? { ...card, deckId: newDeckId } : card
    );

    // Update the deck in Zustand's deck store
    updateDeck(deckDb.id, { cards: updatedCards });
  };

  const handleCardMove = async (
    cardId: string,
    newDeckId: string,
    oldDeckId: string
  ) => {
    handleCardUpdate(cardId, newDeckId);
    const response = await moveCardPUT(cardId, newDeckId, oldDeckId);
    console.log(response, "HandleCardMove Response");
    if (response) {
      // Call the function to update the card's deckId
      handleCardUpdate(cardId, newDeckId);

      // Remove the card from the old deck
      const updatedOldDeckCards = decksData[oldDeckId].cards.filter(
        (card) => card.id !== cardId
      );

      // Add the card to the new deck
      const updatedNewDeckCards = [
        ...decksData[newDeckId].cards,
        cardsData[cardId],
      ];

      // Update both the old and new decks in Zustand's deck store
      updateDeck(oldDeckId, { cards: updatedOldDeckCards });
      updateDeck(newDeckId, { cards: updatedNewDeckCards });

      // try {
      //   // setCards(response.cards);
      // } catch {
      //   console.log("Error fetching updated cards in Deck component.");
      // }
    }
  };

  const [title, setTitle] = useState(deck?.title || "");
  const [description, setDescription] = useState(deck?.description || "");
  const [thumbnail, setThumbnail] = useState(deck?.thumbnail || "");

  return (
    <section className='deck-wrapper-container '>
      <EditDeckMenu
        deckId={deckDb.id}
        title={title}
        description={description}
        thumbnail={thumbnail}
        onTitleChange={setTitle}
        onDescriptionChange={setDescription}
        onThumbnailChange={setThumbnail}
      ></EditDeckMenu>
      <div className='deck-header-buttons flex justify-center gap-4 mt-[1rem] '>
        <Button variant='textIcon' style={{ backgroundColor: "" }}>
          <SlidersHorizontal size={14} />
          <span>Filter</span>
        </Button>
        <Button variant='textIcon'>
          <Send size={12} />
          <span>Send</span>
        </Button>
        <AddCardModal deckId={deckDb.id} />
      </div>
      <Card className='rounded-lg border-none w-full h-[100vh]  bg-slate-0 '>
        <CardContent>
          {/* <div className='flex flex-col items-center gap-8 mx-4 h-full'> */}
          <div className='cards-list'>
            {/* Render cards from Zustand Deck state to Card components */}

            {deck.cards.map((card, index) => (
              <DeckCard
                key={card.id}
                card={card}
                deckId={deckDb.id}
                index={index + 1}
                onUpdateCard={handleCardUpdate}
                onMoveCard={handleCardMove}
              />
            ))}
          </div>
          {/* </div> */}
        </CardContent>
      </Card>
    </section>
  );
};

export default Deck;
