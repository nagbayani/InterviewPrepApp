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
import { CardData, TagData, CardTagData } from "@/types/data-types";

type Props = {
  card: CardData;
  userTags: TagData[];
  cardTags: CardTagData[];
};
/**
 * Card Display Component that is rendered when you open a card from DeckID page.  Allows user to edit the question and answer.
 * @param param0
 * @returns
 */
export default function CardDisplay({ card, userTags, cardTags }: Props) {
  console.log("userTags", userTags);
  console.log(card, "CardData");

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
    // <section className='flex flex-col gap-4'>
    <section className='card-section h-[100%] w-full'>
      {/* <Link href={`/decks/${data.deckId}/c/${data.id}`}> */}
      <div className={`card-form-container w-full h-fullmx-4`}>
        <Form {...form}>
          {/* div for CARD QUESTION - CardInput / CardFormLabel  */}
          <div className='card-question w-full'>
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
                      <CardFormLabel
                        onClick={() => handleLabelClick("question")}
                      >
                        {field.value || details.question}
                      </CardFormLabel>
                    </>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Add wrapper here to render cardTags  */}
          <div className='flex items-center gap-4'>
            {card.tags?.map((tag) => (
              <Tag key={tag.id} tag={tag} />
            ))}
            <TagsPopover tags={userTags} cardId={card.id} />
          </div>

          {/* TipTap Rich Text Editor - User writes answer. */}
          <EditorWrapper data={card} />
        </Form>
      </div>
      {/* </Link> */}
    </section>
  );
}
