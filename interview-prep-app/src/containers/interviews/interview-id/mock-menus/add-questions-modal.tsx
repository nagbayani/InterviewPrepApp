import React, { useState } from "react";
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
import SelectQuestions from "./select-questions";

interface AddQuestionsModalProps {
  mockTemplateId: string;
  // onAddQuestions: (
  //   selectedCards: Record<string, Record<string, boolean>>
  // ) => void;
}

const AddQuestionsModal = ({
  mockTemplateId,
}: // onAddQuestions,
AddQuestionsModalProps) => {
  const [selectedCardsByDeck, setSelectedCardsByDeck] = useState<
    Record<string, Record<string, boolean>>
  >({});

  const handleAddQuestions = () => {
    // onAddQuestions(selectedCardsByDeck);
    setSelectedCardsByDeck({}); // Reset after adding
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant='outline'>Add Questions</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Questions to Add</DialogTitle>
          <DialogDescription>
            Choose the questions from your decks to add to this mock interview.
          </DialogDescription>
        </DialogHeader>
        <SelectQuestions
          selectedCardsByDeck={selectedCardsByDeck}
          setSelectedCardsByDeck={setSelectedCardsByDeck}
        />
        <DialogFooter>
          <Button onClick={handleAddQuestions}>Add Selected Questions</Button>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddQuestionsModal;
