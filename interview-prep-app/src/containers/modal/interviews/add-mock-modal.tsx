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
