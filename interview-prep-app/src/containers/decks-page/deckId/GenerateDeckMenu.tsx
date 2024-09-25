import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { WandSparkles } from "lucide-react";
import { useDeckStore, useCardStore, useTagStore } from "@/_store/index";
import GeneratedCard from "./GeneratedCard";
import { set } from "zod";

interface GenerateDeckMenuProps {
  deckId: string;
}
const GenerateDeckMenu = ({ deckId }: GenerateDeckMenuProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const [generatedQuestions, setGeneratedQuestions] = useState<
    { question: string; tags: string[] }[]
  >([]); // State to hold generated questions

  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]); // Track selected questions

  const { deck, updateDeck } = useDeckStore((state) => ({
    deck: state.decks[deckId],
    updateDeck: state.updateDeck,
  }));

  const { tags, addCardTag } = useTagStore((state) => ({
    tags: state.tags,
    addCardTag: state.addCardTag,
  }));

  const { addCard } = useCardStore((state) => ({
    addCard: state.addCard,
  }));

  const handleGenerateQuestions = async () => {
    setIsGenerating(true);
    const tagsToAdd = Object.values(tags).map((tag) => tag.name);
    console.log("Tags to add:", tagsToAdd);
    try {
      // Call OpenAI API here to generate questions for the deck
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AUTH_URL}/api/generate-questions/deck`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            deckId,
            deckTitle: deck.title,
            deckDescription: deck.description,
            tags: tagsToAdd,
          }),
        }
      );
      // Handle response
      if (response.status === 200) {
        const result = await response.json();
        // Check if the response contains backticks or markdown characters and remove them
        let questionsText = result.questions.replace(/```json|```/g, "").trim();

        // Parse the cleaned-up JSON string
        const questions = JSON.parse(questionsText);
        console.log("Generated questions as JavaScript object:", questions);
        setGeneratedQuestions(questions);
        // console.log("Generated questions:", generatedQuestions);
      }

      setIsGenerating(false);
      alert("Questions generated successfully!"); // Replace this with your own logic to display the questions
    } catch (error) {
      setIsGenerating(false);
      console.error("Error generating questions:", error);
    }
  };

  const handleCheckboxChange = (index: number) => {
    setSelectedQuestions((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
    console.log("Selected questions:", selectedQuestions);
  };

  const handleAcceptAll = () => {
    setSelectedQuestions(generatedQuestions.map((_, index) => index));
  };

  const handleChoose = () => {
    setShowCheckboxes(true);
  };

  // Function to create the card in the database
  const createCardAndTags = async (question: string, tagNames: string[]) => {
    try {
      // Create the card
      const cardResponse = await fetch("/api/cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          answer: "",
          deckId, // Associate the card with the deck
        }),
      });

      if (!cardResponse.ok) throw new Error("Failed to create card");

      const newCard = await cardResponse.json();

      console.log("New card created:", newCard);

      // Add card to Zustand's cardStore
      addCard(newCard);
      if (newCard) {
        console.log(
          "New card created to send to CardTag API:",
          newCard.card.id
        );
        // Create the card-tag relationships
        const tagRequests = tagNames.map(async (tagName) => {
          const tag = Object.values(tags).find((t) => t.name === tagName);

          if (tag) {
            const tagResponse = await fetch("/api/cards/tags/card-tag", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                cardId: newCard.card.id,
                tagId: tag.id,
              }),
            });

            if (!tagResponse.ok) throw new Error("Failed to create card-tag");

            const cardTag = await tagResponse.json();

            // Update Zustand's tagStore
            addCardTag({ cardId: newCard.card.id, tagId: tag.id });
          }
        });

        // Wait for all card-tags to be created
        await Promise.all(tagRequests);
      }
      // Update the deck in the Zustand store to include the new card
      // updateDeck(deckId, {
      //   ...deck,
      //   cards: [...deck.cards, newCard.card], // Append the new card to the existing cards array
      // });

      console.log("DECK UPDATED!");

      return newCard;
    } catch (error) {
      console.error("Error creating card or tags:", error);
    }
  };

  const handleFinalizeSelection = async () => {
    try {
      const newCards = await Promise.all(
        selectedQuestions.map((index) =>
          createCardAndTags(
            generatedQuestions[index].question,
            generatedQuestions[index].tags
          )
        )
      );
      // After all cards are created, update the Zustand deck store with the new cards
      const cardsToUpdate = newCards.map((newCard) => newCard.card); // Ensure this is the card object
      // Update the deck and card store in one go
      updateDeck(deckId, {
        ...deck,
        cards: [...deck.cards, ...cardsToUpdate],
      });

      // console.log("Selected cards:", selectedCards);
      // console.log("Deck after adding selected cards:", deck);
    } catch (error) {
      console.error("Error finalizing card selection:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='textIcon'>
          <WandSparkles size={12} />
          <span>Generate Questions</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='w-[600px] overflow-y-scroll h-[500px] translate-y-[-25%]'>
        <DialogHeader>
          <DialogTitle>Generate AI-Powered Questions</DialogTitle>
          <DialogDescription>
            Click the &quot;Generate&quot; button to automatically create a list
            of interview questions for this deck based on its topic.
          </DialogDescription>
        </DialogHeader>
        <div className='flex justify-center gap-4'>
          <Button
            variant='secondary'
            onClick={handleGenerateQuestions}
            disabled={isGenerating}
          >
            {isGenerating ? "Generating..." : "Generate"}
          </Button>
          <Button variant='secondary' onClick={handleChoose}>
            Choose
          </Button>
          <Button variant='secondary' onClick={handleAcceptAll}>
            Accept All
          </Button>
        </div>
        {/* Render Generated Cards here */}
        <div className='grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 p-4'>
          {generatedQuestions.length > 0 ? (
            generatedQuestions.map((q, index) => (
              <div key={index} className='flex items-start space-x-2'>
                {showCheckboxes && (
                  <Checkbox
                    id={`question-${index}`}
                    checked={selectedQuestions.includes(index)}
                    onCheckedChange={() => handleCheckboxChange(index)}
                  />
                )}
                <GeneratedCard
                  question={q.question}
                  generatedTags={q.tags}
                  index={index + 1}
                />
              </div>
            ))
          ) : (
            <p>
              No questions generated yet. Click &quot;Generate&quot; to create
              some.
            </p>
          )}
        </div>

        <DialogFooter>
          <Button variant='secondary'>Cancel</Button>
          <Button
            onClick={handleFinalizeSelection}
            disabled={selectedQuestions.length === 0}
          >
            Finalize Selection
          </Button>{" "}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateDeckMenu;
