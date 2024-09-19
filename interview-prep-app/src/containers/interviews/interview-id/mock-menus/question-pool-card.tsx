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

  const handleDelete = async () => {
    // Call the store method to delete the card from the mock template
    deleteMockTemplateCard(mockTemplateId, question.id);
  };

  return (
    <Card className=''>
      <CardContent className=' p-4 flex justify-between items-center'>
        <div>
          <h3 className='text-xl font-semibold'>{question.question}</h3>
        </div>
        <Button
          variant='destructive'
          size={"icon"}
          className=''
          onClick={handleDelete}
        >
          <LuTrash />
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
