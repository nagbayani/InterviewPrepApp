import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { mockTypeList } from "@/lib/mock-type-list";
import ListItem from "@/components/ui/list-item";
import Mock from "../dashboard/Mock";
import MockFormContainer from "./MockFormContainer";
import useMockFormStore from "@/_store/mock-form-store";
import { mockInterviewLookup } from "@/lib/mock-interviews";

import { postMockTemplate } from "@/utils/fetch";
import { useMockTemplateStore } from "@/_store/mock-store";
import { useInterviewStore } from "@/_store/interviews-store";
import { MockTemplateData } from "@/types/data-types";

type IndustryKey = keyof typeof mockInterviewLookup; // Type for industry keys

// Component for showing interviews for the selected industry
function InterviewList({ interviews }: { interviews: any[] }) {
  return (
    <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {interviews.map((interview) => (
        <div key={interview.value} className='p-4 border rounded-md shadow-sm'>
          <h3 className='text-lg font-bold'>{interview.label}</h3>
          <p className='text-sm text-muted-foreground'>
            {interview.description}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function ChooseMockDetails() {
  const {
    step,
    increaseStep,
    decreaseStep,
    mockForm,
    setMockForm,
    resetMockForm,
  } = useMockFormStore((state) => state);
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryKey | null>(
    null
  ); // Use IndustryKey type
  const handleIndustryClick = (industry: IndustryKey) => {
    setSelectedIndustry(industry); // Set selected industry when a carousel item is clicked
  };
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
        {/* Add Carousel Here, each carousel item is an industry */}
        {/* Carousel for selecting Industry */}
        <h3 className='text-md font-bold mt-4'>Select Industry</h3>
        {/* <Carousel className='flex'> */}
        <div className='py-4'>
          <Carousel className='w-full max-w-4xl mx-auto'>
            <CarouselContent className='flex gap-1 -ml-1'>
              {Object.keys(mockInterviewLookup).map((key) => {
                const industryKey = key as IndustryKey;
                const industry = mockInterviewLookup[industryKey];
                const Icon = industry.icon;

                return (
                  <CarouselItem
                    key={industry.value}
                    className='cursor-pointer pl-0'
                    style={{
                      flexBasis: "auto",
                      flexGrow: 0,
                      flexShrink: 0,
                    }} // Set auto width based on content
                    onClick={() =>
                      handleIndustryClick(industryKey as IndustryKey)
                    }
                  >
                    <div
                      className={`flex justify-center text-center rounded-xl px-4 py-6 
                  ${
                    selectedIndustry === industryKey
                      ? "border-[#463eff] bg-[#fafbff] border-2"
                      : "border-transparent"
                  }
                   hover:bg-gray-300 hover:border-2`}
                    >
                      <Icon className='mr-2 w-6 h-6' /> {/* Icon Component */}
                      <h4 className='whitespace-nowrap'>{industry.label}</h4>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        {/* Render interviews for the selected industry */}
        {selectedIndustry && (
          <div>
            <InterviewList
              interviews={mockInterviewLookup[selectedIndustry].interviews}
            />
          </div>
        )}
      </div>
    </MockFormContainer>
  );
}
