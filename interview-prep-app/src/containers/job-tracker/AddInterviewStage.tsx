import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import InterviewStage from "./InterviewStage";

const AddInterviewStage = () => {
  const [interviewStages, setInterviewStages] = useState<number[]>([]);

  const handleAddStage = () => {
    setInterviewStages([...interviewStages, interviewStages.length]);
  };

  const handleRemoveStage = (index: number) => {
    setInterviewStages((prevStages) =>
      prevStages.filter((_, i) => i !== index)
    );
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button>+ Add Interview</Button>
      </DialogTrigger>
      <DialogContent className='max-w-[800px]'>
        <DialogHeader>
          <DialogTitle>Scheduled Interviews</DialogTitle>
        </DialogHeader>

        {interviewStages.map((_, index) => (
          <InterviewStage
            key={index}
            index={index}
            onDelete={() => handleRemoveStage(index)}
          />
        ))}

        <Button variant='secondary' onClick={handleAddStage} className='mt-4'>
          + Add New Stage
        </Button>
      </DialogContent>
      <DialogFooter>{/* <Button type='submit'>Save</Button> */}</DialogFooter>
    </Dialog>
  );
};

export default AddInterviewStage;
