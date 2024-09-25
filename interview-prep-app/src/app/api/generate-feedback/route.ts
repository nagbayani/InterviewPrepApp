import prisma from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { currentUser } from "@/lib/auth";
import { generateAnswerFeedback } from "@/utils/openai-generate-feedback";

// Function to parse the feedback into strengths, weaknesses, and tips
function parseFeedback(feedbackText: string) {
  // Split the feedback based on keywords: Strengths, Weaknesses, Tips for Improvement
  const strengthsRegex = /"strengths":\s*\[(.*?)\],/s;
  const weaknessesRegex = /"weaknesses":\s*\[(.*?)\],/s;
  const tipsRegex = /"tipsForImprovement":\s*\[(.*?)\]/s;

  const strengthsMatch = feedbackText.match(strengthsRegex);
  const weaknessesMatch = feedbackText.match(weaknessesRegex);
  const tipsMatch = feedbackText.match(tipsRegex);

  const strengths = strengthsMatch ? JSON.parse(`[${strengthsMatch[1]}]`) : [];
  const weaknesses = weaknessesMatch
    ? JSON.parse(`[${weaknessesMatch[1]}]`)
    : [];
  const tipsForImprovement = tipsMatch ? JSON.parse(`[${tipsMatch[1]}]`) : [];

  // Return parsed feedback as separate objects
  return {
    strengths,
    weaknesses,
    tipsForImprovement,
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
    // Generate feedback using OpenAI
    const { feedback, requestId, error } = await generateAnswerFeedback({
      question,
      answer,
      projects,
      skills,
      experience,
    });

    if (error) {
      return NextResponse.json(
        { message: "Error generating feedback" },
        { status: 500 }
      );
    }

    // Parse the feedback response
    const parsedFeedback = parseFeedback(feedback);
    console.log("Parsed feedback:", parsedFeedback);

    return NextResponse.json({
      message: "Successfully generated feedback",
      status: 201,
      feedback: parsedFeedback,
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
