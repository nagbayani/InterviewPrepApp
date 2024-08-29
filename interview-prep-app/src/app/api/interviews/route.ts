import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/db";
import { currentUser } from "@/lib/auth";
import {
  getInterviewsByUserId,
  createInterview,
  deleteInterviewById,
} from "@/data/interviews";

// GET /api/interviews
export async function GET(req: NextRequest, res: NextResponse) {
  // Check session
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({
      message: `No User Session`,
      status: 401,
    });
  }

  const interviewsDb = await getInterviewsByUserId(user.session?.user.id || "");
  // Filter out sensitive information
  const interviews = interviewsDb.map((interview) => {
    const { userId, ...safeInterview } = interview;
    return safeInterview;
  });

  return NextResponse.json({ interviews });
}

// POST /api/interviews
export async function POST(req: NextRequest, res: NextResponse) {
  const { company, jobPosition, expectedSalary, jobDescription } =
    await req.json();

  const user = await currentUser();

  if (!user) {
    return NextResponse.json({
      message: `No User Session`,
      status: 401,
    });
  }

  try {
    const interview = await createInterview({
      company,
      jobPosition,
      expectedSalary,
      jobDescription,
      userId: user.session?.user.id ?? "",
    });

    return NextResponse.json({
      message: `Interview created`,
      status: 200,
      interview,
    });
  } catch (error) {
    console.error("Error creating interview:", error);
    return NextResponse.json({
      message: "Error creating interview",
      status: 400,
    });
  }
}

// DELETE /api/interviews
export async function DELETE(req: NextRequest, res: NextResponse) {
  const { interviewId } = await req.json();

  const user = await currentUser();

  if (!user) {
    return NextResponse.json({
      message: `No User Session`,
      status: 401,
    });
  }

  try {
    const deletedInterview = await deleteInterviewById(interviewId);

    return NextResponse.json({
      message: `Interview deleted`,
      status: 200,
      deletedInterview,
    });
  } catch (error) {
    console.error("Error deleting interview:", error);
    return NextResponse.json({
      message: "Error deleting interview",
      status: 400,
    });
  }
}
