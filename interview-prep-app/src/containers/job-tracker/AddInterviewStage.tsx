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
import { useInterviewStore } from "@/_store/interviews-store";
import { postInterviewStage } from "@/utils/fetch";

interface Props {
  interviewId: string;
}

const AddInterviewStage = ({ interviewId }: Props) => {
  // Get the interview data and updateInterview function from Zustand store
  const { interview, updateInterview } = useInterviewStore((state) => ({
    interview: state.interviews[interviewId],
    updateInterview: state.updateInterview,
  }));

  // Ensure interviewStages is not undefined and initialize it as an empty array if necessary
  const interviewStages = interview?.interviewStages || [];

  // Add a new interview stage
  const handleAddStage = async () => {
    try {
      const response = await postInterviewStage(interview.id);
      if (response?.status === 200) {
        console.log("Interview Stage Added:", { interviewId: interview.id });

        // Update Zustand store directly without needing local state
        const updatedStages = [...interviewStages, response.stage];
        updateInterview(interview.id, { interviewStages: updatedStages });
      }
    } catch (error) {
      console.error("Error adding interview stage:", error);
    }
  };

  // Remove an interview stage (for UI purposes)
  const handleRemoveStage = (index: number) => {
    const updatedStages = interviewStages.filter((_, i) => i !== index);
    updateInterview(interview.id, { interviewStages: updatedStages });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>+ Add Interview</Button>
      </DialogTrigger>
      <DialogContent className='max-w-[800px]'>
        <DialogHeader>
          <DialogTitle>Scheduled Interviews</DialogTitle>
        </DialogHeader>

        {/* Render the interview stages */}
        {interviewStages.length > 0 ? (
          interviewStages.map((stage, index) => (
            <InterviewStage
              key={index}
              index={index}
              onDelete={() => handleRemoveStage(index)}
              interviewId={interviewId}
              stage={stage} // Pass the stage data to InterviewStage component
            />
          ))
        ) : (
          <p>No interview stages added yet.</p>
        )}

        <Button variant='secondary' onClick={handleAddStage} className='mt-4'>
          + Add New Stage
        </Button>
      </DialogContent>
      <DialogFooter>{/* <Button type='submit'>Save</Button> */}</DialogFooter>
    </Dialog>
  );
};

export default AddInterviewStage;
