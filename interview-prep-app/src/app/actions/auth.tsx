import { SignupFormSchema, FormState } from "@/lib/signup-schema";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  // Prepare data for insertion into database
  const { username, email, password } = validatedFields.data;

  // Insert the user into the database or call an Auth Library's API
  const data = await prisma.user.create({
    data: {
      username: username,
      email: email,
      password: password,
    },
  });

  // TODO:
  // 4. Create user session
  // 5. Redirect user
}
