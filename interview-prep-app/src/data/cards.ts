import prisma from "@/lib/db";

export const getCardsByUserId = async (userId: string) => {
  const cards = await prisma.card.findMany({
    where: { authorId: userId },
  });

  return cards;
};

export const getCardsByDeckId = async (deckId: string) => {
  const cards = await prisma.card.findMany({
    where: { deckId },
  });

  return cards;
};

export const getCardById = async (cardId: string) => {
  const card = await prisma.card.findUnique({
    where: { id: cardId },
  });

  return card;
};

export const createCard = async (data: {
  question: string;
  answer: string;
  deckId: string;
  category: string;
  authorId: string;
}) => {
  const card = await prisma.card.create({
    data,
  });

  return card;
};

export const updateCard = async (data: {
  question: string;
  answer: string;
  deckId: string;
  category: string;
  authorId: string;
  cardId: string;
}) => {
  console.log("UPDATE CARD DATA", data);
  // const answerJson = JSON.stringify(data.answer);
  const card = await prisma.card.update({
    where: { id: data.cardId },
    data: {
      answer: data.answer,
      question: data.question,
    },
  });

  return card;
};

export const deleteCard = async (cardId: string) => {
  const card = await prisma.card.delete({
    where: { id: cardId },
  });

  return card;
};
