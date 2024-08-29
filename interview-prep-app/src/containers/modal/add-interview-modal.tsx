import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LuPlus } from "react-icons/lu";
import { InterviewData } from "@/types/data-types";
import { useInterviewStore } from "@/_store/interviews-store";

export function AddInterviewModal() {
  const [jobTitle, setJobTitle] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const { addInterview } = useInterviewStore((state) => ({
    addInterview: state.addInterview,
  }));

  const handleSave = async () => {
    if (jobTitle.trim() === "" || jobPosition.trim() === "") {
      console.log("Job title or position is empty.");
      return;
    }

    try {
      const response = await fetch(`/api/interviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobTitle,
          jobPosition,
          expectedSalary,
          jobDescription,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const newInterview: InterviewData = data.interview;

        // Add interview to Zustand store
        addInterview(newInterview);

        // Clear the form fields after submission
        setJobTitle("");
        setJobPosition("");
        setExpectedSalary("");
        setJobDescription("");
      }
    } catch (error) {
      console.error("Error adding interview:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>
          <LuPlus /> Add Interview
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Create new interview</DialogTitle>
          <DialogDescription>
            Add a new job interview to your list.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-8 py-4'>
          <div className='grid w-full gap-1.5'>
            <Label htmlFor='job-title'>Job Title</Label>
            <Input
              id='job-title'
              className='col-span-3'
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
          </div>
          <div className='grid w-full gap-1.5'>
            <Label htmlFor='job-position'>Job Position</Label>
            <Input
              id='job-position'
              className='col-span-3'
              value={jobPosition}
              onChange={(e) => setJobPosition(e.target.value)}
            />
          </div>
          <div className='grid w-full gap-1.5'>
            <Label htmlFor='expected-salary'>Expected Salary</Label>
            <Input
              id='expected-salary'
              className='col-span-3'
              value={expectedSalary}
              onChange={(e) => setExpectedSalary(e.target.value)}
            />
          </div>
          <div className='grid w-full gap-1.5'>
            <Label htmlFor='job-description'>Job Description</Label>
            <Textarea
              placeholder='Type the job description here.'
              id='job-description'
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type='submit' onClick={handleSave}>
            Save interview
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
