import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
export const generateJobDetails = async (jobDescription: string) => {
  try {
    const completion = await client.chat.completions
      .create({
        messages: [
          {
            role: "user",
            content: `Extract the following information from this job description and return it in the following JSON format:
  
          {
            "companyName": "",
            "jobPosition": "",
            "salary": "",
            "responsibilities": "",
            "preferredSkills": "",
            "preferredQualifications": ""
          }
  
          Job Description: ${jobDescription}`,
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

    return {
      jobDetails: parsedResponse,
      requestId: requestId,
    };
  } catch (error) {
    console.log("OpenAI Job Details File, Error generating job details", error);
    return {
      jobDetails: null,
      requestId: null,
      error: error || "An error occurred",
    };
  }
};
