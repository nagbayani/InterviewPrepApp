"use client";
import React, { useEffect } from "react";
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

  return (
    <div className='interview-page-container'>
      <InterviewTabs
        jobDetails={<JobDetailsForm interviewDb={interview} />}
        interviewId={interview.id} // Pass the interview ID to InterviewTabs
      />
    </div>
  );
};

export default Interview;
