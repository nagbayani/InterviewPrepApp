"use server";
import prisma from "@/lib/db";
import { RegisterFormSchema } from "@/schemas/validateSchema";
import * as z from "zod";
import bcrypt from "bcrypt";

import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { defaultTags, defaultThemes } from "@/lib/user-default-list";

// async function
// validate fields
// parse password with bcrypt
// get user by email from data
// create user in db

export const register = async (values: z.infer<typeof RegisterFormSchema>) => {
  const validateFields = RegisterFormSchema.parse(values);

  if (!validateFields) {
    return { error: "Invalid fields!" };
  }

  const { name, email, password } = validateFields;
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "User already exists!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user in the database
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  console.log("New user created:", newUser);

  // Create default tags for the user
  const newTags = await prisma.tag.createMany({
    data: defaultTags.map((tag) => ({
      name: tag.name,
      color: tag.color,
      authorId: newUser.id,
    })),
  });
  if (newTags) {
    console.log("Default tags created for user");
  }

  // Fetch all the tags to use in the card creation process
  const tags = await prisma.tag.findMany({
    where: {
      authorId: newUser.id,
    },
  });

  console.log("Tags fetched:", tags);

  // Create default decks and cards for the user
  for (const theme of defaultThemes) {
    // Create the deck
    const createdDeck = await prisma.deck.create({
      data: {
        title: theme.title,
        description: theme.description,
        authorId: newUser.id,
      },
    });

    console.log("Deck created:", createdDeck);

    // Create cards for each deck and link them to their corresponding tags
    for (const card of theme.cards) {
      const createdCard = await prisma.card.create({
        data: {
          question: card.question,
          answer: "", // Default empty answer
          authorId: newUser.id,
          deckId: createdDeck.id,
        },
      });
      console.log("Card created:", createdCard);

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
          data: cardTags,
        });
      }
    }
  }

  // Generate verification token, send email
  // const verificationToken = await generateVerificationToken(email);
  // await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "User created!" };
};
