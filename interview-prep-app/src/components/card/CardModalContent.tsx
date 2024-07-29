"use client";
import React, { useEffect } from "react";
import { CardData } from "@/types/data-types";
import CardDisplay from "./Card-Display";
import { useModal } from "@/containers/modal/ModalContext";

const CardModalContent = ({ cardData }: { cardData: CardData }) => {
  const { openModal } = useModal();

  // Open the modal with the card data, constantly updating
  useEffect(() => {
    openModal(cardData.id, cardData.deckId);
  }, [cardData, openModal]);

  return <CardDisplay card={cardData} />;
};

export default CardModalContent;
