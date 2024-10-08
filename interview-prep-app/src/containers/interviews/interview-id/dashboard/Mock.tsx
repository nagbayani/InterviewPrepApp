import React, { useState } from "react";
import { useMockTemplateStore } from "@/_store/mock-store";
import { useInterviewStore } from "@/_store/interviews-store";
import { mockInterviewStages } from "@/lib/mock-type-stages";

interface Props {
  interviewId: string;
  mockTemplateId: string;
}

// Type for valid mock interview types
type MockInterviewType = keyof typeof mockInterviewStages;

const Mock = ({ mockTemplateId }: Props) => {
  const { mockTemplate } = useMockTemplateStore((state) => ({
    mockTemplate: state.mockTemplates[mockTemplateId],
  }));
  // Access the mock templates type
  const interviewType = mockTemplate.type as MockInterviewType; // Cast type to ensure it's a valid key
  const interviewStages = mockInterviewStages[interviewType] || []; // Use default empty array if type not found

  // Iterate through mock interview stages to render them
  // use type to render mock interview stages
  return (
    <div>
      <h1>{mockTemplate.title}</h1>
      {interviewStages.length > 0 ? (
        interviewStages.map((stage, index) => (
          <div key={index}>
            <h2>{stage.label}</h2>
            <p>{stage.description}</p>
          </div>
        ))
      ) : (
        <p>No stages available for this mock type.</p>
      )}
    </div>
  );
};

export default Mock;
