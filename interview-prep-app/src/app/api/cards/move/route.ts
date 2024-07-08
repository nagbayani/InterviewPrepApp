import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/db";
import { updateCard } from "@/data/cards";

export async function PUT(
  req: NextRequest,
  { params }: { params: { cardId: string } }
) {
  const { cardId, newDeckId } = (await req.json()) as {
    cardId: string;
    newDeckId: string;
  };

  try {
    const updatedCard = await prisma.card.update({
      where: { id: cardId },
      data: { deckId: newDeckId },
    });

    return NextResponse.json({
      message: `Card moved`,
      status: 200,
      card: updatedCard,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error moving card", status: 400 });
  }
}
