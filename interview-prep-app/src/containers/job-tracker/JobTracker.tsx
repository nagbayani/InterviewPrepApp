"use client";
import React from "react";
import JobsTable from "./JobsTable";
import { InterviewData } from "@/types/data-types";
import { useInterviewStore } from "@/_store/interviews-store";
import { Calendar } from "@/components/ui/calendar";

interface Props {
  interviews: InterviewData[];
}

const JobTracker = ({ interviews }: Props) => {
  // const [date, setDate] = React.useState<Date | undefined>(new Date());
  // console.log("date", date);

  // Zustand store:  State Management for Interviews

  return (
    <div>
      <h1 className='text-4xl'>Jobs Tracker</h1>
      <JobsTable />
    </div>
  );
};

export default JobTracker;

{
  /* <Calendar
  mode='single'
  selected={date}
  onSelect={setDate}
  className='rounded-md border'
/>
{date && <p>Selected Date: {date.toDateString()}</p>} */
}
