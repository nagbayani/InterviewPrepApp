import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getDecksByUserId } from "@/data/decks";

export async function GET(req: NextRequest, res: NextResponse) {
  // check session
  const user = await currentUser();
  // console.log(user, "API ENDPOINT USER");
  // console.log(req.cookies, "API ENDPOINT COOKIES");

  // Extract cookies from the request
  // const cookieHeader = req.headers.get("cookie");

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

export async function POST(req: NextRequest, res: NextResponse) {
  const { title } = (await req.json()) as { title: string };

  const user = await currentUser();

  try {
    const deck = await prisma.deck.create({
      data: {
        title,
        authorId: user.session?.user.id ?? "",
      },
    });

    return NextResponse.json({
      message: `Deck created`,
      status: 200,
      deck,
    });
  } catch {
    return NextResponse.json({ message: "Error creating deck", status: 400 });
  }
}

// DELETE deck
export async function DELETE(req: NextRequest, res: NextResponse) {}

// add deck settings
