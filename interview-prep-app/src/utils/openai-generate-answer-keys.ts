import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface Props {
  question: string;
  projects?: string;
  skills?: string;
  experience?: string;
}

export const generateAnswerKeys = async ({
  question,
  projects,
  skills,
  experience,
}: Props) => {
  try {
    // OpenAI Chat Completion request for feedback
    const completion = await client.chat.completions
      .create({
        messages: [
          {
            role: "user",
            content: `You are an expert interview coach. Based on the user's question and relevant background (projects, skills, and experience), generate a list of key tips. If the question is motivational (e.g., "Why do you want this job?") focus on how the user's interests and values align with the company. If the question is technical or experience-based, include specific projects, skills, or experiences where appropriate. Use the following format for the JSON response:
            
            Question: "${question}"
            Projects: "${projects}"
            Skills: "${skills}"
            Experience: "${experience}"
            
            The JSON format for key tips should be:
            {
              "keyTips": [
                {
                  "tip": "Explain how your recent project aligns with the skills needed for this role."
                  "detail": "Go into specifics about how your work on Project A helped you develop X skill, which is directly applicable to the job you're interviewing for."
                },
                {
                  "tip": "Showcase your ability to solve complex problems."
                  "detail": "Talk about a challenging problem you faced in one of your projects, how you approached it, and the results."
                }
              ]
            }

            Please provide at least 3-5 specific tips tailored to the question. The tips should be structured to help the user provide a well-rounded, impactful answer in an interview. Use clear, easy-to-understand language, and ensure that the JSON format is strictly followed.`,
          },
        ],
        model: "gpt-4o-mini",
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

    // Return the feedback and request ID
    return {
      keyTips: parsedResponse,
      requestId: requestId,
    };
  } catch (error) {
    console.log("Error generating feedback", error);
    return {
      keyTips: null,
      requestId: null,
      error: error || "An error occurred",
    };
  }
};
