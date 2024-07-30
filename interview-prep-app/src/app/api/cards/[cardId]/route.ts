import { NextResponse, NextRequest } from "next/server";
import { createCard, getCardById, updateCard, deleteCard } from "@/data/cards";
import { getTagsByCardId } from "@/data/tags";

export async function GET(
  req: NextRequest,
  { params }: { params: { cardId: string } }
) {
  const cardId = params.cardId;
  // need to get the card and the tags associated with the card
  const cardDb = await getCardById(cardId);
  const tagsDb = await getTagsByCardId(cardId);

  const card = { ...cardDb, tags: tagsDb };

  return NextResponse.json({ card });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { cardId: string } }
) {
  const { question, answer, deckId, category, authorId } =
    (await req.json()) as {
      question: string;
      answer: string;
      deckId: string;
      category: string;
      authorId: string;
    };

  try {
    const card = await createCard({
      question,
      answer,
      deckId,
      category,
      authorId,
    });
    return NextResponse.json({
      message: `Card created`,
      status: 200,
      card,
    });
  } catch {
    return NextResponse.json({
      message: `Error creating card`,
      status: 400,
    });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { cardId: string } }
) {
  const { question, answer, deckId, category, authorId, cardId } =
    (await req.json()) as {
      question: string;
      answer: string;
      deckId: string;
      category: string;
      authorId: string;
      cardId: string;
    };
  const data = { question, answer, deckId, category, authorId, cardId };
  try {
    const card = await updateCard(data);
    // console.log("API ENDPOINT PUT, CARD SAVED", card);
    return NextResponse.json({
      message: `Card updated`,
      status: 200,
      card,
    });
  } catch {
    return NextResponse.json({
      message: `Error updating card`,
      status: 400,
    });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { cardId: string } }
) {
  const cardId = params.cardId;
  const card = await deleteCard(cardId);
  return NextResponse.json({
    message: `Card deleted`,
    status: 200,
    card,
  });
}
