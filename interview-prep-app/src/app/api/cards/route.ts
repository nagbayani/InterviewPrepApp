import { NextResponse, NextRequest } from "next/server";
import { currentUser } from "@/lib/auth";
import { createCard, getCardsByDeckId, getCardsByUserId } from "@/data/cards";
import prisma from "@/lib/db";
import { generateAnswerKeys } from "@/utils/openai-generate-answer-keys";

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
      authorId: user.session?.user.id ?? "",
    });

    //  Generate answer keys using OpenAI
    const resume = await prisma.userResume.findUnique({
      where: { userId: user.session?.user.id },
    });
    const projects = resume?.projects || "No projects found";
    const skills = resume?.skills || "No skills found";
    const experience = resume?.experience || "No experiences found";

    // const { keyTips, requestId, error } = await generateAnswerKeys({
    //   question,
    //   projects,
    //   skills,
    //   experience,
    // });
    // if (error) {
    //   throw new Error("OpenAI Error generating answer keys");
    // }
    // // Parse the generated answer keys
    // const parsedKeys = parseAnswerKeys(keyTips);
    // // console.log("Generated answer keys:", keyTips);
    // console.log("Parsed answer keys:", parsedKeys);

 

    return NextResponse.json({
      message: `Card created`,
      status: 200,
      card,
    });
  } catch (error) {
    return NextResponse.json({
      message: `Error creating card, ${error}`,
      status: 400,
      error: error,
    });
  }
}

// UPDATE
export async function PUT(req: NextRequest, res: NextResponse) {}

// DELETE multiple cards
export async function DELETE(req: NextRequest, res: NextResponse) {}
