import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SelectMockType from "./select-mock-type";
import { postMockTemplate } from "@/utils/fetch";
import { useMockTemplateStore } from "@/_store/mock-store";
import { useInterviewStore } from "@/_store/interviews-store";
import { MockTemplateData } from "@/types/data-types";

interface AddMockMenuProps {
  company: string;
  interviewId: string;
}

const AddMockMenu = ({ company, interviewId }: AddMockMenuProps) => {
  const [mockTitle, setMockTitle] = useState("");
  const [selectedMockType, setSelectedMockType] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");

  const { mockTemplates: mockTemplateData, addMockTemplate } =
    useMockTemplateStore((state) => ({
      mockTemplates: state.mockTemplates,
      addMockTemplate: state.addMockTemplate,
    }));

  const { updateInterview } = useInterviewStore((state) => ({
    updateInterview: state.updateInterview,
  }));
  useEffect(() => {
    if (selectedMockType) {
      setMockTitle(`${company} ${selectedMockType}`);
    }
  }, [selectedMockType, company]);

  const handleAddMock = async () => {
    try {
      const response = await postMockTemplate(
        mockTitle,
        selectedMockType,
        selectedDescription,
        interviewId
      );

      if (response?.status === 200) {
        console.log("Mock Interview Added:", {
          title: mockTitle,
          description: selectedDescription,
          type: selectedMockType,
        });

        const newMockTemplate: MockTemplateData = {
          id: response.template.id,
          title: response.template.title,
          description: response.template.description,
          type: response.template.type,
          interviewId: response.template.interviewId,
          cards: [],
        };
        // Add mock template to Zustand store
        addMockTemplate(newMockTemplate);

        // Get the current interview (assuming interviewId is available in your component)
        const interviewId = newMockTemplate.interviewId; // Replace with actual interviewId if needed

        // Retrieve the current interview from the store
        const interview = useInterviewStore.getState().interviews[interviewId];
        console.log("Interview,", interview);

        // Update the interview with the new mock template
        updateInterview(interviewId, {
          mockTemplates: [...(interview.mockTemplates || []), newMockTemplate],
        });

        console.log("Mock Interview Added:", response.template);
      }
    } catch (error) {
      console.log(
        error,
        "Something went wrong with adding the mock interview."
      );
    }

    setMockTitle("");
    setSelectedMockType("");
    setSelectedDescription("");
  };

  const handleClose = () => {
    setMockTitle("");
    setSelectedMockType("");
    setSelectedDescription("");
  };

  return (
    <Dialog onOpenChange={handleClose}>
      <DialogTrigger asChild>
        <Button variant='outline'>+ Mock Interview</Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Add Mock Interview</DialogTitle>
          <DialogDescription>
            Fill out the form below to add a new mock interview.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div>
            <label htmlFor='mock-type' className='block text-sm font-medium'>
              Interview Type
            </label>
            <SelectMockType
              onTypeChange={setSelectedMockType}
              onDescriptionChange={setSelectedDescription}
              value={selectedMockType}
            />
          </div>
          <div>
            <label htmlFor='mock-title' className='block text-sm font-medium'>
              Mock Interview Title
            </label>
            <Input
              id='mock-title'
              placeholder='Enter the mock interview title'
              value={mockTitle}
              onChange={(e) => setMockTitle(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor='mock-description'
              className='block text-sm font-medium'
            >
              Description
            </label>
            <div
              id='mock-description'
              className='text-sm text-muted-foreground'
            >
              {selectedDescription || "No interview type selected."}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleAddMock}>Add Interview</Button>
          <DialogClose asChild>
            <Button variant='outline' onClick={handleClose}>
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddMockMenu;
