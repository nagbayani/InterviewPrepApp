import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useDeckStore } from "@/_store/index";
import gradients from "@/lib/colors/thumbnail-gradients"; // Ensure you have the correct path for gradients

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

  // Get the updateDeck function from the store
  const { updateDeck } = useDeckStore((state) => ({
    updateDeck: state.updateDeck,
  }));

  const handleSave = async () => {
    try {
      // Update the deck's thumbnail in the database
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

      // Update the thumbnail in Zustand store
      updateDeck(deckId, { thumbnail: selectedGradient });

      // Go back to the previous menu
      onBack();
    } catch (error) {
      console.error("Error updating the thumbnail:", error);
    }
  };

  return (
    <div>
      <h2>Edit Thumbnail</h2>
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
      <Button onClick={handleSave} variant='default'>
        Save
      </Button>
      <Button onClick={onBack} variant='outline' className='ml-2'>
        Back
      </Button>
    </div>
  );
}
