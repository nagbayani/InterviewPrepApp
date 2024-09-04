import React, { useState } from "react";
import "../../../styles/interviews/interview-tabs.css";
import AddMockMenu from "@/containers/modal/interviews/add-mock-modal";
import { InterviewData } from "@/types/data-types";

interface InterviewTabsProps {
  jobDetails: React.ReactNode;
  mockTemplates:
    | { id: string; title: string; content: React.ReactNode }[]
    | null;
  onAddTemplate: () => void;
  interview: InterviewData;
}

const InterviewTabs = ({
  jobDetails,
  mockTemplates,
  onAddTemplate,
  interview,
}: InterviewTabsProps) => {
  const [activeTab, setActiveTab] = useState(0);

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
        {mockTemplates?.map((template, index) => (
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
        ) : mockTemplates && mockTemplates.length > 0 ? (
          mockTemplates[activeTab - 1]?.content
        ) : (
          <div>No mock templates available.</div>
        )}
      </div>
    </div>
  );
};

export default InterviewTabs;
