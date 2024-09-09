import prisma from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { generateAnswer } from "@/utils/openai-generate-answer";

// Helper function to transform text into TipTap JSON structure
const transformTextToTipTapJson = (text: string) => {
  const paragraphs = text.split("\n").map((paragraph) => ({
    type: "dBlock",
    content: [
      {
        type: "paragraph",
        content: [{ type: "text", text: paragraph }],
      },
    ],
  }));
  // Use JSON.stringify to see the full object
  console.log("Paragraphs:", JSON.stringify(paragraphs, null, 2));
  return {
    type: "doc",
    content: paragraphs,
  };
};

export async function POST(req: NextRequest) {
  const { question, answer, cardId } = await req.json();

  try {
    // Generate an improved answer using OpenAI
    const { generatedAnswer, requestId, error } = await generateAnswer({
      question,
      answer,
    });

    // If there was an error generating the answer, return an error response
    if (error) {
      return NextResponse.json(
        { message: "Error generating answer", error },
        { status: 500 }
      );
    }

    // Transform the generated plain text into TipTap JSON format
    const tipTapContent = transformTextToTipTapJson(generatedAnswer);
    console.log(
      "Generated answer in TipTap format:",
      JSON.stringify(tipTapContent, null, 2)
    );

    // Update the database with the new generated answer in TipTap format
    const updatedCard = await prisma.card.update({
      where: { id: cardId },
      data: { answer: JSON.stringify(tipTapContent) }, // Save the structured content as a string
    });

    console.log("Updated card:", updatedCard);

    // Return the generated answer as a response
    return NextResponse.json({
      message: "Answer generated successfully",
      generatedAnswer: tipTapContent,
      requestId,
    });
  } catch (error) {
    return NextResponse.json({
      message: `Error generating answer: ${error}`,
      status: 500,
      error: error,
    });
  }
}
