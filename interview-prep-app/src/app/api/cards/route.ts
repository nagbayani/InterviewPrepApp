import { NextResponse, NextRequest } from "next/server";
import { currentUser } from "@/lib/auth";
import { createCard, getCardsByDeckId, getCardsByUserId } from "@/data/cards";

export async function GET(req: NextRequest, res: NextResponse) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({
      message: `No User Session`,
      status: 401,
    });
  }

  const cardsDb = await getCardsByUserId(user.session?.user.id ?? "");
  const cards = cardsDb.map((card) => {
    const { authorId, ...safeCard } = card;
    return safeCard;
  });
  return NextResponse.json(cards);
}

// POST
export async function POST(req: NextRequest, res: NextResponse) {
  const { question, answer, deckId } = (await req.json()) as {
    question: string;
    answer: string;
    deckId: string;
  };
  const user = await currentUser();

  try {
    const card = await createCard({
      question,
      answer,
      deckId,
      category: "default",
      authorId: user.session?.user.id ?? "",
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

// UPDATE
export async function PUT(req: NextRequest, res: NextResponse) {}

// DELETE multiple cards
export async function DELETE(req: NextRequest, res: NextResponse) {}
