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

/**
 * Add Deck Modal Component
 * @param param0
 * @returns
 */
export function AddDeckModal({
  onSubmit,
}: {
  onSubmit: (title: string, description: string) => void;
}) {
  const [deckTitle, setDeckTitle] = useState("");
  const [deckDescription, setDeckDescription] = useState("");

  const handleSave = () => {
    onSubmit(deckTitle, deckDescription);
    setDeckTitle("");
    setDeckDescription("");
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
            Don't forget to add a description to your deck. It can help with
            AI-generation results.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='deck-title' className='text-right'>
              Title
            </Label>
            <Input id='deck-title' className='col-span-3' />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='deck-description' className='text-right'>
              Description
            </Label>
            <Input
              id='deck-description'
              className='col-span-3'
              value={deckDescription}
              onChange={(e) => setDeckDescription(e.target.value)}
            />
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
