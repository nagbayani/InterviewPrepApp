import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface Question {
  id: string;
  text: string;
}

interface Stage {
  value: string;
  label: string;
  description: string;
}

interface Props {
  importedQuestions: Question[];
  stages: Stage[];
}

export const organizeImportedQuestions = async ({
  importedQuestions,
  stages,
}: Props) => {
  try {
    const completion = await client.chat.completions
      .create({
        messages: [
          {
            role: "user",
            content: `You are tasked with organizing imported interview questions into the stages of a mock interview. The details are as follows:
            
            **Imported Questions**: These are the questions the user has imported. They include the question text.
            ${importedQuestions
              .map(
                (question, index) =>
                  `${index + 1}. id:"${question.id}", text:"${question.text}"`
              )
              .join("\n")}

            The mock interview type has the following stages:
            ${stages
              .map(
                (stage) =>
                  `- Value: ${stage.value || "N/A"} | Label: ${
                    stage.label
                  } | Description: ${stage.description}`
              )
              .join("\n")}

            Your task is to organize the imported questions into the appropriate stages based on their content. Each question should belong to the most relevant stage. Ensure that the questions flow naturally within the interview context.

            Strictly Return ONLY the questions in the following JSON format, organized by stage:

            [
              {
                "value": "stage value",
                "label": "Stage Label",
                "questions": [
                  { "id": "questionId", "text": "Question text" }
                ]
              }
            ]`,
          },
        ],
        model: "gpt-4o-mini",
      })
      .asResponse();

    const rawData = await completion.json();

    // Parse the response and extract the organized questions
    const organizedQuestions = rawData.choices[0].message.content;

    const requestId = completion.headers.get("x-request-id");

    // Return the organized questions
    return {
      organizedQuestions,
      requestId,
    };
  } catch (error) {
    console.error("Error organizing questions with OpenAI:", error);

    return { organizedQuestions: [], error };
  }
};
