import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MockFormContainer from "./MockFormContainer";
import useMockFormStore from "@/_store/mock-form-store";
import { DeckData, CardData } from "@/types/data-types";
import DraggableQuestion from "../dnd/DraggableQuestion";
import StageDropZone from "../dnd/StageDropZone";
import { useDeckStore, useCardStore, useTagStore } from "@/_store/index";
import { useMockTemplateStore } from "@/_store/mock-store";
import { useInterviewStore } from "@/_store/interviews-store";
import {
  DndContext,
  closestCenter,
  useDroppable,
  useDraggable,
  DragEndEvent,
  DragMoveEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  closestCorners,
  useSensor,
  useSensors,
  rectIntersection,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { postMockTemplate, putMockTemplate } from "@/utils/fetch";
interface Props {
  interviewId: string;
}
export default function OrganizeQuestions({ interviewId }: Props) {
  const {
    step,
    increaseStep,
    onSubmit,
    decreaseStep,
    mockForm,
    setMockForm,
    resetMockForm,
    resetStep,
  } = useMockFormStore((state) => state);

  // Access the state from the Zustand slice
  const {
    questionBank,
    stageQuestions,
    generatedQuestions,
    importedQuestions,
    addQuestionToStage,
    removeQuestionFromStage,
    setStageQuestions,
    setOrderedQuestionsForStage,
  } = useMockFormStore((state) => ({
    questionBank: state.questionBank,
    stageQuestions: state.stageQuestions,
    addQuestionToStage: state.addQuestionToStage,
    removeQuestionFromStage: state.removeQuestionFromStage,
    setStageQuestions: state.setStageQuestions,
    setOrderedQuestionsForStage: state.setOrderedQuestionsForStage,
    generatedQuestions: state.generatedQuestions,
    importedQuestions: state.importedQuestions,
  }));

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

  const { mockTemplates, addMockTemplate, updateMockTemplate } =
    useMockTemplateStore((state) => ({
      mockTemplates: state.mockTemplates,
      addMockTemplate: state.addMockTemplate,
      updateMockTemplate: state.updateMockTemplate,
    }));

  const { interview, updateInterview } = useInterviewStore((state) => ({
    interview: state.interviews[interviewId],
    updateInterview: state.updateInterview,
  }));
  // Get stages based on the selected mock type
  const stages = mockForm.stages || [];
  // console.log("STAGE QUESTIONS", stageQuestions);

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  // DND Handlers
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const { id } = active;
    setActiveId(id);
    console.log("active", active);
    console.log("activeId", id);
  }

  function findValueOfItems(id: UniqueIdentifier | undefined, type: string) {
    if (type === "stageContainer") {
      // find item in container
      return stageQuestions.find((stage) => stage.stageLabel === id);
    }
    if (type === "question") {
      // find container that has item
      // console.log("Question ID", id);

      const stage = stageQuestions.find((stage) => {
        return stage.questions.find((question) => question.id === id);
      });

      return stage;
    }
  }
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    console.log("end active", active);
    console.log("over active", over);

    // Find the container (stage) that currently holds the dragged question
    const activeContainer = findValueOfItems(active.id, "question");
    let overContainer;

    // Determine if the question was dropped over a stage or another question
    if (over.data.current?.type === "stageContainer") {
      overContainer = findValueOfItems(over.id, "stageContainer");
    } else if (over.data.current?.type === "question") {
      console.log("Dropped over question");
      overContainer = findValueOfItems(over.id, "question");
    }

    if (!activeContainer || !overContainer) return;

    // Insert the dragged question at the correct position in the target stage's question array
    const activeQuestion = activeContainer.questions.find(
      (q) => q.id === active.id
    );

    if (!activeQuestion) return;

    // Handle moving to the same stage (reordering) vs a different stage
    if (activeContainer.stageLabel === overContainer.stageLabel) {
      // Reordering within the same stage
      const newOrder = [...activeContainer.questions];
      const activeIndex = newOrder.findIndex((q) => q.id === active.id);

      let overIndex;
      if (over.data.current?.type === "question") {
        // If dropped over a question, find its index
        overIndex = newOrder.findIndex((q) => q.id === over.id);
      } else {
        // If dropped over the stage itself, set index to append to the end
        overIndex = newOrder.length;
      }

      // Move the active question to the new position
      newOrder.splice(activeIndex, 1); // Remove the active question from its original position
      newOrder.splice(overIndex, 0, activeQuestion); // Insert at the new position

      // Set the ordered questions for the stage
      setOrderedQuestionsForStage(activeContainer.stageLabel, newOrder);
    } else {
      // Moving to a different stage
      // Remove the active question from the original stage
      const updatedActiveQuestions = activeContainer.questions.filter(
        (q) => q.id !== active.id
      );

      let overIndex;
      if (over.data.current?.type === "question") {
        // Find the index of the question it was dropped over in the new stage
        overIndex = overContainer.questions.findIndex((q) => q.id === over.id);
      } else {
        // If dropped over the stage itself, append to the end
        overIndex = overContainer.questions.length;
      }

      // Insert the active question at the correct position in the new stage
      const updatedOverQuestions = [...overContainer.questions];
      updatedOverQuestions.splice(overIndex, 0, activeQuestion);

      // Set the new question order for both stages
      setOrderedQuestionsForStage(
        activeContainer.stageLabel,
        updatedActiveQuestions
      );
      setOrderedQuestionsForStage(
        overContainer.stageLabel,
        updatedOverQuestions
      );
    }

    // Clear the active item after the drop
    setActiveId(null);
  }

  const createCardAndTags = async (question: string, tagNames?: string[]) => {
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

      if (newCard.status === 400) {
        throw new Error("Failed to create card", newCard.message);
      }

      if (newCard.status === 200) {
        console.log(
          "New card created to send to CardTag API:",
          newCard.card.id
        );

        if (tagNames) {
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
      }

      return newCard;
    } catch (error) {
      console.error("Error creating card or tags:", error);
    }
  };

  const handleSubmit = async () => {
    // turn all generated questions into actual cards
    try {
      const newCards = await Promise.all(
        generatedQuestions.map((q) => createCardAndTags(q.text, q.tags))
      );

      // Create a mapping of original generated question IDs to new card IDs
      // this is because generateQuestions have different IDs than the newly created cards
      // we processed the newCards in the same order as the generatedQuestions, so we can map them by index
      const generatedIdMap = new Map(
        generatedQuestions.map((question, index) => [
          question.id, // Original placeholder ID in stageQuestions
          newCards[index].card.id, // New ID from the database
        ])
      );
      //  Combine generated cards and imported cards with stage and order
      const cardsWithStageAndOrder = stageQuestions.flatMap(
        (stage, stageIndex) =>
          stage.questions.map((question, orderIndex) => ({
            // Use the new card ID if it's a generated question, otherwise keep the original ID
            cardId: generatedIdMap.get(question.id) || question.id,
            stage: stage.stageLabel, // Map stageLabel to the card
            order: orderIndex + 1, // Map the correct order of the question
          }))
      );
      console.log("CARDS WITH STAGE AND ORDER", cardsWithStageAndOrder);
      // Add all new cards to the card store
      newCards.forEach((newCard) => {
        console.log("Adding card to card store:", newCard);
        addCard(newCard.card); // This should immediately add the card to Zustand state
      });

      if (!unassignedDeck) {
        throw new Error("Unassigned deck is not available.");
      }

      updateDeck(unassignedDeck, {
        ...decks[unassignedDeck], // Copy the existing deck
        cards: [
          ...decks[unassignedDeck].cards,
          ...newCards.map((card) => card.card),
        ], // Append the new cards to the existing cards array
      });
      // Create Mock Template in the database (POST request)
      const mockTemplateResponse = await postMockTemplate(
        mockForm.title,
        mockForm.type,
        mockForm.description,
        interviewId
      );

      console.log("Mock Template Response:", mockTemplateResponse);

      if (mockTemplateResponse && mockTemplateResponse.status === 201) {
        const newTemplate = { ...mockTemplateResponse.template, cards: [] };
        // Add the mock template to Zustand
        addMockTemplate(newTemplate);
      } else {
        throw new Error("Failed to create mock template in database");
      }

      // gather all card ID's for put request
      const updatedMockTemplate = await putMockTemplate(
        mockForm.title,
        mockForm.type,
        mockForm.description,
        mockTemplateResponse.template.id,
        cardsWithStageAndOrder
      );

      if (updatedMockTemplate) {
        updateMockTemplate(mockTemplateResponse.template.id, {
          ...mockTemplateResponse.template,
          cards: [...updatedMockTemplate.template.cards],
        });
        // Update the interview in the Zustand store with the new mock template
        updateInterview(interviewId, {
          mockTemplates: [
            ...(interview.mockTemplates || []), // Append to existing mockTemplates array
            updatedMockTemplate.template, // Add the new template
          ],
        });
      }

      // Update the mock template in the database with all the cards (PUT request)
    } catch (error) {
      console.error("Error creating cards:", error);
    } finally {
      onSubmit(true);
      resetMockForm();
      resetStep();
    }

    // card tags of generated cards are string[] of tag names

    // const matchingTags = generatedTags?.map((tagName) =>
    //   Object.values(tags).find((tag) => tag.name === tagName)
    // );

    // create mock-template
    // create mock-template-cards relationships for imported and generated cards
    // update deck store of unassigned cards
  };

  return (
    <MockFormContainer
      onNext={handleSubmit}
      onPreviousStep={() => decreaseStep(step)}
    >
      <DndContext
        collisionDetection={rectIntersection}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        {/* <SortableContext
          items={stageQuestions.map((stage) => stage.stageLabel)}
        > */}
        <div className='flex'>
          <div className='flex-1 basis-1/2 h-full mt-4'>
            <h2 className='text-2xl'>Question Bank</h2>
            {(() => {
              const questionBankStage = stageQuestions?.find(
                (stage) => stage.stageLabel === "Questions"
              );

              // Ensure the Question Bank is always rendered as a StageDropZone
              return (
                <StageDropZone
                  id='Questions'
                  title='Questions'
                  questions={questionBankStage?.questions || []} // If there are no questions, pass an empty array
                  activeId={activeId}
                />
              );
            })()}
          </div>

          <div className='flex-1 basis-1/2 mt-4'>
            <h2 className='text-2xl'>Organize Questions into Stages</h2>
            <ul>
              {stages.map((stage) => (
                <li className='my-2' key={stage.label}>
                  <StageDropZone
                    id={stage.label}
                    title={stage.label}
                    description={stage.description}
                    questions={
                      stageQuestions.find(
                        (stageItem) => stageItem.stageLabel === stage.label
                      )?.questions || []
                    }
                    activeId={activeId}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* </SortableContext> */}
        {/* Drag Overlay */}
        <DragOverlay adjustScale={false}>
          {activeId && (
            <DraggableQuestion
              question={
                stageQuestions
                  .flatMap((stage) => stage.questions)
                  .find((q) => q.id === activeId)!
              }
              stageId={findValueOfItems(activeId, "question")?.stageLabel || ""}
            />
          )}
        </DragOverlay>
      </DndContext>
    </MockFormContainer>
  );
}

/**
 * sensors, useSensors
 * handleDragStart
 * handleDragMove
 * handleDragEnd
 * utility functions -Help identify and manage the items and containers being dragged.
 *  -findValueOfItems
 *  -findIndex
 * Sortable Context - defining sortable areas / lists
 * Drag Overlay - visual feedback for dragging
 *  */
