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
  deck: DeckData;
}

/**
 *
 * [deckId] page Deck Client Component that holds all rendered cards, and will add new cards.
 *
 */
const Deck = ({ deck }: DeckProps) => {
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

  const { decks: decksData, updateDeck } = useDeckStore((state) => ({
    decks: state.decks,
    updateDeck: state.updateDeck,
  }));

  const deckInStore = decksData[deck.id];

  const handleCardUpdate = (cardId: string, newDeckId: string) => {
    updateCard(cardId, { deckId: newDeckId });
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
      try {
        setCards(response.cards);
      } catch {
        console.log("Error fetching updated cards in Deck component.");
      }
    }
  };

  const [title, setTitle] = useState(deckInStore?.title || "");
  const [description, setDescription] = useState(
    deckInStore?.description || ""
  );
  const [thumbnail, setThumbnail] = useState(deckInStore?.thumbnail || "");

  return (
    <section className='deck-wrapper-container '>
      <EditDeckMenu
        deckId={deck.id}
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
        <AddCardModal deckId={deck.id} />
      </div>
      <Card className='rounded-lg border-none w-full h-[100vh]  bg-slate-0 '>
        <CardContent>
          {/* <div className='flex flex-col items-center gap-8 mx-4 h-full'> */}
          <div className='cards-list'>
            {/* Render cards from Zustand state to Card components */}
            {Object.values(cardsData).map((card, index) => (
              <DeckCard
                key={card.id}
                card={card}
                deckId={deck.id}
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
