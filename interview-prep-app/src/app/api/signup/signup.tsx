import { NextApiRequest, NextApiResponse } from "next";
import { SignupFormSchema, FormState } from "@/lib/signup-schema";
import prisma from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username, email, password } = JSON.parse(req.body);
    console.log("Request Body:", req.body);

    // Insert the user into the database
    try {
      // check if email exists
      const existingUserByEmail = await prisma.user.findUnique({
        where: { email: email },
      });

      if (existingUserByEmail) {
        return NextResponse.json({user: null, message: "There is already a user with this email."})
      }

      // check if username exists
      const existingUserByUserName = await prisma.user.findUnique({
        where: { username: username },
      });

      const createdUser = await prisma.user.create({
        data: {
          username: username,
          email: email,
          password: password,
        },
      });

      return res.status(201).json(createdUser);
    } catch (error) {
      console.log(error, "ERROR");
      return res.status(500).json({
        message: "An error occurred while creating your account.",
        error: error,
      });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
