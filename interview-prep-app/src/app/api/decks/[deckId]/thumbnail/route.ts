import { NextResponse, NextRequest } from "next/server";
import { currentUser } from "@/lib/auth";
import prisma from "@/lib/db";

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "Hello World" });
}
export async function PUT(
  req: NextRequest,
  { params }: { params: { deckId: string } }
) {
  const user = await currentUser();
  const deckId = params.deckId;

  // Check if the user is authenticated
  if (!user) {
    return NextResponse.json({ message: "Unauthorized", status: 401 });
  }

  const { thumbnail } = await req.json();

  try {
    // Fetch the deck to ensure it exists and the user is authorized to modify it
    const deck = await prisma.deck.findUnique({
      where: { id: deckId },
    });

    if (!deck || deck.authorId !== user.session?.user.id) {
      return NextResponse.json({
        message: "You are not authorized to update this deck",
        status: 403,
      });
    }

    // Update the thumbnail in the database
    const updatedDeck = await prisma.deck.update({
      where: { id: deckId },
      data: { thumbnail },
    });

    return NextResponse.json({
      message: "Thumbnail updated successfully",
      status: 200,
      deck: updatedDeck,
    });
  } catch (error) {
    console.error("Error updating thumbnail:", error);
    return NextResponse.json({
      message: "Error updating thumbnail",
      status: 500,
      error: error,
    });
  }
}
