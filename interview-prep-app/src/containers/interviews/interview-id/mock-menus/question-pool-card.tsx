import React from "react";
import { useMockTemplateStore } from "@/_store/mock-store";
import { CardData } from "@/types/data-types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LuTrash } from "react-icons/lu"; // Example icon for delete

interface QuestionCardProps {
  question: CardData;
  mockTemplateId: string;
}

const QuestionCard = ({ question, mockTemplateId }: QuestionCardProps) => {
  const { deleteMockTemplateCard } = useMockTemplateStore((state) => ({
    deleteMockTemplateCard: state.deleteMockTemplateCard,
  }));

  const handleDelete = () => {
    // Call the store method to delete the card from the mock template
    deleteMockTemplateCard(mockTemplateId, question.id);
  };

  return (
    <Card className='mb-4'>
      <CardContent className='flex justify-between items-center'>
        <div>
          <h3 className='text-xl font-semibold'>{question.question}</h3>
        </div>
        <Button variant='destructive' size={"icon"} onClick={handleDelete}>
          <LuTrash className='mr-2' />
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
