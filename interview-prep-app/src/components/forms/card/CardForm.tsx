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
import TextEditor from "@/components/tiptap/TextEditor";
import { HiViewGrid } from "react-icons/hi";
import { HiOutlinePlusSmall } from "react-icons/hi2";

const CardForm = () => {
  const [isEditing, setIsEditing] = useState({
    question: false,
    answer: false,
    category: false,
  });

  const [details, setDetails] = useState({
    question: "Your Question",
    answer: "Your Answer",
    category: "Category",
  });

  const [lastNonEmptyQuestion, setLastNonEmptyQuestion] =
    useState("Your Question");

  const form = useForm<z.infer<typeof CardSchema>>({
    resolver: zodResolver(CardSchema),
    defaultValues: {
      question: "",
      answer: "",
      category: "",
    },
  });

  const handleLabelClick = (field: string) => {
    setIsEditing((prev) => ({ ...prev, [field]: true }));
  };

  // click enters outside of Input, Sets input value
  const handleInputBlur = (field: string) => {
    // If question is left empty
    if (field === "question" && !details.question.trim()) {
      setDetails((prev) => ({ ...prev, question: lastNonEmptyQuestion }));
    }
    setIsEditing((prev) => ({ ...prev, [field]: false }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setDetails((prev) => ({ ...prev, [id]: value }));
    if (id === "question" && value.trim()) {
      setLastNonEmptyQuestion(value);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: string
  ) => {
    if (e.key === "Enter" || e.key === "Return") {
      e.preventDefault();
      handleInputBlur(field);
    }
  };

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

  return (
    <div className='card-form-container'>
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
          <button className='add-button'>
            <HiOutlinePlusSmall size={32} />
          </button>
        </div>

        {/* <FormField
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
        /> */}
        {/* <FormField
          control={form.control}
          name='answer'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Answer</FormLabel>
              <FormControl>
                <CardInput placeholder='Your Answer' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
      </Form>

      <div className='border-black border-2 h-[200px]'>
        <TextEditor />
      </div>
    </div>
  );
};

export default CardForm;
