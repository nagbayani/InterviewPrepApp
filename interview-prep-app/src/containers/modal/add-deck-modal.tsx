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
import { Textarea } from "@/components/ui/textarea";
import { LuPlus } from "react-icons/lu";
import { DeckData } from "@/types/data-types";
import { useDeckStore } from "@/_store/index";

export function AddDeckModal() {
  const [deckTitle, setDeckTitle] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const { addDeck } = useDeckStore((state) => ({
    addDeck: state.addDeck,
  }));

  const handleSave = async () => {
    if (deckTitle.trim() === "") {
      console.log("Deck title is empty.");
      return;
    }

    try {
      const response = await fetch(`/api/decks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: deckTitle,
          description: deckDescription,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const newDeck: DeckData = data.deck;

        // Add deck to Zustand store
        addDeck(newDeck);

        // Clear the form fields after submission
        setDeckTitle("");
        setDeckDescription("");
      }
    } catch (error) {
      console.error("Error adding deck:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>
          <LuPlus /> Add Deck
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Create new deck</DialogTitle>
          <DialogDescription>
            Add a new deck to your collection.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-8 py-4'>
          <div className='grid w-full gap-1.5'>
            <Label htmlFor='deck-title'>Title</Label>
            <Input
              id='deck-title'
              className='col-span-3'
              value={deckTitle}
              onChange={(e) => setDeckTitle(e.target.value)}
            />
          </div>
          {/* <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='deck-description' className='text-right'>
              Description
            </Label>
            <Input
              id='deck-description'
              className='col-span-3'
              value={deckDescription}
              onChange={(e) => setDeckDescription(e.target.value)}
            />
          </div> */}
          <div className='grid w-full gap-1.5'>
            <Label htmlFor='message-2'>Description</Label>
            <Textarea
              placeholder='Type your message here.'
              id='message-2'
              value={deckDescription}
              onChange={(e) => setDeckDescription(e.target.value)}
            />
            <p className='text-sm text-muted-foreground'>
              Adding a description to your deck can help with AI-generation
              results.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button type='submit' onClick={handleSave}>
            Save deck
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
