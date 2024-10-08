import { useDraggable } from "@dnd-kit/core";
import { Question } from "@/_store/mock-form-slices/questions-slice";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";

export default function DraggableQuestion({
  question,
  stageId,
}: {
  question: Question;
  stageId: string;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: question.id,
    data: {
      type: "question",
      stage: stageId,
      text: question.text,
    },
  });
  // const {
  //   attributes,
  //   listeners,
  //   setNodeRef,
  //   transform,
  //   // transition,
  //   isDragging,
  // } = useDraggable({
  //   id: question.id,
  //   data: {
  //     type: "question",
  //     stage: stageId,
  //     text: question.text,
  //   },
  // });

  // const style = transform
  //   ? {
  //       transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  //     }
  //   : undefined;

  return (
    <div
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      {...listeners}
      {...attributes}
      className={clsx(
        "px-2 py-4 bg-white shadow-md rounded-xl w-full border border-transparent hover:border-gray-200 cursor-pointer",
        isDragging && "opacity-50"
      )}
    >
      {question.text}
    </div>
  );
}
