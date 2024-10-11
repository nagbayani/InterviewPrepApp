"use client";
import React from "react";
import { useMockTemplateStore } from "@/_store/mock-store";
import { useInterviewStore } from "@/_store/interviews-store";
import { useCardStore } from "@/_store";
import { mockInterviewStages } from "@/lib/mock-type-stages";
import useMockSimulationStore from "@/_store/mock-simulation/simulation-store";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Props {
  mockTemplateId: string;
}

// Type for valid mock interview types
type MockInterviewType = keyof typeof mockInterviewStages;

const MockOverview = ({ mockTemplateId }: Props) => {
  const { mockTemplate } = useMockTemplateStore((state) => ({
    mockTemplate: state.mockTemplates[mockTemplateId],
  }));

  const { interview } = useInterviewStore((state) => ({
    interview: state.interviews[mockTemplate.interviewId],
  }));

  const { cards } = useCardStore((state) => ({
    cards: state.cards,
  }));

  const { onStartInterview } = useMockSimulationStore();

  const interviewType = mockTemplate.type as MockInterviewType;
  const interviewStages = mockInterviewStages[interviewType] || [];

  // Function to get card details for a stage
  const getQuestionsForStage = (stageLabel: string) => {
    return mockTemplate.cards
      ?.filter((mockCard) => mockCard.stage === stageLabel)
      .map((mockCard) => cards[mockCard.cardId])
      .filter((card) => card !== undefined);
  };

  return (
    <div className='flex flex-col flex-1 justify-center px-8 py-6 bg-white shadow-lg rounded-lg max-w-4xl mx-auto'>
      <div className='mb-6'>
        <h1 className='font-semibold text-3xl text-gray-800'>
          {mockTemplate.title}
        </h1>
        <p className='text-gray-600 mt-2 text-sm'>
          {interview.jobPosition} at {interview.company}
        </p>
      </div>

      <Accordion type='multiple' className='w-full space-y-4'>
        {interviewStages.map((stage, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>
              <div className='flex justify-between items-center w-full'>
                <div className='flex flex-col text-left'>
                  <h2 className='font-semibold text-2xl mb-1'>
                    {index + 1}. {stage.label}
                  </h2>
                  <p className='text-gray-600 text-sm'>{stage.description}</p>
                </div>
                <span className='bg-blue-100 text-blue-600 text-sm font-semibold px-3 py-1 mx-4 rounded-full'>
                  {getQuestionsForStage(stage.label).length} Questions
                </span>
              </div>
            </AccordionTrigger>

            <AccordionContent className='text-gray-700 mt-2'>
              <ul className='mt-4 space-y-2'>
                {getQuestionsForStage(stage.label).map((question, qIndex) => (
                  <li
                    key={qIndex}
                    className='text-gray-800 bg-gray-100 p-3 rounded-md shadow-sm'
                  >
                    {question.question}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className='mt-8 flex justify-end'>
        <button
          onClick={() => onStartInterview(true)} // Start interview on click
          className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md'
        >
          Start Mock Interview
        </button>
      </div>
    </div>
  );
};

export default MockOverview;
