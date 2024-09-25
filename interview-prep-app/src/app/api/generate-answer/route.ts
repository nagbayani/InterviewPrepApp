import prisma from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { currentUser } from "@/lib/auth";
import { generateAnswer } from "@/utils/openai-generate-answer";

// Helper function to transform text into TipTap JSON structure

const transformTextToTipTapJson = (text: string) => {
  // Create a single paragraph with the entire text
  const singleParagraph = {
    type: "paragraph",
    content: [{ type: "text", text }],
  };

  // Create a single dBlock containing the entire text in one paragraph
  const singleBlock = {
    type: "dBlock",
    content: [singleParagraph],
  };

  // Log the entire singleBlock object to ensure it's correct
  console.log("Single dBlock content:", JSON.stringify(singleBlock, null, 2));

  return {
    type: "doc",
    content: [singleBlock], // Return the single dBlock within a doc
  };
};

export async function POST(req: NextRequest) {
  const { question, answer, cardId } = await req.json();
  const user = await currentUser();
  if (!user) {
    return NextResponse.json(
      { message: "You must be logged in to generate an answer" },
      { status: 401 }
    );
  }

  const resume = await prisma.userResume.findUnique({
    where: { userId: user.session?.user.id },
  });

  // Handle the case where resume might be null or missing fields
  const projects = resume?.projects || "No projects found";
  const skills = resume?.skills || "No skills found";
  const experience = resume?.experience || "No experiences found";

  try {
    // Generate an improved answer using OpenAI
    const { generatedAnswer, requestId, error } = await generateAnswer({
      question,
      answer,
      projects,
      skills,
      experience,
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
      status: 201,
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
