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
import { useMockTemplateStore } from "@/_store/mock-store";
import { useInterviewStore } from "@/_store/interviews-store";
import GeneratedCard from "@/containers/decks-page/deckId/GeneratedCard";
import { putMockTemplate } from "@/utils/fetch";
import { MockTemplateCardData } from "@/types/data-types";
interface GenerateMockMenuProps {
  mockId: string;
  interviewId: string;
}
const GenerateMockMenu = ({ mockId, interviewId }: GenerateMockMenuProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const [generatedQuestions, setGeneratedQuestions] = useState<
    { question: string; tags: string[] }[]
  >([]); // State to hold generated questions

  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]); // Track selected questions

  const { decks, updateDeck, addDeck, unassignedDeck } = useDeckStore(
    (state) => ({
      decks: state.decks,
      updateDeck: state.updateDeck,
      addDeck: state.addDeck,
      unassignedDeck: state.unassignedDeck,
    })
  );

  const { tags, addCardTag } = useTagStore((state) => ({
    tags: state.tags,
    addCardTag: state.addCardTag,
  }));

  const { cards, addCard } = useCardStore((state) => ({
    cards: state.cards,
    addCard: state.addCard,
  }));

  const { interview, updateInterview } = useInterviewStore((state) => ({
    interview: state.interviews[interviewId],
    updateInterview: state.updateInterview,
  }));

  const {
    mockTemplate,
    addMockTemplateCard,
    updateMockTemplate,
    mockTemplateCards,
  } = useMockTemplateStore((state) => ({
    mockTemplate: state.mockTemplates[mockId],
    addMockTemplateCard: state.addMockTemplateCard,
    updateMockTemplate: state.updateMockTemplate,
    mockTemplateCards: state.mockTemplateCards,
  }));

  const handleGenerateQuestions = async () => {
    setIsGenerating(true);
    const tagsToAdd = Object.values(tags).map((tag) => tag.name);
    console.log("Tags to add:", tagsToAdd);

    // Extract the questions of the cards that belong to the mock template
    const mockTemplateCards = mockTemplate.cards; // This should be an array of { cardId, templateId }
    const mockTemplateQuestions = mockTemplateCards
      .map((templateCard) => {
        const card = cards[templateCard.cardId]; // Find the card in the Card store using the cardId
        return card ? card.question : null; // Get the question if the card exists
      })
      .filter((question) => question !== null); // Filter out any nulls
    try {
      // Call OpenAI API here to generate questions for the mock interview
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_AUTH_URL}/api/generate-questions/mock`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tags: tagsToAdd,
            mockTitle: mockTemplate.title,
            mockDescription: mockTemplate.description,
            mockType: mockTemplate.type,
            company: interview.company,
            jobPosition: interview.jobPosition,
            jobDescription: interview.jobDescription,
            jobSkills: interview.skills,
            jobQualifications: interview.qualifications,
            questionPool: mockTemplateQuestions,
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
      // Check if unassignedDeck is available before using it
      if (!unassignedDeck) {
        throw new Error("Unassigned deck is not available.");
      }

      // Create the card
      const cardResponse = await fetch("/api/cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          answer: "",
          deckId: unassignedDeck, // Cards generated here don't belong to a deck yet
        }),
      });

      if (!cardResponse.ok) throw new Error("Failed to create card");

      const newCard = await cardResponse.json();

      console.log("New card created:", newCard);

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

      return newCard;
    } catch (error) {
      console.error("Error creating card or tags:", error);
    }
  };

  const handleFinalizeSelection = async () => {
    try {
      // Step 1: Create new cards and tags in the database
      const newCards = await Promise.all(
        selectedQuestions.map((index) =>
          createCardAndTags(
            generatedQuestions[index].question,
            generatedQuestions[index].tags
          )
        )
      );

      // Step 2: Extract card IDs from the newly created cards
      // Extract card IDs
      const cardIds = newCards.map((newCard) => newCard.card.id);
      // After all cards are created, update the Zustand deck store with the new cards
      const cardsToUpdate = newCards.map((newCard) => newCard.card); // Ensure this is the card object

      // Step 3: Update the Unassigned deck in the Zustand store to include the new cards
      if (!unassignedDeck) {
        throw new Error("Unassigned deck is not available.");
      }

      newCards.forEach((newCard) => {
        console.log("Adding card to card store:", newCard);
        addCard(newCard.card); // This should immediately add the card to Zustand state
      });

      updateDeck(unassignedDeck, {
        ...decks[unassignedDeck], // Copy the existing deck
        cards: [
          ...decks[unassignedDeck].cards,
          ...newCards.map((card) => card.card),
        ], // Append the new cards to the existing cards array
      });

      // Step 4: Update the mock template in the database (PUT request)

      const existingTemplateCards = Object.values(
        mockTemplateCards[mockId] || {}
      );
      const existingCardIds = existingTemplateCards.map(
        (templateCard) => templateCard.cardId
      );
      const allCardIds = [...existingCardIds, ...cardIds];

      const updatedTemplate = await putMockTemplate(
        mockTemplate.title,
        mockTemplate.type,
        mockTemplate.description,
        mockId,
        allCardIds
      );

      if (updatedTemplate) {
        console.log("Mock template updated with new cards:", updatedTemplate);
        // Step 5: After successful database update, update Zustand store for mockTemplate and mockTemplateCards

        // Update mock template in Zustand store
        updateMockTemplate(mockId, {
          ...mockTemplate,
          cards: [...mockTemplate.cards, ...updatedTemplate.template.cards],
        });
      }

      // Add new cards to Zustand's mockTemplateCards store
      cardIds.forEach((cardId) => {
        console.log("Adding card to mock template cards:", cardId);
        addMockTemplateCard({
          cardId: cardId,
          templateId: mockId,
        });
      });
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

export default GenerateMockMenu;
