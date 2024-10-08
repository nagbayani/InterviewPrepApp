import prisma from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
// import { generateDeckQuestions } from "@/utils/openai-gen-deck-questions";
import { getOrCreateUnassignedDeck } from "@/data/decks";
import { generateMockQuestions } from "@/utils/openai-gen-mock-questions";
import { currentUser } from "@/lib/auth";
import { mockInterviewStages } from "@/lib/mock-type-stages";

type MockStageType = keyof typeof mockInterviewStages;

export async function POST(req: NextRequest) {
  const {
    mockTitle,
    mockDescription,
    mockType,
    company,
    jobPosition,
    jobDescription,
    jobSkills,
    jobQualifications,
    tags,
    questionPool,
  } = (await req.json()) as {
    mockTitle: string;
    mockDescription: string;
    mockType: MockStageType;
    company: string;
    jobPosition: string;
    jobDescription: string;
    jobSkills: string;
    jobQualifications: string;
    tags: string[];
    questionPool: string[];
  };
  const user = await currentUser();
  const userId = user.session?.user.id;
  if (!user) {
    return NextResponse.json(
      { message: "You must be logged in to generate an answer" },
      { status: 401 }
    );
  }
  // Ensure userId is defined
  if (!userId) {
    return NextResponse.json(
      { message: "User ID is missing" },
      { status: 400 }
    );
  }

  const resume = await prisma.userResume.findUnique({
    where: { userId: user.session?.user.id },
  });

  // Get stages for the mock interview type
  const stages = mockInterviewStages[mockType] || [];

  // Handle the case where resume might be null or missing fields
  const projects = resume?.projects || "No projects found";
  const skills = resume?.skills || "No skills found";
  const experience = resume?.experience || "No experiences found";
  try {
    const { questions, requestId, error } = await generateMockQuestions({
      mockTitle,
      mockDescription,
      mockType,
      company,
      jobPosition,
      jobDescription,
      jobSkills,
      jobQualifications,
      projects,
      skills,
      experience,
      tags,
      questionPool,
      stages,
    });
    // Get or create an unassigned deck for the user
    // const unassignedDeck = await getOrCreateUnassignedDeck(userId);

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
      // unassignedDeck: unassignedDeck,
    });
  } catch (error) {
    return NextResponse.json({
      message: `Error generating questions: ${error}`,
      status: 500,
      error: error,
    });
  }
}
