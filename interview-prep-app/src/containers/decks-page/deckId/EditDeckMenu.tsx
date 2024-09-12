"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import DeckIcon from "../thumbnails/DeckIcon";
import { useDeckStore } from "@/_store/index";
import "../../../styles/deck/deck-wrapper.css";
import gradients from "@/lib/colors/thumbnail-gradients";

interface EditDeckMenuProps {
  deckId: string;
  title: string;
  description: string;
  thumbnail: string;
  onTitleChange: (newTitle: string) => void;
  onDescriptionChange: (newDescription: string) => void;
  onThumbnailChange: (newThumbnail: string) => void;
}

const EditDeckMenu = ({
  deckId,
  title,
  description,
  thumbnail,
  onTitleChange,
  onDescriptionChange,
  onThumbnailChange,
}: EditDeckMenuProps) => {
  const { updateDeck } = useDeckStore((state) => ({
    updateDeck: state.updateDeck,
  }));

  const [localTitle, setLocalTitle] = useState(title);
  const [localDescription, setLocalDescription] = useState(description);
  const [localThumbnail, setLocalThumbnail] = useState(thumbnail);

  // console.log("EditDeckMenu for DeckId:", deckId);

  const handleSave = async () => {
    if (localTitle.trim() === "") {
      console.error("Title cannot be empty");
      return;
    }
    try {
      const response = await fetch(`/api/decks/${deckId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          deckId: deckId,
          title: localTitle,
          description: localDescription,
          thumbnail: localThumbnail,
        }),
      });

      if (response.ok) {
        updateDeck(deckId, {
          title: localTitle,
          description: localDescription,
          thumbnail: localThumbnail,
        });
        onTitleChange(localTitle);
        onDescriptionChange(localDescription);
        onThumbnailChange(localThumbnail);
        console.log("Deck updated successfully");
      } else {
        console.error("Failed to update the deck");
      }
    } catch (error) {
      console.error("Error updating deck:", error);
    }
  };

  const getGradientStyle = (gradientName: string) => {
    const gradient = gradients.find((g) => g.name === gradientName);
    return gradient ? gradient.style : "none";
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='deck-wrapper-header cursor-pointer flex items-center'>
          <div
            className='w-[80px] h-[80px] rounded-[4px] border border-transparent hover:border-black'
            style={{ background: getGradientStyle(thumbnail) || "" }}
          />

          <div className='deck-title-wrap ml-0'>
            <h1 className='p-1 rounded-[4px] border border-transparent hover:border-black '>
              {title}
            </h1>
            <div className='p-1 rounded-[4px] deck-description border  border-transparent hover:border-black'>
              {description}
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Deck</DialogTitle>
          <DialogDescription>Update the deck details below.</DialogDescription>
        </DialogHeader>
        <div className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Thumbnail
            </label>
            <DeckIcon
              deckId={deckId}
              currentThumbnail={localThumbnail}
              onThumbnailChange={setLocalThumbnail} // Pass the handler to update thumbnail
              gradientStyle={
                localThumbnail || "linear-gradient(to right, #e66465, #9198e5)"
              }
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Title
            </label>
            <Input
              value={localTitle}
              onChange={(e) => setLocalTitle(e.target.value)}
              placeholder='Deck Title'
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Description
            </label>
            <Textarea
              placeholder='Type your message here.'
              id='message-2'
              value={localDescription}
              onChange={(e) => setLocalDescription(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditDeckMenu;
