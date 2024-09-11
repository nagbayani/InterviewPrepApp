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
}: Props) => {
  try {
    const completion = await client.chat.completions
      .create({
        messages: [
          {
            role: "user",
            content: `You are tasked with generating mock interview questions for the following scenario:

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
            Based on all of this information, generate a list of 10 interview questions specifically for this mock interview. Each question must be relevant to the job description, job skills, job qualifications, and the user's background (projects, skills, experience). Return each question in the following strict JSON format:
            
            [
              { "question": "Question 1", "tags": ["Tag1", "Tag2"] },
              { "question": "Question 2", "tags": ["Tag3", "Tag1"] }
            ]

            Ensure that each question is appropriate for the mock interview's type and aligns with the job and user details provided. Include tags relevant to each question based on the user's background and the mock interview details.`,
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
