import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/db";
import {
  createCardTag,
  removeTagFromCard,
  getCardTagsByCardId,
} from "@/data/tags";

export async function GET(req: NextRequest) {
  const { cardId } = await req.json();
  try {
    const cardTags = await getCardTagsByCardId(cardId as string);
    return NextResponse.json({ cardTags });
  } catch (error) {
    console.error("Error fetching CardTags:", error);
    return NextResponse.json(
      { error: "Failed to fetch CardTags" },
      { status: 500 }
    );
  }
}

// create a new cardtag
export async function POST(req: NextRequest) {
  const { cardId, tagId } = await req.json();
  console.log("Creating cardTag with cardId:", cardId, "tagId:", tagId);
  try {
    const cardTag = await createCardTag({ cardId, tagId });
    return NextResponse.json({ message: "CardTag created", cardTag });
  } catch (error) {
    console.error("Error creating CardTag:", error);
    return NextResponse.json(
      { error: "Failed to create CardTag" },
      { status: 500 }
    );
  }
}

// User wants to remove a tag from a card, so we delete from CardTag table
export async function DELETE(req: NextRequest) {
  const { cardId, tagId } = await req.json();
  try {
    await prisma.cardTags.delete({
      where: {
        cardId_tagId: {
          cardId: cardId,
          tagId: tagId,
        },
      },
    });
    return NextResponse.json({ message: "CardTag deleted successfully" });
  } catch (error) {
    console.error("Error deleting CardTag:", error);
    return NextResponse.json(
      { error: "Failed to delete CardTag" },
      { status: 500 }
    );
  }
}
