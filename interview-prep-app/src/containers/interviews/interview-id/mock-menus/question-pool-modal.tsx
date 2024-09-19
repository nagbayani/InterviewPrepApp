import React from "react";
import { useMockTemplateStore } from "@/_store/mock-store";
import { useCardStore } from "@/_store";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import QuestionCard from "./question-pool-card";

interface QuestionPoolProps {
  mockTemplateId: string;
}

const QuestionPool = ({ mockTemplateId }: QuestionPoolProps) => {
  const { mockTemplateCards } = useMockTemplateStore((state) => ({
    mockTemplateCards: state.mockTemplateCards,
  }));

  const { cards } = useCardStore((state) => ({
    cards: state.cards,
  }));

  // Get the mockTemplateCards related to the specific mockTemplateId
  const templateCards = mockTemplateCards?.[mockTemplateId] || {};

  // Log for debugging
  console.log("Mock Template", mockTemplateCards);
  console.log(
    "Template Cards:",
    Object.values(templateCards).map(
      (templateCard) => cards[templateCard.cardId]
    )
  );
  // console.log("Cards in Store:", cards);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Question Pool</Button>
      </DialogTrigger>
      <DialogContent className='max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>A list of all questions for this interview.</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <ul>
          {Object.values(templateCards).length > 0 ? (
            Object.values(templateCards).map((templateCard) => {
              console.log("Template Card:", templateCard);
              console.log("Card ID:", templateCard.cardId);
              console.log(
                "Card based on Template Card:",
                cards?.[templateCard?.cardId]
              );
              const card = cards?.[templateCard?.cardId]; // Get the full card details using the cardId
              if (!card) {
                return <li key={templateCard.cardId}>Card not found</li>; // Handle case where card is undefined
              }
              return (
                <li key={card.id} className='my-4'>
                  <QuestionCard
                    key={card.id}
                    question={card}
                    mockTemplateId={mockTemplateId} // Pass the mockTemplateId for deletion
                  />
                </li>
              );
            })
          ) : (
            <li>No questions available.</li>
          )}
        </ul>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionPool;
