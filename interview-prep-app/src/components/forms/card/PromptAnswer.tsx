"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";

//tiptap imports
import Tiptap from "@/components/tiptap/Tiptap";
import Answer from "@/components/tiptap/Answer";

// implement a stack
// keywords option
// sections
// list option
const PromptAnswer = () => {
  const [answers, setAnswers] = useState([<Tiptap key={0} />]);

  // ul list for buttons
  // press button add a new node in list
  // stack

  const addAnswer = () => {
    setAnswers([...answers, <Tiptap key={answers.length} />]);
  };

  return (
    <div>
      <ul className='flex justify-between'>
        <li>
          <Button onClick={addAnswer}>Add Answer</Button>
        </li>
        <li>
          <Button>Add Group</Button>
        </li>
      </ul>
      {answers.map((answer, index) => (
        <div key={index} className='mt-4'>
          {answer}
        </div>
      ))}

      {/* <Answer /> */}
    </div>
  );
};
/*
Default Text Editor
  https://tiptap.dev/docs/editor/examples/default

Menus 
  https://tiptap.dev/docs/editor/examples/menus

*/

export default PromptAnswer;
