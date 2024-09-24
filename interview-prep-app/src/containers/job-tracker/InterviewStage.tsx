import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import SelectMockType from "../modal/interviews/select-mock-type";
import { InterviewStageData } from "@/types/data-types";
import { postInterviewStageMock, patchInterviewStage } from "@/utils/fetch";
import { useInterviewStore } from "@/_store/interviews-store";
import { useMockTemplateStore } from "@/_store/mock-store";
import { useRouter } from "next/navigation"; // Import useRouter

interface InterviewStageProps {
  index: number;
  onDelete: () => void;
  interviewId: string;
  stage: InterviewStageData;
}

const InterviewStage = ({
  index,
  onDelete,
  interviewId,
  stage,
}: InterviewStageProps) => {
  const [selectedMockType, setSelectedMockType] = useState<string>(
    stage.type || ""
  );
  const [selectedDescription, setSelectedDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    stage.stageDate ? new Date(stage.stageDate) : undefined
  );
  const [formatType, setFormatType] = useState<string>(stage.format || "");
  const [isSubmitted, setIsSubmitted] = useState(false); // Track if the user clicked "Practice"
  const [isClient, setIsClient] = useState(false); // Ensure router is used only client-side

  const { interview, updateInterview } = useInterviewStore((state) => ({
    interview: state.interviews[interviewId],
    updateInterview: state.updateInterview,
  }));

  const { addMockTemplate } = useMockTemplateStore((state) => ({
    addMockTemplate: state.addMockTemplate,
  }));

  // Only enable useRouter on client-side
  const router = useRouter();

  const handleUpdateStage = (updatedStage: InterviewStageData) => {
    const updatedStages = interview.interviewStages
      ? interview.interviewStages.map((stage) =>
          stage.id === updatedStage.id ? updatedStage : stage
        )
      : [updatedStage]; // If it's null, start with the updated stage

    updateInterview(interviewId, {
      interviewStages: updatedStages,
    });
  };

  const handleDateChange = async (date: Date | undefined) => {
    setSelectedDate(date);
    if (!date) return;
    try {
      const formattedDate = date.toISOString();
      const response = await patchInterviewStage(stage.id, {
        stageDate: formattedDate,
      });

      if (response.status === 200) {
        const updatedStage = response.interviewStage;

        handleUpdateStage(updatedStage);
      }
    } catch (error) {}
  };

  const handleFormatChange = async (newFormat: string) => {
    setFormatType(newFormat);
    try {
      const response = await patchInterviewStage(stage.id, {
        format: newFormat,
      });

      if (response.status === 200) {
        const updatedStage = response.interviewStage;

        handleUpdateStage(updatedStage);
      }
    } catch (error) {
      console.error("Error updating format:", error);
    }
  };

  const handleMockTypeChange = async (
    newMockType: string,
    newDescription: string
  ) => {
    setSelectedMockType(newMockType);
    setSelectedDescription(newDescription);
    try {
      const response = await patchInterviewStage(stage.id, {
        type: newMockType,
      });

      if (response.status === 200) {
        const updatedStage = response.interviewStage;

        handleUpdateStage(updatedStage);
      }
    } catch (error) {
      console.error("Error updating mock type:", error);
    }
  };

  const handleLinkMockToStage = async () => {
    try {
      const response = await postInterviewStageMock(interviewId, {
        interviewStageId: stage.id,
        title: selectedMockType,
        type: selectedMockType,
        description: selectedDescription,
      });
      if (response?.status === 201) {
        console.log("Mock Added:", response.template);
        const newMockTemplate = response.template;
        const updatedStage = response.interviewStage;

        // Ensure interviewStages is initialized as an array if it's null
        const updatedStages = interview.interviewStages
          ? [...interview.interviewStages, updatedStage]
          : [updatedStage]; // If interviewStages is null, start with the new stage

        const updatedMocks = interview.mockTemplates
          ? [...interview.mockTemplates, newMockTemplate]
          : [newMockTemplate];

        // Update the Zustand store with the updated interview stages
        updateInterview(interviewId, {
          interviewStages: updatedStages,
          mockTemplates: updatedMocks,
        });

        addMockTemplate(newMockTemplate); // Add the new mock template to the store

        console.log("Updated Interview Stages:", interview.interviewStages);
      }
    } catch (error) {
      console.error("Error adding mock:", error);
    }
  };

  const handlePractice = async () => {
    setIsSubmitted(true); // Mark as submitted when the "Practice" button is clicked

    if (!selectedDate || !formatType || !selectedMockType) {
      // If any field is missing, the user is prompted to fill them in
      return;
    }

    if (!stage.mockTemplateId) {
      console.log("No mock template linked to stage yet");
      await handleLinkMockToStage();
    }

    router?.push(`/interviews/${interviewId}`);

    // find out if interview stage has a mock template linked to it
  };

  return (
    <div className='border p-4 rounded-lg mb-4'>
      <div className='flex justify-between items-center mb-4'>
        <h3>Stage {index + 1}</h3>
        <Button variant={"destructive"} size={"sm"} className='ml-auto'>
          x
        </Button>
      </div>
      <div className='grid grid-cols-3 gap-4'>
        <div className='flex flex-col'>
          <Label>Date</Label>
          {isSubmitted && !selectedDate && (
            <span className='text-red-500 text-xs ml-2'>
              Please select a date
            </span>
          )}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant='outline' className='m-1'>
                {selectedDate
                  ? format(selectedDate, "MM/dd/yyyy")
                  : "Pick a date"}
                <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto m-0'>
              <Calendar
                mode='single'
                selected={selectedDate || undefined}
                onSelect={handleDateChange}
                className='!m-0 p-0'
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className='flex flex-col mx-auto'>
          <Label>Type</Label>
          {isSubmitted && !selectedMockType && (
            <span className='text-red-500 text-xs ml-2'>
              Please select a type
            </span>
          )}
          <SelectMockType
            onTypeChange={(newMockType) =>
              handleMockTypeChange(newMockType, selectedDescription)
            }
            onDescriptionChange={setSelectedDescription}
            value={selectedMockType}
          />
        </div>
        <div className='flex flex-col mx-auto'>
          <Label>Format</Label>
          {isSubmitted && !formatType && (
            <span className='text-red-500 text-xs ml-2'>
              Please select a format
            </span>
          )}
          <Select onValueChange={handleFormatChange} value={formatType}>
            <SelectTrigger className='m-1'>
              <SelectValue placeholder='Select format' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='video'>Video</SelectItem>
                <SelectItem value='phone'>Phone</SelectItem>
                <SelectItem value='in-person'>In-person</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* <Button
        variant='destructive'
        className='mt-4'
        size={"tag"}
        onClick={onDelete}
      >
        Remove Stage
      </Button> */}
      <div className='flex justify-end mt-4'>
        <Button onClick={handlePractice}>
          <span>Practice</span>
        </Button>
      </div>
    </div>
  );
};

export default InterviewStage;
