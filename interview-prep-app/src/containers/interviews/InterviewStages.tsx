"use client";
import React, { useEffect } from "react";
import { useInterviewStore } from "@/_store/interviews-store";
import { useMockTemplateStore } from "@/_store/mock-store";
import { MockTemplateData } from "@/types/data-types";
import { mockInterviewStages } from "@/lib/mock-type-stages";

interface Props {
  interviewId: string;
  template: MockTemplateData;
}
const InterviewStages = ({ template }: Props) => {
  

};

export default InterviewStages;
