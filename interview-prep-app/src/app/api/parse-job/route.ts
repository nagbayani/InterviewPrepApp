import { generateJobDetails } from "@/utils/openai-job";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { jobDescription } = (await req.json()) as { jobDescription: string };
  try {
    const { jobDetails, requestId } = await generateJobDetails(jobDescription);
    console.log("Job details in API endpoint:", jobDetails);

    return NextResponse.json({
      message: "Job details generated successfully",
      status: 200,
      jobDetails,
      requestId,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error generating job details",
      status: 400,
      error: error,
    });
  }
}
