import React from "react";
import { MockTemplateData } from "@/types/data-types";

interface MockTemplateProps {
  template: MockTemplateData;
}

const MockTemplate = ({ template }: MockTemplateProps) => {
  return (
    <div className='mock-template'>
      <h2>{template.title}</h2>
      {/* Display template details here */}
    </div>
  );
};

export default MockTemplate;
