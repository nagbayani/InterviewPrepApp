"use client";
import React, { useEffect } from "react";
import { useInterviewStore } from "@/_store/interviews-store";
import { useMockTemplateStore } from "@/_store/mock-store";
import { MockTemplateData } from "@/types/data-types";
import { mockInterviewStages } from "@/lib/mock-type-stages";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddMockMenu from "../mock-form/add-mock-modal";
import MockLink from "./MockLink";

interface Props {
  interviewId: string;
}
const InterviewDashboard = ({ interviewId }: Props) => {
  const { interview } = useInterviewStore((state) => ({
    interview: state.interviews[interviewId],
  }));

  return (
    <Tabs defaultValue='job-overview' className='w-full  mx-auto p-6'>
      <TabsList className='grid grid-cols-2 mb-6'>
        <TabsTrigger value='job-overview'>Job Overview</TabsTrigger>
        <TabsTrigger value='interviews'>Interviews</TabsTrigger>
      </TabsList>
      <TabsContent value='job-overview'>
        <Card>
          <CardHeader>
            <CardTitle>Job Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <p>{interview.company}</p>
              <p>{interview.jobPosition}</p>
              <p>{interview.location}</p>
            </CardDescription>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value='interviews'>
        <Card>
          <CardHeader>
            <CardTitle>Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <AddMockMenu
                interviewId={interview.id}
                company={interview.company}
              />

              <div className='space-y-4 mt-8'>
                {/* This adds vertical spacing between MockLinks */}
                {interview.mockTemplates?.map((template, index) => (
                  <MockLink
                    key={template.id}
                    mockId={template.id}
                    path={`/interviews/mocks/${template.id}`}
                  />
                ))}
              </div>
            </CardDescription>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default InterviewDashboard;
