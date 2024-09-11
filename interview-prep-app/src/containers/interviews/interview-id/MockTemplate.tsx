import React from "react";
import { MockTemplateData } from "@/types/data-types";
import { useMockTemplateStore } from "@/_store/mock-store";
import { Button } from "@/components/ui/button";
import { LuPlus } from "react-icons/lu";
import QuestionPool from "./mock-menus/question-pool-modal";
import AddQuestionsModal from "./mock-menus/add-questions-modal";
import MockCarousel from "./mock-menus/mock-carousel";
import GenerateMockMenu from "./GenerateMockMenu";
interface MockTemplateProps {
  template: MockTemplateData;
}

/**
 * Title, Description, Type, Cards, InterviewId
 *
 * Question Pool
 * Question in Middle
 *
 * Up Down arrows
 *
 * Add Questions from Decks, OR Generate Random Questions
 *
 */
const MockTemplate = ({ template }: MockTemplateProps) => {
  const { mockTemplate, mockTemplates, mockTemplateCards } =
    useMockTemplateStore((state) => ({
      mockTemplate: state.mockTemplates[template.id],
      mockTemplates: state.mockTemplates,
      mockTemplateCards: state.mockTemplateCards,
    }));
  return (
    <div className='mock-template'>
      <h1 className='text-3xl'>{template.title}</h1>
      <p>{template.description}</p>
      <div className='flex flex-col items-center gap-10'>
        <div className='flex gap-2'>
          <AddQuestionsModal mockTemplateId={template.id} />
          {/* <Button variant='textIcon'>
            <LuPlus />
            AI Generate Questions
          </Button> */}
          <GenerateMockMenu
            mockId={template.id}
            interviewId={template.interviewId}
          />
          <QuestionPool mockTemplateId={template.id} />
        </div>
        {/* Display Mock Carousel Here*/}
        <MockCarousel template={template} />
      </div>
    </div>
  );
};

export default MockTemplate;
