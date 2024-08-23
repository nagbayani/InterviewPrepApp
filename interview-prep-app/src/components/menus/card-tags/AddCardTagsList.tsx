import React, { useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { TagData } from "@/types/data-types";
import { useTagStore } from "@/_store/index";
import EditTagMenu from "./EditTagMenu";
import NewTagMenu from "./NewTagMenu";

interface AddCardTagsListProps {
  selectedTags: TagData[];
  handleTagToggle: (tag: TagData) => void;
}

export default function AddCardTagsList({
  selectedTags,
  handleTagToggle,
}: AddCardTagsListProps) {
  const { tags } = useTagStore((state) => ({
    tags: state.tags,
  }));

  // Manage the current menu state
  const [menuState, setMenuState] = useState<"list" | "edit" | "new">("list");
  const [currentTagId, setCurrentTagId] = useState<string | null>(null);

  const handleEditTag = (tagId: string) => {
    setCurrentTagId(tagId);
    setMenuState("edit");
  };

  const handleBackToMenu = () => {
    setMenuState("list");
    setCurrentTagId(null);
  };

  return menuState === "list" ? (
    <>
      <Table>
        <TableBody>
          {Object.values(tags).map((tag) => (
            <TableRow key={tag.id}>
              <TableCell>
                <Checkbox
                  checked={selectedTags.includes(tag)}
                  onCheckedChange={() => handleTagToggle(tag)}
                />
              </TableCell>
              <TableCell>
                <div
                  className='flex items-center space-x-2 cursor-pointer'
                  onClick={() => handleTagToggle(tag)}
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
      </Table>
      <div className='flex flex-col'>
        <Button
          onClick={() => setMenuState("new")}
          variant='outline'
          className='mt-2'
        >
          Create New Tag
        </Button>
      </div>
    </>
  ) : menuState === "edit" ? (
    <EditTagMenu
      tag={Object.values(tags).find((tag) => tag.id === currentTagId)!}
      onBack={handleBackToMenu}
    />
  ) : (
    <NewTagMenu onBack={handleBackToMenu} />
  );
}
