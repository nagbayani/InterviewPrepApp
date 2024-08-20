import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useDeckStore } from "@/_store/index";
import gradients from "@/lib/colors/thumbnail-gradients";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface EditThumbnailMenuProps {
  deckId: string;
  currentThumbnail: string | null;
  onBack: () => void;
}

export default function EditThumbnailMenu({
  deckId,
  currentThumbnail,
  onBack,
}: EditThumbnailMenuProps) {
  const [selectedGradient, setSelectedGradient] = useState<string | null>(
    currentThumbnail
  );

  const { updateDeck } = useDeckStore((state) => ({
    updateDeck: state.updateDeck,
  }));

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/decks/${deckId}/thumbnail`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ thumbnail: selectedGradient }),
      });

      if (!response.ok) {
        throw new Error("Failed to update the thumbnail");
      }

      updateDeck(deckId, { thumbnail: selectedGradient });
      onBack();
    } catch (error) {
      console.error("Error updating the thumbnail:", error);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline'>Edit Thumbnail</Button>
      </PopoverTrigger>
      <PopoverContent className='w-[300px]'>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>
            Choose a Thumbnail Gradient
          </label>
          <div className='flex gap-2 flex-wrap'>
            {gradients.map((gradient) => (
              <div
                key={gradient.name}
                onClick={() => setSelectedGradient(gradient.name)}
                className={`w-24 h-24 cursor-pointer hover:border-black hover:border-2 rounded-[4px] ${
                  selectedGradient === gradient.name
                    ? "border-4 border-black"
                    : "border-2 border-transparent"
                }`}
                style={{
                  backgroundImage: gradient.style,
                }}
              ></div>
            ))}
          </div>
        </div>
        <Button onClick={handleSave} variant='default' className='mt-4'>
          Save
        </Button>
      </PopoverContent>
    </Popover>
  );
}
