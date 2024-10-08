import { useDroppable } from "@dnd-kit/core";
import { Question } from "@/_store/mock-form-slices/questions-slice";
import DraggableQuestion from "./DraggableQuestion";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { UniqueIdentifier } from "@dnd-kit/core";

export default function StageDropZone({
  id,
  title,
  description,
  questions,
  activeId,
}: {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
  activeId: UniqueIdentifier | null; // Ensure activeId is part of the props
}) {
  // Use `useDroppable` to track hover state for the stage container
  const { setNodeRef, isOver } = useDroppable({
    id: id,
    data: {
      type: "stageContainer",
    },
  });

  return (
    <div
      ref={setNodeRef}
      // border-2 border-dashed
      className={`p-4 rounded-md h-full ${
        isOver ? "border-blue-500 bg-blue-100" : "border-gray-300"
      }`}
    >
      <h3 className='text-xl font-bold'>{title}</h3>
      <p>{description}</p>
      <SortableContext
        items={questions.map((question) => question.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className='space-y-4'>
          {questions.map((question) => (
            <DraggableQuestion
              key={question.id}
              question={question}
              stageId={id}
            />
          ))}
          {isOver && (
            <div className='p-2 bg-blue-200 rounded-md'>Drop Here</div>
          )}
        </div>
      </SortableContext>
    </div>
  );
}
