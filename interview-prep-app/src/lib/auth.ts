import { auth } from "../../auth";
import { cookies } from "next/headers";

export const currentUser = async () => {
  const session = await auth();
  const cookieStore = cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  const data = { session, cookieHeader };
  return data;
};
