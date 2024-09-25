import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface Props {
  question: string;
  answer: string;
  projects?: string;
  skills?: string;
  experience?: string;
}

export const generateAnswerFeedback = async ({
  question,
  answer,
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
            content: `Analyze the user's interview answer based on the given question, projects, skills, and experience. Provide constructive feedback in a JSON format including specific strengths, weaknesses, and tips for improvement.
      
            Question: "${question}"
            User's Answer: "${answer}"
            Projects: "${projects}"
            Skills: "${skills}"
            Experience: "${experience}"
            
            Please strictly return the feedback as a JSON object with the following structure:
            {
              "strengths": [
                {
                  "point": "Your passion for solving complex problems is clearly articulated."
                  "explanation": ""
                },
              ],
              "weaknesses": [
                {
                  "point": "Your answer lacks specific examples of how you applied problem-solving techniques."
                 "explanation": ""

                }
              ],
              "tipsForImprovement": [
                {
                  "point": "Provide more details about how you approached solving problems in specific projects."
                  "explanation": ""
                }
              ]
            }
    
            For each point please go in depth too. The tips should be relevant to the exact question and the circumstances of the question. The tone should be positive, helpful, and easy to understand. Please make sure that the JSON is well-formatted and follows the structure outlined above.`,
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
      feedback: parsedResponse,
      requestId: requestId,
    };
  } catch (error) {
    console.log("Error generating feedback", error);
    return {
      feedback: null,
      requestId: null,
      error: error || "An error occurred",
    };
  }
};
