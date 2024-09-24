import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { P } from "ts-pattern";
import {
  patchUpdateInterviewStage,
  getInterviewStageById,
} from "@/data/interviews";

export async function POST(
  req: NextRequest,
  { params }: { params: { interviewStageId: string } }
) {
  const { interviewId, title, type, description } = (await req.json()) as {
    interviewId: string;
    title: string;
    type: string;
    description: string;
  };
  const user = await currentUser();

  if (!user || !user.session?.user.id) {
    return NextResponse.json({
      message: "No User Session",
      status: 401,
    });
  }

  try {
    // create mock template with title, type, description, interviewId, and authorId
    const createdTemplate = await prisma.mockTemplate.create({
      data: {
        title,
        type,
        description,
        interviewId,
        authorId: user.session?.user.id,
        // Connect the interview stage using the ID
        interviewStage: {
          connect: {
            id: params.interviewStageId,
          },
        },
      },
    });

    // Update the interview stage with the newly created mockTemplateId
    const updatedStage = await prisma.interviewStage.update({
      where: { id: params.interviewStageId },
      data: {
        mockTemplateId: createdTemplate.id,
      },
    });
    console.log("createdTemplate", createdTemplate);
    console.log("updatedStage", updatedStage);

    return NextResponse.json({
      message: "Mock template created, linked to interview stage",
      status: 201,
      template: createdTemplate,
      interviewStage: updatedStage,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error linking mock template and interview stage in database",
      status: 500,
      error: error,
    });
  }
}

export async function DELETE({
  params,
}: {
  params: { interviewStageId: string };
}) {
  const { interviewStageId } = params;
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({
      message: "No User Session",
      status: 401,
    });
  }
  // delete interview stage by interviewStageId
  try {
    const deletedStage = await prisma.interviewStage.delete({
      where: { id: interviewStageId },
    });
    return NextResponse.json({
      message: "Interview stage deleted",
      status: 200,
      stage: deletedStage,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error deleting interview stage in database",
      status: 500,
      error: error,
    });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { interviewStageId: string } }
) {
  const user = await currentUser();
  const interviewStageId = params.interviewStageId;

  try {
    // Get the interview stage by ID to check if it exists and if the user is authorized
    const interviewStage = await getInterviewStageById(interviewStageId);

    if (
      !interviewStage ||
      interviewStage.interview.userId !== user.session?.user.id
    ) {
      return NextResponse.json({
        message: `Interview stage not found or unauthorized`,
        status: 404,
      });
    }

    // Parse the request body to get the fields being updated
    const { stageDate, format, type } = await req.json();

    // Call the patchUpdateInterviewStage function to update only provided fields
    const updatedStage = await patchUpdateInterviewStage({
      interviewStageId,
      stageDate: stageDate ? new Date(stageDate) : undefined, // Ensure DateTime type
      format,
      type,
    });

    console.log("Updated interview stage:", updatedStage);

    return NextResponse.json({
      message: `Interview stage updated successfully`,
      status: 200,
      interviewStage: updatedStage,
    });
  } catch (error) {
    console.error("Error updating interview stage:", error);
    return NextResponse.json({
      message: "Error updating interview stage",
      status: 500,
      error,
    });
  }
}
