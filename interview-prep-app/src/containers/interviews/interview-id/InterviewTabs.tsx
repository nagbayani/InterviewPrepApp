import React, { useState } from "react";
import "../../../styles/interviews/interview-tabs.css";
import AddMockMenu from "@/containers/modal/interviews/add-mock-modal";
import { InterviewData } from "@/types/data-types";
import { useInterviewStore } from "@/_store/interviews-store";
import MockTemplate from "./MockTemplate";

interface InterviewTabsProps {
  jobDetails: React.ReactNode;
  interviewId: string;
}

const InterviewTabs = ({ jobDetails, interviewId }: InterviewTabsProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const interview = useInterviewStore((state) => state.interviews[interviewId]);

  // need to import Job Deatails
  const handleTabClick = (index: number) => {
    console.log("Tab clicked: ", index);
    setActiveTab(index);
  };

  return (
    <div className='interview-tabs-container'>
      <div className='tabs'>
        <button
          className={`tab ${activeTab === 0 ? "active" : ""}`}
          onClick={() => handleTabClick(0)}
        >
          Job Details
        </button>
        {interview.mockTemplates?.map((template, index) => (
          <span
            key={template.id}
            className={`tab ${activeTab === index + 1 ? "active" : ""}`}
            onClick={() => handleTabClick(index + 1)}
          >
            {template.title}
          </span>
        ))}

        <AddMockMenu interviewId={interview.id} company={interview.company} />
      </div>
      <div className='tab-content'>
        {activeTab === 0 ? (
          jobDetails
        ) : interview?.mockTemplates && interview.mockTemplates.length > 0 ? (
          <MockTemplate template={interview.mockTemplates[activeTab - 1]} />
        ) : (
          <div>No mock templates available.</div>
        )}
      </div>
    </div>
  );
};

export default InterviewTabs;
