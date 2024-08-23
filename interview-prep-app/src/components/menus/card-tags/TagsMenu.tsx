import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { TagData } from "@/types/data-types";
import { useTagStore } from "@/_store/index";
import EditTagMenu from "./EditTagMenu";
import NewTagMenu from "./NewTagMenu";

interface TagsMenuProps {
  tags: TagData[];
  cardId: string;
  // onEdit: (tag: TagData) => void;
}

export default function TagsMenu({ tags, cardId }: TagsMenuProps) {
  const { addCardTag, deleteCardTag, cardTags } = useTagStore((state) => ({
    addCardTag: state.addCardTag,
    deleteCardTag: state.deleteCardTag,
    cardTags: state.cardTags,
  }));
  // Initialize selectedTags from the store
  const initialSelectedTags = cardTags[cardId]
    ? Object.keys(cardTags[cardId])
    : [];
  const [selectedTags, setSelectedTags] =
    useState<string[]>(initialSelectedTags);

  // Menu state to toggle between editing a single tag and back to original TagsMenu
  const [menuState, setMenuState] = useState<"list" | "edit" | "new">("list");
  const [currentTagId, setCurrentTagId] = useState<string | null>(null);

  // console.log("Selected tags state:", selectedTags);

  // Toggle selected tags to set on card
  const handleTagToggle = (tagId: string) => {
    // console.log("Tag toggled", tagId);
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tagId)
        ? prevSelectedTags.filter((id) => id !== tagId)
        : [...prevSelectedTags, tagId]
    );
  };

  // User clicks on edit button to edit Tag name and color
  const handleEditTag = (tagId: string) => {
    setCurrentTagId(tagId);
    setMenuState("edit");
  };

  // User clicks on back button to go back to the list of tags
  const handleBackToMenu = () => {
    setMenuState("list");
    setCurrentTagId(null);
  };

  // Submit selected tags to update card-tags relationship in database and zustand store
  const handleSubmit = async () => {
    // Fetch existing CardTags from Zustand store
    const existingCardTags = cardTags[cardId]
      ? Object.keys(cardTags[cardId])
      : [];

    // Create new card-tag relationship for each selected tag
    const createPromises = selectedTags
      .filter((tagId) => !existingCardTags.includes(tagId))
      .map((tagId) =>
        fetch(`/api/cards/tags/card-tag`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cardId, tagId }),
        })
      );

    // Remove unselected card-tags
    const deletePromises = existingCardTags
      .filter((tagId) => !selectedTags.includes(tagId))
      .map((tagId) =>
        fetch(`/api/cards/tags/card-tag`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cardId, tagId }),
        })
      );

    console.log("Create promises", createPromises);
    try {
      const results = await Promise.all([...createPromises, ...deletePromises]);

      // Check for errors in the API responses
      const errors = results.filter((res) => !res.ok);
      if (errors.length > 0) {
        console.error("Some API calls failed", errors);
        return;
      }

      // Update cardTags in Zustand store
      selectedTags.forEach((tagId) => {
        if (!existingCardTags.includes(tagId)) {
          addCardTag({ cardId, tagId });
        }
      });
      existingCardTags.forEach((tagId) => {
        if (!selectedTags.includes(tagId)) {
          deleteCardTag(cardId, tagId);
        }
      });

      console.log("CardTags updated successfully", cardTags);
      console.log("Tags updated successfully");
    } catch (error) {
      console.error("Error updating tags", error);
    }
  };
  return menuState === "list" ? (
    <>
      <Table>
        {/* <TableCaption>A list of your tags.</TableCaption> */}
        <TableHeader>
          <TableRow>
            {/* <TableHead className='w-[50px]'>Select</TableHead> */}
            {/* <TableHead>Tag</TableHead>
            <TableHead className='text-right'>Actions</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tags.map((tag) => (
            <TableRow key={tag.id}>
              <TableCell>
                <Checkbox
                  checked={selectedTags.includes(tag.id)}
                  onCheckedChange={() => handleTagToggle(tag.id)}
                />
              </TableCell>
              <TableCell>
                <div
                  className='flex items-center space-x-2'
                  onClick={() => {
                    handleTagToggle(tag.id);
                  }}
                >
                  <div
                    className='w-4 h-4 rounded-full'
                    style={{ backgroundColor: tag.color }}
                  ></div>
                  <span>{tag.name}</span>
                </div>
              </TableCell>
              <TableCell className='text-right'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() => handleEditTag(tag.id)}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total Tags: {tags.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className='flex flex-col'>
        <Button
          onClick={() => setMenuState("new")}
          variant='outline'
          className='mt-2'
        >
          Create New Tag
        </Button>
        <Button onClick={handleSubmit} variant='create' className='mt-4'>
          Save
        </Button>
      </div>
    </>
  ) : menuState === "edit" ? (
    <EditTagMenu
      tag={tags.find((tag) => tag.id === currentTagId)!}
      onBack={handleBackToMenu}
    />
  ) : (
    <NewTagMenu onBack={handleBackToMenu} />
  );
}
