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
  description: string | null;
  thumbnail: string | null;
}) => {
  console.log("UPDATE DECK DATA", data);

  const deck = await prisma.deck.update({
    where: { id: data.deckId },
    data: {
      title: data.title,
      description: data.description,
      thumbnail: data.thumbnail,
    },
  });

  if (deck) {
    console.log("Deck updated in database");
  }

  return deck;
};

export const deleteDeckById = async (deckId: string) => {
  const deletedDeck = await prisma.deck.delete({
    where: { id: deckId },
  });

  if (deletedDeck) {
    console.log("Deck deleted from database");
  }

  return deletedDeck;
};
