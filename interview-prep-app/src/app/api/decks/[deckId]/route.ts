import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/db";
import { getDeckByDeckId, updateDeck } from "@/data/decks";
import { getCardsByDeckId } from "@/data/cards";

export async function GET(
  req: NextRequest,
  { params }: { params: { deckId: string } }
) {
  const deckId = params.deckId;

  const deck = await getDeckByDeckId(deckId);
  const cards = await getCardsByDeckId(deckId);

  //json the decks & card data
  const data = {
    deck,
    cards,
  };

  // console.log("API ROUTE SINGLE DECK DATA", data);
  return NextResponse.json({
    data,
  });
}

export async function PUT(req: NextRequest, res: NextResponse) {
  const { deckId, title, authorId } = await req.json();
  const data = { deckId, title, authorId };
  try {
    const deck = await updateDeck(data);
    return NextResponse.json({ message: "Deck updated", status: 200, deck });
  } catch {
    return NextResponse.json({ message: "Error updating deck", status: 400 });
  }
}
