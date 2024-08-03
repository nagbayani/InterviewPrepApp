"use client";
import React, { useState, useEffect } from "react";
import { DeckDataResponse, CardData } from "@/types/data-types";
import { DeckCard } from "@/components/card/Card";
import "../../styles/deck/deckWrapper.css";
import { CardInput } from "../ui/cardinput";
import { useCardStore, useDeckStore } from "@/_store/index";
import { fetchAllCards, moveCardPUT } from "@/utils/fetch";
import { set } from "zod";
import { toast } from "@/components/ui/use-toast";
import { Button, buttonVariants } from "@/components/ui/button";
import { LuPlus } from "react-icons/lu";

/**
 *
 * Deck Client Component that holds all rendered cards, and will add new cards.
 *
 */
const Deck = ({ deck, cards, decks, tags }: any) => {
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

  const [titleEditing, setTitleEdit] = useState(false);
  const [titleValue, setTitleValue] = useState(deck.title);
  const [lastNonEmptyTitle, setLastNonEmptyTitle] = useState(deck.title);

  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newCardQuestion, setNewCardQuestion] = useState("");

  /**
   * Handles card form question input changes
   * @param e
   */
  const handleCardForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewCardQuestion(value);
  };

  /**
   * Submits the new card to database, updates state with new card.
   * If card question is empty, do not submit.
   */
  const submitAddCard = async () => {
    // Check if card question is empty
    if (newCardQuestion.trim() === "") {
      console.log("Card question is empty.");
      setShowForm(false);
    } else {
      try {
        const response = await fetch(`/api/cards`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: newCardQuestion,
            answer: "",
            deckId: deck.id,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const newCard: CardData = data.card;

          // Add card to Zustand store
          addCard(newCard);
        }
      } catch {
        console.error("Error adding card to deck.");
      } finally {
        setLoading(false);
        setNewCardQuestion("");
        setShowForm(false);
      }
    }
  };

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTitleValue(value);
    if (value.trim() !== "") {
      setLastNonEmptyTitle(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "Return") {
      e.preventDefault();
      handleInputBlur();
    }
  };
  const handleInputBlur = async () => {
    if (titleValue.trim() === "") {
      setTitleValue(lastNonEmptyTitle);
    } else {
      setLastNonEmptyTitle(titleValue);

      // Update the database
      try {
        console.log("Deck State", decksData[deck.id]);
        const response = await fetch(`/api/decks/${deck.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            deckId: deck.id,
            title: titleValue,
            decksData,
          }),
        });
        console.log("Current response.body", response.body);

        if (response.ok) {
          console.log("Title Updated in Database", deck.id, titleValue);
          updateDeck(deck.id, { title: titleValue });
        }
      } catch (error) {
        // Revert to the last known good state
        setTitleValue(deck.title);
        console.error(error);
        alert("Failed to update the title. Please try again.");
      }
    }

    setTitleEdit(false);
  };

  return (
    <section className='deck-wrapper-container'>
      <div className='deck-wrapper-header'>
        {/* <h1>{deck?.title}</h1> */}
        {titleEditing ? (
          <>
            <CardInput
              onBlur={handleInputBlur}
              onChange={handleChange}
              value={titleValue}
              onKeyDown={handleKeyDown}
            />
          </>
        ) : (
          <>
            <h1 onClick={() => setTitleEdit(true)}>{titleValue}</h1>
          </>
        )}
      </div>

      <div className='flex flex-col items-center gap-8'>
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
        {showForm ? (
          <div
            className='justify-self-center flex justify-between w-[400px] p-4 rounded-lg'
            style={{ background: "#fefcf6" }}
          >
            <CardInput
              id='question'
              placeholder='Write a Question'
              onChange={handleCardForm}
              onSubmit={submitAddCard}
              onBlur={submitAddCard}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  submitAddCard();
                }
              }}
            />
          </div>
        ) : (
          <Button
            // size='lg'
            variant='outline'
            className='w-[400px] flex p-4 rounded-lg justify-center items-center'
            onClick={() => setShowForm(true)}
          >
            <LuPlus />
            <span>Add a card</span>
          </Button>
        )}
      </div>
    </section>
  );
};

export default Deck;
