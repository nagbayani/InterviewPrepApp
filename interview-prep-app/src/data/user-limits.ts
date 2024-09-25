import prisma from "@/lib/db";

const MAX_FREE_BUNDLES = 3;
const MAX_FREE_ANSWERS = 5;
const MAX_FREE_FEEDBACK = 5;

export async function getUserLimits(userId: string) {
  return prisma.generatedLimits.findUnique({
    where: { userId },
  });
}

export async function checkLimitExceeded(
  actionType: string,
  userLimits: any,
  plan: string
) {
  if (plan === "free") {
    if (
      actionType === "generateQuestion" &&
      userLimits.generatedBundles >= MAX_FREE_BUNDLES
    ) {
      return {
        exceeded: true,
        error: {
          code: "max-bundles",
          message: "You have reached the maximum number of free bundles.",
        },
      };
    }

    if (
      actionType === "generateAnswer" &&
      userLimits.generatedAnswers >= MAX_FREE_ANSWERS
    ) {
      return {
        exceeded: true,
        error: {
          code: "max-answers",
          message: "You have reached the maximum number of free answers.",
        },
      };
    }

    if (
      actionType === "generateFeedback" &&
      userLimits.generatedFeedback >= MAX_FREE_FEEDBACK
    ) {
      return {
        exceeded: true,
        error: {
          code: "max-feedback",
          message: "You have reached the maximum number of free feedback.",
        },
      };
    }
  }

  return { exceeded: false };
}

export async function updateLimit(
  actionType: string,
  userId: string,
  userLimits: any
) {
  const updateData: any = {};

  if (actionType === "generateQuestion") {
    updateData.generatedBundles = userLimits.generatedBundles + 1;
  }

  if (actionType === "generateAnswer") {
    updateData.generatedAnswers = userLimits.generatedAnswers + 1;
  }

  if (actionType === "generateFeedback") {
    updateData.generatedFeedback = userLimits.generatedFeedback + 1;
  }

  return prisma.generatedLimits.update({
    where: { userId },
    data: updateData,
  });
}
