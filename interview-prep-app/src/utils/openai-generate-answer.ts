import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface Props {
  question: string;
  answer: string;
}

export const generateAnswer = async ({ question, answer }: Props) => {
  try {
    // OpenAI Chat Completion request
    const completion = await client.chat.completions
      .create({
        messages: [
          {
            role: "user",
            content: `Given the following interview question and the user's current answer, please improve the answer without sounding like a robot, and return it in a clear and concise way. 

            Question: "${question}"
            Current Answer: "${answer}"

            Please return only the improved answer as text.`,
          },
        ],
        model: "gpt-4o-mini", // You can change the model if needed
      })
      .asResponse();

    // Extract the raw body (as JSON) from the response object
    const rawData = await completion.json();

    // Access the x-request-id header
    const requestId = completion.headers.get("x-request-id");

    // Parse the response choices and handle it
    const parsedResponse = rawData.choices[0].message.content;

    console.log(`Request ID: ${requestId}`);
    console.log("Raw data from OpenAI:", rawData);
    console.log("Parsed response from OpenAI:", parsedResponse);

    // Return the improved answer and request ID
    return {
      generatedAnswer: parsedResponse,
      requestId: requestId,
    };
  } catch (error) {
    console.log("OpenAI Generate Answer File, Error generating answer", error);
    return {
      generatedAnswer: null,
      requestId: null,
      error: error || "An error occurred",
    };
  }
};
