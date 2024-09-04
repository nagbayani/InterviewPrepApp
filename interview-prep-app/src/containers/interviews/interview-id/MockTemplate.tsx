import React from "react";
import { MockTemplateData } from "@/types/data-types";
import { useMockTemplateStore } from "@/_store/mock-store";
import { Button } from "@/components/ui/button";
import { LuPlus } from "react-icons/lu";
import QuestionPool from "./mock-menus/question-pool-modal";
import AddQuestionsModal from "./mock-menus/add-questions-modal";
import MockCarousel from "./mock-menus/mock-carousel";
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
  const { mockTemplates, mockTemplateCards } = useMockTemplateStore(
    (state) => ({
      mockTemplates: state.mockTemplates,
      mockTemplateCards: state.mockTemplateCards,
    })
  );
  return (
    <div className='mock-template'>
      <h1 className='text-3xl'>{template.title}</h1>
      <p>{template.description}</p>
      <div className='flex gap-2'>
        <AddQuestionsModal mockTemplateId={template.id} />
        <Button variant='textIcon'>
          <LuPlus />
          AI Generate Questions
        </Button>
        <QuestionPool mockTemplateId={template.id} />
      </div>
      {/* Display Mock Carousel Here*/}
      <MockCarousel template={template} />
    </div>
  );
};

export default MockTemplate;
