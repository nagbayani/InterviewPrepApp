import React, { useState, useEffect } from "react";
import { useMockTemplateStore } from "@/_store/mock-store";
import { useCardStore } from "@/_store";
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
import { CardData } from "@/types/data-types"; // Ensure you import your CardData type

interface QuestionPoolProps {
  mockTemplateId: string;
}

const QuestionPool = ({ mockTemplateId }: QuestionPoolProps) => {
  const [questions, setQuestions] = useState<CardData[]>([]);
  const { mockTemplates, mockTemplateCards } = useMockTemplateStore(
    (state) => ({
      mockTemplates: state.mockTemplates,
      mockTemplateCards: state.mockTemplateCards,
    })
  );
  const { cards } = useCardStore((state) => ({
    cards: state.cards,
  }));

  useEffect(() => {
    // Access the mock template directly by its ID from the record
    const mockTemplate = mockTemplates[mockTemplateId];

    if (mockTemplate) {
      // Get the mockTemplateCards related to the specific mockTemplateId
      const templateCards = mockTemplateCards[mockTemplateId] || {};

      // Retrieve the full CardData for each cardId
      const cardsData = Object.values(templateCards)
        .map((templateCard) => cards[templateCard.cardId])
        .filter((card): card is CardData => !!card); // Filter out any undefined values

      setQuestions(cardsData);
    }
  }, [mockTemplateId, mockTemplates, mockTemplateCards, cards]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Question Pool</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>A list of all questions for this interview.</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <ul>
          {questions.map((question) => (
            <li key={question.id}>
              <strong>{question.question}</strong>
            </li>
          ))}
        </ul>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionPool;
