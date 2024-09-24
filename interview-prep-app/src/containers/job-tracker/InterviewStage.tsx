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
}: InterviewStageProps) => {
  const [selectedMockType, setSelectedMockType] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [formatType, setFormatType] = useState("");

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  return (
    <div className='border p-4 rounded-lg mb-4'>
      <h3 className='mb-2'>Stage {index + 1}</h3>
      <div className='grid grid-cols-3 gap-4'>
        <div className='flex flex-col'>
          <Label>Date</Label>
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
          <SelectMockType
            onTypeChange={setSelectedMockType}
            onDescriptionChange={setSelectedDescription}
            value={selectedMockType}
          />
        </div>
        <div className='flex flex-col mx-auto'>
          <Label>Format</Label>
          <Select onValueChange={setFormatType}>
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
      <Button
        variant='destructive'
        className='mt-4'
        size={"tag"}
        onClick={onDelete}
      >
        Remove Stage
      </Button>
    </div>
  );
};

export default InterviewStage;
