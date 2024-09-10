"use client";
import React, { useEffect, useState } from "react";
import { useTagStore } from "@/_store/index";
import Tag from "@/components/card/Tag";
import { TagData } from "@/types/data-types";
import { PenLine } from "lucide-react"; // Keep it consistent with other cards

interface GeneratedCardProps {
  question: string;
  generatedTags: string[];
  index: number; // Add index for display
}

const GeneratedCard = ({
  question,
  generatedTags,
  index,
}: GeneratedCardProps) => {
  const { tags } = useTagStore((state) => ({
    tags: state.tags,
  }));

  const [matchedTags, setMatchedTags] = useState<TagData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Find the tags that match the `generatedTags` names
    const matchingTags = generatedTags.map((tagName) =>
      Object.values(tags).find((tag) => tag.name === tagName)
    );
    setMatchedTags(matchingTags.filter(Boolean) as TagData[]);
    setIsLoaded(true);
  }, [generatedTags, tags]);

  // Ensure the tags only render after the data is loaded
  if (!isLoaded) return <div>Loading tags...</div>;

  return (
    <div
      className='flex w-[100%] border-black'
      style={{ background: "#fefcf6", border: "1px solid black" }}
    >
      <div className='flex flex-col justify-between w-full'>
        <div className='flex flex-col'>
          <div className='flex-1 p-2'>
            <div className='flex justify-between'>
              {index}

              {/* Placeholder for potential additional features */}
              <div className='self-end'>
                <PenLine size={14} />
              </div>
            </div>

            {/* Tags + Card Question */}
            <div className='flex-col px-2'>
              <div className='tags-container my-2 gap-2 flex flex-wrap'>
                {matchedTags.map((tag) => (
                  <Tag key={tag.id} tag={tag} />
                ))}
              </div>
              <p className=''>{question}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratedCard;
