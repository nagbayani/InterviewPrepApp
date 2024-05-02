import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import { auth } from "@/lib/auth";
import { NextRequestWithAuth } from "next-auth/middleware";

// export async function GET(req: NextRequest, res: NextResponse) {
//   // const session = await auth();
//   // if (session) {
//   //   console.log("SESSION", session);
//   // } else {
//   //   console.log("NO SESSION", session);
//   // }
//   console.log("COOKIE", req.cookies.get("next-auth.session-token"));
//   const session = await getServerSession(authOptions);
//   if (!session) {
//     console.log("NO SESSION", session);
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   }
//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

//   // const token = await getToken({ req });

//   if (!token) {
//     console.log("NULL TOKEN", token);
//     return NextResponse.json(
//       { decks: null, message: " No token Found" },
//       { status: 404 }
//     );
//   } else {
//     console.log("TOKEN", token.userId);
//     const id = token.userId?.toString();

//     try {
//       const decks = await prisma.deck.findMany({
//         where: { authorId: id },
//       });

//       if (!decks) {
//         return NextResponse.json({ decks: null }, { status: 404 });
//       } else {
//         const json = { decks, message: "Decks Found" };
//         return NextResponse.json(json, { status: 200 });
//       }
//     } catch (error) {
//       console.error("Failed to retrieve decks:", error);
//       return NextResponse.json(
//         { message: "Failed to retrieve decks" },
//         { status: 500 }
//       );
//     }
//   }
// }

export async function GET(req: NextRequest, res: NextResponse) {
  const token = req.cookies["next-auth.session-token"];
  const session = req.headers.forEach((header) => {
    console.log("SESSION HEADER", header);
  });
  console.log("SESSION", session);

  const sessionToken = req.headers.get("next-auth.csrf-token");
  console.log(sessionToken, "SESSION TOKEN");

  return NextResponse.json(
    { message: "GET request at u-decks" },
    { status: 200 }
  );
}

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token?.userId) {
    console.log("NULL TOKEN", token);
    return NextResponse.json(
      { decks: null, message: "No token Found / Unauthorized User" },
      { status: 404 }
    );
  } else {
    const id = token.userId?.toString();
    const { title } = await req.json();

    try {
      const newDeck = await prisma.deck.create({
        data: {
          title,
          authorId: id,
        },
      });
      const json = {
        newDeck,
        message: "Deck created successfully",
      };
      return NextResponse.json(json, { status: 201 });
    } catch (error) {
      console.error("Failed to create deck:", error);
      return NextResponse.json(
        { message: "Failed to create deck" },
        { status: 500 }
      );
    }
  }
}
