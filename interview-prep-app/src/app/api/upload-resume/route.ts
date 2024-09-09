import { extractResumeDetails } from "@/utils/openai-resume";
import prisma from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { resumeText, userId } = (await req.json()) as {
    resumeText: string;
    userId: string;
  };

  try {
    // Extract resume details using OpenAI
    const { resumeDetails, requestId, error } = await extractResumeDetails(
      resumeText
    );
    console.log("Resume details in API endpoint:", resumeDetails);

    if (error) {
      return NextResponse.json({
        message: "Error extracting resume details",
        status: 400,
        error: error,
      });
    }

    return NextResponse.json({
      message: "Resume details extracted and saved successfully",
      status: 200,
      resume: resumeDetails,
      requestId,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error processing resume",
      status: 500,
      error: error,
    });
  }
}
