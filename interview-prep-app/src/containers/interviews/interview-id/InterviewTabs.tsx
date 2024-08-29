import React, { useState } from "react";
import "../../../styles/interviews/interview-tabs.css";
interface InterviewTabsProps {
  jobDetails: React.ReactNode;
  mockTemplates: { id: string; title: string; content: React.ReactNode }[];
  onAddTemplate: () => void;
}

const InterviewTabs = ({
  jobDetails,
  mockTemplates,
  onAddTemplate,
}: InterviewTabsProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
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
        {mockTemplates.map((template, index) => (
          <button
            key={template.id}
            className={`tab ${activeTab === index + 1 ? "active" : ""}`}
            onClick={() => handleTabClick(index + 1)}
          >
            {template.title}
          </button>
        ))}
        <button className='tab add-template' onClick={onAddTemplate}>
          + Add Template
        </button>
      </div>
      <div className='tab-content'>
        {activeTab === 0 ? jobDetails : mockTemplates[activeTab - 1]?.content}
      </div>
    </div>
  );
};

export default InterviewTabs;
