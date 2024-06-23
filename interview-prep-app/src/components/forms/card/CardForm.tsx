"use client";

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

import * as z from "zod";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { CardSchema } from "@/schemas/cardSchema";
import "../../../styles/cardForm.css";
import { useState } from "react";
import { HiViewGrid } from "react-icons/hi";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import EditorWrapper from "@/components/novel/Editor-wrapper";

interface Data {
  id: string;
  createdAt: string;
  updatedAt: string;
  question: string;
  answer: string;
  category: string;
  authorId: string;
  deckId: string;
}

const CardForm = ({ data }: { data: Data }) => {
  const [isEditing, setIsEditing] = useState({
    question: false,
    answer: false,
    category: false,
  });

  const [details, setDetails] = useState({
    question: data.question || "Your Question",
    answer: data.answer || "Your Answer",
    category: "Category",
  });

  const [lastNonEmptyQuestion, setLastNonEmptyQuestion] =
    useState("Your Question");

  const [isExpanded, setIsExpanded] = useState(false);

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

    handleSave(field);

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

  const toggleExpansion = () => {
    setIsExpanded((prev) => !prev);
  };

  /**
   * Save function to save the field to the database
   * @param field Field to save
   */
  const handleSave = async (field: string) => {
    switch (field) {
      case "question":
        try {
          const response = await fetch(`/api/cards/${data.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              question: details.question,
              deckId: data.deckId,
              authorId: data.authorId,
              answer: data.answer,
              cardId: data.id,
            }),
          });

          if (response.ok) {
            // Handle successful save
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
    <div
      className={`card-form-container w-full mx-4 ${
        isExpanded ? "expanded" : ""
      }`}
    >
      <Form {...form}>
        <div className='flex flex-row justify-between'>
          <button className='header-button'>
            <HiViewGrid size={32} color={"#cccccd"} />
          </button>
          <FormField
            control={form.control}
            name='question'
            render={({ field }) => (
              <FormItem>
                {isEditing.question ? (
                  <>
                    <FormControl>
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
          <button className='add-button' onClick={toggleExpansion}>
            <HiOutlinePlusSmall size={32} />
          </button>
        </div>
      </Form>
      {isExpanded && <EditorWrapper data={data} />}
    </div>
  );
};

export default CardForm;

{
  /* <FormField
          control={form.control}
          name='category'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <CardInput placeholder='Category' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */
}

// question form -> if empty, show error
// If title is clicked, turn into Input field
// Once title is changed, useState to update title
// cardForm will take in props: question, answer, deckId, cardId
// question
// answer
// category
// cardId, deckId

// onSubmit -> startTransition, updateCard, toast

// TAGS instead of category, add a tag
// Key Words
// Checklist

// SAVING
// Keep track of saved state
// Save Question set via label/input, handleBlur
// Save Answer holding EditorContent as json
// Pass saved state to EditorWrapper component
3;
