"use client";

// import Editor from "./advanced-editor";
// import { ThemeToggle } from "@/components/theme-toggle";
import { JSONContent } from "novel";
import { useState, useEffect, use } from "react";
import { defaultValue } from "@/lib/content";
import { useCardStore } from "@/_store";
import { TipTapEditor } from "./Editor";
import { Editor } from "@tiptap/core";

import SaveButton from "../buttons/save-button";
import GenAnswerButton from "../buttons/gen-answer-button";
interface Data {
  id: string; // cardID
  createdAt: string;
  updatedAt: string;
  question: string;
  answer: string;
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
  const [editorInstance, setEditorInstance] = useState<Editor | null>(null); // Store editor instance

  // initial state is passed down answer or default value
  const [value, setValue] = useState<JSONContent>(
    initialContent || defaultValue
  );

  // Save state to pass to SaveButton
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle"
  );

  // GenAnswerButton status
  const [genAnswerStatus, setGenAnswerStatus] = useState<
    "idle" | "saving" | "saved"
  >("idle");

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
    // Replace multiple line breaks and normalize the spacing
    const normalizedText = text.replace(/\n\s*\n/g, "\n").trim();
    setPlainText(normalizedText);
    console.log("PLAIN TEXT", normalizedText);
  };

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

  const handleGenerateAnswer = async () => {
    setGenAnswerStatus("saving"); // Set status to "saving" when starting the request

    try {
      const response = await fetch("/api/generate-answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: data.question,
          answer: plainText,
          cardId: data.id,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Generated answer CLIENT:", result.generatedAnswer);
        // Update the editor with the generated answer
        setValue(result.generatedAnswer);

        console.log("Editor instance", editorInstance);
        // Insert generated content directly into the editor
        editorInstance?.commands.setContent(result.generatedAnswer);

        // Update the card in the store
        updateCard(data.id, { answer: JSON.stringify(result.generatedAnswer) });

        setGenAnswerStatus("saved"); // Set status to "saved" upon successful response

        console.log("Updated card in store");
      } else {
        console.log("Failed to generate answer");
        setGenAnswerStatus("idle"); // Set status to "idle" in case of an error
      }
    } catch (error) {
      console.log("Error generating answer", error);
      setGenAnswerStatus("idle"); // Set status to "idle" in case of an error
    }
  };

  return (
    <>
      <div className='flex flex-col  max-h-[600px]'>
        <TipTapEditor
          initialValue={value}
          onChange={handleEditorChange}
          onTextChange={handleTextChange}
          onSave={handleSave}
          onEditorReady={setEditorInstance} // Pass the editor instance to EditorWrapper
        />
        <div className='flex gap-8 p-2'>
          <SaveButton status={saveStatus} onClick={handleSave} />
          <GenAnswerButton
            onClick={handleGenerateAnswer}
            status={genAnswerStatus}
          />
        </div>
      </div>
    </>
  );
}
