import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  return NextResponse.json({ success: true });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    return NextResponse.json(body);
  } catch (err) {}
}

export async function POSThandler(req: Request) {
  // Insert the user into the database
  try {
    const body = await req.json();
    const { username, email, password } = body;
    console.log("Request Body:", body);

    // check if email exists
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        {
          user: null,
          message: "User with this email already exists.",
        },
        { status: 409 }
      );
    }

    const createdUser = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: password,
      },
    });

    return NextResponse.json(body);
  } catch (error) {}
}
