import React, { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { mockTypeList, MockTypeValue } from "@/lib/mock-type-list";
import ListItem from "@/components/ui/list-item";
import MockFormContainer from "./MockFormContainer";
import Mock from "../dashboard/Mock";
import useMockFormStore from "@/_store/mock-form-store";
import { mockInterviewStages } from "@/lib/mock-type-stages";

import { postMockTemplate } from "@/utils/fetch";
import { useMockTemplateStore } from "@/_store/mock-store";
import { useInterviewStore } from "@/_store/interviews-store";
import { MockTemplateData } from "@/types/data-types";

interface Props {
  interviewId: string;
  company: string;
}

export default function ChooseMockType({ interviewId, company }: Props) {
  const {
    step,
    increaseStep,
    decreaseStep,
    mockForm,
    setMockForm,
    resetMockForm,
    setStageQuestions,
  } = useMockFormStore((state) => state);

  const handleClose = () => {
    resetMockForm(); // Reset the form after adding a mock interview
  };

  const handleMockTypeSelection = (
    mockTypeValue: MockTypeValue,
    mockTypeLabel: string,
    mockTypeDescription: string
  ) => {
    setMockForm({
      type: mockTypeValue,
      description: mockTypeDescription,
      title: `${company} ${mockTypeLabel}`,
    });

    // Initialize the stages based on the chosen mock type
    const stagesForMockType =
      mockInterviewStages[mockTypeValue]?.map((stage) => ({
        stageLabel: stage.label,
        description: stage.description,
        questions: [], // Initialize the questions array as empty
      })) || [];

    setStageQuestions(stagesForMockType); // Set the stages in the store
  };

  return (
    <MockFormContainer onNext={() => increaseStep(1)}>
      <div className='grid gap-4 py-4'>
        <div>
          <label htmlFor='mock-type' className='block text-sm font-medium'>
            Interview Type
          </label>

          {mockTypeList.map((mockType) => (
            <ListItem
              key={mockType.value}
              label={mockType.label}
              description={mockType.description}
              // onClick={() =>
              //   setMockForm({
              //     type: mockType.value,
              //     description: mockType.description,
              //     title: `${company} ${mockType.label}`,
              //   })
              // }
              onClick={() =>
                handleMockTypeSelection(
                  mockType.value,
                  mockType.label,
                  mockType.description
                )
              }
              className={`cursor-pointer p-3 my-2 ${
                mockForm.type === mockType.value
                  ? "border-[#463eff] bg-[#fafbff] border-2"
                  : "border-transparent"
              }`}
            />
          ))}
        </div>
      </div>
    </MockFormContainer>
  );
}

/**
 *   const { mockTemplates: mockTemplateData, addMockTemplate } =
    useMockTemplateStore((state) => ({
      mockTemplates: state.mockTemplates,
      addMockTemplate: state.addMockTemplate,
    }));

  const { updateInterview } = useInterviewStore((state) => ({
    updateInterview: state.updateInterview,
  }));

  const handleAddMock = async () => {
    try {
      const response = await postMockTemplate(
        mockForm.title,
        mockForm.type,
        mockForm.description,
        interviewId
      );

      if (response?.status === 200) {
        const newMockTemplate: MockTemplateData = {
          id: response.template.id,
          title: response.template.title,
          description: response.template.description,
          type: response.template.type,
          interviewId: response.template.interviewId,
          cards: [],
        };
        // Add mock template to Zustand store
        addMockTemplate(newMockTemplate);

        // Get the current interview (assuming interviewId is available in your component)
        const interviewId = newMockTemplate.interviewId; // Replace with actual interviewId if needed

        // Retrieve the current interview from the store
        const interview = useInterviewStore.getState().interviews[interviewId];
        console.log("Interview,", interview);

        // Update the interview with the new mock template
        updateInterview(interviewId, {
          mockTemplates: [...(interview.mockTemplates || []), newMockTemplate],
        });

        console.log("Mock Interview Added:", response.template);
      }
    } catch (error) {
      console.log(
        error,
        "Something went wrong with adding the mock interview."
      );
    }
    resetMockForm(); // Reset the form after adding a mock interview
  };
 * 
 */
