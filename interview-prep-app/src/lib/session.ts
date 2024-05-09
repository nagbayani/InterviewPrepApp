import { getServerSession } from "next-auth";
import { authOptions } from "./testAuth";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user;
}
