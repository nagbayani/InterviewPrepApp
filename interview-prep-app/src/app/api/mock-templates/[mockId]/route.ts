import { NextResponse, NextRequest } from "next/server";
import {
  getMockTemplateById,
  updateMockTemplate,
  deleteMockTemplateById,
  addCardToMockTemplate,
  removeCardFromMockTemplate,
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

export async function PUT(req: NextRequest, res: NextResponse) {
  const user = await currentUser();

  const { mockId, title, type, description, cardIds } = (await req.json()) as {
    mockId: string;
    title: string;
    type: string;
    description?: string;
    cardIds: string[]; // Array of card IDs to be added to the template
  };

  // Update the Mock Template metadata (title, description)
  const data = { mockId, title, type, description };

  try {
    const updatedTemplate = await updateMockTemplate(data);

    // Manage the cards associated with the Mock Template
    // Fetch existing template to determine which cards to add/remove
    const existingTemplate = await getMockTemplateById(mockId);
    const existingCardIds = existingTemplate?.cards.map((c) => c.cardId) || [];

    // Add new cards to the template
    const cardsToAdd = cardIds.filter(
      (cardId) => !existingCardIds.includes(cardId)
    );
    for (const cardId of cardsToAdd) {
      await addCardToMockTemplate(mockId, cardId);
    }

    // Remove cards that are no longer in the template
    const cardsToRemove = existingCardIds.filter(
      (cardId) => !cardIds.includes(cardId)
    );
    for (const cardId of cardsToRemove) {
      await removeCardFromMockTemplate(mockId, cardId);
    }

    return NextResponse.json({
      message: "Mock template updated with cards",
      status: 200,
      template: updatedTemplate,
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
