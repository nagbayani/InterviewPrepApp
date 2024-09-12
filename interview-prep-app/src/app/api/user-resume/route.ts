import { NextResponse, NextRequest } from "next/server";
import { currentUser } from "@/lib/auth";
import prisma from "@/lib/db";

export async function POST(req: NextRequest) {
  const { skills, experience, projects } = (await req.json()) as {
    skills: string;
    experience: string;
    projects: string;
  };

  try {
    const user = await currentUser();
    const userId = user?.session?.user?.id;

    if (!user) {
      return NextResponse.json({
        message: `No User Session`,
        status: 401,
      });
    }

    if (!userId) {
      return NextResponse.json({
        message: `User ID is undefined, no valid session found`,
        status: 401,
      });
    }

    // Save the resume details to the database
    const resume = await prisma.userResume.create({
      data: {
        userId: userId,
        skills: skills,
        experience: experience,
        projects: projects,
      },
    });

    return NextResponse.json({
      message: "Resume uploaded successfully",
      status: 200,
      resume,
    });
  } catch (error) {
    return NextResponse.json({
      message: `Error uploading resume, ${error}`,
      status: 400,
      error: error,
    });
  }
}
