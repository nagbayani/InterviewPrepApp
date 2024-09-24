import React, { useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CalendarIcon } from "lucide-react";
import { useInterviewStore } from "@/_store/interviews-store";
import { InterviewData } from "@/types/data-types";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input"; // Import Input from ShadCN
import { Label } from "@/components/ui/label"; // Import Label from ShadCN
import { format, set } from "date-fns";

import { patchUpdateInterview } from "@/utils/fetch";

import AddInterviewStage from "./AddInterviewStage";

const statusOptions = [
  "Applying",
  "Applied",
  "Interviewing",
  "Negotiating",
  "Accepted",
  "I Withdrew",
  "Not Selected",
  "No Response",
];

const JobsTable = () => {
  // Get interviews data from Zustand store
  const { interviews: interviewsData, updateInterview } = useInterviewStore(
    (state) => ({
      interviews: state.interviews,
      updateInterview: state.updateInterview,
    })
  );
  // Local state to handle date selection for each interview
  const [selectedDateApplied, setSelectedDateApplied] = useState<Date | null>(
    null
  );
  const [selectedDateFollowUp, setSelectedDateFollowUp] = useState<Date | null>(
    null
  );
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  // State for managing editing mode for individual cells
  const [editingCell, setEditingCell] = useState<{
    rowId: string;
    field: string;
  } | null>(null);

  /**
   * For Date Applied Field: Update the date applied of an Job Application
   */
  const handleDateApplied = async (interviewId: string, date: Date) => {
    setSelectedDateApplied(date || null);

    try {
      const formattedDate = date.toISOString();
      const response = await patchUpdateInterview(interviewId, {
        dateApplied: formattedDate,
      });
      if (response.status === 200) {
        // Pass Date object directly
        updateInterview(interviewId, { dateApplied: formattedDate });
      }
    } catch (error) {}
  };

  /**
   * For Date Follow Up Field: Update the date of the Follow Up for an Job Application
   */
  const handleDateFollowUp = async (interviewId: string, date: Date) => {
    setSelectedDateFollowUp(date || null);

    try {
      const formattedDate = date.toISOString();
      const response = await patchUpdateInterview(interviewId, {
        dateFollowUp: formattedDate,
      });
      if (response.status === 200) {
        // Pass Date object directly
        updateInterview(interviewId, { dateFollowUp: formattedDate });
      }
    } catch (error) {}
  };

  /**
   * For Status Field: Update the status of an Job Application
   */
  const handleStatusChange = async (interviewId: string, newStatus: string) => {
    console.log("New Status:", newStatus);
    setSelectedStatus(newStatus);

    try {
      const response = await patchUpdateInterview(interviewId, {
        status: newStatus,
      });

      if (response.status === 200) {
        console.log("Interview Updated Successfully", response);
        updateInterview(interviewId, { status: newStatus });
        setSelectedStatus(null);
      }
    } catch (error) {
      console.error(error, "Something Went Wrong updating the interview.");
      alert("Failed to update the interview. Please try again.");
      setSelectedStatus(null);
    }

    // updateInterview(interviewId, { status: newStatus });
  };

  /**
   * Handles pressing Enter/Return to save the input.
   */
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: string,
    field: string
  ) => {
    if (e.key === "Enter") {
      handleSaveClick(id, field, e.currentTarget.value);
    }
  };

  const handleEditClick = (rowId: string, field: string) => {
    setEditingCell({ rowId, field });
  };

  const handleSaveClick = async (id: string, field: string, value: string) => {
    console.log("Id", id, "Field:", field, "Value:", value);
    // If the value is an empty string, default to "N/A"
    const finalValue = value.trim() === "" ? "N/A" : value;
    try {
      setEditingCell(null);
      const response = await patchUpdateInterview(id, { [field]: finalValue });
      if (response.status === 200) {
        console.log("Interview Updated Successfully", response);
        updateInterview(id, { [field]: finalValue });
      }
    } catch (error) {
      console.error(error, "Something Went Wrong updating the interview.");
      alert("Failed to update the interview. Please try again.");
    }
    // updateInterview(id, { [field]: value });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
    field: string
  ) => {
    updateInterview(id, { [field]: e.target.value });
  };

  return (
    <Table>
      <TableCaption>A list of your current job applications.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[200px]'>Job Position</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Salary</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Status</TableHead>
          {/* <TableHead>Date Saved</TableHead> */}
          <TableHead>Date Applied</TableHead>
          {/* <TableHead>Deadline</TableHead> */}
          {/* <TableHead>Follow Up</TableHead> */}
          <TableHead>Interview Stage</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.values(interviewsData).map((interview: InterviewData) => (
          <TableRow key={interview.id}>
            {/* Editable Job Position */}
            <TableCell className='font-medium min-w-[180px]'>
              {editingCell?.rowId === interview.id &&
              editingCell?.field === "jobPosition" ? (
                <Input
                  type='text'
                  value={interview.jobPosition || ""}
                  onChange={(e) =>
                    handleInputChange(e, interview.id, "jobPosition")
                  }
                  onBlur={() =>
                    handleSaveClick(
                      interview.id,
                      "jobPosition",
                      interview.jobPosition
                    )
                  }
                  onKeyDown={(e) =>
                    handleKeyDown(e, interview.id, "jobPosition")
                  }
                  className='w-full'
                />
              ) : (
                <Label
                  onClick={() => handleEditClick(interview.id, "jobPosition")}
                >
                  {interview.jobPosition}
                </Label>
              )}
            </TableCell>
            {/* Editable Company */}
            <TableCell className='min-w-[180px]'>
              {editingCell?.rowId === interview.id &&
              editingCell?.field === "company" ? (
                <Input
                  type='text'
                  value={interview.company || ""}
                  onChange={(e) =>
                    handleInputChange(e, interview.id, "company")
                  }
                  onBlur={() =>
                    handleSaveClick(interview.id, "company", interview.company)
                  }
                  onKeyDown={(e) => handleKeyDown(e, interview.id, "company")}
                  className='w-full'
                />
              ) : (
                <Label onClick={() => handleEditClick(interview.id, "company")}>
                  {interview.company}
                </Label>
              )}
            </TableCell>
            {/* Editable Salary */}
            <TableCell className='max-w-[100px]'>
              {editingCell?.rowId === interview.id &&
              editingCell?.field === "expectedSalary" ? (
                <Input
                  type='text'
                  value={interview.expectedSalary || ""}
                  onChange={(e) =>
                    handleInputChange(e, interview.id, "expectedSalary")
                  }
                  onBlur={() =>
                    handleSaveClick(
                      interview.id,
                      "expectedSalary",
                      interview.expectedSalary || "N/A"
                    )
                  }
                  onKeyDown={(e) =>
                    handleKeyDown(e, interview.id, "expectedSalary")
                  }
                  className='w-full'
                />
              ) : (
                <Label
                  onClick={() =>
                    handleEditClick(interview.id, "expectedSalary")
                  }
                >
                  {interview.expectedSalary
                    ? `$${interview.expectedSalary}`
                    : "N/A"}
                </Label>
              )}
            </TableCell>
            {/* Editable Location */}
            <TableCell className='min-w-[180px]'>
              {editingCell?.rowId === interview.id &&
              editingCell?.field === "location" ? (
                <Input
                  type='text'
                  value={interview.location || ""}
                  onChange={(e) =>
                    handleInputChange(e, interview.id, "location")
                  }
                  onBlur={() =>
                    handleSaveClick(
                      interview.id,
                      "location",
                      interview.location || "N/A"
                    )
                  }
                  onKeyDown={(e) => handleKeyDown(e, interview.id, "location")}
                  className='w-full '
                />
              ) : (
                <Label
                  onClick={() => handleEditClick(interview.id, "location")}
                >
                  {interview.location || "N/A"}
                </Label>
              )}
            </TableCell>
            {/* Status Dropdown Select */}
            <TableCell className='mr-16'>
              <Select
                onValueChange={(newStatus) =>
                  handleStatusChange(interview.id, newStatus)
                }
                defaultValue={interview.status || "Applying"}
              >
                <SelectTrigger className='w-[150px]'>
                  <SelectValue placeholder='Select Status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </TableCell>
            {/* <TableCell>
              {" "}
              {interview.createdAt
                ? format(new Date(interview.createdAt), "MM/dd/yyyy")
                : "N/A"}
            </TableCell> */}
            {/* <TableCell>{interview.deadline || "N/A"}</TableCell> */}
            {/* Date Applied Popover */}
            <TableCell>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant={"outline"} className='w-[150px]'>
                    {selectedDateApplied
                      ? format(selectedDateApplied, "MM/dd/yyyy")
                      : interview.dateApplied
                      ? format(new Date(interview.dateApplied), "MM/dd/yyyy")
                      : "Pick a date"}
                    <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={selectedDateApplied || undefined}
                    onSelect={(date: Date | undefined) => {
                      setSelectedDateApplied(date || null);
                      if (date) {
                        handleDateApplied(interview.id, date);
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </TableCell>
            <TableCell>
              <AddInterviewStage interviewId={interview.id} />
            </TableCell>
            {/* Follow Up Date Popover */}
            {/* <TableCell>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant={"outline"} className='w-[150px]'>
                    {selectedDateFollowUp
                      ? format(selectedDateFollowUp, "MM/dd/yyyy")
                      : interview.dateFollowUp
                      ? format(new Date(interview.dateFollowUp), "MM/dd/yyyy")
                      : "Pick a date"}
                    <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={selectedDateFollowUp || undefined}
                    onSelect={(date) => {
                      setSelectedDateFollowUp(date || null);
                      if (date) {
                        handleDateFollowUp(interview.id, date);
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </TableCell> */}
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          {/* <TableCell colSpan={9}>End of Job Listings</TableCell> */}
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default JobsTable;
