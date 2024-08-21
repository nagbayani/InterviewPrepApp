"use client";
// import a type of data for props
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  CardFormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CardInput } from "@/components/ui/cardinput";
import EditorWrapper from "@/components/text-editor/Editor-wrapper";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardSchema } from "@/schemas/cardSchema";
import "@/styles/cardForm.css";
import { useCardStore, useTagStore } from "@/_store/index";

import TagsPopover from "../menus/card-tags/TagsPopover";
import Tag from "./Tag";
import { CardData, TagData } from "@/types/data-types";
import SaveButton from "../buttons/save-button";

type Props = {
  card: CardData;
  userTags: TagData[];
  // cardTags: CardTagData[];
};
/**
 * Card Display Component that is rendered when you open a card from DeckID page.  Allows user to edit the question and answer.
 * @param param0
 * @returns
 */
export default function CardDisplay({ card, userTags }: Props) {
  // Zustand Card Store
  const { updateCard } = useCardStore((state) => ({
    updateCard: state.updateCard,
  }));

  // Zustand Tag Store
  // const { cardTags, tags, setCardTags } = useTagStore((state) => ({
  //   cardTags: state.cardTags,
  //   tags: state.tags,
  //   setCardTags: state.setCardTags,
  // }));

  // Get tags associated with this card
  // const cardTagIds = cardTags[card.id]
  //   ? Object.keys(cardTags[card.id])
  //   : [];
  // const cardTagsData = cardTagIds.map((tagId) => tags[tagId]);
  // console.log("cardTagsData", cardTagsData);

  const [isEditing, setIsEditing] = useState({
    question: false,
    answer: false,
    category: false,
  });

  const [details, setDetails] = useState({
    question: card.question || "Your Question",
    answer: card.answer || "Your Answer",
    category: "Category",
  });

  const [lastNonEmptyQuestion, setLastNonEmptyQuestion] =
    useState("Your Question");

  // Form hook
  const form = useForm<z.infer<typeof CardSchema>>({
    resolver: zodResolver(CardSchema),
    defaultValues: {
      question: "",
      answer: "",
      category: "",
    },
  });

  /**
   * Toggles the isEditing state to true when the label is clicked
   * @param field Field to update
   */
  const handleLabelClick = (field: string) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
  };

  /**
   * If a click enters outside of the input, set the input value to the lastNonEmptyQuestion.  Calls handleSave to save the question.
   * @param field Field to update
   */
  const handleInputBlur = (field: string) => {
    // If question is left empty
    if (field === "question" && !details.question.trim()) {
      // Set question to lastNonEmptyQuestion
      setDetails((prev) => ({ ...prev, question: lastNonEmptyQuestion }));
    }

    handleSaveQuestion(field);

    // Set isEditing to false
    setIsEditing((prev) => ({ ...prev, [field]: false }));
  };

  /**
   * Keydown event handler triggers handleInputBlur on Enter
   * @param e Keyboard event
   * @param field Field to update
   */
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: string
  ) => {
    // If Enter is pressed, blur input
    if (e.key === "Enter" || e.key === "Return") {
      e.preventDefault();
      handleInputBlur(field);
    }
  };

  /**
   * Change event handler for input fields. Updates the details state. If the field is question, sets the lastNonEmptyQuestion state.
   * @param e
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    // Update details state
    setDetails((prev) => ({ ...prev, [id]: value }));

    // If question is not empty, set lastNonEmptyQuestion
    if (id === "question" && value.trim()) {
      setLastNonEmptyQuestion(value);
    }
  };

  /**
   * Save function to save the field to the database
   * @param field Field to save
   */
  const handleSaveQuestion = async (field: string) => {
    switch (field) {
      case "question":
        try {
          const response = await fetch(`/api/cards/${card.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              question: details.question,
              deckId: card.deckId,
              authorId: card.authorId,
              answer: card.answer,
              cardId: card.id,
            }),
          });

          if (response.ok) {
            // UPDATE Card in Zustand Store
            updateCard(card.id, { question: details.question });

            console.log("CardForm.tsx component - SAVE SUCCESS");
          }
        } catch {
          // Handle error
          console.error("CardForm.tsx component - ERROR SAVING CARD");
        }
        // Save question
        break;
      case "answer":
        // Save answer
        break;
      // default save all
      default:
        break;
    }
  };

  return (
    // Card Form Holding entire card
    // <section className='card-section   w-full h-full overflow-y-scroll'>
    <div className={`card-form-container`}>
      <Form {...form}>
        {/* Render Card Tags */}
        <div className='flex items-center gap-4 mt-4'>
          {card.tags?.map((tag) => (
            <TagsPopover
              key={tag.id}
              tags={userTags}
              cardId={card.id}
              triggerElement={<Tag tag={tag} />}
            />
          ))}
          <TagsPopover tags={userTags} cardId={card.id} />
        </div>

        {/* div for CARD QUESTION - CardInput / CardFormLabel  */}
        <div className='card-question   mx-24'>
          <FormField
            control={form.control}
            name='question'
            render={({ field }) => (
              <FormItem className='w-full'>
                {isEditing.question ? (
                  <>
                    <FormControl className='w-full'>
                      <CardInput
                        id='question'
                        placeholder='Write a Question'
                        {...field}
                        onBlur={() => {
                          handleInputBlur("question");
                        }}
                        onChange={handleChange}
                        value={details.question}
                        onKeyDown={(e) => handleKeyDown(e, "question")}
                      />
                    </FormControl>
                  </>
                ) : (
                  <>
                    <CardFormLabel onClick={() => handleLabelClick("question")}>
                      {field.value || details.question}
                    </CardFormLabel>
                  </>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* TipTap Rich Text Editor - User writes answer. */}
        {/* <EditorWrapper data={card} cardId={card.id} /> */}
        {/* Layout with EditorWrapper and Feedback */}
        <div className='flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0 mt-8'>
          <div className='flex-1 lg:basis-2/3'>
            <EditorWrapper data={card} cardId={card.id} />
          </div>
          <div className='flex-1 lg:basis-1/3 bg-gray-100 p-4 rounded-lg shadow-md'>
            {/* Feedback Box Content */}
            <h2 className='text-lg font-semibold mb-2'>Feedback</h2>
            <p className='text-gray-700'>Your feedback content goes here.</p>
          </div>
        </div>
      </Form>
    </div>
    // </section>
  );
}
