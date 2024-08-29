"use client";

import React, { useState } from "react";
import "../../styles/interviews/interview-link.css";
import { usePathname } from "next/navigation";
import { useInterviewStore } from "@/_store/interviews-store";
import InterviewLinkMenu from "./InterviewLinkMenu";

interface InterviewLinkProps {
  id: string;
  company: string;
  path: string;
  description?: string;
  jobPosition: string;
}

const InterviewLink = ({
  id,
  company,
  path,
  description,
  jobPosition,
}: InterviewLinkProps) => {
  const {
    interviews: interviewsData,
    updateInterview,
    deleteInterview,
  } = useInterviewStore((state) => ({
    interviews: state.interviews,
    updateInterview: state.updateInterview,
    deleteInterview: state.deleteInterview,
  }));

  const pathname = usePathname();

  const [titleEditing, setTitleEdit] = useState(false);
  const [titleValue, setTitleValue] = useState(company);
  const [lastNonEmptyTitle, setLastNonEmptyTitle] = useState(company);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTitleValue(value);
    if (value.trim() !== "") {
      setLastNonEmptyTitle(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "Return") {
      e.preventDefault();
      handleInputBlur();
    }
  };

  const handleInputBlur = async () => {
    if (titleValue.trim() === "") {
      setTitleValue(lastNonEmptyTitle);
    } else {
      setLastNonEmptyTitle(titleValue);

      // Update the database
      try {
        const response = await fetch(`/api/interviews/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ interviewId: id, jobTitle: titleValue }),
        });

        if (response.ok) {
          updateInterview(id, { company: titleValue });
        }
      } catch (error) {
        // Revert to the last known good state
        setTitleValue(company);
        console.error(error);
        alert("Failed to update the title. Please try again.");
      }
    }

    setTitleEdit(false);
  };

  const handleDeleteInterview = async () => {
    try {
      const response = await fetch(`/api/interviews/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Remove the interview from Zustand store
        deleteInterview(id);
      } else {
        console.error("Failed to delete the interview.");
        alert("Failed to delete the interview. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting the interview:", error);
      alert("Error deleting the interview. Please try again.");
    }
  };

  return (
    <div
      className={`interviewlink-container ${
        pathname === path && "interviewlink-container"
      }`}
    >
      <div className='self-end'>
        <InterviewLinkMenu path={path} onDelete={handleDeleteInterview} />
      </div>
      <div className='flex gap-2 justify-between items-center'>
        <div className='flex gap-2 items-center'>
          <h1 id='interviewlink-title'>{company}</h1>
        </div>
      </div>

      <div className='interviewlink-description w-full h-full min-h-[100px]'>
        <p>{description}</p>
        <p>Position: {jobPosition}</p>
        {/* Add any other details you'd like to display */}
      </div>
    </div>
  );
};

export default InterviewLink;
