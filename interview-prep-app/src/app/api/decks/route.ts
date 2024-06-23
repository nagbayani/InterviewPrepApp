import { NextResponse, NextRequest } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/db";
import { auth } from "../../../../auth";
import { currentUser } from "@/lib/auth";
import { getDecksByUserId } from "@/data/decks";

export async function GET(req: NextRequest, res: NextResponse) {
  // check session
  const user = await currentUser();
  // console.log(user, "API ENDPOINT USER");
  // console.log(req.cookies, "API ENDPOINT COOKIES");

  // Extract cookies from the request
  const cookieHeader = req.headers.get("cookie");

  // console.log(req.headers.get("Cookie"), "API ENDPOINT COOKIE HEADER");
  if (!user) {
    return NextResponse.json({
      message: `No User Session`,
      status: 401,
    });
  }

  const decksDb = await getDecksByUserId(user.session?.user.id);
  // Filter out sensitive information
  const decks = decksDb.map((deck) => {
    const { authorId, ...safeDeck } = deck;
    return safeDeck;
  });
  // data= { decks: data}

  return NextResponse.json({ decks });
}
// DELETE deck
export async function DELETE(req: NextRequest, res: NextResponse) {}

// add deck settings
