import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TagData } from "@/types/data-types";
import { tagColors } from "@/lib/colors/tag-colors";
import { useTagStore } from "@/_store/index";
import { EditTag } from "@/components/card/EditTag";

interface EditTagMenuProps {
  tag: TagData;
  onBack: () => void;
}

export default function EditTagMenu({ tag, onBack }: EditTagMenuProps) {
  const [tagName, setTagName] = useState(tag.name);
  const [tagColor, setTagColor] = useState(tag.color);

  // Get the updateTag function from the store
  const { updateTag } = useTagStore((state) => ({
    updateTag: state.updateTag,
  }));

  const handleSave = async () => {
    // Construct the updated tag data
    const updatedTag = {
      ...tag,
      tagId: tag.id,
      name: tagName,
      color: tagColor,
    };

    try {
      // Update the tag in the database
      const response = await fetch(`/api/cards/tags`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTag),
      });

      if (!response.ok) {
        throw new Error("Failed to update the tag");
      }

      // Update the tag in Zustand store
      updateTag(tag.id, updatedTag);

      // Go back to the TagsMenu
      onBack();
    } catch (error) {
      console.error("Error updating the tag:", error);
    }
  };
  const handleColorSelect = (color: string) => {
    setTagColor(color);
  };
  return (
    <div className='pointer-events-auto'>
      <div className='p-16'>
        <EditTag
          tag={{
            id: tag.id,
            name: tagName,
            color: tagColor,
            authorId: tag.authorId,
          }}
        />

        {/* INSERT TAG IN THIS DIV  */}
      </div>
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>Title</label>
        <Input
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          className='mt-1'
        />
      </div>
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>
          Tag Color
        </label>
        <div className='flex gap-2 flex-wrap'>
          {tagColors.map((color) => (
            <div
              key={color.name}
              onClick={() => handleColorSelect(color.backgroundColor)}
              className={`w-12 h-12 cursor-pointer hover:border-black hover:border-2 rounded-[4px] ${
                tagColor === color.backgroundColor
                  ? "border-4 border-black"
                  : "border-[1px] border-transparent"
              }`}
              style={{
                backgroundColor: color.backgroundColor,
                borderColor: color.borderColor,
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
