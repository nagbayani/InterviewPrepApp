import prisma from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { currentUser } from "@/lib/auth";
import { generateAnswerFeedback } from "@/utils/openai-generate-feedback";
import { saveCardFeedback } from "@/data/cards";
import { generateAnswerKeys } from "@/utils/openai-generate-answer-keys";

// Helper to parse the generated answer keys
function parseAnswerKeys(keysText: string) {
  const keysRegex = /"keyTips":\s*\[(.*?)\]/s;
  const keysMatch = keysText.match(keysRegex);
  const keyTips = keysMatch ? JSON.parse(`[${keysMatch[1]}]`) : [];

  return {
    keyTips,
  };
}

export async function POST(req: NextRequest) {
  const { question, answer, cardId } = await req.json();
  const user = await currentUser();

  if (!user) {
    return NextResponse.json(
      { message: "You must be logged in to generate feedback" },
      { status: 401 }
    );
  }

  const resume = await prisma.userResume.findUnique({
    where: { userId: user.session?.user.id },
  });

  const projects = resume?.projects || "No projects found";
  const skills = resume?.skills || "No skills found";
  const experience = resume?.experience || "No experiences found";

  try {
    const { keyTips, requestId, error } = await generateAnswerKeys({
      question,
      projects,
      skills,
      experience,
    });
    if (error) {
      throw new Error("OpenAI Error generating answer keys");
    }
    // Parse the generated answer keys
    const parsedKeys = parseAnswerKeys(keyTips);
    // console.log("Generated answer keys:", keyTips);
    // console.log("Parsed answer keys:", parsedKeys);

    //  Update the card with the generated keys
    const newCard = await prisma.card.update({
      where: { id: cardId },
      data: {
        keysForAnswer: JSON.stringify(parsedKeys.keyTips),
      },
    });

    return NextResponse.json({
      message: "Successfully generated feedback",
      status: 201,
      keyTips: parsedKeys.keyTips,
      requestId,
    });
  } catch (error) {
    console.error("Error generating feedback", error);
    return NextResponse.json(
      { message: "Error generating feedback" },
      { status: 500 }
    );
  }
}
