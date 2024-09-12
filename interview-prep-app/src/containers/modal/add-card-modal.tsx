import { useState, useEffect } from "react";
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
import { CardData, TagData, CardTagData } from "@/types/data-types";
import { useCardStore, useTagStore, useDeckStore } from "@/_store/index";
import Tag from "@/components/card/Tag";
import AddCardTagsMenu from "@/components/menus/card-tags/AddCardTagsMenu";

interface AddCardModalProps {
  deckId: string;
}

export function AddCardModal({ deckId }: AddCardModalProps) {
  const [cardQuestion, setCardQuestion] = useState("");
  const [selectedTags, setSelectedTags] = useState<TagData[]>([]);

  const { addCard } = useCardStore((state) => ({
    addCard: state.addCard,
  }));

  const { addCardTag } = useTagStore((state) => ({
    addCardTag: state.addCardTag,
  }));

  // Access updateDeck action from deckStore
  const { updateDeck, decks } = useDeckStore((state) => ({
    updateDeck: state.updateDeck,
    decks: state.decks,
  }));

  const handleSave = async () => {
    // Check if card question is empty, return if it is
    if (cardQuestion.trim() === "") {
      console.log("Card question is empty.");
      return;
    }

    // Create new card
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
        console.log("New Card:", newCard);

        // Create card-tag relationships
        const cardTagPromises = selectedTags.map(async (tag) => {
          const responseTag = await fetch(`/api/cards/tags/card-tag`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              cardId: newCard.id,
              tagId: tag.id,
            }),
          });

          const cardTag: CardTagData = await responseTag.json();
          if (cardTag) {
            // Update Zustand store with new card-tag relationship
            console.log("CardTag added", cardTag);
          }
        });

        const completedTags = await Promise.all(cardTagPromises);

        if (completedTags) {
          selectedTags.map((tag) => {
            addCardTag({ cardId: newCard.id, tagId: tag.id });
          });
          // Add card to Zustand store
          addCard(newCard);
          // Update the deck's cards in the Zustand store
          const updatedDeck = {
            ...decks[deckId],
            cards: [...decks[deckId].cards, newCard],
          };
          updateDeck(deckId, updatedDeck);
        }

        // Clear the form fields after submission
        setCardQuestion("");
        setSelectedTags([]);
      }
    } catch (error) {
      console.error("Error adding card:", error);
    }
  };

  const handleClose = () => {
    setCardQuestion("");
    setSelectedTags([]);
  };

  // useEffect(() => {
  //   console.log("Selected Tags:", selectedTags);
  // }, [selectedTags]);

  return (
    <Dialog onOpenChange={(open) => !open && handleClose()}>
      <DialogTrigger asChild>
        <Button variant='outline'>
          <LuPlus />
          Add Card
        </Button>
      </DialogTrigger>
      <DialogContent className='overflow-visible max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>New Card</DialogTitle>
          <DialogDescription>Add a new card to the deck</DialogDescription>
        </DialogHeader>
        <div className='grid gap-2'>
          <div>
            {/* Render selected tags here */}
            <div className='flex gap-2 mb-2 items-center'>
              <Label htmlFor='card-tag' className='my-1'>
                Tags
              </Label>
              {/* New Popover Menu for Tags */}
              <AddCardTagsMenu onSelectTags={setSelectedTags} />
            </div>
            <div className='flex flex-wrap gap-2 mb-2'>
              {selectedTags.map((tag) => (
                <Tag key={tag.id} tag={tag} />
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor='card-question' className='my-1'>
              Question
            </Label>
            <Input
              id='card-question'
              value={cardQuestion}
              onChange={(e) => setCardQuestion(e.target.value)}
            />
          </div>
        </div>
        <Button onClick={handleSave}>Save Card</Button>
      </DialogContent>
      <DialogFooter></DialogFooter>
    </Dialog>
  );
}
