import { currentUser } from "@/lib/auth";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {
  getUserLimits,
  checkLimitExceeded,
  updateLimit,
} from "@/data/user-limits";

export async function POST(req: NextRequest) {
  const user = await currentUser();
  if (!user.session?.user) {
    return NextResponse.json({
      status: 401,
      error: {
        code: "no-access",
        message: "You are not signed in.",
      },
    });
  }

  const userId = user.session.user.id;
  if (!userId) {
    return NextResponse.json({
      status: 400,
      error: {
        code: "invalid-user-id",
        message: "User ID is not valid.",
      },
    });
  }

  try {
    const userInPlan = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userInPlan) {
      return NextResponse.json({
        status: 404,
        error: {
          code: "no-user",
          message: "User not found.",
        },
      });
    }
    await prisma.generatedLimits.create({
      data: {
        userId: userId,
        generatedAnswers: 0,
        generatedBundles: 0,
        generatedFeedback: 0,
      },
    });
  } catch {}
}

export async function PUT(req: NextRequest) {
  // Parse request body
  const { actionType } = await req.json();

  const user = await currentUser();
  if (!user.session?.user) {
    return NextResponse.json({
      status: 401,
      error: {
        code: "no-access",
        message: "You are not signed in.",
      },
    });
  }
  const userInPlan = await prisma.user.findUnique({
    where: { id: user.session.user.id },
  });
  const userId = user.session.user.id;

  if (!userId) {
    return NextResponse.json({
      status: 400,
      error: {
        code: "invalid-user-id",
        message: "User ID is not valid.",
      },
    });
  }

  if (!userInPlan) {
    return NextResponse.json({
      status: 404,
      error: {
        code: "no-user",
        message: "User not found.",
      },
    });
  }

  // Fetch user limits from the database
  const userLimits = await getUserLimits(userId);
  if (!userLimits) {
    return NextResponse.json({
      status: 404,
      error: {
        code: "no-limits",
        message: "User's plan limits details not found.",
      },
    });
  }
  // Check if the user has exceeded their limit
  const limitCheck = await checkLimitExceeded(
    actionType,
    userLimits,
    userInPlan.plan
  );
  console.log("Limit check", limitCheck);
  if (limitCheck.exceeded) {
    console.log("Limit exceeded");
    return NextResponse.json({
      status: 400,
      error: limitCheck.error,
    });
  }

  // If the user hasn't exceeded their limit, update their limit count
  // Update the user's limit count
  try {
    const updatedLimit = await updateLimit(actionType, userId, userLimits);

    if (!updatedLimit) {
      return NextResponse.json(
        {
          status: 500,
          error: {
            code: "update-failed",
            message: "Failed to update user limits.",
          },
        },
        { status: 500 }
      );
    }

    // If successful, return success response
    return NextResponse.json(
      {
        status: 200,
        message: "User limits updated successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: 500,
        error: {
          code: "server-error",
          message: "An error occurred while updating limits.",
        },
      },
      { status: 500 }
    );
  }
}
