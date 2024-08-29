import React, { useState } from "react";
import { InterviewData } from "@/types/data-types";

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
    <div className='job-details-form'>
      <h2>Edit Job Details</h2>
      <div>
        <label>Company:</label>
        <input value={company} onChange={(e) => setCompany(e.target.value)} />
      </div>
      <div>
        <label>Job Position:</label>
        <input
          value={jobPosition}
          onChange={(e) => setJobPosition(e.target.value)}
        />
      </div>
      <div>
        <label>Expected Salary:</label>
        <input
          value={expectedSalary}
          onChange={(e) => setExpectedSalary(e.target.value)}
        />
      </div>
      <div>
        <label>Job Description:</label>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
      </div>
      <button onClick={handleSave}>Save Changes</button>
    </div>
  );
};

export default JobDetailsForm;
