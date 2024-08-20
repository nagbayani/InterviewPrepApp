import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getMockTemplatesByUserId } from "@/data/mock-templates";

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

  const templatesDb = await getMockTemplatesByUserId(
    user.session?.user.id || ""
  );

  const templates = templatesDb.map((template) => {
    const { authorId, ...safeTemplate } = template;
    return safeTemplate;
  });

  // data= { decks: data}

  return NextResponse.json({ templates });
}

export async function POST(req: NextRequest) {
  const { title } = (await req.json()) as {
    title: string;
  };

  const user = await currentUser();

  try {
    const template = await prisma.mockTemplate.create({
      data: {
        title,
        authorId: user.session?.user.id ?? "",
      },
    });

    return NextResponse.json({
      message: `Template created`,
      status: 200,
      template,
    });
  } catch {
    return NextResponse.json({
      message: "Error creating template",
      status: 400,
    });
  }
}
