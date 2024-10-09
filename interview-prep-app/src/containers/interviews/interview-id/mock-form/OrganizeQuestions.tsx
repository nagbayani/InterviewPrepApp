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
import { useDeckStore } from "@/_store";
import { DeckData, CardData } from "@/types/data-types";
import DraggableQuestion from "../dnd/DraggableQuestion";
import StageDropZone from "../dnd/StageDropZone";

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
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { mock } from "node:test";

export default function OrganizeQuestions() {
  const {
    step,
    increaseStep,
    decreaseStep,
    mockForm,
    setMockForm,
    resetMockForm,
  } = useMockFormStore((state) => state);

  // Access the state from the Zustand slice
  const {
    questionBank,
    stageQuestions,
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
  }));
  console.log("STAGE QUESTIONS", stageQuestions);
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

  const handleDragMove = (event: DragMoveEvent) => {};

  return (
    <MockFormContainer
      onNext={() => increaseStep(step)}
      onPreviousStep={() => decreaseStep(step)}
    >
      <DndContext
        collisionDetection={rectIntersection}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        // modifiers={[restrictToParentElement]}
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
