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
import { CardData, TagData } from "@/types/data-types";
import { useCardStore, useTagStore } from "@/_store/index";
import Tag from "@/components/card/Tag";
import TagsPopover from "@/components/menus/card-tags/TagsPopover";
interface AddCardModalProps {
  deckId: string;
}

import AddCardTagsMenu from "@/components/menus/card-tags/AddCardTagsMenu";

export function AddCardModal({ deckId }: AddCardModalProps) {
  const [cardQuestion, setCardQuestion] = useState("");
  const [selectedTags, setSelectedTags] = useState<TagData[]>([]);

  const { addCard } = useCardStore((state) => ({
    addCard: state.addCard,
  }));

  const { tags } = useTagStore((state) => ({
    tags: state.tags,
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
      <DialogContent className='overflow-visible'>
        <DialogHeader>
          <DialogTitle>New Card</DialogTitle>
          <DialogDescription>Add a new card to the deck</DialogDescription>
        </DialogHeader>
        <div className='grid gap-2'>
          <div>
            <Label htmlFor='card-tag' className='my-1'>
              Tags
            </Label>
            {/* Render tags here */}
            <div className='flex flex-wrap gap-2 mb-2'>
              {selectedTags.map((tag) => (
                <Tag key={tag.id} tag={tag} />
              ))}
            </div>
            {/* New Popover Menu for Tags */}
            <AddCardTagsMenu onSelectTags={setSelectedTags} />
          </div>
          <div>
            <Label htmlFor='card-question' className='my-1'>
              Question
            </Label>
            <Input
              id='card-question'
              value={cardQuestion}
              onChange={(e) => setCardQuestion(e.target.value)}
              onClick={() => {
                console.log("clicked");
              }}
            />
          </div>
        </div>
        <Button onClick={handleSave}>Save Card</Button>
      </DialogContent>
      <DialogFooter></DialogFooter>
    </Dialog>
  );
}
