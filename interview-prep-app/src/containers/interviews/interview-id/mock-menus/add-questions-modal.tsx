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
import { useCardStore } from "@/_store";
import { useMockTemplateStore } from "@/_store/mock-store";
import SelectedCard from "./selected-card"; // Import SelectedCard component
import { putMockTemplate } from "@/utils/fetch";

interface AddQuestionsModalProps {
  mockTemplateId: string;
}

const AddQuestionsModal = ({ mockTemplateId }: AddQuestionsModalProps) => {
  const [selectedCardsByDeck, setSelectedCardsByDeck] = useState<
    Record<string, Record<string, boolean>>
  >({});

  const cards = useCardStore((state) => state.cards);
  const { mockTemplates, updateMockTemplate, addMockTemplateCard } =
    useMockTemplateStore((state) => ({
      mockTemplates: state.mockTemplates,
      updateMockTemplate: state.updateMockTemplate,
      addMockTemplateCard: state.addMockTemplateCard,
    }));

  // Get Current mock template data from the store
  const mockTemplate = mockTemplates[mockTemplateId];

  const selectedQuestions = Object.entries(selectedCardsByDeck).flatMap(
    ([deckId, cardSelections]) =>
      Object.entries(cardSelections)
        .filter(([_, isSelected]) => isSelected)
        .map(([cardId]) => cards[cardId])
  );

  const handleAddQuestions = async () => {
    try {
      // Extract the card IDs from the selected questions
      const cardIds = selectedQuestions.map((question) => question.id);
      console.log("Selected Card IDs:", cardIds);

      // Call the API to update the mock template with the selected questions
      const response = await putMockTemplate(
        mockTemplate.title,
        mockTemplate.type,
        mockTemplate.description,
        mockTemplateId, // Use the current mockTemplateId
        cardIds // Pass the selected card IDs
      );

      if (response.status === 200) {
        console.log("Successfully added questions to mock template.");
        // Update the mock template in the store
        updateMockTemplate(mockTemplateId, response.template);

        // Loop through the selected card IDs and add each one to the mockTemplateCards
        cardIds.forEach((cardId) => {
          addMockTemplateCard({
            cardId,
            templateId: mockTemplateId,
          });
        });
      }
    } catch (error) {
      console.log("Error adding questions to mock interview.", error);
    }

    // Reset the selected cards after adding questions
    setSelectedCardsByDeck({});
  };

  const handleClose = () => {
    setSelectedCardsByDeck({});
  };

  return (
    <Dialog onOpenChange={handleClose}>
      <DialogTrigger asChild>
        <Button variant='outline'>Add Questions</Button>
      </DialogTrigger>
      <DialogContent className='w-[800px]'>
        <DialogHeader>
          <DialogTitle>Select Questions to Add</DialogTitle>
          <DialogDescription>
            Choose the questions from your decks to add to this mock interview.
          </DialogDescription>
        </DialogHeader>
        <div className='flex gap-4'>
          {/* Select Questions Section */}
          <div className='w-1/2'>
            <SelectQuestions
              selectedCardsByDeck={selectedCardsByDeck}
              setSelectedCardsByDeck={setSelectedCardsByDeck}
            />
          </div>

          {/* Selected Questions Section */}
          <div className='w-1/2 bg-gray-100 p-4 rounded-md'>
            <h3 className='text-lg font-semibold'>Selected Questions</h3>
            <ul className='space-y-4'>
              {selectedQuestions.length > 0 ? (
                selectedQuestions.map((question) => (
                  <li key={question.id}>
                    <SelectedCard card={question} />
                  </li>
                ))
              ) : (
                <p className='text-sm text-muted-foreground'>
                  No questions selected yet.
                </p>
              )}
            </ul>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleAddQuestions}>Add Selected Questions</Button>
          <DialogClose asChild onClick={handleClose}>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddQuestionsModal;
