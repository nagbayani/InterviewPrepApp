import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface JobDetailsFormProps {
  interview: InterviewData;
}

const JobDetailsForm = ({ interview }: JobDetailsFormProps) => {
  const [company, setCompany] = useState(interview.company);
  const [jobPosition, setJobPosition] = useState(interview.jobPosition);
  const [expectedSalary, setExpectedSalary] = useState(
    interview.expectedSalary
  );
  const [jobDescription, setJobDescription] = useState(
    interview.jobDescription
  );

  const handleSave = async () => {
    try {
      // Logic to save job details
      console.log("Saving job details");
    } catch (error) {
      console.error("Error saving job details:", error);
    }
  };

  return (
    <Card className='w-full max-w-lg'>
      <CardHeader>
        <CardTitle>Edit Job Details</CardTitle>
        <CardDescription>Update the details of your interview</CardDescription>
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
        <Button variant='outline' onClick={() => console.log("Cancel")}>
          Cancel
        </Button>
        <Button onClick={handleSave}>Save Changes</Button>
      </CardFooter>
    </Card>
  );
};

export default JobDetailsForm;
