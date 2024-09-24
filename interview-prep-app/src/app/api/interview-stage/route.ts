import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function GET() {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({
      message: "No User Session",
      status: 401,
    });
  }
}

export async function POST(req: NextRequest) {
  const { interviewId } = await req.json();

  const user = await currentUser();

  if (!user) {
    return NextResponse.json({
      message: "No User Session",
      status: 401,
    });
  }

  try {
    const createdStage = await prisma.interviewStage.create({
      data: {
        interviewId: interviewId,
      },
    });

    return NextResponse.json({
      message: "Interview stage created",
      status: 200,
      stage: createdStage,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error creating an interview stage in database",
      status: 500,
      error: error,
    });
  }
}
