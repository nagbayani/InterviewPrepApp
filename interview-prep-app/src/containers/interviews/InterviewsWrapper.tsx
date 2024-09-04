"use client";

import React, { useState, useEffect } from "react";
import { useInterviewStore } from "@/_store/interviews-store";
import { Button, buttonVariants } from "@/components/ui/button";
import { InterviewData } from "@/types/data-types";
import InterviewLink from "./InterviewLink";
import "../../styles/interviews/interviews-wrapper.css";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { AddInterviewModal } from "../modal/interviews/add-interview-modal";

interface Props {
  interviews: InterviewData[];
}

const InterviewsWrapper = ({ interviews }: { interviews: any }) => {
  // Zustand store:  State Management for Interviews
  const { interviews: interviewsData, setInterviews } = useInterviewStore(
    (state) => ({
      interviews: state.interviews,
      addInterview: state.addInterview,
      setInterviews: state.setInterviews,
    })
  );

  const [loading, setLoading] = useState(false);

  // Update Zustand store with interview data from database
  useEffect(() => {
    setInterviews(interviews);
    console.log("Interviews in InterviewsWrapper: ", interviewsData);
  }, [interviews, setInterviews]);

  return (
    <section className='interview-wrapper-container h-100vh overflow-x-scroll'>
      <h1 style={{ fontSize: "var(--step-2)" }}>Interviews</h1>

      <div className='flex justify-center gap-4'>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className='w-[250px] rounded-md m-auto text-center place-self-center bg-[#642eff] px-0 py-2 hover:bg-black text-white transition-colors duration-300 ease-in-out flex items-center justify-center'>
              Filter
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => console.log("Send")}>
              Send
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Add Interview Button Menu */}
        <AddInterviewModal />
      </div>

      <ul className='interviews-list gap-4 p-16'>
        {Object.values(interviewsData)
          .reverse()
          .map((interview: InterviewData) => (
            <li key={interview.id}>
              {/* Create an InterviewLink component similar to DeckLink */}
              <InterviewLink
                id={interview.id}
                company={interview.company}
                jobPosition={interview.jobPosition}
                path={`/interviews/${interview.id}`}
                description={interview.jobDescription || ""}
              />
            </li>
          ))}
      </ul>
    </section>
  );
};

export default InterviewsWrapper;
