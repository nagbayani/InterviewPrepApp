import { NextResponse, NextRequest } from "next/server";
import {
  getInterviewById,
  updateInterview,
  deleteInterviewById,
  patchUpdateInterview,
} from "@/data/interviews";
import { currentUser } from "@/lib/auth";

// GET /api/interviews/[interviewId]
export async function GET(
  req: NextRequest,
  { params }: { params: { interviewId: string } }
) {
  const user = await currentUser();
  const interviewId = params.interviewId;

  const interview = await getInterviewById(interviewId);

  if (!interview || interview.userId !== user.session?.user.id) {
    return NextResponse.json({
      message: `Interview not found or unauthorized`,
      status: 404,
    });
  }

  // Filter out sensitive information
  const { userId, ...safeInterview } = interview;

  return NextResponse.json({ interview: safeInterview });
}

// PUT /api/interviews/[interviewId]
export async function PUT(
  req: NextRequest,
  { params }: { params: { interviewId: string } }
) {
  const user = await currentUser();
  const interviewId = params.interviewId;

  const {
    company,
    jobPosition,
    expectedSalary,
    jobDescription,
    skills,
    qualifications,
    mockTemplateId,
  } = await req.json();

  try {
    const interview = await getInterviewById(interviewId);

    if (!interview || interview.userId !== user.session?.user.id) {
      return NextResponse.json({
        message: `Interview not found or unauthorized`,
        status: 404,
      });
    }

    const updatedInterview = await updateInterview({
      interviewId,
      company,
      jobPosition,
      expectedSalary,
      jobDescription,
      skills,
      qualifications,
    });

    return NextResponse.json({
      message: `Interview updated`,
      status: 200,
      interview: updatedInterview,
    });
  } catch (error) {
    console.error("Error updating interview:", error);
    return NextResponse.json({
      message: "Error updating interview",
      status: 400,
    });
  }
}

// DELETE /api/interviews/[interviewId]
export async function DELETE(
  req: NextRequest,
  { params }: { params: { interviewId: string } }
) {
  const user = await currentUser();
  const interviewId = params.interviewId;

  try {
    const interview = await getInterviewById(interviewId);

    if (!interview || interview.userId !== user.session?.user.id) {
      return NextResponse.json({
        message: `Interview not found or unauthorized`,
        status: 404,
      });
    }

    await deleteInterviewById(interviewId);

    return NextResponse.json({
      message: `Interview deleted successfully`,
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting interview:", error);
    return NextResponse.json({
      message: "Error deleting interview",
      status: 400,
      error,
    });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { interviewId: string } }
) {
  const user = await currentUser();
  const interviewId = params.interviewId;

  try {
    // Get the interview by ID to check if it exists and if the user is authorized
    const interview = await getInterviewById(interviewId);

    if (!interview || interview.userId !== user.session?.user.id) {
      return NextResponse.json({
        message: `Interview not found or unauthorized`,
        status: 404,
      });
    }

    // Parse the request body to get the fields being updated
    const {
      company,
      jobPosition,
      expectedSalary,
      jobDescription,
      skills,
      qualifications,
      location,
      dateApplied,
      dateFollowUp,
      status,
    } = await req.json();

    // Call the patchUpdateInterview function to update only provided fields
    const updatedInterview = await patchUpdateInterview({
      interviewId,
      company,
      jobPosition,
      expectedSalary,
      jobDescription,
      skills,
      qualifications,
      location,
      dateApplied: dateApplied ? new Date(dateApplied) : undefined, // Ensure DateTime type
      dateFollowUp: dateFollowUp ? new Date(dateFollowUp) : undefined, // Ensure DateTime type
      status,
    });

    console.log("Updated interview:", updatedInterview);

    return NextResponse.json({
      message: `Interview updated successfully`,
      status: 200,
      interview: updatedInterview,
    });
  } catch (error) {
    console.error("Error updating interview:", error);
    return NextResponse.json({
      message: "Error updating interview",
      status: 500,
      error,
    });
  }
}
