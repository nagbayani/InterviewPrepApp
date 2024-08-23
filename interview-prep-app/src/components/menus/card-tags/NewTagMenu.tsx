import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TagData } from "@/types/data-types";
import { tagColors } from "@/lib/colors/tag-colors";
import { useTagStore } from "@/_store/index";

interface NewTagMenuProps {
  // tag: TagData;
  onBack: () => void;
}

const NewTagMenu = ({ onBack }: NewTagMenuProps) => {
  const { addTag } = useTagStore((state) => ({ addTag: state.addTag }));
  const [tagName, setTagName] = useState("");
  const [tagColor, setTagColor] = useState("");

  const handleSave = async () => {
    const newTag = {
      name: tagName,
      color: tagColor,
    };
    try {
      const response = await fetch(`/api/cards/tags`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTag),
      });
      if (response.ok) {
        const data = await response.json();
        const newTag: TagData = data.tag;
        addTag(newTag);
        setTagName("");
        setTagColor("");
        onBack();
      }
    } catch {
      console.error("Error creating new tag");
      onBack();
    }
  };

  return (
    <div className='pointer-events-auto z-[60]'>
      <Input
        id='tag-name'
        value={tagName}
        onChange={(e) => setTagName(e.target.value)}
        placeholder='Tag Name'
        className='pointer-events-auto'
      />
      <div className='flex flex-wrap'>
        {tagColors.map((color) => (
          <div
            key={color.textColor}
            className='w-6 h-6 m-1 cursor-pointer'
            style={{
              backgroundColor: color.backgroundColor,
              borderColor: color.borderColor,
              borderWidth: "1px",
              borderStyle: "solid",
            }}
            onClick={() => setTagColor(color.textColor)}
          >
            {tagColor === color.textColor && (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6 text-white'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M5 13l4 4L19 7'
                />
              </svg>
            )}
          </div>
        ))}
      </div>
      <Button
        onClick={() => {
          console.log("New Tag", tagName, tagColor);
          handleSave();
        }}
      >
        Save
      </Button>
      <Button onClick={onBack} variant='outline'>
        Back
      </Button>
    </div>
  );
};

export default NewTagMenu;
