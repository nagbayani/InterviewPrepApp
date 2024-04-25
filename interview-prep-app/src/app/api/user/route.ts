import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { hash } from "bcrypt";
import * as z from "zod";

const FormSchema = z.object({
  username: z.string().min(1, "Username is required").max(100),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
});

export async function POST(req: Request) {
  // Insert the user into the database
  try {
    const body = await req.json();
    const { username, email, password } = FormSchema.parse(body);
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

    // check if username exists
    const existingUserByUsername = await prisma.user.findUnique({
      where: { username: username },
    });

    if (existingUserByUsername) {
      return NextResponse.json(
        {
          user: null,
          message: "User with this username already exists.",
        },
        { status: 409 }
      );
    }

    const hashPassword = await hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashPassword,
      },
    });

    // SECURITY: take out password in response
    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json(
      { user: rest, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "An error occurred while creating the user." },
      { status: 500 }
    );
  }
}
