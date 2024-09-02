"use client";
import React from "react";
import InterviewTabs from "./InterviewTabs";
import JobDetailsForm from "./JobDetailsForm"; // Create this component
import MockTemplate from "./MockTemplate"; // Create this component for each mock template
import { InterviewData, MockTemplateData } from "@/types/data-types";
interface InterviewPageProps {
  interview: InterviewData;
  mockTemplates: MockTemplateData[] | null;
}

const Interview = ({ interview, mockTemplates }: InterviewPageProps) => {
  const handleAddTemplate = () => {
    console.log("Add a new mock interview template");
    // Logic to add a new mock template
  };

  return (
    <div className='interview-page-container'>
      <InterviewTabs
        jobDetails={<JobDetailsForm interview={interview} />}
        mockTemplates={
          mockTemplates
            ? mockTemplates.map((template) => ({
                id: template.id,
                title: template.title,
                content: <MockTemplate template={template} />,
              }))
            : null
        }
        onAddTemplate={handleAddTemplate}
        interview={interview}
      />
    </div>
  );
};

export default Interview;
