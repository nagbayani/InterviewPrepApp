import prisma from "@/lib/db";
import { defaultTags, defaultThemes } from "@/lib/user-default-list";

export const setupNewUser = async (userId: string) => {
  // Create default tags for the user
  await prisma.tag.createMany({
    data: defaultTags.map((tag) => ({
      name: tag.name,
      color: tag.color,
      authorId: userId,
    })),
  });

  // Fetch all the tags to use in the card creation process
  const tags = await prisma.tag.findMany({
    where: {
      authorId: userId,
    },
  });

  // Create default decks and cards for the user
  for (const theme of defaultThemes) {
    // Create the deck
    const createdDeck = await prisma.deck.create({
      data: {
        title: theme.title,
        description: theme.description,
        authorId: userId,
      },
    });

    // Create cards for each deck and link them to their corresponding tags
    for (const card of theme.cards) {
      const createdCard = await prisma.card.create({
        data: {
          question: card.question,
          answer: "", // Default empty answer
          authorId: userId,
          deckId: createdDeck.id,
        },
      });

      // Link tags to the card
      const cardTags = card.tags
        .map((tagName) => {
          const tag = tags.find((t) => t.name === tagName);
          if (tag) {
            return {
              cardId: createdCard.id,
              tagId: tag.id,
            };
          }
          return null; // Return null if no tag is found
        })
        .filter((tag) => tag !== null); // Filter out any nulls

      // Create CardTags entries
      if (cardTags.length > 0) {
        await prisma.cardTags.createMany({
          data: cardTags as { cardId: string; tagId: string }[], // Ensure correct typing
        });
      }
    }
  }
};
