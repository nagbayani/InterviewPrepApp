import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/db";
import { getDeckByDeckId } from "@/data/decks";
import { getCardsByDeckId } from "@/data/cards";

export async function GET(
  req: NextRequest,
  { params }: { params: { deckId: string } }
) {
  const deckId = params.deckId;

  const deck = await getDeckByDeckId(deckId);
  const cards = await getCardsByDeckId(deckId);

  //json the decks

  return NextResponse.json({
    message: `This is for a single deck, DeckId: ${deckId}!, ${
      deck?.title
    }, ${cards.map((card) => card.question)}`,
  });
}
