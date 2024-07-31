import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../../ui/button";
import { LuPlus } from "react-icons/lu";
import { TagData } from "@/types/data-types";
import TagsMenu from "./TagsMenu";

interface OpenTagsMenuProps {
  tags: TagData[];
}

const TagsPopover = ({ tags }: OpenTagsMenuProps) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant='outline' size='sm'>
          <LuPlus />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='pointer-events-auto w-80'>
        <TagsMenu tags={tags} />
      </PopoverContent>
    </Popover>
  );
};

export default TagsPopover;
