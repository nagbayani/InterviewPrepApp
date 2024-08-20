import { useState } from "react";
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
  cardId: string;
  triggerElement?: React.ReactNode; // Optional trigger element
}

const TagsPopover = ({ tags, cardId, triggerElement }: OpenTagsMenuProps) => {
  const [isTriggerElementVisible, setIsTriggerElementVisible] = useState(
    Boolean(triggerElement)
  );

  // console.log(isTriggerElementVisible, "isTriggerElementVisible");

  return (
    <Popover>
      <PopoverTrigger asChild>
        {isTriggerElementVisible && triggerElement ? (
          <div>{triggerElement}</div>
        ) : (
          <Button
            variant='outline'
            size='sm'
            onClick={() => setIsTriggerElementVisible(true)}
          >
            <LuPlus />
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className='pointer-events-auto w-80'>
        <TagsMenu tags={tags} cardId={cardId} />
      </PopoverContent>
    </Popover>
  );
};

export default TagsPopover;
