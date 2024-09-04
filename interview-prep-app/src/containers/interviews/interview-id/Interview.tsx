"use client";
import React from "react";
import InterviewTabs from "./InterviewTabs";
import JobDetailsForm from "./JobDetailsForm";
import MockTemplate from "./MockTemplate";
import { useInterviewStore } from "@/_store/interviews-store";
import { InterviewData, MockTemplateData } from "@/types/data-types";

interface InterviewPageProps {
  interview: InterviewData;
  mockTemplates: MockTemplateData[] | null;
}

const Interview = ({ interview, mockTemplates }: InterviewPageProps) => {
  // Access the interviews data from Zustand store
  const { interviews: interviewsData } = useInterviewStore((state) => ({
    interviews: state.interviews,
  }));

  // adding a new mock interview template
  const handleAddTemplate = () => {
    console.log("Add a new mock interview template");
    // Logic to add a new mock template
  };

  // Retrieve the current mock templates from the Zustand store for the given interview ID
  const currentMockTemplates =
    interviewsData[interview.id]?.mockTemplates ?? [];

  return (
    <div className='interview-page-container'>
      <InterviewTabs
        jobDetails={<JobDetailsForm interview={interview} />}
        // Dynamically map through the mock templates to pass to the InterviewTabs
        mockTemplates={
          currentMockTemplates.length > 0
            ? currentMockTemplates.map((template) => ({
                id: template.id,
                title: template.title,
                content: <MockTemplate template={template} />,
              }))
            : null
        }
        onAddTemplate={handleAddTemplate} // Trigger for adding a new template
        interview={interviewsData[interview.id]} // Pass the interview data to InterviewTabs
      />
    </div>
  );
};

export default Interview;
