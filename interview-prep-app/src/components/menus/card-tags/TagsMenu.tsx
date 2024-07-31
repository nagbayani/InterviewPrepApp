import React from "react";
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

interface TagsMenuProps {
  tags: TagData[];
  // onEdit: (tag: TagData) => void;
}

export default function TagsMenu({ tags }: TagsMenuProps) {
  return (
    <Table>
      <TableCaption>A list of your tags.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[50px]'>Select</TableHead>
          <TableHead>Tag</TableHead>
          <TableHead className='text-right'>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tags.map((tag) => (
          <TableRow key={tag.id}>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell>
              <div className='flex items-center space-x-2'>
                <div
                  className='w-4 h-4 rounded-full'
                  style={{ backgroundColor: tag.color }}
                ></div>
                <span>{tag.name}</span>
              </div>
            </TableCell>
            <TableCell className='text-right'>
              <Button variant='outline' size='sm'>
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
  );
}
