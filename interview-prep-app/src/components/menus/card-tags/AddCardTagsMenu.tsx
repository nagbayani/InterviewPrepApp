import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AddCardTagsList from "./AddCardTagsList";
import { TagData } from "@/types/data-types";

interface AddCardTagsMenuProps {
  onSelectTags: (selectedTags: TagData[]) => void;
}

export default function AddCardTagsMenu({
  onSelectTags,
}: AddCardTagsMenuProps) {
  const [selectedTags, setSelectedTags] = useState<TagData[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("hi");

  const handleTagToggle = (tag: TagData) => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t.id !== tag.id)
      : [...selectedTags, tag];
    setSelectedTags(updatedTags);
    onSelectTags(updatedTags); // Pass updated tags to parent component
  };

  const handlePopoverToggle = () => {
    setIsOpen(!isOpen);
  };

  const preventClose = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents closing the popover when interacting with the content
  };

  return (
    <Popover open={isOpen} onOpenChange={handlePopoverToggle}>
      <PopoverTrigger asChild>
        <Button variant='outline' onClick={handlePopoverToggle}>
          Select Tags
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='p-4 z-[100] pointer-events-auto'
        onClick={preventClose}
      >
        {/* <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onClick={() => {
            console.log("clicked");
          }}
        ></Input> */}
        <AddCardTagsList
          selectedTags={selectedTags}
          handleTagToggle={handleTagToggle}
        />
      </PopoverContent>
    </Popover>
  );
}
