import { NextResponse } from "next/server";
import { auth } from "@/lib/testAuth";

export const GET = async (req: Request, res: NextResponse) => {
  const session = await auth();

  return NextResponse.json({ authenticated: !!session });
};
