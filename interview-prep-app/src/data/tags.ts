import prisma from "@/lib/db";

// Get all Tags that the user has
export const getTagsByUserId = async (userId: string) => {
  const tags = await prisma.tag.findMany({
    where: { authorId: userId },
  });

  return tags;
};

// Get all tags associated with a specific CardId
export const getTagsByCardId = async (cardId: string) => {
  const cardTags = await prisma.cardTags.findMany({
    where: { cardId: cardId },
    include: {
      tag: true, // Include tag details
    },
  });

  // Extract the tags from the cardTags array
  const tags = cardTags.map((cardTag) => cardTag.tag);

  return tags;
};

export const getCardTagsByCardId = async (cardId: string) => {
  const cardTags = await prisma.cardTags.findMany({
    where: { cardId: cardId },
  });

  return cardTags;
};

// Create a new Tag
export const createTag = async (data: {
  name: string;
  color: string;
  authorId: string;
}) => {
  const tag = await prisma.tag.create({
    data: {
      name: data.name,
      color: data.color,
      authorId: data.authorId,
    },
  });

  return tag;
};

// Create a new CardTag
export const createCardTag = async (data: {
  cardId: string;
  tagId: string;
}) => {
  const cardTag = await prisma.cardTags.create({
    data: {
      cardId: data.cardId,
      tagId: data.tagId,
    },
  });

  return cardTag;
};

// Remove a tag associated with a specific CardId (so delete cardTag, NOT the tag)
export const removeTagFromCard = async (cardId: string, tagId: string) => {
  const cardTag = await prisma.cardTags.delete({
    where: {
      cardId_tagId: {
        cardId: cardId,
        tagId: tagId,
      },
    },
  });

  return cardTag;
};

// Delete the tag itself
export const deleteTag = async (tagId: string) => {
  // First, delete all associated CardTags
  await prisma.cardTags.deleteMany({
    where: { tagId: tagId },
  });

  // Then, delete the tag
  const tag = await prisma.tag.delete({
    where: { id: tagId },
  });

  return tag;
};

// Update the Tag name
export const updateTagName = async (tagId: string, newName: string) => {
  const tag = await prisma.tag.update({
    where: { id: tagId },
    data: {
      name: newName,
    },
  });

  return tag;
};

// Update the Tag color
export const updateTagColor = async (tagId: string, newColor: string) => {
  const tag = await prisma.tag.update({
    where: { id: tagId },
    data: {
      color: newColor,
    },
  });

  return tag;
};

export const initializeDefaultTagsForUser = async (userId: string) => {
  const defaultTags = [
    { name: "Behavioral", color: "#FF5733" },
    { name: "Communication", color: "#33FF57" },
    { name: "Personal Values", color: "#3357FF" },
    { name: "Situational", color: "#FF33A1" },
    { name: "Technical", color: "#FF8C33" },
    { name: "Background", color: "#8C33FF" },
    { name: "Experience", color: "#FF3333" },
    { name: "Culture", color: "#33FFA5" },
  ];

  try {
    const tagPromises = defaultTags.map((tag) =>
      prisma.tag.create({
        data: {
          ...tag,
          authorId: userId,
        },
      })
    );

    const tags = await Promise.all(tagPromises);
    return tags;
  } catch (error) {
    throw new Error(`Failed to initialize default tags: ${error}`);
  }
};
