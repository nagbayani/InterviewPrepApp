import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/db";
import { updateCard } from "@/data/cards";
import { currentUser } from "@/lib/auth";
import { getCardsByDeckId } from "@/data/cards";

export async function PUT(
  req: NextRequest
  // { params }: { params: { cardId: string } }
) {
  const { cardId, newDeckId, oldDeckId } = (await req.json()) as {
    cardId: string;
    newDeckId: string;
    oldDeckId: string;
  };

  try {
    const updatedCard = await prisma.card.update({
      where: { id: cardId },
      data: { deckId: newDeckId },
    });

    // updated deck list of old deck card was moved from
    const cardsDb = await getCardsByDeckId(oldDeckId);

    return NextResponse.json({
      message: `Card moved`,
      status: 200,
      card: updatedCard,
      cards: cardsDb,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error moving card", status: 400 });
  }
}
