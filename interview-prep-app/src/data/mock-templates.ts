import prisma from "@/lib/db";

// Fetch all mock templates by a specific user
export const getMockTemplatesByUserId = async (userId: string) => {
  const templates = await prisma.mockTemplate.findMany({
    where: { authorId: userId },
    include: { cards: true }, // Include related cards if needed
  });

  return templates;
};

// Fetch a single mock template by its ID
export const getMockTemplateById = async (templateId: string) => {
  const template = await prisma.mockTemplate.findUnique({
    where: { id: templateId },
    include: { cards: true }, // Include related cards if needed
  });

  return template;
};

// Update a mock template by its ID
export const updateMockTemplate = async (data: {
  title: string;
  description?: string;
  mockId: string;
}) => {
  console.log("UPDATE MOCK TEMPLATE DATA", data);

  const template = await prisma.mockTemplate.update({
    where: { id: data.mockId },
    data: {
      title: data.title,
      description: data.description,
    },
  });

  if (template) {
    console.log("MockTemplate updated in database");
  }

  return template;
};

// Delete a mock template by its ID
export const deleteMockTemplateById = async (templateId: string) => {
  const deletedTemplate = await prisma.mockTemplate.delete({
    where: { id: templateId },
  });

  if (deletedTemplate) {
    console.log("MockTemplate deleted from database");
  }

  return deletedTemplate;
};

// Add a card to a mock template with stage and order
export const addCardToMockTemplate = async (
  templateId: string,
  cardId: string,
  stage: string,
  order: number
) => {
  const addedCard = await prisma.mockTemplateCard.create({
    data: {
      templateId: templateId,
      cardId: cardId,
      stage: stage, // Set the stage for the card
      order: order, // Set the order for the card within the stage
    },
  });

  if (addedCard) {
    console.log(
      `Card ${cardId} added to MockTemplate with stage ${stage} and order ${order}`
    );
  }

  return addedCard;
};

// Remove a card from a mock template
export const removeCardFromMockTemplate = async (
  templateId: string,
  cardId: string
) => {
  const removedCard = await prisma.mockTemplateCard.delete({
    where: {
      templateId_cardId: {
        templateId: templateId,
        cardId: cardId,
      },
    },
  });

  if (removedCard) {
    console.log("Card removed from MockTemplate");
  }

  return removedCard;
};

// Update the stage and order of a card in a mock template
export const updateCardStageAndOrder = async (
  templateId: string,
  cardId: string,
  stage: string,
  order: number
) => {
  const updatedCard = await prisma.mockTemplateCard.update({
    where: {
      templateId_cardId: {
        templateId: templateId,
        cardId: cardId,
      },
    },
    data: {
      stage: stage, // Update the stage of the card
      order: order, // Update the order of the card within the stage
    },
  });

  if (updatedCard) {
    console.log(`Card ${cardId} updated with new stage and order`);
  }

  return updatedCard;
};
