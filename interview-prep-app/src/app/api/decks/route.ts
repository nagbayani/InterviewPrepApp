import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getDecksByUserId, getOrCreateUnassignedDeck } from "@/data/decks";

export async function GET(req: NextRequest, res: NextResponse) {
  // check session
  const user = await currentUser();

  // console.log(user, "API ENDPOINT USER");
  // console.log(req.cookies, "API ENDPOINT COOKIES");

  // Extract cookies from the request
  // const cookieHeader = req.headers.get("cookie");

  // console.log(req.headers.get("Cookie"), "API ENDPOINT COOKIE HEADER");
  if (!user || !user.session?.user.id) {
    return NextResponse.json({
      message: `No User Session`,
      status: 401,
    });
  }

  const decksDb = await getDecksByUserId(user.session?.user.id);
  // console.log("user id", user.session?.user.id);
  // console.log(decksDb, "DECKS DB");
  const unassignedDeck = await getOrCreateUnassignedDeck(user.session?.user.id);
  // need to add unassigned
  // Filter out sensitive information
  const decks = decksDb.map((deck) => {
    const { authorId, ...safeDeck } = deck;
    return safeDeck;
  });
  // data= { decks: data}

  return NextResponse.json({ decks, unassignedDeck });
}

export async function POST(req: NextRequest, res: NextResponse) {
  const { title, description } = (await req.json()) as {
    title: string;
    description: string;
  };

  const user = await currentUser();

  try {
    const deck = await prisma.deck.create({
      data: {
        title,
        authorId: user.session?.user.id ?? "",
        description: description ?? "",
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
