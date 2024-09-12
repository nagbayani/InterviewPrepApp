import OpenAI from "openai";
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateJobQuestions = async (jobDescription: string, interviewType: string, ) => {
  try {

  } catch (error) {
    console.log(
      "OpenAI Job Questions File, Error generating job questions",
      error
    );
    return {
      jobQuestions: null,
      requestId: null,
      error: error || "An error occurred",
    };
  }
};
