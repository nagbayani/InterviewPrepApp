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
import { CardData } from "@/types/data-types";
import { useCardStore } from "@/_store/index";
interface AddCardModalProps {
  deckId: string;
}

export function AddCardModal({ deckId }: AddCardModalProps) {
  const [cardQuestion, setCardQuestion] = useState("");
  const { addCard } = useCardStore((state) => ({
    addCard: state.addCard,
  }));

  const handleSave = async () => {
    if (cardQuestion.trim() === "") {
      console.log("Card question is empty.");
      return;
    }

    try {
      const response = await fetch(`/api/cards`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: cardQuestion,
          answer: "",
          deckId: deckId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const newCard: CardData = data.card;

        // Add card to Zustand store
        addCard(newCard);

        // Clear the form fields after submission
        setCardQuestion("");
      }
    } catch (error) {
      console.error("Error adding card:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>
          <LuPlus />
          Add Card
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Card</DialogTitle>
          <DialogDescription>Add a new card to the deck</DialogDescription>
        </DialogHeader>
        <div className='grid items-center py-4'>
          <Label htmlFor='card-question'>Question</Label>
          <Input
            id='card-question'
            value={cardQuestion}
            onChange={(e) => setCardQuestion(e.target.value)}
          />
        </div>
        <Button onClick={handleSave}>Save Card</Button>
      </DialogContent>
      <DialogFooter></DialogFooter>
    </Dialog>
  );
}
