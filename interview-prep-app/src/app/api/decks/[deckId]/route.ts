import { NextResponse, NextRequest } from "next/server";
import { getDeckByDeckId, updateDeck, deleteDeckById } from "@/data/decks"; // Ensure deleteDeckById is imported
import { getCardsByDeckId } from "@/data/cards";
import { getTagsByUserId, getCardTagsByCardId } from "@/data/tags";
import { currentUser } from "@/lib/auth";
import prisma from "@/lib/db";

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

  const { deckId, title, description, thumbnail } = (await req.json()) as {
    deckId: string;
    title: string;
    description: string | null;
    thumbnail: string | null;
  };
  const data = {
    deckId,
    title,
    description,
    thumbnail,
    authorId: user.session?.user.id ?? "",
  };
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

// DELETE function to remove a deck by its ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { deckId: string } }
) {
  const user = await currentUser();
  const deckId = params.deckId;

  try {
    // Check if the user is authorized to delete the deck
    const deck = await getDeckByDeckId(deckId);
    if (!deck || deck.authorId !== user.session?.user.id) {
      return NextResponse.json({
        message: "You are not authorized to delete this deck",
        status: 403,
      });
    }

    // Delete the deck
    await deleteDeckById(deckId);

    return NextResponse.json({
      message: "Deck deleted successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error deleting deck",
      status: 400,
      error: error,
    });
  }
}
