import { NextResponse, NextRequest } from "next/server";
import {
  getMockTemplateById,
  updateMockTemplate,
  deleteMockTemplateById,
  addCardToMockTemplate,
  removeCardFromMockTemplate,
  updateCardStageAndOrder,
} from "@/data/mock-templates"; // Ensure all relevant functions are imported
import { currentUser } from "@/lib/auth";
import prisma from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { mockId: string } }
) {
  const user = await currentUser();
  const mockId = params.mockId;

  const mockTemplate = await getMockTemplateById(mockId);

  // Check if the user is authorized to view the mock template
  if (!mockTemplate || mockTemplate.authorId !== user.session?.user.id) {
    return NextResponse.json({
      message: "You are not authorized to view this mock template",
      status: 403,
    });
  }

  // Respond with the mock template data
  return NextResponse.json({
    data: mockTemplate,
    status: 200,
  });
}

// export async function PUT(req: NextRequest, res: NextResponse) {
//   const user = await currentUser();

//   const { mockId, title, type, description, cardsWithStageAndOrder } = (await req.json()) as {
//     mockId: string;
//     title: string;
//     type: string;
//     description?: string;
//     cardsWithStageAndOrder: { cardId: string; stage: string; order: number }[]
//   };

//   // Update the Mock Template metadata (title, description)
//   const data = { mockId, title, type, description };

//   try {
//     const updatedTemplate = await updateMockTemplate(data);

//     // Manage the cards associated with the Mock Template
//     // Fetch existing template to determine which cards to add/remove
//     const existingTemplate = await getMockTemplateById(mockId);
//     const existingCardIds = existingTemplate?.cards.map((c) => c.cardId) || [];

//     // Add new cards to the template
//     const cardsToAdd = cardIds.filter(
//       (cardId) => !existingCardIds.includes(cardId)
//     );
//     for (const cardId of cardsToAdd) {
//       await addCardToMockTemplate(mockId, cardId);
//     }

//     // Remove cards that are no longer in the template
//     const cardsToRemove = existingCardIds.filter(
//       (cardId) => !cardIds.includes(cardId)
//     );
//     for (const cardId of cardsToRemove) {
//       await removeCardFromMockTemplate(mockId, cardId);
//     }
//     // Fetch the updated template including its cards after modifications
//     const updatedTemplateWithCards = await getMockTemplateById(mockId);

//     return NextResponse.json({
//       message: "Mock template updated with cards",
//       status: 200,
//       template: updatedTemplateWithCards,
//     });
//   } catch (error) {
//     return NextResponse.json({
//       message: "Error updating mock template",
//       status: 400,
//       error: error,
//     });
//   }
// }
export async function PUT(req: NextRequest, res: NextResponse) {
  const user = await currentUser();

  const { mockId, title, type, description, cardsWithStageAndOrder } =
    (await req.json()) as {
      mockId: string;
      title: string;
      type: string;
      description?: string;
      cardsWithStageAndOrder: {
        cardId: string;
        stage: string;
        order: number;
      }[];
    };

  // Update the Mock Template metadata (title, description)
  const data = { mockId, title, type, description };

  try {
    // Update the Mock Template metadata
    const updatedTemplate = await updateMockTemplate(data);

    // Fetch existing template to determine which cards to add/remove
    const existingTemplate = await getMockTemplateById(mockId);
    const existingCardIds = existingTemplate?.cards.map((c) => c.cardId) || [];

    // Manage the cards associated with the Mock Template
    const newCardIds = cardsWithStageAndOrder.map((c) => c.cardId);

    // Add new cards (or update their stage and order)
    const cardsToAdd = cardsWithStageAndOrder.filter(
      (card) => !existingCardIds.includes(card.cardId)
    );

    for (const { cardId, stage, order } of cardsToAdd) {
      // Add card to mock template with stage and order
      await addCardToMockTemplate(mockId, cardId, stage, order);
    }

    // Remove cards that are no longer in the template
    const cardsToRemove = existingCardIds.filter(
      (cardId) => !newCardIds.includes(cardId)
    );

    for (const cardId of cardsToRemove) {
      await removeCardFromMockTemplate(mockId, cardId);
    }

    // Update existing cards' stage and order if they already exist in the template
    const cardsToUpdate = cardsWithStageAndOrder.filter((card) =>
      existingCardIds.includes(card.cardId)
    );

    for (const { cardId, stage, order } of cardsToUpdate) {
      await updateCardStageAndOrder(mockId, cardId, stage, order);
    }

    // Fetch the updated template including its cards after modifications
    const updatedTemplateWithCards = await getMockTemplateById(mockId);

    return NextResponse.json({
      message: "Mock template updated with cards, stage, and order",
      status: 200,
      template: updatedTemplateWithCards,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error updating mock template",
      status: 400,
      error: error,
    });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { mockId: string } }
) {
  const user = await currentUser();
  const mockId = params.mockId;

  try {
    // Check if the user is authorized to delete the mock template
    const mockTemplate = await getMockTemplateById(mockId);
    if (!mockTemplate || mockTemplate.authorId !== user.session?.user.id) {
      return NextResponse.json({
        message: "You are not authorized to delete this mock template",
        status: 403,
      });
    }

    // Delete all MockTemplateCard relationships for the template
    const existingCardIds = mockTemplate.cards.map((c) => c.cardId);
    for (const cardId of existingCardIds) {
      await removeCardFromMockTemplate(mockId, cardId);
    }

    // Delete the mock template
    await deleteMockTemplateById(mockId);

    return NextResponse.json({
      message: "Mock template deleted successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error deleting mock template",
      status: 400,
      error: error,
    });
  }
}
