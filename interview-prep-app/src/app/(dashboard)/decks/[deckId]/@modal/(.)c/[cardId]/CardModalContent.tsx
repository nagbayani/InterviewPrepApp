"use client";
import React from "react";
import { CardData } from "@/types/CardData";
import CardDisplay from "../../../c/[cardId]/CardDisplay";
import { useModal } from "@/containers/modal/ModalContext";

const CardModalContent = ({ cardData }: { cardData: CardData }) => {
  const { openModal } = useModal();

  // Open the modal with the card data, constantly updating
  React.useEffect(() => {
    openModal(cardData.id, cardData.deckId);
  }, [cardData, openModal]);

  return <CardDisplay data={cardData} />;
};

export default CardModalContent;
