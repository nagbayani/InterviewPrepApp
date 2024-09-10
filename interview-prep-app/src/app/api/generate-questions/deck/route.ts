import prisma from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { generateDeckQuestions } from "@/utils/openai-gen-deck-questions";
import { currentUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { deckId, deckTitle, deckDescription, tags } = await req.json();
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
    const { questions, requestId, error } = await generateDeckQuestions({
      deckTitle,
      deckDescription,
      tags,
      projects,
      skills,
      experience,
    });

    // If there was an error generating the answer, return an error response
    if (error) {
      return NextResponse.json({
        message: `Error generating questions: ${error}`,
        status: 500,
        error: error,
      });
    }
    console.log("Questions:", questions);
    return NextResponse.json({
      status: 200,
      questions,
      requestId,
    });
  } catch (error) {
    return NextResponse.json({
      message: `Error generating questions: ${error}`,
      status: 500,
      error: error,
    });
  }
}
