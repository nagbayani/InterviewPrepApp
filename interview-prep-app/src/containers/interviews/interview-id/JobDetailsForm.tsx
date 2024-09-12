import React, { useState, useEffect } from "react";
import { InterviewData } from "@/types/data-types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MoveRight } from "lucide-react";
import SaveButton from "@/components/buttons/save-button";
import { Button } from "@/components/ui/button";
import { useInterviewStore } from "@/_store/interviews-store";
import { updateInterviewPUT } from "@/utils/fetch";

interface JobDetailsFormProps {
  interviewDb: InterviewData;
}

const JobDetailsForm = ({ interviewDb }: JobDetailsFormProps) => {
  // Fetch the interviews from Zustand store and access the interview using interviewId
  const { interviews, updateInterview } = useInterviewStore((state) => ({
    interviews: state.interviews,
    updateInterview: state.updateInterview,
  }));

  // Access the specific interview using the interviewId prop
  const interview = interviews[interviewDb.id];
  const [company, setCompany] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [preferredSkills, setPreferredSkills] = useState("");
  const [preferredQualifications, setPreferredQualifications] = useState("");

  // Populate state when the Zustand interview data changes
  useEffect(() => {
    if (interview) {
      setCompany(interview.company || "");
      setJobPosition(interview.jobPosition || "");
      setExpectedSalary(interview.expectedSalary || "");
      setJobDescription(interview.jobDescription || "");
      setPreferredSkills(interview.skills || "");
      setPreferredQualifications(interview.qualifications || "");
    }
  }, [interview]); // Re-run when interview data in Zustand changes

  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle"
  );

  const handleSave = async () => {
    try {
      setSaveStatus("saving");

      // Call the API to update the interview in the database
      const updatedInterview = await updateInterviewPUT({
        interviewId: interview.id,
        company,
        jobPosition,
        expectedSalary: expectedSalary || "",
        jobDescription: jobDescription || "",
        skills: preferredSkills || "",
        qualifications: preferredQualifications || "",
      });

      // Update Zustand state with the new interview details
      if (updatedInterview.status === 200) {
        console.log("Interview updated successfully:", updatedInterview);
        updateInterview(interview.id, {
          company,
          jobPosition,
          expectedSalary,
          jobDescription,
          skills: preferredSkills,
          qualifications: preferredQualifications,
        });
      }

      setSaveStatus("saved");
    } catch (error) {
      console.error("Error saving job details:", error);
      alert("Failed to save the interview details. Please try again.");
    } finally {
      setTimeout(() => setSaveStatus("idle"), 3000); // Reset the button status
    }
  };

  const uploadJobDescription = async () => {
    try {
      const response = await fetch("/api/parse-job", {
        method: "POST",
        body: JSON.stringify({ jobDescription }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Job details uploaded successfully:", data);

        // Clean the jobDetails from backticks and ensure it's a valid JSON string
        const cleanedJobDetails = data.jobDetails.replace(/```json|```/g, "");
        const parsedJobDetails = JSON.parse(cleanedJobDetails);

        // Convert fields to strings if they are not already, and join arrays with newline
        setCompany(parsedJobDetails.companyName || "");
        setJobPosition(parsedJobDetails.jobPosition || "");
        setExpectedSalary(parsedJobDetails.salary || "");

        // Ensure jobDescription (responsibilities) is a string, join arrays if necessary
        const jobDescriptionString = Array.isArray(
          parsedJobDetails.responsibilities
        )
          ? parsedJobDetails.responsibilities.join("\n")
          : parsedJobDetails.responsibilities || "";
        setJobDescription(jobDescriptionString);

        // Ensure preferredSkills is a string, join arrays if necessary
        const preferredSkillsString = Array.isArray(
          parsedJobDetails.preferredSkills
        )
          ? parsedJobDetails.preferredSkills.join("\n")
          : parsedJobDetails.preferredSkills || "";
        setPreferredSkills(preferredSkillsString);

        // Ensure preferredQualifications is a string, join arrays if necessary
        const preferredQualificationsString = Array.isArray(
          parsedJobDetails.preferredQualifications
        )
          ? parsedJobDetails.preferredQualifications.join("\n")
          : parsedJobDetails.preferredQualifications || "";
        setPreferredQualifications(preferredQualificationsString);
      }
    } catch (error) {
      console.error("Error uploading job description:", error);
    }
  };

  // Format the skills and qualifications with bullet points

  return (
    <div className='flex flex-col w-full h-full items-center justify-center gap-8'>
      {/* Upload job description */}
      <Card className='min-w-full max-w-lg h-full'>
        <CardHeader>
          <CardTitle>Upload Job Details</CardTitle>
          <CardDescription>
            Copy and paste entire job description to extract details
          </CardDescription>
        </CardHeader>
        <CardContent className='h-full'>
          <div className='grid gap-4 h-full'>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='jobDescription'>Job Description</Label>
              <Textarea
                id='jobDescription'
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder='Describe the job position'
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <Button onClick={uploadJobDescription}>Upload</Button>
        </CardFooter>
      </Card>

      <MoveRight />

      {/* Container to Fill in details */}
      <Card className='min-w-full max-w-lg'>
        <CardHeader>
          <CardTitle>Edit Job Details</CardTitle>
          <CardDescription>
            Update the details of your interview
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='company'>Company</Label>
              <Input
                id='company'
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder='Company Name'
              />
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='jobPosition'>Job Position</Label>
              <Input
                id='jobPosition'
                value={jobPosition}
                onChange={(e) => setJobPosition(e.target.value)}
                placeholder='Job Position'
              />
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='expectedSalary'>Expected Salary</Label>
              <Input
                id='expectedSalary'
                value={expectedSalary}
                onChange={(e) => setExpectedSalary(e.target.value)}
                placeholder='Expected Salary'
              />
            </div>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='jobDescription'>Job Responsibilities</Label>
              <Textarea
                id='jobDescription'
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder='Describe the responsibilities'
              />
            </div>

            {/* Preferred Skills as bullet points in Textarea */}
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='preferredSkills'>Preferred Skills</Label>
              <Textarea
                id='preferredSkills'
                value={preferredSkills}
                onChange={(e) => setPreferredSkills(e.target.value)}
                placeholder='Preferred Skills'
              />
            </div>

            {/* Preferred Qualifications as bullet points in Textarea */}
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='preferredQualifications'>
                Preferred Qualifications
              </Label>
              <Textarea
                id='preferredQualifications'
                value={preferredQualifications}
                onChange={(e) => setPreferredQualifications(e.target.value)}
                placeholder='Preferred Qualifications'
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <Button variant='outline' onClick={() => console.log("Cancel")}>
            Cancel
          </Button>
          <SaveButton status={saveStatus} onClick={handleSave} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default JobDetailsForm;

/**
 * Request ID: req_5e0ef31d50a1126f2ee12ecccbc4c996
 * 
 * 
 



Raw data from OpenAI: {
  id: 'chatcmpl-A4F9uI41pAh2kbztKEvnLWa27O99a',
  object: 'chat.completion',
  created: 1725574946,
  model: 'gpt-4o-mini-2024-07-18',
  choices: [
    {
      index: 0,
      message: [Object],
      logprobs: null,
      finish_reason: 'stop'
    }
  ],
  usage: { prompt_tokens: 521, completion_tokens: 266, total_tokens: 787 },
  system_fingerprint: 'fp_483d39d857'
}



Parsed response from OpenAI: ```json
{
    "companyName": "Google",
    "jobPosition": "Software Engineering Intern",
    "salary": "",
    "responsibilities": [
        "Create and support a productive and innovative team, including working with peers, managers, and teams.",
        "Develop scripts to automate routine tasks.",
        "Analyze information and evaluate results to choose the best solution to effectively solve problems.",
        "Apply knowledge gained in computer science courses to real-world problems."
    ],
    "preferredSkills": [
        "Experience working with web application development",
        "Unix/Linux environments",
        "Mobile application development",
        "Distributed and parallel systems",
        "Machine learning",
        "Information retrieval",
        "Natural language processing",
        "Networking",
        "Developing large software systems",
        "Security software development",
        "Experience with data structures or algorithms"
    ],
    "preferredQualifications": [
        "Currently enrolled in an Associate, Bachelor's, or Master's degree program",
        "Experience in software development",
        "Experience coding in one or more of C, C++, Java, JavaScript, Python, or similar",
        "Available to work full time for a minimum of 6 months outside of university term time",
        "Ability to communicate in English fluently to participate in complex technical discussions"
    ]
}
```
Job details in API endpoint: ```json
{
    "companyName": "Google",
    "jobPosition": "Software Engineering Intern",
    "salary": "",
    "responsibilities": [
        "Create and support a productive and innovative team, including working with peers, managers, and teams.",
        "Develop scripts to automate routine tasks.",
        "Analyze information and evaluate results to choose the best solution to effectively solve problems.",
        "Apply knowledge gained in computer science courses to real-world problems."
    ],
    "preferredSkills": [
        "Experience working with web application development",
        "Unix/Linux environments",
        "Mobile application development",
        "Distributed and parallel systems",
        "Machine learning",
        "Information retrieval",
        "Natural language processing",
        "Networking",
        "Developing large software systems",
        "Security software development",
        "Experience with data structures or algorithms"
    ],
    "preferredQualifications": [
        "Currently enrolled in an Associate, Bachelor's, or Master's degree program",
        "Experience in software development",
        "Experience coding in one or more of C, C++, Java, JavaScript, Python, or similar",
        "Available to work full time for a minimum of 6 months outside of university term time",
        "Ability to communicate in English fluently to participate in complex technical discussions"
    ]
}
```
 POST /api/parse-job 200 in 5389ms
 * 
 * 
 * 
 * 
 * 
 */
