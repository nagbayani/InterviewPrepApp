"use client";

// import Editor from "./advanced-editor";
// import { ThemeToggle } from "@/components/theme-toggle";
import { JSONContent } from "novel";
import { useState, useEffect, use } from "react";
import { defaultValue } from "@/lib/content";
import { useCardStore } from "@/_store";
import { TipTapEditor } from "./Editor";
import SaveButton from "../buttons/save-button";

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

interface EditorWrapperProps {
  data: Data;
  cardId: string; // Passed down from CardDisplay
}

export default function EditorWrapper({ data, cardId }: EditorWrapperProps) {
  const { card, updateCard } = useCardStore((state) => ({
    card: state.cards[cardId],
    updateCard: state.updateCard,
  }));
  // console.log("DATA ANSWER", data.answer);

  // *** Convert data.answer to JSONContent ***
  let initialContent: JSONContent;
  try {
    initialContent = JSON.parse(card.answer);
  } catch (e) {
    initialContent = defaultValue;
  }
  // initial state is passed down answer or default value
  const [value, setValue] = useState<JSONContent>(
    initialContent || defaultValue
  );

  // Save state to pass to SaveButton
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle"
  );
  const [plainText, setPlainText] = useState<string>(""); // State to hold plain text

  // press save, sends POST to API
  const handleSave = async () => {
    setSaveStatus("saving");
    setValue(value);
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
      console.log("Response OK", response.status);
      updateCard(data.id, { answer: JSON.stringify(value) });
      // Handle successful save

      setSaveStatus("saved");
      console.log("successful save");
    } else {
      // Handle error
      console.log("error saving card");
      setSaveStatus("idle"); // Reset to idle if there's an error
    }
  };

  const handleEditorChange = (newValue: JSONContent) => {
    setValue(newValue);
    setSaveStatus("idle");
  };

  const handleTextChange = (text: string) => {
    setPlainText(text);
  };

  // useEffect(() => {
  //   // const content = window.localStorage.getItem("novel-content");
  //   // console.log("CONTENT", content); // this works
  //   // if (content) setInitialContent(JSON.parse(content));
  //   // if (value) console.log("VALUE", value);
  //   // else setInitialContent(defaultValue);
  //   // console.log("WRAPPER VALUE", value);
  //   // console.log("WRAPPER VALUE STRINGIFY", JSON.stringify(value));
  // }, [value, data]);

  useEffect(() => {
    if (card) {
      try {
        const parsedAnswer = JSON.parse(card.answer);
        setValue(parsedAnswer);
      } catch {
        const parsedAnswer = defaultValue;
        setValue(parsedAnswer);
      }
    }
  }, [card]);

  return (
    <>
      <div className='flex flex-col  max-h-[600px]'>
        <TipTapEditor
          initialValue={value}
          onChange={handleEditorChange}
          onTextChange={handleTextChange}
          onSave={handleSave}
        />
        <SaveButton status={saveStatus} onClick={handleSave} />
      </div>
    </>
  );
}
