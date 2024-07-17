"use client";

import Editor from "./advanced-editor";
// import { ThemeToggle } from "@/components/theme-toggle";
import { JSONContent } from "novel";
import { useState, useEffect, use } from "react";
import { defaultValue } from "@/lib/content";
import { useCardStore } from "@/_store";
import { TipTapEditor } from "./Editor";

interface Data {
  id: string; // cardID
  createdAt: string;
  updatedAt: string;
  question: string;
  answer: string;
  category: string;
  authorId: string;
  deckId: string;
}

export default function EditorWrapper({ data }: { data: Data }) {
  const { updateCard } = useCardStore((state) => ({
    updateCard: state.updateCard,
  }));
  // console.log("DATA ANSWER", data.answer);

  // *** Convert data.answer to JSONContent ***
  let initialContent: JSONContent;
  try {
    initialContent = JSON.parse(data.answer);
  } catch (e) {
    initialContent = defaultValue;
  }
  // initial state is passed down answer or default value
  const [value, setValue] = useState<JSONContent>(
    initialContent || defaultValue
  );

  // press save, sends POST to API
  const handleSave = async () => {
    const response = await fetch(`/api/cards/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: data.question,
        answer: JSON.stringify(value), // Convert JSONContent to string
        deckId: data.deckId,
        category: data.category,
        authorId: data.authorId,
        cardId: data.id,
      }),
    });
    if (response.ok) {
      updateCard(data.id, { answer: JSON.stringify(value) });
      // Handle successful save
      console.log("successful save");
    } else {
      // Handle error
      console.log("error saving card");
    }
  };
  useEffect(() => {
    // const content = window.localStorage.getItem("novel-content");
    // console.log("CONTENT", content); // this works
    // if (content) setInitialContent(JSON.parse(content));
    // if (value) console.log("VALUE", value);
    // else setInitialContent(defaultValue);
    // console.log("WRAPPER VALUE", value);
    // console.log("WRAPPER VALUE STRINGIFY", JSON.stringify(value));
  }, [value, data]);

  return (
    // <div className=' w-full h-full p-6 border gap-6 rounded-md bg-card'>
    // {/* </div> */}
    <>
      {/* <Editor initialValue={value} onChange={setValue} /> */}
      <TipTapEditor initialValue={value} onChange={setValue} />
      <button
        onClick={handleSave}
        className='w-[100px] mt-4 p-2 bg-blue-500 text-white rounded-md'
      >
        Save Card
      </button>
    </>
  );
}
