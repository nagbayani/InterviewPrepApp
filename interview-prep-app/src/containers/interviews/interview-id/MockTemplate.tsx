import React from "react";
import { MockTemplateData } from "@/types/data-types";
import { useMockTemplateStore } from "@/_store/mock-store";
import { Button } from "@/components/ui/button";
import { LuPlus } from "react-icons/lu";
import QuestionPool from "./mock-menus/question-pool-modal";
import AddQuestionsModal from "./mock-menus/add-questions-modal";
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
  return (
    <div className='mock-template'>
      <h2>{template.title}</h2>
      <p>{template.description}</p>
      <AddQuestionsModal mockTemplateId={template.id} />
      <Button variant='textIcon'>
        <LuPlus />
        AI Generate Questions
      </Button>
      <QuestionPool mockTemplateId={template.id} />
      {/* Display template details here */}
    </div>
  );
};

export default MockTemplate;
