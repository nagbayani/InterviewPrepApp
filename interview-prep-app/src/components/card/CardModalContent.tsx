"use client";
import React, { useEffect } from "react";
import { CardData, TagData } from "@/types/data-types";
import CardDisplay from "./Card-Display";
import { useModal } from "@/containers/modal/ModalContext";

const CardModalContent = ({
  cardData,
  userTags,
}: {
  cardData: CardData;
  userTags: TagData[];
}) => {
  const { openModal } = useModal();

  // Open the modal with the card data, constantly updating
  useEffect(() => {
    openModal(cardData.id, cardData.deckId);
  }, [cardData, openModal]);

  return <CardDisplay cardDb={cardData} userTags={userTags} />;
};

export default CardModalContent;
