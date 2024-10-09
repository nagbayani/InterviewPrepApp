import prisma from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { organizeImportedQuestions } from "@/utils/openai-organize-questions";
import { currentUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { importedQuestions, stages } = (await req.json()) as {
    importedQuestions: { id: string; text: string; tags: string[] }[];
    stages: { value: string; label: string; description: string }[];
  };

  console.log("Imported Questions:", importedQuestions);

  const user = await currentUser();
  const userId = user.session?.user.id;
  if (!user) {
    return NextResponse.json(
      { message: "You must be logged in to generate an answer" },
      { status: 401 }
    );
  }
  try {
    const { organizedQuestions, requestId, error } =
      await organizeImportedQuestions({
        importedQuestions,
        stages,
      });
    if (error) {
      throw new Error(`Error organizing the questions: ${error}`);
    }
    console.log("Organized Questions:", organizedQuestions);
    return NextResponse.json({ status: 200, organizedQuestions, requestId });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      error,
      message: "Error organizing the questions",
    });
  }
}
