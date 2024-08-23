import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useDeckStore } from "@/_store/index";
import gradients from "@/lib/colors/thumbnail-gradients";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DeckIconProps {
  deckId: string;
  gradientStyle: string;
  currentThumbnail: string | null;
}

const DeckIcon: React.FC<DeckIconProps> = ({
  deckId,
  gradientStyle,
  currentThumbnail,
}) => {
  const [selectedGradient, setSelectedGradient] = useState<string | null>(
    currentThumbnail
  );

  const { updateDeck } = useDeckStore((state) => ({
    updateDeck: state.updateDeck,
  }));

  // Function to get the gradient style
  const getGradientStyle = (gradientName: string) => {
    const gradient = gradients.find((g) => g.name === gradientName);
    // console.log("Gradient", gradient);
    return gradient ? gradient.style : "none";
  };

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
    } catch (error) {
      console.error("Error updating the thumbnail:", error);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className='w-[80px] h-[80px] rounded-[4px] cursor-pointer'
          style={{ background: getGradientStyle(gradientStyle) }}
        />
      </PopoverTrigger>
      <PopoverContent className='w-[300px] overflow-scroll'>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>
            Choose a Thumbnail Gradient
          </label>
          <div className='flex gap-2 flex-wrap'>
            {gradients.map((gradient) => (
              <div
                key={gradient.name}
                onClick={() => setSelectedGradient(gradient.name)}
                className={`w-12 h-12 cursor-pointer hover:border-black hover:border-2 rounded-[4px] ${
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
};

export default DeckIcon;
