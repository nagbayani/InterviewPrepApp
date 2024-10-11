"use client";

import { useEffect } from "react";
import { mockInterviewStages } from "@/lib/mock-type-stages";
import MockOverview from "./MockOverview";
import MockSimulation from "./MockSimulation";
import useMockSimulationStore from "@/_store/mock-simulation/simulation-store";
import { useMockTemplateStore } from "@/_store/mock-store";

interface Props {
  mockTemplateId: string;
}

/**
 * 
 export interface MockTemplateData {
  id: string;
  title: string;
  description: string;
  type: string;
  cards: MockTemplateCardData[];
  interviewId: string;
  interviewStage?: InterviewStageData | null; // One-to-one relation with InterviewStage
}

export type MockTemplateCardData = {
  cardId: string;
  templateId: string;
  stage: string;
  order: number;
};
 */

const Mock = ({ mockTemplateId }: Props) => {
  const { isInterviewVisible, onStartInterview, setStages, stages } =
    useMockSimulationStore((state) => ({
      isInterviewVisible: state.isInterviewVisible,
      onStartInterview: state.onStartInterview,
      setStages: state.setStages,
      stages: state.stages,
    }));

  const { mockTemplate } = useMockTemplateStore((state) => ({
    mockTemplate: state.mockTemplates[mockTemplateId],
  }));

  const interviewType = mockTemplate.type as keyof typeof mockInterviewStages;

  // Logic to get stages when mockTemplateId is set
  useEffect(() => {
    // Fetch or get the mock interview stages

    const interviewStages = mockInterviewStages[interviewType] || [];

    // Map mockTemplate cards to their respective stages and questions
    const stagesWithQuestions = interviewStages.map((stage) => {
      // Get all cards belonging to this stage
      const stageQuestions = mockTemplate.cards
        .filter((card) => card.stage === stage.label)
        .map((card) => ({
          id: card.cardId,
          order: card.order,
        }))
        .sort((a, b) => a.order - b.order); // Sort questions by order
      console.log("Stage Questions", stageQuestions, "for stage:", stage);

      return {
        title: stage.label,
        description: stage.description,
        questions: stageQuestions,
      };
    });
    console.log("Mock Template cards", mockTemplate.cards);

    // Set the stages with questions in the mock simulation store
    setStages(stagesWithQuestions);
    console.log("Stages for Simulation:", stages);
  }, [mockTemplateId, setStages, mockTemplate]);

  return (
    <>
      {/* Conditional rendering: Show the Mock Overview or Simulation */}
      {!isInterviewVisible ? (
        <MockOverview mockTemplateId={mockTemplateId} />
      ) : (
        <MockSimulation mockTemplateId={mockTemplateId} />
      )}
    </>
  );
};

export default Mock;
