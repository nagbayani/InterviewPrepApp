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
import { LuPlus } from "react-icons/lu";
import { MockTemplateData } from "@/types/data-types";
import { useMockTemplateStore } from "@/_store/mock-store";

export function AddMockTemplateModal() {
  const [templateTitle, setTemplateTitle] = useState("");
  const [templateDescription, setTemplateDescription] = useState("");
  const { addMockTemplate } = useMockTemplateStore((state) => ({
    addMockTemplate: state.addMockTemplate,
  }));

  const handleSave = async () => {
    if (templateTitle.trim() === "") {
      console.log("Template title is empty.");
      return;
    }

    try {
      const response = await fetch(`/api/mock-templates`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: templateTitle,
          description: templateDescription,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const newMockTemplate: MockTemplateData = data.mockTemplate;

        // Add mock template to Zustand store
        addMockTemplate(newMockTemplate);

        // Clear the form fields after submission
        setTemplateTitle("");
        setTemplateDescription("");
      }
    } catch (error) {
      console.error("Error adding mock template:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>
          <LuPlus /> Add Mock Template
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Create new mock template</DialogTitle>
          <DialogDescription>
            Don&apos;t forget to add a description to your mock template. It can
            help with AI-generation results.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='template-title' className='text-right'>
              Title
            </Label>
            <Input
              id='template-title'
              className='col-span-3'
              value={templateTitle}
              onChange={(e) => setTemplateTitle(e.target.value)}
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='template-description' className='text-right'>
              Description
            </Label>
            <Input
              id='template-description'
              className='col-span-3'
              value={templateDescription}
              onChange={(e) => setTemplateDescription(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type='submit' onClick={handleSave}>
            Save template
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
