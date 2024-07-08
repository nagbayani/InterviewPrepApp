import prisma from "@/lib/db";

export const getDecksByUserId = async (userId: string) => {
  const decks = await prisma.deck.findMany({
    where: { authorId: userId },
  });

  return decks;
};

export const getDeckByDeckId = async (deckId: string) => {
  const deck = await prisma.deck.findUnique({
    where: { id: deckId },
  });

  return deck; 
};

export const updateDeck = async (data: {
  title: string;
  authorId: string;
  deckId: string;
}) => {
  console.log("UPDATE DECK DATA", data);

  const deck = await prisma.deck.update({
    where: { id: data.deckId },
    data: {
      title: data.title,
    },
  });

  if (deck) {
    console.log("Deck updated in database");
  }

  return deck;
};
