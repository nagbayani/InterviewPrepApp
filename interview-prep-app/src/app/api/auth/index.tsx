import { SignupFormSchema } from "@/lib/signup-schema";

export async function authSignUp(formData: FormData) {
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

  try {
    // Insert the user into the database or call an Auth Library's API
    // Make POST request to API route
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  } catch (error) {
    console.error("Sign up failed:", error);
  }

  // TODO:
  // 4. Create user session
  // 5. Redirect user
}



