import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface Props {
  deckTitle: string;
  deckDescription?: string;
  projects?: string;
  skills?: string;
  experience?: string;
  tags: string[];
}

export const generateDeckQuestions = async ({
  deckTitle,
  deckDescription,
  projects,
  skills,
  experience,
  tags,
}: Props) => {
  try {
    const completion = await client.chat.completions
      .create({
        messages: [
          {
            role: "user",
            content: `Given the deck title "${deckTitle}" and description "${deckDescription}", along with the user's projects, skills, and experience, generate a list of interview questions. Each question should be associated with a tag from the provided list of tags. 
  
            Please strictly return the response in the following JSON format, where each object contains a question and an array of tags:
  
            [
              { "question": "Question 1", "tags": ["Tag1", "Tag2"] },
              { "question": "Question 2", "tags": ["Tag3", "Tag1"] }
            ]
  
            Projects: "${projects}"
            Skills: "${skills}"
            Experience: "${experience}"
            Tags: "${tags.join(", ")}"`,
          },
        ],
        model: "gpt-4o-mini",
      })
      .asResponse();

    // Extract the raw body (as JSON) from the response object
    const rawData = await completion.json();

    // Parse the response choices and handle it

    const questions = rawData.choices[0].message.content;
    // .split("\n")
    // .filter(Boolean); // Assuming each question is separated by a newline

    // Access the x-request-id header
    const requestId = completion.headers.get("x-request-id");

    return {
      questions,
      requestId: requestId,
    };
  } catch (error) {
    console.log("Error generating questions with OpenAI:", error);
    return { questions: [], error };
  }
};
