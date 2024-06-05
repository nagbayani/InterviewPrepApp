import prisma from "@/lib/db";

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
