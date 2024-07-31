import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/db";
import { getDeckByDeckId, updateDeck } from "@/data/decks";
import { getCardsByDeckId } from "@/data/cards";
import { getTagsByUserId, getCardTagsByCardId } from "@/data/tags";
import { currentUser } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: { deckId: string } }
) {
  const user = await currentUser();
  const deckId = params.deckId;

  const deck = await getDeckByDeckId(deckId);
  const cards = await getCardsByDeckId(deckId);
  const tags = await getTagsByUserId(user.session?.user.id ?? "");

  // Fetch card tags for each card
  const cardTagsPromises = cards.map((card) => getCardTagsByCardId(card.id));
  const cardTagsArrays = await Promise.all(cardTagsPromises);

  // Flatten the array of arrays
  const cardTags = cardTagsArrays.flat();

  //json the decks & card data
  const data = {
    deck,
    cards,
    tags,
    cardTags,
  };

  // console.log("API ROUTE SINGLE DECK DATA", data);
  return NextResponse.json({
    data,
  });
}

export async function PUT(req: NextRequest, res: NextResponse) {
  const user = await currentUser();

  const { deckId, title } = (await req.json()) as {
    deckId: string;
    title: string;
  };
  const data = { deckId, title, authorId: user.session?.user.id ?? "" };
  try {
    const deck = await updateDeck(data);
    console.log("API ENDPOINT DECK", deck);
    return NextResponse.json({ message: "Deck updated", status: 200, deck });
  } catch (error) {
    return NextResponse.json({
      message: "Error updating deck",
      status: 400,
      error: error,
    });
  }
}
