import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface Props {
  mockTitle: string;
  mockDescription?: string;
  mockType: string;
  company: string;
  jobPosition: string;
  jobDescription: string;
  jobSkills: string;
  jobQualifications: string;
  projects?: string;
  skills?: string;
  experience?: string;
  tags: string[];
  questionPool: string[];
  stages: { value: string; label: string; description: string }[];
}

export const generateMockQuestions = async ({
  mockTitle,
  mockDescription,
  mockType,
  company,
  jobPosition,
  jobDescription,
  jobSkills,
  jobQualifications,
  projects,
  skills,
  experience,
  tags,
  questionPool,
  stages,
}: Props) => {
  try {
    const completion = await client.chat.completions
      .create({
        messages: [
          {
            role: "user",
            content: `You are tasked with generating a complete set of mock interview questions based on the following details:

            **Type of Mock Interview**: "${mockType}"
            **Mock Interview Title**: "${mockTitle}"
            **Mock Interview Description**: "${mockDescription}"
            **Company**: "${company}"
            **Job Position**: "${jobPosition}"
            **Job Description**: "${jobDescription}"
            **Required Job Skills**: "${jobSkills}"
            **Required Job Qualifications**: "${jobQualifications}"
            
            The user's personal projects, skills, and experience are listed below:
            **Projects**: "${projects}"
            **Skills**: "${skills}"
            **Experience**: "${experience}"

            Use the following tags to categorize each question: "${tags.join(
              ", "
            )}"

            **Existing Question Pool**: Here are the interview questions that have already been used for this user in relation to this type of mock interview and company. Ensure that the new questions generated are distinct from these:

            ${questionPool
              .map((question, index) => `${index + 1}. ${question}`)
              .join("\n")}

            The mock interview type, "${mockType}", has the following stages:
           
            ${stages
              .map(
                (stage) =>
                  `- Value: ${stage.value || "N/A"} | Label: ${
                    stage.label
                  } | Description: ${stage.description}`
              )
              .join("\n")}
            For each stage of the mock interview, generate a set of questions that would simulate a real interview. The number of questions should vary based on the content of each stage, aiming for a reasonable amount per stage to simulate a thorough interview experience. The questions should be distinct from the existing question pool and should align with the job role, skills, qualifications, and the user’s background (projects, skills, and experience). Make sure the flow of the questions makes sense within the context of the mock interview, simulating a natural interview process.

            Return the questions in the following JSON format, organized by stage:

            [
              {
                "value": "stage value",
                "label": "Stage Label",
                "questions": [
                  { "question": "Question 1", "tags": ["Tag1", "Tag2"] },
                  { "question": "Question 2", "tags": ["Tag3", "Tag1"] }
                ]
              },
              {
                "value": "stage value",
                "label": "Next Stage Label",
                "questions": [
                  { "question": "Question 1", "tags": ["Tag4", "Tag5"] }
                ]
              }
            ]

            Ensure the questions are tailored for each stage, simulate a natural interview, and include appropriate tags for each question based on the provided details.
            `,
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
