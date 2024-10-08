import React, { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { mockTypeList } from "@/lib/mock-type-list";
import ListItem from "@/components/ui/list-item";
import Mock from "../dashboard/Mock";
import MockFormContainer from "./MockFormContainer";
import useMockFormStore from "@/_store/mock-form-store";

import { postMockTemplate } from "@/utils/fetch";
import { useMockTemplateStore } from "@/_store/mock-store";
import { useInterviewStore } from "@/_store/interviews-store";
import { MockTemplateData } from "@/types/data-types";

export default function ChooseMockDetails() {
  const {
    step,
    increaseStep,
    decreaseStep,
    mockForm,
    setMockForm,
    resetMockForm,
  } = useMockFormStore((state) => state);

  return (
    <MockFormContainer
      onNext={() => increaseStep(step)}
      onPreviousStep={() => decreaseStep(step)}
    >
      <div className='grid gap-4 py-4'>
        <div>
          <label htmlFor='mock-title' className='block text-sm font-medium'>
            Mock Interview Title
          </label>
          <Input
            id='mock-title'
            placeholder='Enter the mock interview title'
            value={mockForm.title}
            onChange={(e) => setMockForm({ title: e.target.value })}
          />
        </div>
        <div>
          <label
            htmlFor='mock-description'
            className='block text-sm font-medium'
          >
            Description
          </label>
          <div id='mock-description' className='text-sm text-muted-foreground'>
            {mockForm.description || "No interview type selected."}
          </div>
        </div>

        {/* Add interviewers Here */}
      </div>
    </MockFormContainer>
  );
}
