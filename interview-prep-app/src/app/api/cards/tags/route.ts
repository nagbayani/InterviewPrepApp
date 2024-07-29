import { NextResponse, NextRequest } from "next/server";
import {
  getTagsByUserId,
  createTag,
  deleteTag,
  updateTagName,
  updateTagColor,
} from "@/data/tags";
import { currentUser } from "@/lib/auth";
import prisma from "@/lib/db";

// Get all tags for a user
export async function GET(req: NextRequest) {
  const user = await currentUser();

  try {
    const tags = await getTagsByUserId(user.session?.user.id ?? "");
    return NextResponse.json({
      message: "All tags retrieved",
      status: 200,
      tags,
    });
  } catch {
    return NextResponse.json(
      { message: "Error fetching tags" },
      { status: 500 }
    );
  }
}
// create new tag
export async function POST(req: NextRequest) {
  const user = await currentUser();
  const { name, color } = await req.json();
  try {
    const tag = await createTag({
      name,
      color,
      authorId: user.session?.user.id ?? "",
    });

    return NextResponse.json({ message: "Tag created", status: 200, tag });
  } catch {
    return NextResponse.json(
      { message: "Error creating tag" },
      { status: 400 }
    );
  }
}

// Update Tag Name / Color / Both
export async function PUT(req: NextRequest) {
  const { tagId, name, color } = await req.json();

  try {
    let updatedTag;
    if (name && color) {
      updatedTag = await prisma.tag.update({
        where: { id: tagId },
        data: { name, color },
      });
    } else if (name) {
      updatedTag = await updateTagName(tagId, name);
    } else if (color) {
      updatedTag = await updateTagColor(tagId, color);
    }
    return NextResponse.json({
      message: "Tag updated successfully",
      status: 200,
      updatedTag,
    });
  } catch {
    return NextResponse.json(
      { message: "Error updating tag" },
      { status: 500 }
    );
  }
}

// completely deletes a tag
export async function DELETE(req: NextRequest) {
  const { tagId } = await req.json();

  try {
    const deletedTag = await deleteTag(tagId);
    return NextResponse.json({
      message: "Tag deleted successfully",
      status: 200,
      deletedTag,
    });
  } catch {
    return NextResponse.json(
      { message: "Error deleting tag" },
      { status: 500 }
    );
  }
}
